import json
import os
import psycopg2
from datetime import datetime

def get_db_connection():
    '''Создание подключения к базе данных'''
    return psycopg2.connect(os.environ['DATABASE_URL'])

def handler(event: dict, context) -> dict:
    '''API для челленджей - конкурсов владельцев питомцев с голосованием'''
    method = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-User-Id'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    path = event.get('queryStringParameters', {}).get('path', '')
    
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        
        if path == 'list':
            cursor.execute('''
                SELECT c.id, c.title, c.description, c.image_url, c.prize, 
                       c.start_date, c.end_date, c.status,
                       (SELECT COUNT(*) FROM challenge_entries WHERE challenge_id = c.id AND status = 'approved') as entries_count,
                       (SELECT MAX(votes_count) FROM challenge_entries WHERE challenge_id = c.id) as top_votes
                FROM challenges c
                WHERE c.status = 'active'
                ORDER BY c.created_at DESC
            ''')
            
            rows = cursor.fetchall()
            result = []
            for row in rows:
                end_date = row[6]
                days_left = (end_date - datetime.now()).days
                
                result.append({
                    'id': row[0],
                    'title': row[1],
                    'description': row[2],
                    'imageUrl': row[3],
                    'prize': row[4],
                    'startDate': row[5].isoformat(),
                    'endDate': row[6].isoformat(),
                    'status': row[7],
                    'entriesCount': row[8],
                    'topVotes': row[9] or 0,
                    'daysLeft': max(0, days_left)
                })
        
        elif path == 'entries':
            challenge_id = event.get('queryStringParameters', {}).get('challengeId')
            user_id = event.get('headers', {}).get('x-user-id')
            
            if not challenge_id:
                return {
                    'statusCode': 400,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'challengeId is required'}),
                    'isBase64Encoded': False
                }
            
            if user_id:
                cursor.execute('''
                    SELECT e.id, e.video_url, e.title, e.description, e.votes_count,
                           u.name as user_name, u.avatar as user_avatar,
                           p.name as pet_name, p.avatar as pet_avatar,
                           EXISTS(SELECT 1 FROM challenge_votes WHERE entry_id = e.id AND user_id = %s) as has_voted
                    FROM challenge_entries e
                    JOIN users u ON e.user_id = u.id
                    JOIN pets p ON e.pet_id = p.id
                    WHERE e.challenge_id = %s AND e.status = 'approved'
                    ORDER BY e.votes_count DESC
                ''', (user_id, challenge_id))
            else:
                cursor.execute('''
                    SELECT e.id, e.video_url, e.title, e.description, e.votes_count,
                           u.name as user_name, u.avatar as user_avatar,
                           p.name as pet_name, p.avatar as pet_avatar,
                           false as has_voted
                    FROM challenge_entries e
                    JOIN users u ON e.user_id = u.id
                    JOIN pets p ON e.pet_id = p.id
                    WHERE e.challenge_id = %s AND e.status = 'approved'
                    ORDER BY e.votes_count DESC
                ''', (challenge_id,))
            
            rows = cursor.fetchall()
            result = []
            for row in rows:
                result.append({
                    'id': row[0],
                    'videoUrl': row[1],
                    'title': row[2],
                    'description': row[3],
                    'votesCount': row[4],
                    'userName': row[5],
                    'userAvatar': row[6],
                    'petName': row[7],
                    'petAvatar': row[8],
                    'hasVoted': row[9]
                })
        
        elif path == 'vote' and method == 'POST':
            body = json.loads(event.get('body', '{}'))
            entry_id = body.get('entryId')
            user_id = event.get('headers', {}).get('x-user-id')
            
            if not user_id:
                return {
                    'statusCode': 401,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'User ID required'}),
                    'isBase64Encoded': False
                }
            
            cursor.execute(
                'SELECT COUNT(*) FROM challenge_votes WHERE entry_id = %s AND user_id = %s',
                (entry_id, user_id)
            )
            if cursor.fetchone()[0] > 0:
                return {
                    'statusCode': 400,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Вы уже проголосовали'}),
                    'isBase64Encoded': False
                }
            
            cursor.execute(
                'INSERT INTO challenge_votes (entry_id, user_id) VALUES (%s, %s)',
                (entry_id, user_id)
            )
            cursor.execute(
                'UPDATE challenge_entries SET votes_count = votes_count + 1 WHERE id = %s',
                (entry_id,)
            )
            conn.commit()
            
            cursor.execute('SELECT votes_count FROM challenge_entries WHERE id = %s', (entry_id,))
            new_votes = cursor.fetchone()[0]
            
            result = {'success': True, 'votesCount': new_votes}
        
        elif path == 'unvote' and method == 'POST':
            body = json.loads(event.get('body', '{}'))
            entry_id = body.get('entryId')
            user_id = event.get('headers', {}).get('x-user-id')
            
            if not user_id:
                return {
                    'statusCode': 401,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'User ID required'}),
                    'isBase64Encoded': False
                }
            
            cursor.execute(
                'SELECT COUNT(*) FROM challenge_votes WHERE entry_id = %s AND user_id = %s',
                (entry_id, user_id)
            )
            if cursor.fetchone()[0] == 0:
                return {
                    'statusCode': 400,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Вы не голосовали'}),
                    'isBase64Encoded': False
                }
            
            cursor.execute(
                'UPDATE challenge_entries SET votes_count = votes_count - 1 WHERE id = %s',
                (entry_id,)
            )
            conn.commit()
            
            cursor.execute('SELECT votes_count FROM challenge_entries WHERE id = %s', (entry_id,))
            new_votes = cursor.fetchone()[0]
            
            result = {'success': True, 'votesCount': new_votes}
        
        elif path == 'submit' and method == 'POST':
            body = json.loads(event.get('body', '{}'))
            user_id = event.get('headers', {}).get('x-user-id')
            
            if not user_id:
                return {
                    'statusCode': 401,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'User ID required'}),
                    'isBase64Encoded': False
                }
            
            challenge_id = body.get('challengeId')
            pet_id = body.get('petId')
            video_url = body.get('videoUrl')
            title = body.get('title')
            description = body.get('description', '')
            
            cursor.execute('''
                INSERT INTO challenge_entries 
                (challenge_id, user_id, pet_id, video_url, title, description, status)
                VALUES (%s, %s, %s, %s, %s, %s, 'approved')
                RETURNING id
            ''', (challenge_id, user_id, pet_id, video_url, title, description))
            
            entry_id = cursor.fetchone()[0]
            conn.commit()
            
            result = {'success': True, 'entryId': entry_id, 'message': 'Участие успешно добавлено!'}
        
        else:
            result = {'error': 'Unknown path'}
        
        cursor.close()
        conn.close()
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps(result),
            'isBase64Encoded': False
        }
        
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': str(e)}),
            'isBase64Encoded': False
        }
