import os
from crypt import methods
import random

from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.utils import secure_filename

from gmail import company_roast, all_roast
from gmail import search_job_emails
from gmail import resume_roast

app = Flask(__name__)
CORS(app)
token_id = ""


@app.route('/token_id', methods=['POST'])
def get_token_id():
    global token_id
    data = request.get_json()
    if 'token' in data:
        token_id = data['token']
        search_job_emails(token_id)
        # Save the token to a file
        with open('token_id.txt', 'w') as file:
            file.write(token_id)
        return jsonify({"message": "Token received", "token_id": token_id}), 201
    else:
        return jsonify({"error": "Token not provided"}), 400


@app.route('/upload_pdf', methods=['POST'])
def upload_pdf():
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    if file and file.filename.lower().endswith('.pdf'):
        filename = secure_filename(file.filename)
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(filepath)
        return jsonify({"message": "File uploaded successfully", "filename": filename}), 201
    else:
        return jsonify({"error": "Invalid file type. Only PDF files are allowed."}), 400

@app.route('/get_company', methods=['GET'])
def send_one_company():
    try:
        with open('companies.txt', 'r') as file:
            companies = file.readlines()
        companies = [company.strip() for company in companies if company.strip()]
        if companies:
            selected_company = random.choice(companies)
            roast = company_roast(selected_company)
            return jsonify({"company": selected_company,"roast":roast,"count":len(companies)})
        else:
            return jsonify({"error": "No companies found in the file"}), 404
    except FileNotFoundError:
        return jsonify({"error": "File not found"}), 404

@app.route('/resume_roast', methods=['GET'])
def roast_resume():
    roast = resume_roast()
    return jsonify({"roast":roast})

@app.route('/final_roast',methods=['GET'])
def final_roast():
    roast = all_roast()
    return jsonify({"roast": roast})

if __name__ == '__main__':
    app.run(debug=True)
