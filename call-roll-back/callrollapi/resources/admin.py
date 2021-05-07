from flask import request, jsonify
from flask_restful import Resource, reqparse, abort
from typing import Dict, List, Any
from bson.objectid import ObjectId

from callrollapi.utils.utils import abort_if_status_doesnt_exist, abort_if_token_not_teacher_rights, abort_if_token_not_admin_rights
from callrollapi.services.mongodbService import db

class AdminById(Resource):       
    def get(self, id: str) -> Dict[str, Any]:
        """ 
        Return admin by id
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
              description: The status of the user
              required: true
              schema:
                type: string
        responses : 
            200:
                description : User by id
            401: 
                description: The token or id are missing or are not correct
            404:
                description: The id doesn't exist
        """
        auth_header = request.headers.get('Authorization', '')
        abort_if_token_not_admin_rights(auth_header)
        u = db.users.find_one({'_id': ObjectId(id)})
        if(u is not None):      
            user = {
                '_id': str(u['_id']), 
                'email': u['email'], 
                'status': u['status'], 
                'firstname': u['firstname'], 
                'lastname': u['lastname'], 
                'photo': u['photo'],
            }
            return user, 200
        else:
            abort(404)