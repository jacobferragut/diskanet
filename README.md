diskanet readme

Install HTTPie, Flask, and friends using pip & pipenv

    pip install httpie    
    pip install pipenv
    pipenv --three
    pipenv install flask
    pipenv install flask-restplus flask-cors
    pipenv install ipython

Install react, use create-react-app, install axios & react-router-dom

    (todo)

Install Storybook

    npx -p @storybook/cli sb init
    npm run storybook
    
Run the IPython

    pipenv run ipython

Prepare the DBs and populate with filler values

    export FLASK_APP=server/prepare_orm2.py
    export FLASK_ENV=dev_lite
    pipenv run flask init-db
    pipenv run flask init-auth


Run Flask application after setting ENV variables; from diskanet dir

    export FLASK_APP=server/flask_app.py
    export FLASK_ENV=dev_lite
    pipenv run flask run

Test that it works

    http GET localhost:5000/my-api/4
    http POST localhost:5000/user name="jacob" password="password" email="wwwww@letter.com"
    export JWT="eyJ0eXAiO..."   # capture the response JWT field
    http GET localhost:5000/user name="jacob" password="password" "Authorization:Bearer $JWT"



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

npm install universal-cookie

APIURL changes
flask_app.py
app.js
register.js
