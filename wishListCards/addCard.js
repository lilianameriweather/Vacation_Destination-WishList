import { searchGifs } from "./giphy.js";
import { searchImages } from "./searchImage.js";

document
  .querySelector("#destinationForm")
  .addEventListener("submit", handleSubmit);

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

  // create newCard variable
  let newCard = null;

  // Validate the URL input
  var urlInput = document.querySelector("#imageUrl");

  if (urlInput.value && isValidUrl(urlInput.value)) {
    data.imageUrl = urlInput.value;
    newCard = createCard(data);
  } else {
    // Make a Giphy API call instead of using the invalid URL
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

// CLEAR FORM
function resetForm(values) {
  for (var i = 0; i < values.length; i++) {
    values.elements[i].value = "";
  }
}

// Validate Url
function isValidUrl(url) {
  var pattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/;
  return pattern.test(url);
}

//-------------------CARD---------------------------

// CREATE FROM TEMPLATE
function createCard(formData, searchedUrl = null) {
  console.log(formData);
  var template = getTemplate(); //card
  console.log("Creating temp........");

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
  console.log("cloning template.......");
  var template = document.createElement("template"); // store in this one
  var htmlFromTemp = document.querySelector("#itemTemplate").innerHTML; // retrive html
  template.innerHTML = htmlFromTemp; //attach html
  var tempclone = document.importNode(template.content, true); // clone node and children
  return tempclone;
}

export { createCard, getTemplate, resetForm, handleSubmit };
