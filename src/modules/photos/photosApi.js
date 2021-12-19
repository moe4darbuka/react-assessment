const PHOTOS_URL = "https://jsonplaceholder.typicode.com/photos?_limit=100";

export const fetchPhotos = () => {
  return fetch(PHOTOS_URL)
    .then((response) => response.json())
    .then((json) => json);
};
