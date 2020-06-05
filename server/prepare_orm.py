import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from .diskanet_orm import base_app
from .util import get_config

import click
from flask import Flask

app = Flask(__name__)

@app.cli.command('init-db')
def init_db():
    config = get_config(os.environ['FLASK_ENV'], open('server/config.yaml'))
    db = create_engine(config['DB'])
    base_app.metadata.create_all(db)
