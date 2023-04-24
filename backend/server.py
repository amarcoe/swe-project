import os
import flask
import requests
import datetime
from database import create_table, Users, db, Posts
from flask_login import LoginManager, login_required, login_user, current_user
from werkzeug.security import generate_password_hash
from flask import request, make_response
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


@app.route("/login")
def handle_login():
    form_data = flask.request.form
    username = form_data["username"]
    password = form_data["password"]
    user = Users.authenticate(username, password)
    # Will take username and password from form_data and run them through authenticate
    if user:
        login_user(user)
        return "User authenticated and logged in"
    else:
        return "Information was incorrect"


@app.route("/signup", methods=["POST"])
def handle_signup():
    # Will get information from signup.jsx
    form_data = flask.request.form
    username = request.form["username"]
    print(form_data)
    hashed_password = generate_password_hash(form_data["password"])
    new_user = Users(
        username=form_data["username"],
        password=hashed_password,
        brewers=form_data["brewers"],
        grinder=form_data["grinder"],
        # roaster=form_data["roaster"],
    )
    db.session.add(new_user)
    db.session.commit()


@app.route("/post", method=["POST"])
def handle_post():
    form_data = flask.request.form
    new_post = Posts(
        username=form_data["username"],
        brewer=form_data["brewer"],
        coarseness=form_data["coarseness"],
        recipe=["Array given by form_data"],
        roast_level="Light",
        post_date=now,
    )
    db.session.add(new_post)
    db.session.commit()
    return "New post created"


@app.route("/update_user")
def handle_user_update():
    form_data = flask.request.form
    user = Users.query.get(request.form["username"])
    # Will be queried by username when I have actual form data
    if user:
        # Update the user's information
        user.username = user.username
        user.password = user.password
        user.brewers = user.brewers  # + ["Moka Pot"]
        user.grinder = user.brewers  # + ["Blade grinder"]
        # Above comments just show how to add to array
        user.roaster = "Palace"
        db.session.commit()
        db.session.refresh(user)
        flask.flash("User information updated!")
    else:
        return "Working on it"


@app.route("/update_post")
def handle_post_update():
    form_data = flask.request.form
    post = Posts.query.get(1)
    return "Working on it"


# if __name__ == "__main__":
#     app.run(debug=True)
