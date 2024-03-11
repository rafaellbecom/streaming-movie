import { api } from "./api.js"

const url = 'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1'
const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNzQzYTcwNzk1MGNjNzY3MTQ2NWQ1N2E0NmY4MTVkNSIsInN1YiI6IjY1ZTE0ZTI4NmEzMDBiMDE2NDFkZmVmYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.h2dGO3z4rkcZPR-wBVXuZga8qdGzJe7VH7WL855gSio'
    }
}

const listTopRated = document.querySelector('.list-top-rated')
  
async function showingTopRated() {
  const data = await api.getData(url, options)
  const movies = data.results
  const topRated = movies.slice(0, 10)
  topRated.forEach((movie) => {
    const position = topRated.indexOf(movie) + 1
    const movieTop = createTopRatedItem(movie, position)
    listTopRated.appendChild(movieTop)
  })
}

function createTopRatedItem(movie, position) {
  const li = document.createElement('li')
  
  const div = document.createElement('div')
  div.classList.add('card-movie')

  const imageCard = document.createElement('div')
  imageCard.classList.add('img-card-movie')
  const baseUrl = 'https://image.tmdb.org/t/p/';
  const imageSize = 'original';
  const pathImage = movie.poster_path
  const urlImage = `${baseUrl}${imageSize}${pathImage}`
  imageCard.style.backgroundImage = `url('${urlImage}')`
  imageCard.innerHTML = `
    <span class="position text">${position}</span>
  `

  const contentMovie = document.createElement('div')
  contentMovie.classList.add('content-card-movie')
  const rated = movie.vote_average.toFixed(2)
  contentMovie.innerHTML = `
    <h3 class="text">${movie.title}</h3>
    <span class="rated">${movie.vote_average.toFixed(1)}<span>/10</span></span>
  `

  div.append(imageCard)
  div.append(contentMovie)

  li.append(div)

  return li
}

showingTopRated()