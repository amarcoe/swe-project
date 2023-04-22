import os
from flask_sqlalchemy import SQLAlchemy
from flask_login import UserMixin
from werkzeug.security import check_password_hash


db = SQLAlchemy()


class Posts(db.Model):
    __tablename__ = "posts"
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), nullable=False, unique=False)
    # Will get from current_user
    brewer = db.Column(db.String(80), nullable=False, unique=False)
    # Will be input by user
    coarseness = db.Column(db.String(80), nullable=True, unique=False)
    # Will be chosen by user
    recipe = db.Column(db.ARRAY(db.String(200)))
    # Array entered by user
    roast_level = db.Column(db.String(80), nullable=False, unique=False)
    # Entered by user
    bookmarked = db.Column(db.ARRAY(db.String(80)))
    # Think it will be an array added to with each current_user
    post_date = db.Column(db.String(80), nullable=False, unique=False)
    # I'll just use datetime to pass this information in the backend


#     Author ID
# Roaster (optional)
# Brewer (required)
# Coarseness (optional)
# If coarseness, then what grinder did you use?
# Recipe Make it an array, each step is an index
# Roast Level
# List of users who have bookmarked it
# Date of post


class Users(db.Model, UserMixin):
    __tablename__ = "users"
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), nullable=False, unique=True)
    password = db.Column(db.String(200), nullable=False, unique=False)
    brewers = db.Column(db.ARRAY(db.String(80)), nullable=True, unique=False)
    grinder = db.Column(db.ARRAY(db.String(80)), nullable=True, unique=False)
    roaster = db.Column(db.String(100), nullable=True, unique=False)
    # bookmarked_recipes = db.Column(db.ARRAY(db.ForeignKey("posts.id")))
    # Need to get ForeignKey working, haven't looked into it much
    user_recipes = db.Column(db.ARRAY(db.String(10000)), nullable=True, unique=False)
    # Need to test this one

    #     Username
    # Password
    # Equipment (optional)
    # Favorite Roasters (top 3)
    # Bookmarked recipes
    # User Recipes

    def authenticate(username, password):
        user = Users.query.filter_by(username=username).first()
        print("I'm in authenticate")
        print(user.password)
        if user and check_password_hash(user.password, password):
            print(password)
            print("Let's fucking go")
            return user
        else:
            return None


def create_table(app):
    with app.app_context():
        db.create_all()
