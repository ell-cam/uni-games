from flask import Blueprint, jsonify, request
from database import conn

trivia_api = Blueprint('trivia_api', __name__)

@trivia_api.route('/api/questions/random', methods=['GET'])
def get_random_question():
    category = request.args.get('category')

    cur = conn.cursor()
    query = f"SELECT * FROM questions WHERE category = '{category}' ORDER BY RANDOM() LIMIT 1;"
    cur.execute(query)
    question = cur.fetchone()

    if question:
        question_text = question[2]
        cur.execute(f"SELECT option_text FROM options WHERE question_id = {question[0]};")
        options = [row[0] for row in cur.fetchall()]
        return jsonify({"question": question_text, "options": options})

    return jsonify({"error": "No questions found for this category."})

@trivia_api.route('/api/questions', methods=['GET'])
def get_questions():
    cur = conn.cursor()
    cur.execute("SELECT * FROM questions;")
    questions = cur.fetchall()
    return jsonify(questions)

@trivia_api.route('/api/questions', methods=['POST'])
def create_question():
    question_text = request.json['question']
    category = request.json['category']
    options = request.json['options']

    cur = conn.cursor()
    cur.execute(f"INSERT INTO questions (category, question_text) VALUES ('{category}', '{question_text}') RETURNING id;")
    question_id = cur.fetchone()[0]

    for option in options:
        cur.execute(f"INSERT INTO options (question_id, option_text) VALUES ({question_id}, '{option}');")

    conn.commit()
    return jsonify({"success": True})

@trivia_api.route('/api/questions/<category>', methods=['GET'])
def get_questions_by_category(category):
    cur = conn.cursor()
    cur.execute(f"SELECT * FROM questions WHERE category = '{category}';")
    questions = cur.fetchall()
    return jsonify(questions)

@trivia_api.route('/api/questions/import', methods=['POST'])
def import_questions():
    questions = request.json['questions']

    cur = conn.cursor()
    for question in questions:
        question_text = question['question']
        category = question['category']
        options = question['options']

        cur.execute(f"INSERT INTO questions (category, question_text) VALUES ('{category}', '{question_text}') RETURNING id;")
        question_id = cur.fetchone()[0]

        for option in options:
            cur.execute(f"INSERT INTO options (question_id, option_text) VALUES ({question_id}, '{option}');")

    conn.commit()
    return jsonify({"success": True})



@trivia_api.teardown_request
def close_db_connection(exception):
    conn.close()