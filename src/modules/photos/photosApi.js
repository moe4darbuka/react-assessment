const PHOTOS_URL = "https://jsonplaceholder.typicode.com/photos?_limit=100";

export const fetchPhotos = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      fetch(PHOTOS_URL)
        .then((response) => response.json())
        .then((json) => resolve(json))
        .catch((error) => reject(error));
    }, 3000); // delay the response for demo purposes
  });
};
