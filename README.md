diskanet readme

pip install httpie

pip install pipenv
pipenv --three
pipenv install flask
pipenv install flask-restplus flask-cors

pipenv run ipython
pipenv run flask run

export FLASK_APP=flask_app.py
export FLASK_ENV=development
flask run

http GET localhost:5000/my-api/4




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