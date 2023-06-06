import { searchGifs } from "./giphy.js";
import { searchImages } from "./searchImage.js";

document
  .querySelector("#destinationForm")
  .addEventListener("submit", handleSubmit);

//-----------------FORM----------------------
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

  // CREATE NEWCARD VARIABLE
  let newCard = null;

  // VALIDATE URL INPUT
  var urlInput = document.querySelector("#imageUrl");

  if (urlInput.value && isValidUrl(urlInput.value)) {
    data.imageUrl = urlInput.value;
    newCard = createCard(data);
  } else {
    // MAKE IMAGE SEARCH API CALL INSTEAD OF USING INVALID URL
    searchImages(data.destinationName, data.location)
      .then((searchedUrl) => {
        console.log("from HandleSubmit", searchedUrl);
        newCard = createCard(data, searchedUrl);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  let cards = document.querySelector(".clone-container").children;

  if (cards.length > 0) {
    document.querySelector("#title").innerHTML = "My Wishlist";
  }

  resetForm(e.target);
}

// RESET FORM AFTER SUBMISSION
function resetForm(values) {
  for (var i = 0; i < values.length; i++) {
    values.elements[i].value = "";
  }
}

// VALIDATE URL PATTERN
function isValidUrl(url) {
  var pattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/;
  return pattern.test(url);
}

//----------------CARD---------------------

// CREATE FROM TEMPLATE
function createCard(formData, searchedUrl = null) {
  console.log(formData);
  var template = getTemplate(); // CARD
  console.log("Creating template....");

  template.querySelector(".card-title").textContent = formData.destinationName;
  template.querySelector(".card-subtitle").textContent = formData.location;

  if (formData.imageUrl) {
    template
      .querySelector(".card-img-top")
      .setAttribute("src", formData.imageUrl);
  } else if (searchedUrl) {
    template.querySelector(".card-img-top").setAttribute("src", searchedUrl);
  }
  template.querySelector(".card-text").textContent = formData.description;
  template.querySelector(".card-price").textContent = formData.cost;
  document.querySelector(".clone-container").appendChild(template);
}

//TEMPLATE CLONE
function getTemplate() {
  console.log("cloning template....");
  var template = document.createElement("template"); // VARIABLE TO STORE IN
  var htmlFromTemp = document.querySelector("#itemTemplate").innerHTML; // RETRIEVE HTML
  template.innerHTML = htmlFromTemp; // ATTATCH HTML
  var tempclone = document.importNode(template.content, true); // CLONE NODE AND CHILDREN
  return tempclone;
}

export { createCard, getTemplate, resetForm, handleSubmit };
