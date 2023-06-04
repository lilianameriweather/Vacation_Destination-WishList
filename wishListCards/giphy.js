// FETCH GIPHY BASED ON FORM DATA: DESTINATION NAME AND LOCATION
export function searchGifs(destinationName, location) {
  return new Promise((resolve, reject) => {
    const apiKey = "LwTC1g5nOu9rDaMFbuuKoaTYaPE9IViN";
    const limit = 1;
    const offset = 0;
    const rating = "g";
    const lang = "en";
    const query = `${destinationName} ${location}`;
    const apiUrl = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${query}&limit=${limit}&offset=${offset}&rating=${rating}&lang=${lang}`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => resolve(onGetGiphySuccessResponse(data.data)))
      .catch((error) => reject(onGetGiphyErrResponse(error)));
  });
}

export const onGetGiphySuccessResponse = (data) => {
  console.log(data);
  console.log(data[0].embed_url);
  const giphyUrl = data[0].embed_url;

  return giphyUrl;
};

export const onGetGiphyErrResponse = (error) => {
  console.error("Giphy might not exist...", error);
};
