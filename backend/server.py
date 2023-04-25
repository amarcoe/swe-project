import os
import flask
import requests
import datetime
from database import create_table, Users, db, Posts
from flask import request, make_response, jsonify
from datetime import datetime
from flask_login import LoginManager, login_required, login_user, current_user
from werkzeug.security import generate_password_hash
from flask_cors import CORS

app = flask.Flask(__name__)
CORS(app)
app.config["SECRET_KEY"] = os.getenv("secret_key")
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

@app.route("/get-current-user", methods=['GET'])
def get_current_user():
    userID = request.args['id']
    
    user_data = Users.query.get(userID)

    if user_data:
        user_dict = {
            "username": user_data.username,
            "grinders": user_data.grinder,
            "brewers": user_data.brewers,

        }
        res = make_response(jsonify(user_dict))
        res.status_code = 200
        return res
    else:
        res = make_response(jsonify({"message": "User not found"}))


#
@app.route("/login", methods=['POST'])
def handle_login():
    form_data = flask.request.form
    username = form_data["username"]
    password = form_data["password"]
    user = Users.authenticate(username, password)
    # Will take username and password from form_data and run them through authenticate
    if user:
        login_user(user)
        print(user.id)
        res = make_response(jsonify({"userID": user.id}))
        res.status_code = 200
        return res
    else:
        res = make_response({'message': "invalid credentials"})
        res.status_code = 403
        return res

@app.route("/post", methods=["POST"])
def handle_post():
    form_data = flask.request.form
    print(form_data)
    new_post = Posts(
        username=form_data["username"],
        brewer=form_data["brewer"],
        coarseness=form_data["coarseness"],
        recipe=form_data["recipe"],
        roast_level=form_data["roast"],
        bookmarked=[]
        post_date='01/01/2000',
    )
    db.session.add(new_post)
    db.session.commit()
    return "New post created"

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
