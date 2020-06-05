from diskanet_orm import User
import sqlalchemy
from sqlalchemy.orm import sessionmaker
from datetime import datetime

db = "sqlite:///diskanet.db"

Session = sessionmaker(sqlalchemy.create_engine(db))
session = Session()
def add_sample_data():
 #   name = input("name:")
 #   userid = int(input("id:"))
 #   password = input("password")
 #   email = input("email")

    session.add_all([
#        User(user_id=userid, name=name, password=password, email=email, email_confirmation=True),
        User(user_id=123456, name="nathanf", password="pass", email="email", email_confirmation=True,pass_salt = "passsalt", creation_date=datetime.now()),
    ])
    session.commit()

if __name__ == '__main__':
    add_sample_data()
