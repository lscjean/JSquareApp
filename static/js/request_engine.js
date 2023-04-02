const output = document.getElementById("request-output")

function request_engine(obj){
    h = getAPIHeader()
    b = createAPIBody(obj);
    // insert Route to python
    response = SendAPIRequest(b)
    parseReply(response)
}

function getAPIHeader(){}

function createAPIBody(obj){
    var httpBody = JSON.stringify(obj, null, 2)
    return httpBody 
}

function SendAPIRequest(b) {
    const xhr = new XMLHttpRequest();
    const url = '/askChatGPT';
    const temp = pageInfo["structure"]; 

    payload = {
        'formId' : pageInfo["formId"],
        'formName' : pageInfo["formName"],
        'formData' : JSON.parse(b), 
        'formTemplate': temp
    }
    console.log(payload)
    const data = JSON.stringify(payload);
  
    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-type', 'application/json');
  
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 && xhr.status === 200) {
        const response = JSON.parse(xhr.responseText);
        parseReply(response);
      }
    };
    xhr.send(data);
  }
  

function parseReply(el){
    output.innerHTML = ""
    var p = document.createElement("p");
    p.innerText = el
    output.appendChild(p)
}