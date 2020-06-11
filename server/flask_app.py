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

import hashlib

from sqlalchemy import Column, types
from sqlalchemy.ext.declarative import declarative_base


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
        u = g.db.query(duser).get(user_id)
        if u is None:
            return {'msg': 'No user found'}
        return str({ff: getattr(u, ff) for ff in k })
        
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



base = declarative_base()

class Auth(base):
    '''
        user name: max str length = 80 and primary key
        pass_hash: md5 hash of user_name, salt, and 
        pass_salt: arbitrary string to harden  
    '''
    __tablename__ = 'auth'
    user_id = Column(types.String(length=38), primary_key=True)
    user_name = Column(types.String(length=80))
    pass_hash = Column(types.String(length=32))
    pass_salt = Column(types.String(length=40), default='')

    def _compute_hash(self, password):
        '''
            Hash user_name, pass_salt, and password
        '''
        return hashlib.md5((self.user_name + '|' + self.pass_salt + '|' +
               password).encode()).hexdigest()

    def _set_hash(self, password):
       '''
          given knowns: user_name and pass_salt (compute and store pass_hash)
          Used for new users. Does not commit.
       '''
       self.pass_hash = self._compute_hash(password)
    
    def _check_password(self, password):
        '''
            check if password agrees with pass_hash and pass_salt
        '''
        return self.pass_hash == self._compute_hash(password)




