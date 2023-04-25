import os
from flask_sqlalchemy import SQLAlchemy
from flask_login import UserMixin
from werkzeug.security import check_password_hash


db = SQLAlchemy()


class Posts(db.Model):
    __tablename__ = "posts"
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), nullable=False, unique=False)
    brewer = db.Column(db.String(80), nullable=False, unique=False)
    coarseness = db.Column(db.String(80), nullable=True, unique=False)
    recipe = db.Column(db.ARRAY(db.String(1000)), nullable=True, unique=False)
    roast_level = db.Column(db.String(80), nullable=False, unique=False)
    bookmarked = db.Column(db.ARRAY(db.String(80)))
    # Think it will be an array added to with each current_user
    post_date = db.Column(db.String(80), nullable=False, unique=False)
    # I'll just use datetime to pass this information in the backend
    rating = db.column(db.Integer(), nullable=False, unique=False)


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
    bookmarked_recipes = db.Column(db.ARRAY(db.Integer), nullable=True, unique=False)
    user_recipes = db.Column(db.ARRAY(db.Integer), nullable=True, unique=False)

    # user = Users.query.filter_by(username=username).first()
    # bookmarked_posts = Posts.query.filter(Posts.id.in_(user.bookmarked_recipes)).all()
    # user_posts = Posts.query.filter(Posts.id.in_(user.user_recipes)).all()
    # I'm not sure when bookmarked_recipes will be updated and I wrote when user_recipes will be
    # The lines above will query posts by what the recipes columns are storing

    def authenticate(username, password):
        user = Users.query.filter_by(username=username).first()
        if user and check_password_hash(user.password, password):
            return user
        else:
            return None


def create_table(app):
    with app.app_context():
        db.create_all()
