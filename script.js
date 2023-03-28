window.onload = function () {
  console.log("page loaded.....");

  document
    .querySelector("#destinationForm")
    .addEventListener("submit", handleSubmit);
  document
    .querySelector(".clone-container")
    .addEventListener("click", function (e) {
      if (e.target.classList.contains("deleteItem")) {
        onDeleteButtonClicked.call(e.target);
      }
    });
  document
    .querySelector(".clone-container")
    .addEventListener("click", function (e) {
      if (e.target.classList.contains("editItem")) {
        onEditButtonClicked.call(e.target);
      }
    });
};

//-------------------------FORM---------------------------

// CAPTURE FORM VALUES
function handleSubmit(e) {
  e.preventDefault();
  console.log("submit clicked");

  var data = {};
  data.destinationName = document.querySelector("#destinationName").value;
  data.location = document.querySelector("#location").value;
  data.imageUrl = document.querySelector("#imageUrl").value;
  data.description = document.querySelector("#description").value;
  data.cost = document.querySelector("#cost").value;

  console.log("Data passed to card....", data);
  var newCard = createCard(data);

  var cards = document.querySelector(".clone-container").children;

  if (cards.length > 0) {
    document.querySelector("#title").innerHTML = "My Wishlist";
  }

  resetForm(e.target);
  return newCard;
}

// CLEAR FORM
function resetForm(values) {
  for (var i = 0; i < values.length; i++) {
    values.elements[i].value = "";
  }
}

//-------------------CARD---------------------------

// CREATE FROM TEMPLATE
function createCard(formData) {
  console.log(formData);
  var template = getTemplate(); //card
  console.log("Creating temp........", template);

  template.querySelector(".card-title").textContent = formData.destinationName;
  template.querySelector(".card-subtitle").textContent = formData.location;
  template
    .querySelector(".card-img-top")
    .setAttribute("src", formData.imageUrl);
  template.querySelector(".card-text").textContent = formData.description;
  template.querySelector(".card-price").textContent = formData.cost;
  document.querySelector(".clone-container").appendChild(template);
}

//TEMPLATE CLONE
function getTemplate() {
  console.log("cloning template.......");
  var template = document.createElement("template"); // store in this one
  var htmlFromTemp = document.querySelector("#itemTemplate").innerHTML; // retrive html
  template.innerHTML = htmlFromTemp; //attach html
  var tempclone = document.importNode(template.content, true); // clone node and children
  return tempclone;
}

// EDIT CARD // WINDOW PROMPT
function onEditButtonClicked() {
  var card = this.closest(".card");
  var destinationName = card.querySelector(".card-title");
  var location = card.querySelector(".card-subtitle");
  var imageUrl = card.querySelector(".card-img-top");
  var description = card.querySelector(".card-text");

  var newDestinationName = window.prompt("Enter new name");
  var newLocation = window.prompt("Enter new location");
  var newImageUrl = window.prompt("Enter new image url");
  var newDescription = window.prompt("Enter new description");

  if (newDestinationName >= 2) {
    destinationName.textContent = newDestinationName;
  }
  if (newLocation >= 2) {
    location.textContent = newLocation;
  }
  imageUrl.setAttribute("src", newImageUrl);
  description.textContent = newDescription;
}

//DELETE CLICKED CARD
function onDeleteButtonClicked() {
  console.log("deleting card....");
  this.closest(".card").remove();
}
