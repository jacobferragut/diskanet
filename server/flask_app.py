from flask import Flask, g
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from .diskanet_orm import User, Site
from flask_restx import Resource, Api

app = Flask(__name__)
api = Api(app)

@api.route('/user')
class Users(Resource):
    def post(self):
        '''Registers a new user'''
        return ""
    def put(self):
        '''logs in an existing user'''
        return ""

@api.route('/user/<int:user_id>')
class User(Resource):
    def get(self,user_id):
        '''retreives user information'''
        return ""
    def put(self, user_id):
        '''update user's information'''
        return ""
    def delete(self, user_id):
        '''delete user's account'''
        return ""

@api.route('/site/<user_id>')
class Sites(Resource):
    def post(self):
        '''site creation'''
        return ''
    def get(self, user_id):
        '''get user's sites'''
        return ''
@api.route('/site/<user_id>/<site_id>')
class Site(Resource):
    def get(self, user_id, site_id):
        '''get a site's info'''
        return ''
    def put(self, user_id, site_id, title, body):
        '''update a site's info'''
        return ''
    def delete(self,user_id, site_id):
        '''delete a user's site'''
        return ''

@api.route('/discover')
class Discover(Resource):
    def post(self):
        '''use filter'''
        return ''
    def get(self):
        '''see discover results'''
        return ''

@api.before_request
def init_db():
    '''start db by creating global db_session'''
    if not hasattr(g, 'db'):
        db = create_engine(app.config['dev_lite'])
        g.db = sessionmaker(db)()
@app.teardown_request
def close_db(exception):
    '''close db connection'''
    if hasattr(g, 'db'):
        g.db.close()
        _ = g.pop('db')
