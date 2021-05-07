"""
    Settings for the flask application object
"""

"""
    API description for swagger
"""
API_NAME = 'Flask API'
APP_VERSION = '1.0'

"""
    API key for jwt token
"""
API_KEY = 'CFRS2021'

"""
    Flask server URL
"""
API_URL = 'http://0.0.0.0:5001'

"""
    MongoDB connection URL
"""
CONNECTION_STRING = 'mongodb+srv://call-roll:PFE2021@cluster0.qb3g6.mongodb.net/call-roll-database?retryWrites=true&w=majority'

"""
    API development configuration with swagger
"""
env = 'DEVELOPMENT'
class BaseConfig():
    DEBUG = True

class DevelopmentConfig(BaseConfig):
    SWAGGER_URL ='/docs'
    DATA_SWAGGER = API_URL + '/swagger'