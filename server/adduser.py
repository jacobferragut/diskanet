Session = sessionmaker(db)
session = Session()
def add_sample_data():
    name = input("name:")
    userid = int(input("id:"))
    password = input("password")
    email = input("email")
    email_confirmation = True

    session.add_all([
        User(user_id=userid, name=this.name, passwordHash=password, email=this.email, email_confirmation=True),
    ])
    session.commit()

if __name__ == '__main__':
    add_sample_data()
