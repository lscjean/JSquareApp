####### VIRTUAL ENVIRONMENT #############@
import os
from flask import Flask, redirect, render_template, request, url_for, jsonify
from flask_cors import CORS, cross_origin

app = Flask(__name__)
CORS(app)
app.config['TEMPLATES_AUTO_RELOAD'] = True
app.config['MAX_CONTENT_LENGTH'] = 50 * 1024 * 1024  # 50 megabytes

####### OPENAI #############@
import openai
openai.api_key = os.environ["OPENAI_API_KEY"]

####### GOOGLE ACCOUNT #############@
import gspread
from oauth2client.service_account import ServiceAccountCredentials

# Define the scope and credentials to access the Google Sheet
scope = ['https://spreadsheets.google.com/feeds',
         'https://www.googleapis.com/auth/drive']
creds = ServiceAccountCredentials.from_json_keyfile_name('/Users/lscjean/Documents/gutilities-key.json', scope)

database_gsheet = "https://docs.google.com/spreadsheets/d/1qnk0TDc-Wtm-Lf6I5I9uBNkIxGfhW5Ovd-i3GXJQBU4/edit?usp=share_link"

####### UTILIES #############@
from static.python.utiles import *
from static.python.transformGsheet import * 
import json
from datetime import datetime




@app.route("/", methods=("GET", "POST"))
def index():
    print(os.environ["OPENAI_API_KEY"])
    if request.method == "POST":
        animal = request.form["animal"]
        response = openai.Completion.create(
            model="text-davinci-003",
            prompt=generate_prompt(animal),
            temperature=0.6,
        )
        return redirect(url_for("index", result=response.choices[0].text))

    result = request.args.get("result")
    return render_template("index.html", result=result)


def generate_prompt(animal):
    return """Suggest three names for an animal that is a superhero.

Animal: Cat
Names: Captain Sharpclaw, Agent Fluffball, The Incredible Feline
Animal: Dog
Names: Ruff the Protector, Wonder Canine, Sir Barks-a-Lot
Animal: {}
Names:""".format(
        animal.capitalize()
    )

def getGsheetData(fileURL):
    # authorize the client
    client = gspread.authorize(creds)
    # print("hllo")
    # open the Google Sheet by name
    sheet = client.open_by_url(fileURL).sheet1
    data = sheet.get_all_values()
    return transform_to_dict(data)
    mdict = form_buider(transform_to_dict(data))
    print(json.dumps(mdict, indent=4))
    # print the data
    # pJSON(data)
    # print(pretty_json)

@app.route('/myFunction', methods=['POST'])
def myFunction():
    input = request.get_json()
    # formStructure = 
    response_data = form_buider(transform_to_dict(getGsheetData(database_gsheet)))
    # Process my_variable
    # response_data = {'status': 'success'}
    return jsonify(response_data)

getGsheetData(database_gsheet)

if __name__ == '__main__':
    app.run(debug=True)
