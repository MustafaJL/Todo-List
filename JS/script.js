let createButton = document.getElementById("create");
let num_tasks = document.getElementById('task-num');

// view data in the table
if (localStorage.length > 0) {
  
  var storedTitles = JSON.parse(localStorage.getItem("Titles"));
  var storedText = JSON.parse(localStorage.getItem("Text"));
  var storedDate = JSON.parse(localStorage.getItem("Created"));
  for (let i = 0; i < storedTitles.length; i++) {
    if(storedTitles[i] === null || storedTitles[i] === ''){
        continue
    }
    else{
        createItem(i,storedTitles[i], storedText[i],storedDate[i]);
    }
    
  }
  let length = storedTitles.length;
  num_tasks.innerHTML = `Number of Tasks : ${length}`
}
else{
  num_tasks.innerHTML = `Number of Tasks : 0`
}

function createItem(i,title, bodyText, date) {
  // call the main div with class accordion
  let acco = document.querySelector(".accordion");

  let top = document.createElement("div");
  top.classList.add('top')


  // create accordion-item div
  let accItem = document.createElement("div");
  accItem.classList.add("accordion-item");
  accItem.classList.add("m-3");
  accItem.classList.add("d-flex");
  accItem.classList.add("justify-content-between");


  let accH2 = document.createElement("h2");
  accH2.classList.add("accordion-header");
  accH2.setAttribute("id", `panelsStayOpen-heading${title}`);

  // create button to hide content of accordion
  let accButton = document.createElement("button");
  accButton.classList.add("accordion-button");
  accButton.setAttribute("type", "button");
  accButton.setAttribute("data-bs-toggle", "collapse");
  accButton.setAttribute("data-bs-target", `#panelsStayOpen-collapse${title}`);
  accButton.setAttribute("aria-expanded", "true");
  accButton.setAttribute("aria-controls", `panelsStayOpen-collapse${title}`);
  accButton.innerHTML = `#${i+1} ${title}`;

  // create div that hold accordion body div
  let bodyHolder = document.createElement("div");
  bodyHolder.classList.add("accordion-collapse");
  bodyHolder.classList.add("collapse");
  bodyHolder.classList.add("show");
  bodyHolder.setAttribute("id", `panelsStayOpen-collapse${title}`);
  bodyHolder.setAttribute("aria-labelledby", `panelsStayOpen-heading${title}`);

  // create accordion body div
  let accBody = document.createElement("div");
  accBody.classList.add("accordion-body");
  let dateText = document.createElement('div');
  dateText.classList.add('date')
  dateText.classList.add('text-muted')
  dateText.classList.add('fw-bold')
  

  accBody.appendChild(document.createTextNode(bodyText));
  dateText.innerHTML = `Created in : ${date}`;
  accBody.appendChild(dateText);
  
  

  // create delete button

  let deleteButton = document.createElement("button");
  deleteButton.classList.add('btn');
  deleteButton.classList.add('btn-danger');
  deleteButton.classList.add("delete");
  deleteButton.classList.add('ms-1');
  deleteButton.classList.add('me-1');

  let deleteIcon = document.createElement('i');
  deleteIcon.classList.add('bi');
  deleteIcon.classList.add('bi-trash');
  deleteButton.appendChild(deleteIcon);

  let delText = document.createTextNode(' Delete');
  deleteButton.appendChild(delText)
  
  

  // append button to h2 
  accH2.appendChild(accButton);
  // append h2 to top
  top.appendChild(accH2);
  // append body to bodyholder
  bodyHolder.appendChild(accBody);
  // append bodyholder to top
  top.appendChild(bodyHolder);
  // append top to item
  accItem.appendChild(top);
  // append button  delete to item
  accItem.appendChild(deleteButton);
  // append item to main div
  acco.appendChild(accItem);

  
}

createButton.addEventListener("click", function () {
  // get the value of text-area and title in the form
  let textArea = document.getElementById("text-area").value;
  let title = document.getElementById("title").value;
  // emptying the input fields
  document.getElementById("text-area").value = "";
  document.getElementById("title").value = "";

 // retrieve all values of each accordion-button divs
  let titles = document.getElementsByClassName("accordion-button");
  let st = [];
  if (titles.length > 0) {
    for (let i = 0; i < titles.length; i++) {
      st.push(titles[i].innerHTML);
    }
  }
  
  // check over array if the new task does not already exist it will be added
  if (title != "" && !st.includes(title) && textArea != "") {
     let date = Date.call().slice(0,24);
    Create(title, textArea,date);
       
  }
  
});


let deleteTask = document.getElementsByClassName('delete');
for (let i = 0; i < deleteTask.length; i++){
    deleteTask[i].onclick = function(){
    let title = this.parentElement.children[0].children[0].children[0].innerHTML.slice(3);
    let confirmStatus = confirm('Are You Sure, You Want to Delete This Task')
    if(confirmStatus){
    Delete(title);
    this.parentElement.remove()
    let text = num_tasks.innerHTML
    num_tasks.innerHTML = text.replace(text.slice(-1),parseInt(text[text.length-1])-1)

    }
}}

// function for add data to local storge
function Create(titlesStorage, textArea,date) {
    
    //storing array in localStorage
    if (localStorage.length == 0) {
     Title = [titlesStorage];
      Text = [textArea];
       Hist = [date];
      localStorage.setItem("Titles", JSON.stringify(Title));
      localStorage.setItem("Text", JSON.stringify(Text));
      localStorage.setItem("Created", JSON.stringify(Hist));

    } else {
      var storedTitles = JSON.parse(localStorage.getItem("Titles"));
      var storedText = JSON.parse(localStorage.getItem("Text"));
      var storedDate = JSON.parse(localStorage.getItem('Created'))
      storedTitles.push(titlesStorage);
      storedText.push(textArea);
      storedDate.push(date);

      localStorage.setItem("Titles", JSON.stringify(storedTitles));
      localStorage.setItem("Text", JSON.stringify(storedText));
      localStorage.setItem("Created", JSON.stringify(storedDate));

    }
  }

function Delete(title){

    var storedTitles = JSON.parse(localStorage.getItem("Titles"));
    var storedText = JSON.parse(localStorage.getItem("Text"));
    var storedDate = JSON.parse(localStorage.getItem('Created'))
    let key = storedTitles.indexOf(title)
  
    delete storedTitles[key];
    delete storedText[key];
    delete storedDate[key];

    storedTitles = storedTitles.filter(element => {
        return element !== null;
      });
    storedText = storedText.filter(element => {
        return element !== null;
      });

    storedDate = storedDate.filter(element => {
        return element != null;
    });
    localStorage.setItem("Titles", JSON.stringify(storedTitles));
    localStorage.setItem("Text", JSON.stringify(storedText));
    localStorage.setItem("Created", JSON.stringify(storedDate));


}

// delete all tasks from local storage

let all = document.getElementById('delete-all');

all.addEventListener('click', () => {

  localStorage.clear();


});