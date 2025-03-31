from flask import jsonify, abort, make_response, request, url_for
from .app import app, db
from .models import Question, Questionnaire

@app.route('/quizz/api/v1/questionnaires', methods=['GET'])
def get_questionnaires():
    questionnaires = Questionnaire.query.all()
    return jsonify([q.to_json() for q in questionnaires])

@app.route('/quizz/api/v1/questionnaires/<int:idQaire>', methods=['GET'])
def get_questionnaire(idQaire):
    questionnaire = Questionnaire.query.get_or_404(idQaire)
    return jsonify(questionnaire.to_json())

@app.route('/quizz/api/v1/questionnaires/<int:idQaire>/questions', methods=['GET'])
def get_questions(idQaire):
    questionnaire = Questionnaire.query.get_or_404(idQaire)
    return jsonify([q.to_json() for q in questionnaire.questions])

@app.route('/quizz/api/v1/questionnaires/<int:idQaire>/questions/<int:idQion>', methods=['GET'])
def get_question(idQaire, idQion):
    question = Question.query.filter_by(id=idQion, questionnaire_id=idQaire).first_or_404()
    return jsonify(question.to_json())

@app.route('/quizz/api/v1/questionnaires', methods=['POST'])
def create_questionnaire():
    data = request.get_json()
    new_questionnaire = Questionnaire(name=data['name'])
    db.session.add(new_questionnaire)
    db.session.commit()
    return jsonify(new_questionnaire.to_json()), 201

@app.route('/quizz/api/v1/questionnaires/<int:idQaire>', methods=['PUT'])
def update_questionnaire(idQaire):
    questionnaire = Questionnaire.query.get_or_404(idQaire)
    data = request.get_json()
    questionnaire.name = data.get('name', questionnaire.name)
    db.session.commit()
    return jsonify(questionnaire.to_json())

@app.route('/quizz/api/v1/questionnaires/<int:idQaire>', methods=['DELETE'])
def delete_questionnaire(idQaire):
    questionnaire = Questionnaire.query.get_or_404(idQaire)
    db.session.delete(questionnaire)
    db.session.commit()
    return '', 204

@app.route('/quizz/api/v1/questionnaires/<int:idQaire>/questions', methods=['POST'])
def create_question(idQaire):
    data = request.get_json()
    new_question = Question(
        title=data['title'],                # ✅ On utilise 'title' ici
        questionType='',                    # Facultatif ou à supprimer si non utilisé
        questionnaire_id=idQaire
    )
    db.session.add(new_question)
    db.session.commit()
    return jsonify(new_question.to_json()), 201

@app.route('/quizz/api/v1/questionnaires/<int:idQaire>/questions/<int:idQion>', methods=['PUT'])
def update_question(idQaire, idQion):
    question = Question.query.filter_by(id=idQion, questionnaire_id=idQaire).first_or_404()
    data = request.get_json()
    question.title = data.get('title', question.title)   # ✅ Correction ici
    db.session.commit()
    return jsonify(question.to_json())

@app.route('/quizz/api/v1/questionnaires/<int:idQaire>/questions/<int:idQion>', methods=['DELETE'])
def delete_question(idQaire, idQion):
    question = Question.query.filter_by(id=idQion, questionnaire_id=idQaire).first_or_404()
    db.session.delete(question)
    db.session.commit()
    return '', 204

@app.errorhandler(404)
def not_found(error):
    return make_response(jsonify({'error': 'Not found'}), 404)

@app.errorhandler(400)
def bad_request(error):
    return make_response(jsonify({'error': 'Bad command'}), 400)
