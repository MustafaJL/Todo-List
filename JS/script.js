let createButton = document.getElementById("create");

// view data in the table
if (localStorage.length > 0) {
  var storedTitles = JSON.parse(localStorage.getItem("Titles"));
  var storedText = JSON.parse(localStorage.getItem("Text"));
  for (let i = 0; i < storedTitles.length; i++) {
    createItem(storedTitles[i], storedText[i]);
  }
}

function createItem(title, bodyText) {
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
  accButton.innerHTML = title;

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
  accBody.innerHTML = bodyText;

  // create delete and edit button
  let editButton = document.createElement("button");
  editButton.classList.add('btn');
  editButton.classList.add('btn-success');
  editButton.classList.add('me-1');
  editButton.classList.add('ms-1');
  let editIcon = document.createElement('i')
  editIcon.classList.add('bi');
  editIcon.classList.add('bi-pencil');
  editButton.appendChild(editIcon)
  let editText = document.createTextNode(' Edit');
  editButton.appendChild(editText)

  let deleteButton = document.createElement("button");
  deleteButton.classList.add('btn');
  deleteButton.classList.add('btn-danger');
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
  // append button edit and delete to item
  accItem.appendChild(editButton);
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
  if (title != "" && !st.includes(title)) {
    dataLocalStorage(title, textArea);
  }
});

// function for add data to local storge
function dataLocalStorage(titlesStorage, textArea) {
  //storing array in localStorage
  if (localStorage.length == 0) {
    Title = [titlesStorage];
    Text = [textArea];
    localStorage.setItem("Titles", JSON.stringify(Title));
    localStorage.setItem("Text", JSON.stringify(Text));
  } else {
    var storedTitles = JSON.parse(localStorage.getItem("Titles"));
    var storedText = JSON.parse(localStorage.getItem("Text"));

    storedTitles.push(titlesStorage);
    storedText.push(textArea);

    localStorage.setItem("Titles", JSON.stringify(storedTitles));
    localStorage.setItem("Text", JSON.stringify(storedText));
  }
}
