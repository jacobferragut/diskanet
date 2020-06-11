from flask import Flask, g
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.sql.expression import delete

from .diskanet_orm import User as duser
from .diskanet_orm import Site as sites
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
        u = g.db.query(duser).get(user_id)
        if u is None:
            return {'msg': 'No user found'}
        return str({ff: getattr(u, ff) for ff in k })
        
    def put(self, user_id):
        '''update user's information'''
        #gets user changes
        d = api.payload
        if d is None: return {'msg': 'No change submitted'}
        
        #grabs user from database
        user = g.db.query(duser).get(user_id)
        if user is None:
            return {'msg': 'No user found'}
            
        #users can only change:
        #name, email
        allowed = ['name','email']
        numchanged = 0
        #for each change for user
        for k,v in d.items():
            if k in allowed:
                setattr(user, k, v)
                numchanged+=1
        ##
        if 'email' in d:
            user.email_confirmation = False
        #commit the changes
        if numchanged == 0:
            return {'msg': 'you cant change those fields'}
        g.db.commit()
        
        #returns changes
        return str({ff: getattr(user, ff) for ff in d })
        
        
    def delete(self, user_id):
        '''delete user's account'''
        user = g.db.query(duser).get(user_id)
        if user is None: return {'msg': 'No user found'}
        g.db.delete(user)
        g.db.commit()
        
        return "deleted user:"

@api.route('/site/<int:user_id>')
class Sites(Resource):
    def post(self, user_id):
        '''site creation'''
        #Use JWT authentication to verify user is logged in to post a site
        
        
        #grabs fields to create site
        d = api.payload
        if d is None: return {'msg': 'No change submitted'}
        #need 
        #site_id, name, title, body, owner_id (needs owner in the future)
        
        ###########
        site = sites()
        ##############
        
        #are we making site_id UUID or not??? For now im assuming we arent    
        
        #first do required column entries...
        #and do allowed columns
        allowed = ['title_font','title_font_size','body_font','body_font_size','background_color','genre_music','genre_art','genre_film','genre_writing']
        required = ['site_id','name','title','body','owner_id']
        reqNum = 0
        for k,v in d.items():
            if k in required:
                setattr(site, k, v)
                reqNum += 1
            elif k in allowed:
                setattr(site, k, v)
        if reqNum != len(required):
            return {'msg': 'ERROR: more fields required'}
        
        #user id of who owns the site
        site.owner = g.db.query(duser).get(user_id)#use JWT authentication to get user creating the site
        #commit the changes
        g.db.add(site)
        g.db.commit()
        
        
        return 'site created'#add function later to return dict
        
        
    def get(self, user_id):
        '''get user's sites'''
        #executes raw sql to grab user's sites 
        s = g.db.execute(f'select * from sites where owner_id={user_id}')
        return {ss.name: {ss.title:ss.body} for ss in s}
        
        
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
