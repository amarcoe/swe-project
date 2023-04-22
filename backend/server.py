import os
import flask
import requests
from backend.database import create_table, Users, db, Posts
from datetime import datetime
from flask_login import LoginManager, login_required, login_user, current_user
from werkzeug.security import generate_password_hash

app = flask.Flask(__name__)
app.secret_key = os.getenv("secret_key")
app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("DATABASE_URL")

login_manager = LoginManager()

db.init_app(app)
login_manager.init_app(app)


@login_manager.user_loader
def load_user(id):
    return Users.query.get(id)


create_table(app)


@app.route("/signup")
def login():
    # With password I'll get it from form
    # Theoretically form_data = flask.requests.form
    #   Alternatively: username = request.form['username'] - JH
    # generate_password_hash(form_data[password])
    password = "anything"
    # Just a dummy password to test against, will drop table don't take off points
    hashed_password = generate_password_hash(password)
    new_user = Users(
        username="dummy",
        password=hashed_password,
        brewers=["Chemex", "Aeropress", "Clever"],
        grinder=["Baratza Encore, Fellow Ode"],
        roaster="Eiland",
    )
    db.session.add(new_user)
    db.session.commit()
    # Test if character limit is per string or entire list
    # If it's under given amount type more and try to break it


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
