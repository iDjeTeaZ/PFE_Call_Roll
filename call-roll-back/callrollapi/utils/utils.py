import jwt
from datetime import datetime, timedelta
from flask_restful import abort
from callrollapi import config

def abort_if_status_doesnt_exist(status: int):
    if(status < 1 or status > 3):
       abort(404, message="status doesn't exist") 

def generate_encoded_jwt(email, status):
    return jwt.encode({
        'sub': email,
        'status': status,
        'iat': datetime.utcnow()},
        config.API_KEY, algorithm="HS256")

def generate_decod_jwt(encoded_jwt):
    print(jwt.decode(encoded_jwt, config.API_KEY, algorithms='HS256'))
    return jwt.decode(encoded_jwt, config.API_KEY, algorithms='HS256')

def abort_if_token_not_teacher_rights(auth_header):
    try:
        token = auth_header
        data = generate_decod_jwt(token)
        if (data['status'] < 2):
            abort(401, message = 'Unauthorized')   
    except (jwt.InvalidTokenError, Exception):
        abort(401, message = 'The token is invalid')  
    except:
        abort(401, message = 'Unauthorized') 


def abort_if_token_not_student_rights(auth_header):
    try:
        token = auth_header
        data = generate_decod_jwt(token)
        if (data['status'] < 1):
            abort(401, message = 'Unauthorized')   
    except (jwt.InvalidTokenError, Exception):
        abort(401, message = 'The token is invalid')  
    except:
        abort(401, message = 'Unauthorized') 


def abort_if_token_not_admin_rights(auth_header):
    try:
        token = auth_header
        data = generate_decod_jwt(token)
        if (data['status'] != 3):
            abort(401, message = 'Unauthorized')   
    except (jwt.InvalidTokenError, Exception):
        abort(401, message = 'The token is invalid')  
    except:
        abort(401, message = 'Unauthorized')       

def get_username(auth_headers):
    try:
        token = auth_headers
        data = generate_decod_jwt(token)
        username = data['sub']    
        return username
    except jwt.ExpiredSignatureError:
        abort(401, message = 'The token has expired')
    except (jwt.InvalidTokenError, Exception):
        abort(401, message = 'The token is invalid')  
    except:
        abort(401, message = 'Get username unauthorized')