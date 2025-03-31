import os.path
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask( __name__ )
cors = CORS(app, resources ={r"/quizz/api/v1/*":{"origins":"*"}})

def mkpath(p):
    return os.path.normpath(os.path.join(os.path.dirname(__file__),p))

app.config['SQLALCHEMY_DATABASE_URI'] = ('sqlite:///'+mkpath('../questionnaire.db'))
db = SQLAlchemy(app)