window.onload = function () {
  console.log("ummmm.....");
};

export function searchGifs(destinationName, location) {
  const apiKey = "LwTC1g5nOu9rDaMFbuuKoaTYaPE9IViN";
  const limit = 25;
  const offset = 0;
  const rating = "g";
  const lang = "en";
  const query = `${destinationName} ${location}`;
  const apiUrl = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${query}&limit=${limit}&offset=${offset}&rating=${rating}&lang=${lang}`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => console.error(error));
}
