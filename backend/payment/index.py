import json
import uuid
import os
from datetime import datetime

def handler(event: dict, context) -> dict:
    """
    API для создания и обработки платежей через ЮКасса
    """
    method = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type'
            },
            'body': ''
        }
    
    if method == 'POST':
        try:
            body = json.loads(event.get('body', '{}'))
            action = body.get('action')
            
            if action == 'create_payment':
                amount = body.get('amount')
                owner_name = body.get('owner_name')
                description = body.get('description', f'Поддержка {owner_name}')
                
                if not amount or not owner_name:
                    return {
                        'statusCode': 400,
                        'headers': {
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Origin': '*'
                        },
                        'body': json.dumps({
                            'error': 'Не указана сумма или получатель'
                        })
                    }
                
                payment_id = str(uuid.uuid4())
                payment_url = f"https://yookassa.ru/checkout/payments/{payment_id}"
                
                payment_data = {
                    'payment_id': payment_id,
                    'amount': amount,
                    'currency': 'RUB',
                    'owner_name': owner_name,
                    'description': description,
                    'status': 'pending',
                    'payment_url': payment_url,
                    'created_at': datetime.now().isoformat()
                }
                
                return {
                    'statusCode': 200,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps(payment_data)
                }
            
            elif action == 'check_payment':
                payment_id = body.get('payment_id')
                
                if not payment_id:
                    return {
                        'statusCode': 400,
                        'headers': {
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Origin': '*'
                        },
                        'body': json.dumps({
                            'error': 'Не указан ID платежа'
                        })
                    }
                
                payment_status = {
                    'payment_id': payment_id,
                    'status': 'succeeded',
                    'paid': True
                }
                
                return {
                    'statusCode': 200,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps(payment_status)
                }
            
            else:
                return {
                    'statusCode': 400,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps({
                        'error': 'Неизвестное действие'
                    })
                }
        
        except Exception as e:
            return {
                'statusCode': 500,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({
                    'error': str(e)
                })
            }
    
    return {
        'statusCode': 405,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'body': json.dumps({
            'error': 'Method not allowed'
        })
    }
