var jsonData = {};
var formId= pageInfo['formId'].toString()
function fetchGSheetFormFields(){

    const GSheet = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTFdxsH09fSjaJW5aWvlEuqSCYh-XP-ip4QOT79BR3O16btMaadTbq7EuWFXY5-aYcMFKOpCDWP1Hsz/pub?output=csv"
    fetch(GSheet)
    .then(response => response.text())
    .then(csvData => {
      const parsedData = Papa.parse(csvData, { header: true });
    //   console.log(parsedData)
      parsedData.data.forEach(row => {

        fId = row["Form ID"];
        fName = row["Form Title"]; 
        if (jsonData.hasOwnProperty(fId)) { 
            jsonData[fId]["fields"].push(addField(row)) // if json contains form name
        } else {
            jsonData[fId] = {
                'title' : fName, 
                'id' : row["Form ID"], 
                'type' : row["Form Type"], 
                'expected_output' : row["Form Expected Output"], 
                'fields' : []
            }
            jsonData[fId]["fields"].push(addField(row))
        }
        // add more properties as needed
      });
      
      // do something with the dataDict

      console.log("GSheet data is now Loaded");
      const event = new Event('GSheetDataLoaded');
      document.dispatchEvent(event);

    });
    
    
    }

function addField(row){
    field = {
        'header': row["Field Header"],
        'type': row["Field Type"],
        'name': row["Field Name"],
        'required': row["Field Required"],
        'preview': row["Field Preview"]
    }
    if (row.hasOwnProperty("class")) {
        field["class"] = row["Field Class"]; 
    }
    return field
}

function fetchGSheetRequestTemplate(){

    var output = false
    const GSheet = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTFdxsH09fSjaJW5aWvlEuqSCYh-XP-ip4QOT79BR3O16btMaadTbq7EuWFXY5-aYcMFKOpCDWP1Hsz/pub?gid=1676930547&single=true&output=csv"
    fetch(GSheet)
    .then(response => response.text())
    .then(csvData => {
      const parsedData = Papa.parse(csvData, { header: true });
      parsedData.data.forEach(row => {
        if (row["formId"] === formId) {
            pageInfo['formName'] = row["formName"];
            output = row["structure"]; 
            console.log("template structure is loaded :" + output)
        } else {
            console.log("template structure FAILED in loading")
        }
      })

      
      pageInfo["structure"] = output; 
      return output

    });
    
    
    }


fetchGSheetRequestTemplate()
fetchGSheetFormFields()
