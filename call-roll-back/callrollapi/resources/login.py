import json
import os
from flask import request
from flask_restful import Resource, reqparse, abort
from typing import Dict, List, Any
from bson.objectid import ObjectId


from callrollapi.utils.utils import generate_encoded_jwt
from callrollapi.services.mongodbService import db
class Login(Resource):
    def post(self) -> Dict[str, Any]:
        """
        Login to an account
        ---
        tags: 
            - Flask API
        parameters:
            - in: body
              name: attribute
              description : The email and the hashed password of the user
              schema: 
                type: object
                required:
                    -email
                    -password
                properties: 
                    email: 
                        type: string
                    password:
                        type: string
        responses:
            200:
                description: Successful account login
            400: 
                description: The paramaters are missing or are not correct
        """
        body_parser = reqparse.RequestParser()
        body_parser.add_argument('email', type = str, required = True, help = 'Missing the email of the user')
        body_parser.add_argument('password', type = str, required = True, help = 'Missing the password of the user')
        args = body_parser.parse_args(strict = True)
        try:
            email = args['email']
            password= args['password']

            user = db.users.find_one({"email": email,"password": password})
            if(user is not None):
                token = generate_encoded_jwt(email, user['status'])
                response = {
                    'status': user['status'],
                    'token': token,
                    '_id' : str(user['_id'])
                }
                print(response)
                return(response, 200)  
            else:
                abort(400)             
        except:
            abort(400)