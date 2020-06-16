import os
import csv
from datetime import datetime

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
import click
from flask import Flask

from .diskanet_orm import base_app, User, Site
from .auth_orm import base as base_auth
from .util import get_config

app = Flask(__name__)

@app.cli.command('init-auth')
def init_auth():
    config = get_config(os.environ['FLASK_ENV'], open('server/config.yaml'))
    db = create_engine(config['AUTH_DB'])
    base_auth.metadata.create_all(db)
    
#in p.81 the session is made in diskanet_orm.py and not here.
@app.cli.command('init-db')
def init_db():
    config = get_config(os.environ['FLASK_ENV'], open('server/config.yaml'))
    db = create_engine(config['DB'])
    base_app.metadata.create_all(db)
    
    Session = sessionmaker(db)
    session = Session()
    if session.query(User).count() == 0:
        data = []
        R = csv.reader(open('server/users.csv', encoding='utf8'))
        for row in R:
            data.append( User(
                user_id  = int(row[0]),
                name     = row[1],
                # password = row[2],
                # pass_salt= row[3],
                email    = row[4],
                email_confirmation = True,
                creation_date = datetime.now()
            ))

        print('Adding', len(data), 'rows to Usage table')
        session.add_all(data)
        session.commit()
        
    if session.query(Site).count() == 0:
        siteData = []
        ROWS = csv.reader(open('server/sites.csv', encoding='utf8'))
        for row in ROWS:
            siteData.append( Site(
                site_id = int(row[0]),
                name    = row[1],
                title   = row[2],
                body    = row[3],
                owner   = session.execute(f"select * from users where name={row[4]};").first(),
                owner_id = int(row[5]),
                title_font = row[6],
                body_font = row[7],
                body_font_size = int(row[8]),
                title_font_size = row[9],
                background_color = Column(types.String(length=25)),
                genre_music = Column(types.Boolean, default=False),
                genre_art = Column(types.Boolean, default=False),
                genre_film = Column(types.Boolean, default=False),
                genre_writing = Column(types.Boolean, default=False)
            ))
        session.add_all(siteData)
        session.commit()
