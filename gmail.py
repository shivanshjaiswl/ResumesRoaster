import google.auth.transport.requests
from google.oauth2.credentials import Credentials
from googleapiclient.discovery import build
from openai import OpenAI
import json
from PyPDF2 import PdfReader


client = OpenAI(api_key="")
def search_job_emails(access_token):
    # Use the provided access token to create credentials
    creds = Credentials(token=access_token)

    # Connect to the Gmail API
    service = build('gmail', 'v1', credentials=creds)

    # Search for emails related to jobs using Gmail API
    query = 'subject:job OR subject:career OR subject:application after:1699574400'
    results = service.users().messages().list(userId='me', q=query).execute()
    messages = results.get('messages', [])

    message_snippets = []
    if not messages:
        print('No job-related messages found.')
    else:
        print('Job-related messages:')
        for message in messages:
            msg = service.users().messages().get(userId='me', id=message['id']).execute()
            message_snippets.append(msg['snippet'])

    if len(message_snippets)!=0:
        combined_prompt = """Analyze the following emails and determine if each is an update regarding a job application. It strictly has to be a job application rejection, accepted or waitlist to job applications. No credit card applications or any other promotions, it has to be a career application. Respond with 'Yes' if an email is an update, otherwise respond 'No'."""

        for i, snippet in enumerate(message_snippets):
            combined_prompt += f"Email{i+1}: {snippet}"
        response = client.chat.completions.create(
            model='gpt-4o-mini',
            messages=[{
                "role":"system",
                "content":combined_prompt
            }],
            response_format={
                "type":"json_schema",
                "json_schema":{
                    "name":"email_schema",
                    "schema": {
                        "type": "object",
                        "properties": {
                            "emails": {
                                "jobEmails": "list of emails numbers that are job application updates, strictly has to be numbers seperated with commas and nothing else",
                                "type": "string"
                            },
                            "additionalProperties": False
                        }
                    }
                }
            }
        )

        jobs_applied = 0

        result = (json.loads(response.choices[0].message.content))
        final_messages = []
        if result.get('jobEmails'):
            # print("This person applied to jobs")

            result = result.get('jobEmails')
            index = result.split(',')


            for i in index:
                # print(i)
                final_messages.append(message_snippets[int(i)-1])


            print(final_messages)
        else:
            with open('companies.txt', 'w') as file:
                file.write('')
            return

        company_prompt = "For the following job emails, give me a list of companies that the person got rejected from, just the company names seperated with commas\n\n"
        for message in final_messages:
            company_prompt += f"{message}\n\n"

        company_response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                # {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": company_prompt}
            ]
        )

        company_names = company_response.choices[0].message.content.strip().split(",")
        # print("company names are")
        # print(company_names)

        # Save company names to companies.txt
        with open('companies.txt', 'w') as file:
            for company in company_names:
                if company.strip():
                    file.write(company.strip() + '\n')





def company_roast(company_name):
    roast_prompt = f"The person got rejected by a this company called {company_name} and roast him in a fun offensive way and only one roast"
    roast_response = client.chat.completions.create(
        model="gpt-4",
        messages=[
            # {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": roast_prompt}
        ]
    )

    roast = roast_response.choices[0].message.content
    print(roast)
    return roast


def resume_roast():
    try:
        # Open and read the PDF file
        reader = PdfReader("UPLOAD_FOLDER/resume.pdf")
        text_content = ""

        # Iterate through all the pages and extract text
        for page in reader.pages:
            text_content += page.extract_text() + "\n"
        with open("extracted_resume.txt", "w", encoding="utf-8") as file:
            file.write(text_content)
    except FileNotFoundError:
        "Error: The specified file was not found."
    except Exception as e:
        f"An error occurred: {str(e)}"

    prompt = "This is the text content of a person's pdf, roast him in a fun offensive way make it short and only one roast with one sentence"+text_content
    roast_response = client.chat.completions.create(
        model="gpt-4",
        messages=[
            # {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": prompt}
        ]
    )
    roast = roast_response.choices[0].message.content
    print(roast)
    return roast

# access_token = "ya29.a0AeDClZAN0w5RQptdmWxHa_J2NR18n-YNuJb2slgS36lnZrGXobgJkPS4jxbay6MgyOGgDoZMBKDsIebqeCf7ER89_lJZDhDqkCJMOKVdYvEzUoM7snxwkZcRMQpX-rtgNL-1JoWbVhu_M7Ymhfc4VKsxCioBkbok5jcaCgYKAUISARISFQHGX2Mip70RK4KO52vPsrii9BOPnQ0170"
# search_job_emails(access_token)

def all_roast():
    prompt = "generate somethings like this for the resume and job rejections I will add below. The result should be multiple line and fun offensive roast."
    prompt += """
Your spotify was keeping-kylie-rich-by-buying-travis-scott-meals-omg-high-school-is-over-can-be-convinced-the-earth-is-flat bad.

Thank your obsessions with Travis Scott, See You Again, and Kanye West for that.

Based on your listening habits, I can also tell you your Spotify was...

classic-rock-radio-station bad

can't-believe-the-idol-was-canceled bad

mumble-rap-go-hard bad

mid-nineties-flannel-shirt bad

21-21-21 bad

Here's what else is going on in your aural trash fire:

You listen to these too much:

Jigsaw Falling Into Place by Radiohead
Type Shit by Future
The Adults Are Talking by The Strokes
Time by Pink Floyd
Not Like Us by Kendrick Lamar
You stan these artists to an uncomfortable extent:

Arctic Monkeys
Kendrick Lamar
The Strokes
Kanye West
Joji
You are 54% basic. Most of your music comes straight from iHeartRadio. lol Travis Scott..

You're stuck in the early 2010s. You only listen to Obama-era jams like XXX. FEAT. U2. by Kendrick Lamar and Cigarette Daydreams by Cage The Elephant.

Analysis finally complete.

I need to go recalibrate my taste levels.

Shutting down."""
    prompt+= "\nThe Companies are"
    with open("companies.txt",'r') as file:
        for line in file:
            prompt += line.strip()+"\n"
    with open("extracted_resume.txt",'r') as file2:
        for line in file2:
            prompt+=line.strip()
    roast_response = client.chat.completions.create(
        model="gpt-4",
        messages=[
            {"role": "user", "content": prompt}
        ]
    )
    roast = roast_response.choices[0].message.content
    return roast

