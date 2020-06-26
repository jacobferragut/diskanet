diskanet readme

pip install httpie

pip install pipenv
pipenv --three
pipenv install flask
pipenv install flask-restplus flask-cors

pipenv run ipython
pipenv run flask run

#run prepare_orm2
export FLASK_APP=server/prepare_orm2.py
export FLASK_ENV=dev_lite
pipenv run flask init-db
pipenv run flask init-auth

#run flask app
export FLASK_APP=server/flask_app.py
export FLASK_ENV=dev_lite
pipenv run flask run

http GET localhost:5000/my-api/4

npx -p @storybook/cli sb init
npm run storybook

http POST localhost:5000/user name="jacob" password="password" email="wwwww@letter.com"
export JWT="eyJ0eXAiO
http GET localhost:5000/user name="jacob" password="password"
"Authorization:Bearer $JWT"



session.query(Book).filter(Book.title == 'Sirens of Titan').one()

how to return only the pairs of combined records

Q = session.query(BirthYear, Book).filter(BirthYear.author = Book.author)
for birthyear,book in Q:
	print(birthyear.author, birthyear.birth_year, book.id, book.author, book.title,
		book.available)
		
p.127 - Chapter 9: api testing 
p.137 - Chapter 10: Database Integrity Testing --- foreign key and relationships
p.164 - Chapter 12: Design the Application
p.178 - Chapter 13: Build the Data Model

chapter 2, 3, and 4 then chapter 15
#front end commands 

brew install npm
npm install -g create-react-app

Windows
choco install nodejs.install
npm install -g create-react-app

ALL OS's
npx create-react-app react-diskanet

cd react-diskanet
npm start


For react component shortcuts: https://reactjsexample.com/tag/slider/

