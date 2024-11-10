from flask import Blueprint, jsonify, request
from models import UserData
from config import db


user = Blueprint("user", __name__)


@user.route("/user_profile", methods=["GET"])
def user_profile():
    userData = UserData.query.all()
    userDataList = list(map(lambda x: x.to_json(), userData))

    return jsonify({"user_profile": userDataList})


@user.route("/create_userprofile", methods=["POST"])
def create_userprofile():
    first_name = request.json.get("firstName")
    last_name = request.json.get("lastName")
    email = request.json.get("email")
    nick_name = request.json.get("nickName")
    bio = request.json.get("bio")
    profile_img = request.json.get("profileImg")

    if not first_name or not last_name or not email:
        return (
            jsonify({"messages": "You must enter First name, Last name, and email"}),
            400,
        )

    new_profile = UserData(
        first_name=first_name,
        last_name=last_name,
        email=email,
        nick_name=nick_name,
        bio=bio,
        profile_img=profile_img,
    )

    try:
        db.session.add(new_profile)
        db.session.commit()

    except Exception as e:
        return jsonify({"message": str(e)}), 400

    return jsonify({"message": f"{first_name}'s Profile has created!"}), 201


@user.route("/edit_profile/<int:user_id>", method=["PATCH"])
def edit_profile(user_id):
    userProfile = UserData.query.get(user_id)
    if not userProfile:
        return jsonify({"message": "User not found"}), 404

    data = request.json
    userProfile.first_name = data.get("firstName", userProfile.first_name)
    userProfile.last_name = data.get("lastName", userProfile.last_name)
    userProfile.email = data.get("email", userProfile.email)
    userProfile.nick_name = data.get("nickName", userProfile.nick_name)
    userProfile.bio = data.get("bio", userProfile.bio)
    userProfile.profile_img = data.get("profileImg", userProfile.profile_img)

    db.session.commit()

    return jsonify({"message": f"{userProfile.first_name}'s Profile updated!"}), 200


@user.route("/delete_profile/<int:user_id", method=["DELETE"])
def delete_user(user_id):
    userProfile = UserData.query.get(user_id)

    if not userProfile:
        return jsonify({"message": "User not found"}), 404

    db.session.delete(userProfile)
    db.session.commit()

    return jsonify({"message": "Account has been deleted!"}), 200
