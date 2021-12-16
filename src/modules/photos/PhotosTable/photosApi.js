const URL = "https://jsonplaceholder.typicode.com/photos?_limit=100";

export const getPhotos = () => {
  return fetch(URL)
    .then((response) => response.json())
    .then((json) => json);
};
