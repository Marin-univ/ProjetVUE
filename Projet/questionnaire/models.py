from .app import app,db
from flask import jsonify, abort, make_response, request, url_for

class Questionnaire(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))

    def __init__(self, name):
        self.name = name

    def __repr__(self):
        return f"<Questionnaire({self.id}) {self.name}>"

    def to_json(self):
        return {
            'id': self.id,
            'name': self.name,
            'uri': url_for('get_questionnaire', idQaire=self.id, _external=True)
        }

class Question(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(120))
    questionType = db.Column(db.String(120))
    questionnaire_id = db.Column(db.Integer, db.ForeignKey('questionnaire.id'))
    questionnaire = db.relationship("Questionnaire", backref=db.backref("questions", lazy="dynamic"))

    def __init__(self, title, questionType, questionnaire_id):
        self.title = title
        self.questionType = questionType
        self.questionnaire_id = questionnaire_id

    def __repr__(self):
        return f"<Question({self.id}) {self.title}>"

    def to_json(self):
        return {
            'id': self.id,
            'title': self.title,
            'questionType': self.questionType,
            'questionnaire_id': self.questionnaire_id,
            'uri': url_for('get_question', idQaire=self.questionnaire_id, idQion=self.id, _external=True),
            'questionnaire_uri': url_for('get_questionnaire', idQaire=self.questionnaire_id, _external=True)
        }

if __name__ == '__main__':
    app.run(debug=True)
