from flask import request, jsonify
from flask_restful import Resource, reqparse, abort
from typing import Dict, List, Any
from bson.objectid import ObjectId

from callrollapi.utils.utils import abort_if_status_doesnt_exist, abort_if_token_not_teacher_rights, abort_if_token_not_admin_rights, abort_if_token_not_student_rights
from callrollapi.services.mongodbService import db

class UsersByStatus(Resource):       
    def get(self, status: int) -> Dict[str, Any]:
        """ 
        Return users by status
        ---
        tags: 
            - Flask API
        parameters:
            - in: header
              name: Authorization
              description: user token
              required: true
              securitySchemes:
                bearerAuth:
                    type: http
                    scheme: bearer
                    bearerFormet: JWT
            - in: path
              name: status
              description: The status of the user
              required: true
              schema:
                type: integer
                minimum: 1
                maximum: 3
        responses : 
            200:
                description : All elements in users by status
            401: 
                description: The token or status are missing or are not correct
            404:
                description: The status doesn't exist
        """
        auth_header = request.headers.get('Authorization', '')
        abort_if_status_doesnt_exist(status)
        if (status < 3):
            abort_if_token_not_teacher_rights(auth_header)
        else: 
            abort_if_token_not_admin_rights(auth_header)
        users = []
        for u in db.users.find({'status': status}):        
            print(u['email'])
            users.append({'_id': str(u['_id']), 'email': u['email'], 'status': u['status'], 'firstname': u['firstname'], 'lastname': u['lastname'], 'photo': u['photo']})
        return users, 200

class UserById(Resource): 
    def patch(self, id: str) -> Dict[str, Any]:
        """
        Edit a user
        ---
        tags: 
            - Flask API
        parameters:
            - in: header
              name: Authorization
              description: user token
              required: true
              securitySchemes:
                bearerAuth:
                    type: http
                    scheme: bearer
                    bearerFormet: JWT
            - in: path
              name: id student
              description: The id of the student
              required: true
              schema:
                type: integer
                minimum: 1
        responses:
            202:
                description: Edited user successful
            400: 
                description: The paramaters ars missing or are not correct
            401: 
                description: The token or id are missing or are not correct
            404:
                description: Data not found
        """
        auth_header = request.headers.get('Authorization', '')
        body_parser = reqparse.RequestParser(bundle_errors = True)
        body_parser.add_argument('firstname', type = str, required = False, help = 'Missing firstname')
        body_parser.add_argument('lastname', type = str, required = False, help = 'Missing lastname')
        body_parser.add_argument('email', type = str, required = False, help = 'Missing email')
        body_parser.add_argument('password', type = str, required = False, help = 'Missing password')
        body_parser.add_argument('photo', type = str, required = False, help = 'Missing photo')
        body_parser.add_argument('promotion', type = str, required = False, help = 'Missing promotion')
        body_parser.add_argument('specialty', type = str, required = False, help = 'Missing specialty')
        body_parser.add_argument('group', type = str, required = False, help = 'Missing group')
        body_parser.add_argument('classManager', type = str, required = False, help = 'Missing classManager')    
        args = body_parser.parse_args(strict=True)
        try:
            abort_if_token_not_student_rights(auth_header)
            firstname = args['firstname']
            print(firstname)
            lastname = args['lastname']
            email = args['email']
            password = args['password']
            photo = args['photo']
            promotion = args['promotion']
            specialty = args['specialty']
            group = args['group']
            classManager = args['classManager']
            if firstname != None:
                db.users.update_one({ '_id': ObjectId(id)}, { '$set': { 'firstname': firstname}})
            if lastname != None:
                db.users.update_one({ '_id': ObjectId(id)}, { '$set': { 'lastname': lastname}})
            if email != None:
                db.users.update_one({ '_id': ObjectId(id)}, { '$set': { 'email': email}})
            if password != None:
                db.users.update_one({ '_id': ObjectId(id)}, { '$set': { 'password': password}})
            if photo != None:
                db.users.update_one({ '_id': ObjectId(id)}, { '$set': { 'photo': photo}})
            if promotion != None:
                db.users.update_one({ '_id': ObjectId(id)}, { '$set': { 'promotion': promotion}})
            if specialty != None:
                db.users.update_one({ '_id': ObjectId(id)}, { '$set': { 'specialty': specialty}})
            if group != None:
                db.users.update_one({ '_id': ObjectId(id)}, { '$set': { 'group': group}})
            if classManager != None:
                db.users.update_one({ '_id': ObjectId(id)}, { '$set': { 'classManager': classManager}})
            return 202
        except:
            abort(400)
    
    def delete(self, id: str) -> Dict[str,Any]:
        """
        Delete a user
        ---
        tags: 
            - Flask API
        parameters:
            - in: header
              name: Authorization
              description: user token
              required: true
              securitySchemes:
                bearerAuth:
                    type: http
                    scheme: bearer
                    bearerFormet: JWT
            - in: path
              name: id
              description: The id of the todolist
              required: true
              schema:
                type: string
                minimum: 1
        responses: 
            200:
                description: JSON representing the todos
            401: 
                description: The token or id are missing or are not correct
            404:
                description: The users file or user data file not found
        """
        auth_header = request.headers.get('Authorization', '')
        abort_if_token_not_admin_rights(auth_header)
        db.users.remove({ '_id': ObjectId(id)})
        return 200

class User(Resource): 
    def put(self) -> Dict[str, Any]:
        """
        Edit a user
        ---
        tags: 
            - Flask API
        parameters:
            - in: header
              name: Authorization
              description: user token
              required: true
              securitySchemes:
                bearerAuth:
                    type: http
                    scheme: bearer
                    bearerFormet: JWT
            - in: path
              name: id student
              description: The id of the student
              required: true
              schema:
                type: integer
                minimum: 1
        responses:
            202:
                description: Edited user successful
            400: 
                description: The paramaters ars missing or are not correct
            401: 
                description: The token or id are missing or are not correct
            404:
                description: Data not found
        """
        auth_header = request.headers.get('Authorization', '')
        body_parser = reqparse.RequestParser(bundle_errors = True)
        body_parser.add_argument('firstname', type = str, required = True, help = 'Missing firstname')
        body_parser.add_argument('lastname', type = str, required = True, help = 'Missing lastname')
        body_parser.add_argument('email', type = str, required = True, help = 'Missing email')
        body_parser.add_argument('status', type = int, required = True, help = 'Missing status')
        body_parser.add_argument('password', type = str, required = True, help = 'Missing password')
        body_parser.add_argument('photo', type = str, required = False, help = 'Missing photo')
        body_parser.add_argument('promotion', type = str, required = False, help = 'Missing promotion')
        body_parser.add_argument('specialty', type = str, required = False, help = 'Missing specialty')
        body_parser.add_argument('group', type = str, required = False, help = 'Missing group')
        body_parser.add_argument('classManager', type = str, required = False, help = 'Missing classManager')    
        args = body_parser.parse_args(strict=True)
        try:
            abort_if_token_not_admin_rights(auth_header)
            firstname = args['firstname']
            lastname = args['lastname']
            email = args['email']
            status = args['status']
            password = args['password']
            photo = args['photo']
            promotion = args['promotion']
            specialty = args['specialty']
            group = args['group']
            classManager = args['classManager']
            if status == 1:
                db.users.insert_one({
                    'firstname': firstname, 
                    'lastname': lastname, 
                    'email': email,
                    'status': status, 
                    'password': password,
                    'photo': photo,
                    'promotion': promotion,
                    'specialty': specialty,
                    'group': group})
            if status == 2:
                db.users.insert_one({
                    'firstname': firstname, 
                    'lastname': lastname, 
                    'email': email,
                    'status': status, 
                    'password': password,
                    'photo': photo,
                    'classManager': classManager})
            if status == 3:
                db.users.insert_one({
                    'firstname': firstname, 
                    'lastname': lastname, 
                    'email': email,
                    'status': status, 
                    'password': password,
                    'photo': photo})
            user = db.users.find_one({'email':email}, {"_id":True})
            return str(user['_id']), 202
        except:
            abort(400)