
//function to generate cols
const generateCol = (movie) => {
  return `<div class="col-12 col-sm-4 col-md-3 col-lg-2 mb-4">
    <a href="../backoffice.html?movieID=${movie._id}&movieCategory=${movie.category}"
    target="_blank"><img class="img-fluid" style="height:300px; object-fit:cover; width:200px" src=${movie.imageUrl} alt="${movie.name} Picture"
    /></a>
  </div>`
}

//function to Fetch movies/shows depending on genres
const fetchMovies = async (url, genres, k) => {
  try {
    const response = await fetch(url + genres[k], {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTFjZmM3YzJkNTI2MjAwMTViNmRjYWMiLCJpYXQiOjE2MjkyODk1OTYsImV4cCI6MTYzMDQ5OTE5Nn0.iDlMUTTc0xtrNaoAmVgV2jnkXWgsEQjde8S63n28N4U",
          "Content-Type": "application/json",
      },
    })

    const movies = await response.json()
    return movies
  } catch (err) {
    console.log(err)
  }
}

//function to generate Fantasy movies/shows
const generateFantasy = async (url, genres) => {
  const fantasyMovies = await fetchMovies(url, genres, 0)
  console.log("Fantasy: ", fantasyMovies)

  const fantasyRow = document.querySelector("#fantasy-container .row")
  fantasyMovies.forEach((movie) => {
    fantasyRow.innerHTML += generateCol(movie)
  })
}

//function to generate Comedy movies/shows
const generateComedy = async (url, genres) => {
  const comedyMovies = await fetchMovies(url, genres, 1)
  console.log("Comedy: ", comedyMovies)

  const comedyRow = document.querySelector("#comedy-container .row")
  comedyMovies.forEach((movie) => {
    comedyRow.innerHTML += generateCol(movie)
  })
}

//function to generate Drama movies/shows
const generateDrama = async (url, genres) => {
  const dramaMovies = await fetchMovies(url, genres, 2)
  console.log("Drama: ", dramaMovies)

  const dramaRow = document.querySelector("#drama-container .row")
  dramaMovies.forEach((movie) => {
    dramaRow.innerHTML += generateCol(movie)
  })
}
window.onload = () => {
  const url = "https://striveschool-api.herokuapp.com/api/movies/"
  const genres = ["Fantasy", "Comedy", "Drama"]

  generateFantasy(url, genres)
  generateComedy(url, genres)
  generateDrama(url, genres)
}
