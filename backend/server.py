import os
import flask
import requests
import json
import datetime
from backend.database import create_table, Users, db, Posts
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


@app.route("/signup", methods=["POST"])
def signup():
    username = request.form["username"]
    password = request.form["password"]
    grinders = request.form["grinders"]
    brewers = request.form["brewers"]

    hashed_password = generate_password_hash(password)
    brewer_list = brewers.split(",")
    grinder_list = grinders.split(",")

    new_user = Users(
        username=username,
        password=hashed_password,
        brewers=brewer_list,
        grinder=grinder_list,
    )
    print(new_user.username)

    db.session.add(new_user)
    db.session.commit()

    res = make_response({"message": "success"})
    res.status_code = 200
    return res


@app.route("/get-current-user", methods=["GET"])
@login_required
def get_current_user():
    user_name = request.args["username"]

    user_data = Users.query.filter_by(username=user_name).first()
    posts = Posts.query.filter(Posts.username == user_name).all()
    print(posts)
    if user_data:
        posts_list = []
        for post in posts:
            post_dict = {
                "id": post.id,
                "username": post.username,
                "coarseness": post.coarseness,
                "brewer": post.brewer,
                "roast": post.roast_level,
                "rating": post.rating,
                "recipe": post.recipe,
                "rating": post.rating,
                "bookmarked": post.bookmarked,
                "post_date": post.post_date,
            }
            posts_list.append(post_dict)

        user_dict = {
            "username": user_data.username,
            "grinders": user_data.grinder,
            "brewers": user_data.brewers,
            "id": user_data.id,
            "user_posts": posts_list,
        }
        res = make_response(jsonify(user_dict))
        res.status_code = 200
        return res
    else:
        res = make_response(jsonify({"message": "User not found"}))


@app.route("/login", methods=["POST"])
def handle_login():
    form_data = flask.request.form
    username = form_data["username"]
    password = form_data["password"]
    user = Users.authenticate(username, password)
    # Will take username and password from form_data and run them through authenticate
    if user:
        login_user(user)
        res = make_response(jsonify({"username": user.username}))
        res.status_code = 200
        return res
    else:
        res = make_response({"message": "invalid credentials"})
        res.status_code = 403
        return res


@app.route("/get-posts", methods=["GET"])
@login_required
def get_posts():
    all_posts = Posts.query.all()
    posts_list = []
    for post in all_posts:
        post_dict = {
            "id": post.id,
            "username": post.username,
            "coarseness": post.coarseness,
            "brewer": post.brewer,
            "roast": post.roast_level,
            "rating": post.rating,
            "recipe": post.recipe,
            "rating": post.rating,
            "bookmarked": post.bookmarked,
            "post_date": post.post_date,
        }
        posts_list.append(post_dict)
    return posts_list


@app.route("/update-bookmark", methods=["PUT"])
@login_required
def handle_bookmarks():
    try:
        data = request.get_json()  # get the JSON data from the request body
        pid = data.get("pid")  # get the pid value from the JSON data
        user = data.get("user")  # get the uid value from the JSON data
        post = Posts.query.filter(Posts.id == pid).first()
        print(post.bookmarked)

        print(user not in post.bookmarked)
        if user not in post.bookmarked:
            post.bookmarked = post.bookmarked + [user]
        book_array = post.bookmarked
        print(user not in book_array)
        if user not in book_array:
            book_array = book_array + [user]

        else:
            book_array.remove(user)
        print(book_array)
        res = make_response(jsonify({"bookmarked": book_array}))

        db.session.commit()
       
        

        # res = make_response(jsonify({"bookmarked": post.bookmarked}))
        return res
    except:
        return jsonify({"message": "Invalid JSON data in request."}), 400


@app.route("/post", methods=["POST"])
@login_required
def handle_post():
    form_data = flask.request.form
    now = datetime.now()

    recipe_list = form_data["recipe"].split(",")
    new_post = Posts(
        username=form_data["username"],
        brewer=form_data["brewer"],
        coarseness=form_data["coarseness"],
        recipe=recipe_list,
        roast_level=form_data["roast"],
        bookmarked=[],
        post_date=now,
        rating=form_data["rating"],
    )
    print(type(new_post.recipe))
    db.session.add(new_post)
    db.session.commit()

    res = make_response({"Message:": "Post successful"})
    return res


# app.run(debug=True)
