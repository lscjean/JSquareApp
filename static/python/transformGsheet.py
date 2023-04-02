obj = [
        [
            "Form ID",
            "Form Title",
            "Form Type",
            "Form Expected Output",
            "Field Name",
            "Field Header",
            "Field Type",
            "Field Required",
            "Field Preview",
            "Field Class"
        ],
        [
            "1",
            "Default",
            "--",
            "Presentation",
            "firstName",
            "Your First Name",
            "Text",
            "TRUE",
            "John",
            ""
        ],
        [
            "1",
            "Default",
            "--",
            "Presentation",
            "lastName",
            "Your Last Name",
            "Text",
            "TRUE",
            "Doe",
            ""
        ],
        [
            "1",
            "Default",
            "--",
            "Presentation",
            "bod",
            "Date of Birth",
            "text",
            "TRUE",
            "1990/01/01",
            ""
        ],
        [
            "1",
            "Default",
            "--",
            "Presentation",
            "city",
            "Your City",
            "Text",
            "TRUE",
            "Bruxelles",
            ""
        ],
        [
            "1",
            "Default",
            "--",
            "Presentation",
            "affinity",
            "what is your preferred product",
            "text",
            "FALSE",
            "i like the smell of napalm in the morning",
            "longtxt"
        ]
]

from .utiles import *

def transform_to_dict(data):
    headers = data[0]  # get headers from first row
    dict_arr = []
    for row in data[1:]:  # skip first row (headers)
        row_dict = {}
        for i in range(len(row)):
            row_dict[headers[i]] = row[i]
        dict_arr.append(row_dict)
    return dict_arr

def form_buider(dict):
    forms = {}
    for el in dict:
        if forms.get(el["Form ID"]):   
            forms[el["Form ID"]]["fields"].append(make_fieldObj(el))
        else:
            forms[el["Form ID"]] = {
                'title': el["Form Title"],
                'id':el["Form ID"],
                'type': el["Form Type"],
                'expected_output': el["Form Expected Output"],
                'fields' : []
            }
            entry = forms[el["Form ID"]]
            entry["fields"].append(make_fieldObj(el))
    return forms
    # print(json.dumps(forms, indent=4))

def make_fieldObj(dict): 
    field = {
                "header" : dict["Field Header"],
                "type" : str(dict["Field Type"]).lower(),
                "name": dict["Field Name"],
                "required": dict["Field Required"]
            }
    if dict.get("Field Class"): 
        field["class"] = dict["Field Class"]
    return field
