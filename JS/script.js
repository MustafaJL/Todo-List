let createButton = document.getElementById("create");

function createItem(title, bodyText) {
  // call the main div with class accordion
  let acco = document.querySelector(".accordion");

  // create accordion-item div
  let accItem = document.createElement("div");
  accItem.classList.add("accordion-item");

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

  accH2.appendChild(accButton);
  accItem.appendChild(accH2);
  bodyHolder.appendChild(accBody);
  accItem.appendChild(bodyHolder);

  acco.appendChild(accItem);
}

createButton.addEventListener("click", function () {
  let textArea = document.getElementById("text-area").value;
  let title = document.getElementById("title").value;
  createItem(title, textArea);
  console.log(textArea)
//   document.getElementById("text-area").value= '';
//   document.getElementById("title").value = '';


});

