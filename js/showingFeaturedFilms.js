import { api } from "./api.js"

const url = 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1'
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNzQzYTcwNzk1MGNjNzY3MTQ2NWQ1N2E0NmY4MTVkNSIsInN1YiI6IjY1ZTE0ZTI4NmEzMDBiMDE2NDFkZmVmYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.h2dGO3z4rkcZPR-wBVXuZga8qdGzJe7VH7WL855gSio'
  }
}

const listFeaturedMovies = document.querySelector('.list-featured-movies')

async function showingFeaturedFilms() {
    const data = await api.getData(url, options)
    const movies = data.results
    const feeaturedMovies = movies.slice(0, 5)
    await feeaturedMovies.forEach((movie) => {
      const movieFeatured = createFeaturedMovieItem(movie)
      listFeaturedMovies.appendChild(movieFeatured)
    })   
}

function createFeaturedMovieItem(movie) {
  const li = document.createElement('li')
  li.classList.add('slide')

  const baseUrl = 'https://image.tmdb.org/t/p/';
  const imageSize = 'original';
  const pathImage = movie.backdrop_path
  const urlImage = `${baseUrl}${imageSize}${pathImage}`
  li.style.backgroundImage = `url('${urlImage}')`

  const bgOverlay = document.createElement('div')
  bgOverlay.classList.add('bg-overlay')

  bgOverlay.innerHTML = `
    <h1 class="primario movie-title">${movie.title}</h1>
    <p class="movie-description">${movie.overview}</p>
    <div class="action-buttons">
        <button href="#" class="button-play"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z"/></svg> Play Now</button>
        <button class="button-add-to-favorites-list"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"/></svg></button>
    </div>
  `

  li.append(bgOverlay)
  
  return li
}

showingFeaturedFilms()