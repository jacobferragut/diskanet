from flask import Flask, g
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from .diskanet_orm import User as duser
from .diskanet_orm import Site
from flask_restx import Resource, Api
import os
from .util import get_config
from datetime import datetime
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
        k = ['user_id','name','password','creation_date','email','pass_salt','email_confirmation']
        u = g.db.query(duser).filter(duser.user_id == user_id).one()
        return str({ff: getattr(u, ff) for ff in k })
        
    def put(self, user_id):
        '''update user's information'''
        
        #gets user changes
        d = api.payload
        
        #grabs user from database
        user = g.db.query(duser).filter(duser.user_id == user_id)
        
        #for each change for user
        for k,v in d.items():
            setattr(user, k, v)
            
        #commit the changes
        g.db.commit()
        
        #returns changes
        return g.db.query(duser).get(user_id)
        
        
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

@app.before_request
def init_db():
    '''start db by creating global db_session'''
    if not hasattr(g, 'db'):
        config = get_config(os.environ['FLASK_ENV'], open('server/config.yaml'))
        db = create_engine(config['DB'])
        g.db = sessionmaker(db)()
@app.teardown_request
def close_db(exception):
    '''close db connection'''
    if hasattr(g, 'db'):
        g.db.close()
        _ = g.pop('db')
