import os, random
from datetime import datetime
import hashlib

from flask import Flask, g, request, make_response
from flask_restx import Resource, Api
from flask_cors import CORS
import flask_jwt_extended as JWT

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.sql.expression import delete
from sqlalchemy import func
from sqlalchemy import Column, types
from sqlalchemy.ext.declarative import declarative_base
from werkzeug.utils import secure_filename

from .diskanet_orm import User
from .diskanet_orm import Site
from .diskanet_orm import Photo
from .auth_orm import Auth
from .util import get_config

app = Flask(__name__)
app.config.update(
    get_config(app.config['ENV'], app.open_resource('config.yaml'))
)
#CORS(app)
CORS(app, resources={r'/*': {'origins': '*'}})

api = Api(app, prefix="/api")
#api = Api(app)

print('App config:\n ', '\n  '.join([f'{k}: {v}' for k,v in sorted(app.config.items())]))

if 'JWT_SECRET_KEY' not in app.config:
    app.config['JWT_SECRET_KEY'] = 'very secret'

if 'JWT_ACCESS_TOKEN_EXPIRES' not in app.config:
    app.config['JWT_ACCESS_TOKEN_EXPIRES'] = 3600
    
jwt = JWT.JWTManager(app)

#routes before auth, no discover
@api.route('/user')
class UsersResource(Resource):
    def post(self):
        '''Registers a new user'''
        #grabs fields to create user
        d = api.payload
        if d is None: return {'msg': 'No change submitted'}
        #need 
        #user_id, name, creation_date, email, email_confirmation

        user = User() #creates new user object
        auth = Auth() #creates new authentication object
        
        #user_id supposed to be uuid but for now im just incrementing
        max = g.db.query(User).order_by(User.user_id.desc()).first().user_id
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
        
        
        return {
            'msg': f'user: {user.name} successfully created',
            'jwt': JWT.create_access_token(
                identity=user.user_id,
                user_claims={
                    'access':'user',
                    'name':user.name
                }
            )
        }

    def put(self):
        '''logs in an existing user'''
        #JWT AUTH LOGIN CREATION
        
        loggedIn = False
        #payload must have username password
        d = api.payload
        
        #error if they send something other than username and password
        if d['name'] is None or d['password'] is None: return { 'error':'username and password are required' }
      
        
        #grab user
        auth = g.auth_db.execute(f"select * from auth where user_name='{d['name']}'").first()
        
        #bad login
        if not auth:
            return {'msg': 'login failed, account doesnt exist', 'jwt':''}
        
        #make fake copy because I cant call function on db object
        fake = Auth(user_name=auth.user_name, pass_hash=auth.pass_hash, pass_salt=auth.pass_salt)
        
        #see if payload information matches grabbed user
        if fake._check_password(d['password']):
            return {
                'msg': f'user: {auth.user_name} successfully logged in',
                'jwt': JWT.create_access_token(
                    identity=auth.user_id,
                    user_claims={
                        'access':'user',
                        'name':auth.user_name
                    }
                ),
                'id': auth.user_id,
                'name': auth.user_name
            }
         
        
@api.route('/user/<int:user_id>')
class UserResource(Resource):
    def get(self,user_id):
        '''retreives user information'''
        #k = ['user_id','name','creation_date','email','email_confirmation']        
        u = g.db.query(User).get(user_id)
        if u is None:
            return {'msg': 'No user found'}
        return u._to_dict()
        #return str({ff: getattr(u, ff) for ff in k })
    
    @JWT.jwt_required
    def put(self, user_id):
        '''update user's information'''
            
        #gets user changes
        d = api.payload
        if d is None: return {'msg': 'No change submitted'}
        
        #grabs user from database
        user = g.db.query(User).get(user_id)
        if user is None:
            return {'msg': 'No user found'}
            
        #user must be logged (to change their info)
        if int(JWT.get_jwt_identity()) != user_id:# or JWT.get_jwt_claims()['access'] != 'mod':
            return {'msg': f'You are not authorized to edit user: {user.name}'}
        
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
        
    @JWT.jwt_required
    def delete(self, user_id):
        '''delete user's account'''
        #get user
        user = g.db.query(User).get(user_id)
        auth = g.auth_db.query(Auth).get(user_id)
        #see if user is found
        if user is None: return {'msg': 'No user found with that user_id'}
        name = user.name
        #check authentication
        if int(JWT.get_jwt_identity()) != user_id:
            return {'msg': f'You are not authorized to delete user: {name}'}
        #delete user and submit changes
        g.db.delete(user)
        g.auth_db.delete(auth)
        g.db.commit()
        g.auth_db.commit()
        return {'msg': f'user {name} deleted'}

@api.route('/sites/<int:user_id>')
class SitesResource(Resource):
    @JWT.jwt_required 
    def post(self, user_id):
        '''site creation'''
        #Use JWT authentication to verify user is logged in to post a site
        if int(JWT.get_jwt_identity()) != int(user_id):# or JWT.get_jwt_claims()['access'] != 'mod':
            return {'msg': f'You are not authorized to create site'}
        
        #grabs fields to create site
        d = api.payload
        if d is None: return {'msg': 'No change submitted'}
        #need 
        #site_id, name, title, body, owner_id (needs owner in the future)
        
        ###########
        site = Site()
        ##############
                
        #first do required column entries...
        #and do allowed columns
        allowed = ['title_font','title_font_size','body_font','body_font_size',
                   'background_color','genre_music','genre_art','genre_film',
                   'genre_writing']
        required = ['title','body']
        reqNum = 0
        for k,v in d.items():
            if k in required:
                setattr(site, k, v)
                reqNum += 1
            elif k in allowed:
                setattr(site, k, v)
        if reqNum != len(required):
            return {'msg': 'ERROR: more fields required'}


        #inc site id
        max = g.db.query(Site).order_by(Site.site_id.desc()).first()
        #print(max.site_id)
        if max is None:
            site.site_id = 1
        else:
            site.site_id = max.site_id + 1
        
        # EMF: probably leave out setting site.owner
        #user id of who owns the site
        site.owner = g.db.query(User).get(user_id)#use JWT authentication to get user creating the site
        site.owner_id = user_id
        site.name = site.owner.name
        
        #commit the changes
        g.db.add(site)
        g.db.commit()

        # now return all the sies
        s = g.db.query(Site).filter(Site.owner_id==user_id).all()
        return {ss.site_id: ss._to_dict() for ss in s}
        
        
    def get(self, user_id):
        '''get user's sites'''
        #executes raw sql to grab user's sites 
        s = g.db.query(Site).filter(Site.owner_id==user_id).all()
        return {ss.site_id: ss._to_dict() for ss in s}
        

        
@api.route('/site/<int:site_id>')
class SiteResource(Resource):
    def get(self, site_id):
        '''get a site's info'''
        #u = g.db.query(User).get(user_id)
        #n = u.name
        #gets the site
        s = g.db.query(Site).get(site_id)
        #returns site name title and body
        #return { s.name: {s.title: s.body} }
        return {s.site_id: s._to_dict()}
        
    @JWT.jwt_required
    def put(self, user_id, site_id):
        '''update a site's info'''
        #Use JWT authentication to verify user is logged in to post a site
        if int(JWT.get_jwt_identity()) != int(user_id):# or JWT.get_jwt_claims()['access'] != 'mod':
            return {'msg': f'You are not authorized to edit site'}
        
        #grabs fields to create site
        d = api.payload
        if d is None: return {'msg': 'No change submitted'}
        
        #gets site
        site = g.db.query(Site).get(site_id)
                
        #first do required column entries...
        #and do allowed columns
        allowed = ['name','title','body','title_font','title_font_size','body_font','body_font_size','background_color','genre_music','genre_art','genre_film','genre_writing']
        #notAllowed = ['site_id','owner_id','owner']
        for k,v in d.items():
            if k in allowed:
                setattr(site, k, v)
                if v == 'True' and k[0] == 'g':
                    setattr(site,k,True)
            else:
                return {'msg': f'ERROR: you cannot change {k}'}
        
        #update and commit the changes
        #g.db.update(site)
        g.db.commit()
        
        
        return {'msg': f'site {site.name} has been updated'} 
        
    @JWT.jwt_required
    def delete(self, site_id):
        '''delete a user's site'''
        #jwt auth b4 del
        ret = g.db.query(Site).get(site_id)
        if ret is None: return {'error':'no site found'}
        
        
        if int(JWT.get_jwt_identity()) != int(ret.owner_id):# or JWT.get_jwt_claims()['access'] != 'mod':
            return {'msg': f'You are not authorized to delete site'}
        
        g.db.delete(ret)
        g.db.commit()
        return {'msg':f'site:{ret.name} deleted'}

@api.route('/discover')
class DiscoverResource(Resource):
    def post(self):
        '''use filter'''
        filterArgs = api.payload
        
        #delete empty genres for may contains
        [filterArgs.pop(key)
         for key in list(filterArgs) if filterArgs[key]=="" or filterArgs[key]=={}]
        
        #if no filter submitted then use get
        if filterArgs is None: return self.get()

        #genres art,film,music,writing
        keys = ['genre_music', 'genre_writing', 'genre_film', 'genre_art']        

        query = g.db.query(Site)
        for key in keys:
            if key in filterArgs:
                query = query.filter(getattr(Site, key) == filterArgs[key])
        rows = query.all()
        
        limit=10
        #grab 10 random sites
        if rows:
            rows = random.sample(rows, limit)
        
        
        
        return {row.site_id: row._to_dict() for row in rows}
        
    
    def get(self):
        '''see discover (unfiltered) results'''
        results = {}
        
        for row in g.db.execute('select * from sites limit 20;'):
            temp = dict(row)
            temp.pop('_sa_instance_state', None)
            results[temp['site_id']] = temp
        
        return results

# Create a directory in a known location to save files to.
uploads_dir = os.path.join(app.instance_path, 'uploads')

# we're using a FLASK route rather than a resource (to avoid request mangling)
@app.route('/api/photo', methods=['POST'])
def photo():
    file = request.files['file']
    #doesnt work
    user_id = request.form.get('user_id')

    photo = Photo(photo=file.read(),photo_id=user_id)
    
    #print(photo.photo)
    g.db.add(photo)
    g.db.commit()
    print(user_id)
    # user = g.db.query(User).get(user_id)   # what's the user id? put in payload?
    # user.photo_id = photo.photo_id         # User table needs photo_id column
    # g.db.add(user)
    # g.db.commit()
    return "done"


@app.route('/api/photo/<int:photo_id>', methods=['GET'])
def photoget(photo_id):
    the_photo = g.db.query(Photo).get(photo_id).photo
    response = make_response(the_photo)
    response.headers.set('Content-Type', 'image/jpeg')
    #response.headers.set(
    #    'Content-Disposition', 'attachment', filename='name.jpg')
    return response


@app.before_request
def init_db():
    '''start db by creating global db_session'''
    if not hasattr(g, 'db'):
        config = get_config(os.environ['FLASK_ENV'],
                            open('server/config.yaml'))
        db = create_engine(config['DB'])
        g.db = sessionmaker(db)()
    # create auth_db
    if not hasattr(g, 'auth_db'):
        config = get_config(os.environ['FLASK_ENV'],
                            open('server/config.yaml'))
        auth_db = create_engine(config['AUTH_DB'])
        g.auth_db = sessionmaker(auth_db)()
        
@app.teardown_request
def close_db(exception):
    '''close db connection'''
    # close db
    if hasattr(g, 'db'):
        g.db.close()
        _ = g.pop('db')

    # close authentication db
    if hasattr(g, 'auth_db'):
        g.auth_db.close()
        _ = g.pop('auth_db')
