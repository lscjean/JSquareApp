
// jsonData = {
//   "1": {
//     "title": "Default",
//     "id": "1",
//     "type": "--",
//     "expected_output": "Presentation",
//     "fields": [
//       {
//         "header": "Your First Name",
//         "type": "Text",
//         "name": "firstName",
//         "required": "TRUE",
//         "preview": "John"
//       }
//     ]
//   }
// }

//Fetch the JSON data
// fetch('formStructure.json')
//   .then(response => response.json())
//   .then(data => {jsonData = data;})
//   .catch(error => console.error(error));
const requestInput = document.getElementById("request-input")



function buildForm(formId){   
  
  var formFields = jsonData[formId]["fields"];
  switch(formId){
      case 1: 
          formFields.forEach(f => requestInput.appendChild(createField(f)));
          break
  }
  requestInput.appendChild(createSubmitButton());
}

function createSubmitButton(){
  const btn = document.createElement("button")
  btn.setAttribute('type', "submit");
  btn.innerText = "Submit"
  return btn
}

function createField(obj){

  const parent = document.createElement('span');
  var header = obj.header,
      name = obj.name.toLowerCase(), 
      type = obj.type.toLowerCase(),
      preview = obj.preview
      required = obj.required;

  
      label = document.createElement("label"); 
          label.setAttribute('for', name); 
          label.innerText = header;

  switch(type){
      case 'text': 
          input = document.createElement("input");
          input.type = type; 
          input.id = name;
          input.name = name;
          input.placeholder=preview;
          required ? input.setAttribute("required", ''): '';

          input.value = name;
              break               
  }

  if (getSpecialClass(obj)){
      arr = obj.class
      arr.forEach(cls => input.classList.add(cls))
  }

  parent.appendChild(label)
  parent.appendChild(input)
  return parent
}

function getSpecialClass(obj){
  
  // console.log('2:' + obj.hasOwnProperty('class'))
  var output = false;
  if (obj.hasOwnProperty('class')){ 
      arg = obj.class
      output = (arg != undefined && arg.length>0 && arg[0]!= "")
      // console.log('3:' + (arg != undefined))
      // console.log('4:' + (arg.length>0))
      // console.log('5:' + (arg[0]!= ""))
      // console.log('6:' + (arg[0]))
      // console.log('7+Output:' + output)
  }
  return output
}

function createFormDataObj(e){
  
  const formData = new FormData(e.target);
  formDataObj = {}
  for (let [key, value] of formData.entries()) {
      formDataObj[key] = value;
    }
  // console.log(JSON.stringify(formDataObj, null, 2))
  return formDataObj
  
}

document.addEventListener("GSheetDataLoaded", function() {

  buildForm(pageInfo["formId"])
  requestInput.addEventListener('submit', (event) => {
    event.preventDefault();
    request_engine(createFormDataObj(event))
  });

});

