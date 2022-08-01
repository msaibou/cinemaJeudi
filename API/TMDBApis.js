const API_TOKEN = "9ff8ffde4f9ff8758abefa2930ea1cfa";

export function getFilmsFromApiWithSearchedText(text, page) {
  const url =
    "https://api.themoviedb.org/3/search/movie?api_key=" +
    API_TOKEN +
    "&language=fr&query=" +
    text +
    "&page=" +
    page;
  return fetch(url)
    .then((response) => response.json())
    .catch((error) => console.log(error));
}
export function getImageFromApi(name) {
  return "https://image.tmdb.org/t/p/w300" + name;
}
export function getFilmDetailFromApi(id) {
  const url =
    "https://api.themoviedb.org/3/movie/" +
    id +
    "?api_key=" +
    API_TOKEN +
    "&language=fr";
  //console.log(url);
  return fetch(url)
    .then((response) => response.json())
    .catch((error) => console.log(error));
}

//"https://api.themoviedb.org/3/search/movie?api_key=9ff8ffde4f9ff8758abefa2930ea1cfa&language=fr&query=star"
//https://api.themoviedb.org/3/movie/' + id + '?api_key=' + API_TOKEN + '&language=fr
