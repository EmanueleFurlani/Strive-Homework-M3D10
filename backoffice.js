//get Movie ID if any
const movieCategory = new URLSearchParams(window.location.search).get( "movieCategory")
const movieID = new URLSearchParams(window.location.search).get("movieID")

//Url
const url = "https://striveschool-api.herokuapp.com/api/movies/"

// check if there's an Id and category on on search, if so let the url be modified by it
const deleteLoadInfoEndPoint = movieID ? url + movieID : url
const loadInfoEndPoint = url + movieCategory

//method to use depending if there's an ID or not
const method = movieID ? "PUT" : "POST"

//get input fields nodes
const nameInput = document.getElementById("movie-show-name")
const descriptionInput = document.getElementById("movie-show-description")
const categoryInput = document.getElementById("movie-show-category")
const imageInput = document.getElementById("movie-show-image")

//Check if theres an Id of search if so change the movie inputs to what they had previously, and change the method to put
const checkId = async () => {
  if (movieID) {
    const submitEditBtn = document.querySelector("#submit-edit-btn")
    submitEditBtn.innerText = "Edit"

    document.querySelector("#delete-btn").classList.remove("d-none")

    document.querySelector("#add-or-edit-title").innerText =
      "Edit your Movie/Show"
    try {
      const response = await fetch(loadInfoEndPoint, {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTFjZmM3YzJkNTI2MjAwMTViNmRjYWMiLCJpYXQiOjE2MjkyODk1OTYsImV4cCI6MTYzMDQ5OTE5Nn0.iDlMUTTc0xtrNaoAmVgV2jnkXWgsEQjde8S63n28N4U",
            "Content-Type": "application/json",
        },
      })

      const movies = await response.json()

      movies.forEach((movie) => {
        if (movie._id === movieID) {
          nameInput.value = movie.name
          descriptionInput.value = movie.description
          categoryInput.value = movie.category
          imageInput.value = movie.imageUrl
        }
      })
    } catch (err) {
      const errorContainer = document.querySelector(
        "#error-container .text-danger"
      )
      errorContainer.classList.remove("d-none")
      errorContainer.innerText = err
    }
  }
}

// function to submit or edit a movie
const postOrEditMovies = async (event) => {
  event.preventDefault()

  //submitted Movie as an object
  const submittedMovie = {
    name: nameInput.value,
    description: descriptionInput.value,
    category: categoryInput.value,
    imageUrl: imageInput.value,
  }

  // Fetch the Api and post the new object
  try {
    const response = await fetch(deleteLoadInfoEndPoint, {
      method,
      body: JSON.stringify(submittedMovie),
      headers: {
        Authorization:
         "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTFjZmM3YzJkNTI2MjAwMTViNmRjYWMiLCJpYXQiOjE2MjkyODk1OTYsImV4cCI6MTYzMDQ5OTE5Nn0.iDlMUTTc0xtrNaoAmVgV2jnkXWgsEQjde8S63n28N4U",
         "Content-Type": "application/json",
      },
    })
    
    if (response.ok) {
      const alertSuccess = document.querySelector(".alert-success")
      if (movieID) {
        alertSuccess.classList.remove("d-none")
        alertSuccess.innerText = `Your Movie was edited with Success!`

        setTimeout(() => {
          window.location.href = "/"
        }, 4000)
      } else {
        alertSuccess.classList.remove("d-none")
        alertSuccess.innerText = `Your Movie was submitted with success!`

        setTimeout(() => {
          window.location.href = "/"
        }, 4000)
      }
    }
  } catch (err) {
    const alertDanger = document.querySelector(".alert-danger")
    alertDanger.classList.remove("d-none")
    alertDanger.innerText = err
  }
}

//function to delete a movie/show from the API
const deleteMovie = async function () {
  const confirmed = confirm("Are you sure you want to delete this Movie/Show?")
  if (confirmed) {
    try {
      const response = await fetch(deleteLoadInfoEndPoint, {
        method: "DELETE",
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTFjZmM3YzJkNTI2MjAwMTViNmRjYWMiLCJpYXQiOjE2MjkyODk1OTYsImV4cCI6MTYzMDQ5OTE5Nn0.iDlMUTTc0xtrNaoAmVgV2jnkXWgsEQjde8S63n28N4U",
            "Content-Type": "application/json",
        },
      })
      const alertSuccess = document.querySelector(".alert-success")
      if (response.ok) {
        alertSuccess.classList.remove("d-none")
        alertSuccess.innerText = `Your movie was deleted with Success!`
      }

      setTimeout(() => {
        window.location.href = "/"
      }, 4000)
    } catch (err) {
      const alertDanger = document.querySelector(".alert-danger")
      alertDanger.classList.remove("d-none")
      alertDanger.innerText = err
    }
  }
}

window.onload = () => {
  checkId()
}
