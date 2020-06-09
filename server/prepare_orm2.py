import os
import csv
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from .diskanet_orm import base_app, User, Site
#from .auth_orm import base as base_auth
from .util import get_config

import click
from flask import Flask
from datetime import datetime
app = Flask(__name__)

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
            if len(row[4]) <= 500:
                data.append( User(
                    user_id  = int(row[0]),
                    name     = row[1],
                    password = row[2],
                    pass_salt= row[3],
                    email    = row[4],
                    email_confirmation = True,
                    creation_date = datetime.now()
                ))

        print('Adding', len(data), 'rows to Usage table')
        session.add_all(data)
        session.commit()

    if session.query(Site).count() <= 100:
        siteData = []
        ROWS = csv.reader(open('server/sites.csv', encoding='utf8'))
        for row in ROWS:
            siteData.append( Site(
                site_id = int(row[0]),
                name    = row[1],
                title   = row[2],
                body    = row[3],
                #owner   = row[4],
                owner_id = int(row[5]),
                title_font = row[6],
                body_font = row[7],
                body_font_size = int(row[8]),
                title_font_size = row[9]
            ))
        session.add_all(siteData)
        session.commit()
