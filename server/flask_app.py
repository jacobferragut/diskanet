from flask import Flask, g
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.sql.expression import delete
from sqlalchemy import func

from .diskanet_orm import User as duser
from .diskanet_orm import Site as sites
from .auth_orm import Auth

from flask_restx import Resource, Api
import os
from .util import get_config
from datetime import datetime
app = Flask(__name__)
api = Api(app)
#routes before auth, no discover
@api.route('/user')
class Users(Resource):
    def post(self):
        '''Registers a new user'''
        #grabs fields to create user
        d = api.payload
        if d is None: return {'msg': 'No change submitted'}
        #need 
        #user_id, name, creation_date, email, email_confirmation

        user = duser() #creates new user object
        auth = Auth() #creates new authentication object
        
        #user_id supposed to be uuid but for now im just incrementing
        #max = int(g.db.execute("SELECT MAX(user_id) FROM users;")[0])
        #max = g.db.execute("SELECT * from users ORDER BY user_id DESC LIMIT 1").user_id
        max = g.db.query(duser).order_by(duser.user_id.desc()).first().user_id
        #user id is the same for user and auth table object
        user.user_id = auth.user_id = max+1
        #creation date creation
        user.creation_date = datetime.now()
        #list of required stuff
        required = ['name','email','password']
        
        reqNum = 0
        for k,v in d.items():
            #set email (email confirmation already defaults to false)
            if k=='email':
                setattr(user, k, v)
                reqNum+=1
            elif k=='name':
            #sets user.name = auth.user_name (fields have different requirements in different tables so maybe they are different??
                setattr(user, k, v)
                setattr(auth, 'user_name', v)
                reqNum+=1
            elif k=='password':
            #I think this creates the password in auth table correctly
                auth.pass_salt = 'the'
                #create password
                auth._set_hash(v)
                reqNum+=1
            #error when something else submitted
            else:
                return {'error': 'you need to submit email, name and password fields'}
        #reqNum counter makes sure all 3 are in payload ( I think I can change this later to check required == api.payload ?)
        if reqNum != len(required):
            return {'msg': 'ERROR: more fields required (you must submit email, name, password)'}
        
        
        #add user to db, commit it
        
        g.db.add(user)
        g.db.commit()
        
        #add auth to auth db & commit
        g.auth_db.add(auth)
        g.auth_db.commit()
        
        
        return {'msg': f'user: {user.name} successfully created (email unverified)'}

    def put(self):
        '''logs in an existing user'''
        #JWT AUTH LOGIN CREATION
        
        loggedIn = False
        #payload must have username password
        d = api.payload
        
        #error if they send something other than username and password
        if list(d.keys()).sort() != ['name','password'].sort(): return {'error':'username and password required' }
        
        #grab user
        auth = g.auth_db.execute(f"select * from auth where user_name='{d['name']}'").first()
        
        #make fake copy because I cant call function on db object
        fake = Auth(user_name=auth.user_name, pass_hash=auth.pass_hash, pass_salt=auth.pass_salt)
        
        #see if payload information matches grabbed user
        if fake._check_password(d['password']):
            return {'msg': f'user: {auth.user_name} successfully logged in'}
         
        
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
        #do user JWT authentication so users cant delete each other
        user = g.db.query(duser).get(user_id)
        name = user.name
        if user is None: return {'msg': 'No user found'}
        g.db.delete(user)
        g.db.commit()
        
        return {'msg': 'user: {name}'}

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
        
        
@api.route('/site/<int:user_id>/<int:site_id>')
class Site(Resource):
    def get(self, user_id, site_id):
        '''get a site's info'''
        #u = g.db.query(duser).get(user_id)
        #n = u.name
        #gets the site
        s = g.db.query(sites).get(site_id)
        #returns site name title and body
        return { s.name: {s.title: s.body} }
        
    def put(self, user_id, site_id):
        '''update a site's info'''
        #Use JWT authentication to verify user is logged in to post a site
        
        
        #grabs fields to create site
        d = api.payload
        if d is None: return {'msg': 'No change submitted'}
        
        #gets site
        site = g.db.query(sites).get(site_id)
                
        #first do required column entries...
        #and do allowed columns
        allowed = ['name','title','body','title_font','title_font_size','body_font','body_font_size','background_color','genre_music','genre_art','genre_film','genre_writing']
        #notAllowed = ['site_id','owner_id','owner']
        for k,v in d.items():
            if k in allowed:
                setattr(site, k, v)
            else:
                return {'msg': f'ERROR: you cannot change {k}'}
        
        #update and commit the changes
        #g.db.update(site)
        g.db.commit()
        
        
        return {'msg': f'site {site.name} has been updated'} 
        
        
    def delete(self,user_id, site_id):
        '''delete a user's site'''
        #jwt auth b4 del
        
        ret = g.db.query(sites).get(site_id)
        if ret is None: return {'error':'no site found'}
        g.db.delete(ret)
        g.db.commit()
        return {'msg':f'site:{ret.name} deleted'}

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
    #create auth_db
    if not hasattr(g, 'auth_db'):
        config = get_config(os.environ['FLASK_ENV'], open('server/config.yaml'))
        auth_db = create_engine(config['AUTH_DB'])
        g.auth_db = sessionmaker(auth_db)()
@app.teardown_request
def close_db(exception):
    '''close db connection'''
    if hasattr(g, 'db'):
        g.db.close()
        _ = g.pop('db')
    #close authentication db
    if hasattr(g, 'auth_db'):
        g.auth_db.close()
        _ = g.pop('auth_db')
