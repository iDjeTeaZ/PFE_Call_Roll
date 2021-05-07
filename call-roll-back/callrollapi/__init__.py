"""
    Import
"""
from flask import Flask, jsonify
from flask_cors import CORS
from flask_restful import Api
from flask_swagger import swagger
from flask_swagger_ui import get_swaggerui_blueprint

from callrollapi import config
from callrollapi.services.mongodbService import db
from callrollapi.resources.login import Login
from callrollapi.resources.users import UsersByStatus, UserById, User
from callrollapi.resources.student import StudentById
from callrollapi.resources.teacher import TeacherById
from callrollapi.resources.admin import AdminById
from callrollapi.resources.courses import GetCoursesByEmail,GetCoursesofCurrentWeek,GetCoursesByWeek,GetAbsentStudents,GetNextCourseForStudent,GetNextCourseForteacher
from callrollapi.resources.courses import GetAbsenceByEmail,GetAbsenceByWeek,BePresent,GetListofstudentsByteacher,GetListofcoursesByteacher,GetListofAbsentStudentByTeacher
from callrollapi.resources.courses import GetAbsentStudentsByWeek,GetCoursesBymonth, Course, GetListofStudentByTeacherCourse



"""
    Config
"""
app = Flask(__name__)
api = Api(app)

if config.env == "DEVELOPMENT":
    conf = config.DevelopmentConfig
app.config.from_object(conf)
cors = CORS(app, resources={r"/*": {"origins": "*"}})

"""
    API Routes 
"""
api.add_resource(Login, '/login')
api.add_resource(UsersByStatus, '/users/<int:status>')
api.add_resource(UserById, '/user/<string:id>')
api.add_resource(User, '/user')
api.add_resource(StudentById, '/student/<string:id>')
api.add_resource(TeacherById, '/teacher/<string:id>')
api.add_resource(AdminById, '/admin/<string:id>')
api.add_resource(Course, '/course')
api.add_resource(GetCoursesByEmail, '/allCourses/<string:Email>')
api.add_resource(GetCoursesofCurrentWeek, '/CoursesofCurrentWeek/<string:Email>')
api.add_resource(GetCoursesByWeek, '/CoursesByWeek/<int:week>/<string:Email>')
api.add_resource(GetCoursesBymonth,'/CoursesBymonth/<int:month>/<string:Email>')
api.add_resource(GetAbsentStudents, '/AbsentStudents')
api.add_resource(GetAbsenceByEmail,'/AbsenceByEmail/<string:email>')
api.add_resource(GetAbsentStudentsByWeek, '/AbsentStudentsByWeek/<int:week>')
api.add_resource(GetAbsenceByWeek, '/AbsenceByWeek/<int:week>/<string:email>')
api.add_resource(BePresent, '/bePresent/<string:email>')
api.add_resource(GetListofstudentsByteacher, '/GetListofstudentsByteacher/<string:teacher>')
api.add_resource(GetListofcoursesByteacher, '/GetListofcoursesByteacher/<string:teacher>')
api.add_resource(GetListofAbsentStudentByTeacher, '/GetListofAbsentStudentByTeacher/<string:teacher>')
api.add_resource(GetNextCourseForStudent, '/GetNextCourseForStudent/<string:email>')
api.add_resource(GetNextCourseForteacher, '/GetNextCourseForteacher/<string:teacher>')
api.add_resource(GetListofStudentByTeacherCourse, '/GetListofStudentByTeacherCourse/<string:teacher>/<string:name>/<string:startDate>')

"""
    Swagger
"""
@app.route("/swagger")
def swaggerController():
    swag = swagger(app)
    swag['info']['version'] = config.APP_VERSION
    swag['info']['title'] = config.API_NAME
    return jsonify(swag)

swaggerui_blueprint = get_swaggerui_blueprint(
    conf.SWAGGER_URL,
    conf.DATA_SWAGGER,
    config = {
        'app_name': "Flask API"
    },
)
app.register_blueprint(swaggerui_blueprint, url_prefix = conf.SWAGGER_URL)