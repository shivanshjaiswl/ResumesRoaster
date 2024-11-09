import fitz
import openai
from flask import Flask, request, jsonify
import os
from dotenv import load_dotenv

app = Flask(__name__)
load_dotenv()

# Get the API key from environment variables
openai.api_key = os.getenv("OPENAI_API_KEY")
# Define a route for handling PDF uploads and roasting resumes
@app.route('/roast_resume', methods=['POST'])
def roast_resume():
    # Check if a file is uploaded
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400

    file = request.files['file']
    
    # Check if the file is valid
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400
    
    try:
        # Open the PDF using PyMuPDF (fitz)
        doc = fitz.open(file)
        resume_text = ""

        # Extract text from each page of the PDF
        for page in doc:
            resume_text += page.get_text()

        # Create the prompt for the OpenAI model
        prompt = f"Here is the resume: {resume_text}"

        # Call OpenAI API to roast the resume
        response = openai.chat_completions.create(
            model="gpt-4",
            messages=[
                {"role": "system", "content": "Roast this resume in 200 words, be very brutal, and demotivating. Do not hold back. Only send the roast nothing else."},
                {"role": "user", "content": prompt}
            ]
        )

        # Extract the roasted response from OpenAI API
        roast = response['choices'][0]['message']['content']

        # Return the roasted resume
        return jsonify({"roast": roast})

    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == '__main__':
    # Run the Flask app
    app.run(debug=True)
