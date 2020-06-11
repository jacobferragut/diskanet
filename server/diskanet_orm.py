from sqlalchemy import create_engine, Column, types, MetaData, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
meta = MetaData()
base_app = declarative_base(meta)

class User(base_app):
    __tablename__ = 'users'
    #UUID primary key for user
    user_id = Column(types.Integer, primary_key=True)
    #user name
    name = Column(types.String(length=25), nullable=False)
     
    # password = Column(types.Text, nullable=False)
    # pass_salt = Column(types.String(length=50), nullable=False)
    creation_date = Column(types.DateTime(timezone=True), default=func.now(), nullable=False)
    email = Column(types.String(length=25), nullable=False)
    email_confirmation = Column(types.Boolean, nullable=False, default=False)
    #sites relationship with owner (user owner owns sites)
    sites = relationship("Site", back_populates="owner")
    #site is for members of a site (user is member of site)
    #implement later with association table
    #site = relationship("Site", back_populates="members")
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
    owner = relationship("User", back_populates="sites")
    #user id of who owns the site
    owner_id = Column(types.Integer, ForeignKey('users.user_id'), nullable=False)
    #other members of the site (implement later)
    # members = relationship("User", back_populates="site")
    #potential other fields
    title_font = Column(types.String(length=25))
    body_font = Column(types.String(length=25))
    body_font_size = Column(types.Integer)
    title_font_size = Column(types.Integer)
    background_color = Column(types.String(length=25))
    genre_music = Column(types.Boolean, default=False)
    genre_art = Column(types.Boolean, default=False)
    genre_film = Column(types.Boolean, default=False)
    genre_writing = Column(types.Boolean, default=False)
