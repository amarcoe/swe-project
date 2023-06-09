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
    bookmarked = db.Column(db.ARRAY(db.String(80)), nullable=True, unique=False)
    post_date = db.Column(db.String(80), nullable=False, unique=False)
    rating = db.Column(db.Integer, nullable=False, unique=False)


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

    def authenticate(username, password):
        user = Users.query.filter_by(username=username).first()
        if user and check_password_hash(user.password, password):
            return user
        else:
            return None


def create_table(app):
    with app.app_context():
        db.create_all()
