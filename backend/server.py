import os
import flask
import requests
from database import create_table, Users, db, Posts
from flask import request, make_response
from datetime import datetime
from flask_login import LoginManager, login_required, login_user, current_user
from werkzeug.security import generate_password_hash
from flask_cors import CORS

app = flask.Flask(__name__)
CORS(app)
app.secret_key = os.getenv("secret_key")
app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("DATABASE_URL")

login_manager = LoginManager()

db.init_app(app)
login_manager.init_app(app)


@login_manager.user_loader
def load_user(id):
    return Users.query.get(id)


create_table(app)


@app.route("/signup", methods=['POST'])
def signup():
    
    username = request.form['username']
    password = request.form['password']
    grinders = request.form['grinders']
    brewers = request.form['brewers']
   
    # With password I'll get it from form
    # Theoretically form_data = flask.requests.form
    #   Alternatively: username = request.form['username'] - JH
    # generate_password_hash(form_data[password])
    # Just a dummy password to test against, will drop table don't take off points
    hashed_password = generate_password_hash(password)
    new_user = Users(
        username= username,
        password=hashed_password,
        brewers=[brewers],
        grinder=[grinders],
    )
    print(new_user.username)

    db.session.add(new_user)
    db.session.commit()

    res = make_response({'message': "success"})
    res.status_code = 200
    return res
    # Test if character limit is per string or entire list
    # If it's under given amount type more and try to break it

@app.route("/login", methods=['POST'])
def login():
    username = request.form['username']
    password = request.form['password']

@app.route("/post", methods=["POST"])
def create_post():
    # data is being passed here correctly, we just need to have a user signed to give
    # the post object an author field with the user ID
    print(request.form)

@app.route("/update")
def update_user():
    Users.authenticate("dummy", "anything")
    # Proves salt/hash works
    user = Users.query.get(1)
    # Just grabbed a random one to make sure I know how to update
    if user:
        # Update the user's information
        user.username = user.username
        user.password = user.password
        user.brewers = user.brewers + ["Moka Pot"]
        user.grinder = user.brewers + ["Blade grinder"]
        user.roaster = "Palace"
        db.session.commit()
        db.session.refresh(user)
        flask.flash("User information updated!")
    else:
        print("Nothing")


app.run(debug=True)
