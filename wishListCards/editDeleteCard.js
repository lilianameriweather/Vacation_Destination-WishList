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

export { onDeleteButtonClicked, onEditButtonClicked };
