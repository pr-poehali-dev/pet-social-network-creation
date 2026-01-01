import json
import os
import psycopg2
from datetime import datetime

def get_db_connection():
    '''Создание подключения к базе данных'''
    return psycopg2.connect(os.environ['DATABASE_URL'])

def handler(event: dict, context) -> dict:
    '''API для административной панели социальной сети питомцев'''
    method = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-Authorization'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    path = event.get('queryStringParameters', {}).get('path', '')
    
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        
        if path == 'stats':
            cursor.execute('''
                SELECT 
                    (SELECT COUNT(*) FROM users) as total_users,
                    (SELECT COUNT(*) FROM users WHERE created_at > NOW() - INTERVAL '1 day') as new_users_today,
                    (SELECT COUNT(*) FROM users WHERE status = 'active') as active_users,
                    (SELECT COUNT(*) FROM pets) as total_pets,
                    (SELECT COUNT(*) FROM posts) as total_posts,
                    (SELECT COUNT(*) FROM payments) as total_payments,
                    (SELECT COALESCE(SUM(amount), 0) FROM payments WHERE status = 'completed') as total_revenue,
                    (SELECT COUNT(*) FROM reports WHERE status = 'pending') as pending_reports
            ''')
            row = cursor.fetchone()
            result = {
                'totalUsers': row[0],
                'newUsersToday': row[1],
                'activeUsers': row[2],
                'totalPets': row[3],
                'totalPosts': row[4],
                'totalPayments': row[5],
                'totalRevenue': float(row[6]) if row[6] else 0,
                'pendingReports': row[7]
            }
            
        elif path == 'users':
            search = event.get('queryStringParameters', {}).get('search', '')
            if search:
                cursor.execute('''
                    SELECT u.id, u.name, u.email, u.avatar, u.status, u.created_at,
                           (SELECT COUNT(*) FROM pets WHERE user_id = u.id) as pets_count,
                           (SELECT COUNT(*) FROM posts p JOIN pets pt ON p.pet_id = pt.id WHERE pt.user_id = u.id) as posts_count
                    FROM users u
                    WHERE u.name ILIKE %s OR u.email ILIKE %s
                    ORDER BY u.created_at DESC
                    LIMIT 50
                ''', (f'%{search}%', f'%{search}%'))
            else:
                cursor.execute('''
                    SELECT u.id, u.name, u.email, u.avatar, u.status, u.created_at,
                           (SELECT COUNT(*) FROM pets WHERE user_id = u.id) as pets_count,
                           (SELECT COUNT(*) FROM posts p JOIN pets pt ON p.pet_id = pt.id WHERE pt.user_id = u.id) as posts_count
                    FROM users u
                    ORDER BY u.created_at DESC
                    LIMIT 50
                ''')
            
            rows = cursor.fetchall()
            result = []
            for row in rows:
                created_at = row[5]
                days_ago = (datetime.now() - created_at).days
                if days_ago == 0:
                    join_date = 'сегодня'
                elif days_ago == 1:
                    join_date = 'вчера'
                elif days_ago < 7:
                    join_date = f'{days_ago} дней назад'
                elif days_ago < 30:
                    weeks = days_ago // 7
                    join_date = f'{weeks} недель назад'
                else:
                    months = days_ago // 30
                    join_date = f'{months} месяцев назад'
                
                result.append({
                    'id': row[0],
                    'name': row[1],
                    'email': row[2],
                    'avatar': row[3],
                    'status': row[4],
                    'joinDate': join_date,
                    'pets': row[6],
                    'posts': row[7]
                })
        
        elif path == 'payments':
            cursor.execute('''
                SELECT p.id, 
                       u1.name as from_name,
                       u2.name as to_name,
                       p.amount,
                       p.status,
                       p.created_at
                FROM payments p
                JOIN users u1 ON p.from_user_id = u1.id
                JOIN users u2 ON p.to_user_id = u2.id
                ORDER BY p.created_at DESC
                LIMIT 50
            ''')
            
            rows = cursor.fetchall()
            result = []
            for row in rows:
                created_at = row[5]
                days_ago = (datetime.now() - created_at).days
                if days_ago == 0:
                    date_str = 'сегодня'
                elif days_ago == 1:
                    date_str = 'вчера'
                elif days_ago < 7:
                    date_str = f'{days_ago} дней назад'
                elif days_ago < 30:
                    weeks = days_ago // 7
                    date_str = f'{weeks} недель назад'
                else:
                    months = days_ago // 30
                    date_str = f'{months} месяцев назад'
                
                result.append({
                    'id': row[0],
                    'from': row[1],
                    'to': row[2],
                    'amount': float(row[3]),
                    'status': row[4],
                    'date': date_str
                })
        
        elif path == 'reports':
            cursor.execute('''
                SELECT r.id,
                       p.id as post_id,
                       u.name as author_name,
                       pet.name as pet_name,
                       p.content,
                       COUNT(r.id) OVER (PARTITION BY r.post_id) as reports_count,
                       r.reason,
                       r.created_at
                FROM reports r
                JOIN posts p ON r.post_id = p.id
                JOIN pets pet ON p.pet_id = pet.id
                JOIN users u ON pet.user_id = u.id
                WHERE r.status = 'pending'
                GROUP BY r.id, p.id, u.name, pet.name, p.content, r.reason, r.created_at
                ORDER BY r.created_at DESC
                LIMIT 50
            ''')
            
            rows = cursor.fetchall()
            result = []
            seen_posts = set()
            
            for row in rows:
                post_id = row[1]
                if post_id in seen_posts:
                    continue
                seen_posts.add(post_id)
                
                created_at = row[7]
                hours_ago = int((datetime.now() - created_at).total_seconds() / 3600)
                if hours_ago < 1:
                    date_str = 'только что'
                elif hours_ago < 24:
                    date_str = f'{hours_ago} часов назад'
                else:
                    days_ago = hours_ago // 24
                    date_str = f'{days_ago} дней назад'
                
                content = row[4]
                if len(content) > 50:
                    content = content[:50] + '...'
                
                result.append({
                    'id': row[0],
                    'postId': post_id,
                    'author': row[2],
                    'petName': row[3],
                    'content': content,
                    'reports': row[5],
                    'reason': row[6],
                    'date': date_str
                })
        
        elif path == 'user/block' and method == 'POST':
            body = json.loads(event.get('body', '{}'))
            user_id = body.get('userId')
            
            cursor.execute('UPDATE users SET status = %s WHERE id = %s', ('blocked', user_id))
            conn.commit()
            result = {'success': True, 'message': 'Пользователь заблокирован'}
        
        elif path == 'user/unblock' and method == 'POST':
            body = json.loads(event.get('body', '{}'))
            user_id = body.get('userId')
            
            cursor.execute('UPDATE users SET status = %s WHERE id = %s', ('active', user_id))
            conn.commit()
            result = {'success': True, 'message': 'Пользователь разблокирован'}
        
        elif path == 'post/delete' and method == 'POST':
            body = json.loads(event.get('body', '{}'))
            post_id = body.get('postId')
            
            cursor.execute('UPDATE posts SET status = %s WHERE id = %s', ('deleted', post_id))
            cursor.execute('UPDATE reports SET status = %s WHERE post_id = %s', ('resolved', post_id))
            conn.commit()
            result = {'success': True, 'message': 'Пост удален'}
        
        elif path == 'reports/reject' and method == 'POST':
            body = json.loads(event.get('body', '{}'))
            post_id = body.get('postId')
            
            cursor.execute('UPDATE reports SET status = %s WHERE post_id = %s', ('rejected', post_id))
            conn.commit()
            result = {'success': True, 'message': 'Жалобы отклонены'}
        
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
