let apiKey = '9b0e08d2';
let baseUrl = `http://www.omdbapi.com/?apikey=${apiKey}`


export const fetchDataUrl = (page, input) => {
  return `${baseUrl}&s=${input}&page=${page}`
}

export const fetchMovieDetailUrl = (id) => {
  return `${baseUrl}&i=${id}`
}