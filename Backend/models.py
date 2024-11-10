from config import db


class UserData(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(80), nullable=False, unique=False)
    last_name = db.Column(db.String(80), nullable=False, unique=False)
    email = db.Column(db.String(80), nullable=False, unique=True)
    nick_name = db.Column(db.String(100))
    bio = db.Column(db.String(100))
    profile_img = db.Column(db.String(2000))

    def to_json(self):
        return {
            "id": self.id,
            "firstName": self.first_name,
            "lastName": self.last_name,
            "email": self.email,
            "nickName": self.nick_name,
            "bio": self.bio,
            "profileImg": self.profile_img,
        }
