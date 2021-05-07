from callrollapi.services.mongodbService import db
from flask_restful import Resource,abort,reqparse
from datetime import datetime,date
from typing import Dict, List, Any
import json
from bson import json_util
from bson.objectid import ObjectId
from flask import jsonify,request
from callrollapi.utils.utils import abort_if_status_doesnt_exist, abort_if_token_not_teacher_rights, abort_if_token_not_admin_rights,abort_if_token_not_student_rights

class GetCoursesByEmail(Resource):
    def get(self,Email)-> Dict[str, Any]:
        """ 
        Return courses by email
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
              name: Email
              description: The email of the student
              required: true
              schema:
                type: string
        responses : 
            200:
                description : courses by Email
            401: 
                description: The token or id are missing or are not correct
            404:
                description: The email doesn't exist
        """
        auth_header = request.headers.get('Authorization', '')
        abort_if_token_not_student_rights(auth_header)
        AllCourses=db.courses.aggregate([{"$match":{"classes.rooms.students.email":Email}},{"$unwind":"$classes"},{"$unwind":"$classes.rooms"},{"$unwind":"$classes.rooms.students"},{"$match":{"classes.rooms.students.email":Email}}])
        
        return json.loads(json_util.dumps(AllCourses)),200





class GetCoursesofCurrentWeek(Resource):
    def get(self,Email)-> Dict[str, Any]:
        """ 
        Return of the currentWeek courses by email
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
              name: Email
              description: The email of the student
              required: true
              schema:
                type: string
        responses : 
            200:
                description : current week courses by Email
            401: 
                description: The token or id are missing or are not correct
            404:
                description: The email doesn't exist
        """
        auth_header = request.headers.get('Authorization', '')
        abort_if_token_not_student_rights(auth_header)
        today=date.today()
        currentWeek=int(today.strftime("%W"))
        courses=db.courses.aggregate([{"$match":{"$and":[{"classes.rooms.week":currentWeek},{"classes.rooms.students.email":Email}]}},{"$unwind":"$classes"},{"$unwind":"$classes.rooms"},{"$unwind":"$classes.rooms.students"},{"$match":{"$and":[{"classes.rooms.week":currentWeek},{"classes.rooms.students.email":Email}]}}])
        return json.loads(json_util.dumps(courses)),200





class GetCoursesByWeek(Resource):
    def get(self,week,Email) -> Dict[str, Any]:
        """ 
        Return the courses of the week by email
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
              name: week
              description: The week of that you want
              required: true
              schema:
                type: string
            - in: path
              name: Email
              description: The email of the student
              required: true
              schema:
                type: string
        responses : 
            200:
                description : the courses of the week for the Email
            401: 
                description: The token or id are missing or are not correct
            404:
                description: The email doesn't exist
        """
        auth_header = request.headers.get('Authorization', '')
        abort_if_token_not_student_rights(auth_header)
        courses=db.courses.aggregate([{"$match":{"$and":[{"classes.rooms.week":week},{"classes.rooms.students.email":Email}]}},{"$unwind":"$classes"},{"$unwind":"$classes.rooms"},{"$unwind":"$classes.rooms.students"},{"$match":{"$and":[{"classes.rooms.week":week},{"classes.rooms.students.email":Email}]}}])
        return json.loads(json_util.dumps(courses)),200






class GetCoursesBymonth(Resource):
    def get(self,month,Email) -> Dict[str, Any]:
         """ 
        Return the courses of the month by email
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
              name: month
              description: The month of that you want
              required: true
              schema:
                type: string
            - in: path
              name: Email
              description: The email of the student
              required: true
              schema:
                type: string
        responses : 
            200:
                description : the courses of the week for the Email
            401: 
                description: The token or id are missing or are not correct
            404:
                description: The email doesn't exist
        """
         auth_header = request.headers.get('Authorization', '')
         abort_if_token_not_student_rights(auth_header)
         courses=db.courses.aggregate([{"$match":{"$and":[{"classes.rooms.week":month},{"classes.rooms.students.email":Email}]}},{"$unwind":"$classes"},{"$unwind":"$classes.rooms"},{"$unwind":"$classes.rooms.students"},{"$match":{"$and":[{"classes.rooms.week":month},{"classes.rooms.students.email":Email}]}}])
         return json.loads(json_util.dumps(courses)),200




class GetAbsentStudents(Resource):
    def get(self):
        courses=db.courses.aggregate([{"$match":{"classes.rooms.students.callroll":False}},{"$unwind":"$classes"},{"$unwind":"$classes.rooms"},{"$unwind":"$classes.rooms.students"},{"$match":{"classes.rooms.students.callroll":False}}])
        return json.loads(json_util.dumps(courses)),200

class GetAbsenceByEmail(Resource):
    def get(self,email)-> Dict[str, Any]:
         """ 
        Return the absence of the student
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
              name: email
              description: The email of the student
              required: true
              schema:
                type: string
        responses : 
            200:
                description : the absence of the student
            401: 
                description: The token or id are missing or are not correct
            404:
                description: The email doesn't exist
        """
         auth_header = request.headers.get('Authorization', '')
         abort_if_token_not_student_rights(auth_header)
         now = datetime.now()
         courses=db.courses.aggregate([{"$match":{"$and":[{"classes.rooms.students.email":email},{"classes.rooms.startDate":{"$lt":now}},{"classes.rooms.students.callroll":False}]}},{"$unwind":"$classes"},{"$unwind":"$classes.rooms"},{"$unwind":"$classes.rooms.students"},{"$match":{"$and":[{"classes.rooms.students.email":email},{"classes.rooms.students.callroll":False}]}},{"$sort":{"classes.rooms.startDate":-1}}])
         return json.loads(json_util.dumps(courses)),200




class GetAbsentStudentsByWeek(Resource):
    def get(self,week):
        courses=db.courses.aggregate([{"$match":{"$and":[{"classes.rooms.week":week},{"classes.rooms.students.callroll":False}]}},{"$unwind":"$classes"},{"$unwind":"$classes.rooms"},{"$unwind":"$classes.rooms.students"},{"$match":{"$and":[{"classes.rooms.week":week},{"classes.rooms.students.callroll":False}]}}])
        return json.loads(json_util.dumps(courses)),200


class GetAbsenceByWeek(Resource):
    def get(self,week,email)-> Dict[str, Any]:
        """ 
        Return the absence of the student for the week
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
              name: week
              description: The email of the student
              required: true
              schema:
                type: string
            - in: path
              name: email
              description: The email of the student
              required: true
              schema:
                type: string
        responses : 
            200:
                description : the absence of the student
            401: 
                description: The token or id are missing or are not correct
            404:
                description: The email  doesn't exist
        """
        auth_header = request.headers.get('Authorization', '')
        abort_if_token_not_student_rights(auth_header)
        courses=db.courses.aggregate([{"$match":{"$and":[{"classes.rooms.week":week},{"classes.rooms.students.callroll":False},{"classes.rooms.students.email":email}]}},{"$unwind":"$classes"},{"$unwind":"$classes.rooms"},{"$unwind":"$classes.rooms.students"},{"$match":{"$and":[{"classes.rooms.week":week},{"classes.rooms.students.email":email},{"classes.rooms.students.callroll":False}]}}])
        return json.loads(json_util.dumps(courses)),200

class BePresent(Resource):
    def patch(self,email: str)-> Dict[str, Any]:
        """ 
        turn the callroll to true
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
              name: email
              description: The email of the student
              required: true
              schema:
                type: string
            - in: body
              name: attributes
              description: The name, email of the teacher, the startdate
              schema:
                type: object
                required:
                    -name
                    -teacher
                    -startDate
                properties:
                    name:
                        type: string
                    teacher:
                        type: string
                    startDate: 
                        type: string
        responses : 
            200:
                description : the callroll is update
            401: 
                description: The token or id are missing or are not correct
            404:
                description: some trouble appear 
        """

        body_parser = reqparse.RequestParser(bundle_errors = True)
        

        body_parser.add_argument('name', type = str, required = True, help = 'Missing name')
        
        body_parser.add_argument('teacher', type = str, required = True, help = 'Missing teacher')
        
        body_parser.add_argument('startDate', type = str, required = True, help = 'Missing startdate')
        
        args = body_parser.parse_args(strict=True)
        auth_header = request.headers.get('Authorization', '')
        abort_if_token_not_student_rights(auth_header)
        
        name = args['name']
        print("name : " + name)
        teacher = args['teacher']
        print("teacher : " + teacher)
        startDate = args['startDate']
        print("startDate : " + startDate)
        StartDate = datetime.strptime(startDate,'%Y-%m-%dT%H:%M:%S.%fZ')
        courses = db.courses.find_one_and_update(
            {"name": name,"classes.rooms.students.email": email,"classes.rooms.startDate":StartDate,"classes.teacher":teacher},
            {"$set":{"classes.rooms.students.$.callroll":True}},
            upsert = False)
        return 200

class Course(Resource): 
    def put(self) -> Dict[str, Any]:
        """
        Add a course
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
        body_parser.add_argument('name', type = str, required = True, help = 'Missing name')
        body_parser.add_argument('teacher', type = str, required = True, help = 'Missing teacher')
        body_parser.add_argument('promotion', type = str, required = True, help = 'Missing promotion')
        body_parser.add_argument('specialty', type = str, required = True, help = 'Missing specialty')
        body_parser.add_argument('group', type = str, required = False, help = 'Missing group')
        body_parser.add_argument('startDate', type = str, required = True, help = 'Missing startDate')
        body_parser.add_argument('endDate', type = str, required = True, help = 'Missing endDate')
        args = body_parser.parse_args(strict=True)
        try:
            abort_if_token_not_admin_rights(auth_header)
            name = args['name']
            teacher = args['teacher']
            promotion = args['promotion']
            specialty = args['specialty']
            group = args['group']
            startDate = args['startDate']
            endDate = args['endDate']
            if group != None:
                user = db.users.find({'status': 1,'promotion': promotion, 'specialty': specialty, 'group': group}, {"_id":False, "email": True})
                users = []
                for u in user:
                    users.append({'email': u['email'], 'callroll': False})
                db.courses.insert_one({
                    'name': name, 
                    'classes': {
                        'teacher': teacher,
                        'promotion': promotion, 
                        'specialty': specialty,
                        'group': group,
                        'rooms': {
                            'startDate': datetime.strptime(startDate,'%Y-%m-%dT%H:%M:%S.%fZ'),
                            'endDate': datetime.strptime(endDate,'%Y-%m-%dT%H:%M:%S.%fZ'),
                            'students': users,
                        }
                    }
                })
            else :
                user = db.users.find({'status': 1,'promotion': promotion, 'specialty': specialty}, {"_id":False, "email": True})
                users = []
                for u in user:
                    users.append({'email': u['email'], 'callroll': False})
                db.courses.insert_one({
                    'name': name, 
                    'classes': {
                        'teacher': teacher,
                        'promotion': promotion, 
                        'specialty': specialty,
                        'rooms': {
                            'startDate': datetime.strptime(startDate,'%Y-%m-%dT%H:%M:%S.%fZ'),
                            'endDate': datetime.strptime(endDate,'%Y-%m-%dT%H:%M:%S.%fZ'),
                            'students': users,
                        }
                    }
                })
            
            return users, 202
        except:
            abort(400)

class GetListofstudentsByteacher(Resource) :
    def get(self,teacher)-> Dict[str, Any]:
         """ 
        Return the list of the students by the teacher
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
              name: teacher
              description: The email of the teacher
              required: true
              schema:
                type: string
        responses : 
            200:
                description : the list of the absent student by teacher
            401: 
                description: The token or id are missing or are not correct
            404:
                description: The email doesn't exist
        """
         auth_header = request.headers.get('Authorization', '')
         abort_if_token_not_student_rights(auth_header)
         courses = db.courses.find(
            {"classes.teacher":teacher},
            {"classes.rooms.students":1}
        )
         return  json.loads(json_util.dumps(courses)),200   


class GetListofcoursesByteacher(Resource) :
    def get(self,teacher)-> Dict[str, Any]:
         """ 
        Return the list of courses by the teacher
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
              name: teacher
              description: The email of the teacher
              required: true
              schema:
                type: string
        responses : 
            200:
                description : the list of courses by teacher
            401: 
                description: The token or id are missing or are not correct
            404:
                description: The email doesn't exist
        """
         auth_header = request.headers.get('Authorization', '')
         abort_if_token_not_student_rights(auth_header)
         courses = db.courses.find(
            {"classes.teacher":teacher}
        )
         return  json.loads(json_util.dumps(courses)),200   

class GetListofAbsentStudentByTeacher(Resource):
    def get(self,teacher)-> Dict[str, Any]:
         """ 
        Return the list of absent student by the teacher
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
              name: teacher
              description: The email of the teacher
              required: true
              schema:
                type: string
        responses : 
            200:
                description : the list of absent student by teacher
            401: 
                description: The token or id are missing or are not correct
            404:
                description: The email doesn't exist
        """
         auth_header = request.headers.get('Authorization', '')
         abort_if_token_not_student_rights(auth_header)
        
         now = datetime.now()
         courses=db.courses.aggregate([{"$match":{"$and":[{"classes.teacher":teacher},
         {"classes.rooms.startDate":{"$lt":now}},{"classes.rooms.students.callroll":False}]}},
         {"$unwind":"$classes"},{"$unwind":"$classes.rooms"},{"$unwind":"$classes.rooms.students"},
         {"$match":{"$and":[{"classes.teacher":teacher},{"classes.rooms.students.callroll":False}]}},
         {"$sort":{"classes.rooms.startDate":-1}}])
         return json.loads(json_util.dumps(courses)),200

class GetListofStudentByTeacherCourse(Resource):
    def get(self,teacher,name,startDate)-> Dict[str, Any]:
        """ 
        turn the callroll to true
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
              name: teacher
              description: The email of the teacher
              required: true
              schema:
                type: string
            - in: path
              name: name
              description: The name of the course
              required: true
              schema:
                type: string
            - in: path
              name: startDate
              description: The startDate of the course
              required: true
              schema:
                type: string
            
        responses : 
            200:
                description : the list of student
            401: 
                description: The token or id are missing or are not correct
            404:
                description: some trouble appear 
        """
        auth_header = request.headers.get('Authorization', '')
        abort_if_token_not_teacher_rights(auth_header)
        StartDate = datetime.strptime(startDate,'%Y-%m-%dT%H:%M:%S.%fZ')
        courses=db.courses.aggregate([{"$match":{"$and":[{"classes.teacher":teacher}, {"classes.rooms.startDate":StartDate},{"$name":name}]}},
        {"$unwind":"$classes"},{"$unwind":"$classes.rooms"},{"$unwind":"$classes.rooms.students"},
        {"$match":{"$and":[{"classes.teacher":teacher},{"classes.rooms.startDate":StartDate},{"$name":name}]}}])
        return json.loads(json_util.dumps(courses)),200

class GetNextCourseForStudent(Resource):
    def put(self,email)-> Dict[str, Any]:
         """ 
        Return the next courses of the students 
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
              name: email
              description: The email of the student
              required: true
              schema:
                type: string
        responses : 
            200:
                description : the next courses of the student 
            401: 
                description: The token or id are missing or are not correct
            404:
                description: The email doesn't exist
        """
         auth_header = request.headers.get('Authorization', '')
         abort_if_token_not_student_rights(auth_header)
         now = datetime.now()
         courses=db.courses.aggregate([{"$match":{"$and":[{"classes.rooms.students.email":email},
         {"classes.rooms.startDate":{"$gt":now}}]}},
         {"$unwind":"$classes"},{"$unwind":"$classes.rooms"},{"$unwind":"$classes.rooms.students"},
         {"$match":{"$and":[{"classes.rooms.students.email":email}]}},
         {"$sort":{"classes.rooms.startDate":1}}])
         return json.loads(json_util.dumps(courses)),200

class GetNextCourseForteacher(Resource):
    def get(self,teacher)-> Dict[str, Any]:
         """ 
        Return the next courses of the teacher
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
              name: teacher
              description: The email of the teacher
              required: true
              schema:
                type: string
        responses : 
            200:
                description : the next courses of the teacher
            401: 
                description: The token or id are missing or are not correct
            404:
                description: The email doesn't exist
        """
         auth_header = request.headers.get('Authorization', '')
         abort_if_token_not_student_rights(auth_header)
         now = datetime.now()
         courses=db.courses.find({"$and":[{"classes.teacher":teacher},
         {"classes.rooms.startDate":{"$gt":now}}]}).sort("classes.rooms.startDate",1)
         return json.loads(json_util.dumps(courses)),200

class GetNextCourses(Resource):
    def get(self)-> Dict[str, Any]:
         """ 
        Return the next courses of the teacher
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
              name: teacher
              description: The email of the teacher
              required: true
              schema:
                type: string
        responses : 
            200:
                description : the next courses of the teacher
            401: 
                description: The token or id are missing or are not correct
            404:
                description: The email doesn't exist
        """
         auth_header = request.headers.get('Authorization', '')
         abort_if_token_not_student_rights(auth_header)
         now = datetime.now()
         courses=db.courses.find(
         {"classes.rooms.startDate":{"$gt":now}}).sort("classes.rooms.startDate",1)
         return json.loads(json_util.dumps(courses)),200


