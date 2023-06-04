// SEARCH IMAGES BASED ON FORM DATA: DESTINATION NAME AND LOCATION
export function searchImages(destinationName, location) {
  return new Promise((resolve, reject) => {
    const accessKey = "FnwvubE4GY5xmwrm37hiaICum7upI1gRXRZKXuKxeJA";
    const limit = 8;
    const orientation = "landscape";

    const query = `${destinationName} ${location}`;
    const apiUrl = `https://api.unsplash.com/search/photos?query=${query}&limit=${limit}&client_id=${accessKey}&order_by=random&orientation=${orientation}`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => resolve(onGetImageSuccessResponse(data.results)))
      .catch((error) => reject(onGetImageErrResponse(error)));
  });
}

// RANDOMIZE IMAGE ON SUCCESS
export const onGetImageSuccessResponse = (images) => {
  console.log(images);
  const randomIndex = Math.floor(Math.random() * images.length);
  console.log("random url: ", images[randomIndex].urls.small);
  const url = images[randomIndex].urls.small;
  return url;
};

export const onGetImageErrResponse = (error) => {
  console.error("Image might not exist based on user input...", error);
};
