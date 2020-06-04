from sqlalchemy import create_engine, Column, types, MetaData, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
meta = MetaData()
base_app = declarative_base(meta)

class User(base_app):
    __tablename__ = 'users'
    #UUID primary key for user
    user_id = Column(types.Integer, primary_key=True)
    #user name
    name = Column(types.String(length=25), nullable=False)
    
    password = Column(types.Text, nullable=False)
    account_age = Column(types.String(length=25), nullable=False)
    email = Column(types.String(length=25), nullable=False)

#create user credential table later

class Site(base_app):
    __tablename__ = 'sites'
    #UUID primary key for site
    site_id = Column(types.Integer, primary_key=True)
    #site name
    name = Column(types.String(length=50), nullable=False)
    #site's title
    title = Column(types.String(length=50), nullable=False)
    body = Column(types.Text(length=500), nullable=False)
    #owner of site
    owner = Column(types.String(length=25), nullable=False)
    #potential other fields
    title_font = Column(types.String)
    body_font = Column(types.String)
    body_font_size = Column(types.String)
    title_font_size = Column(types.String)
    background_color = Column(types.String)
    