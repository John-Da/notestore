from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS


app = Flask(__name__)
CORS(app)

app.secret_key = 'you_will_never_know'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///notestore.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

from routes.user import user


app.register_blueprint(user, url_prefix='/user')

