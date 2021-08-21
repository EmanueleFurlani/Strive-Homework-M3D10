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

// function to check if it's loading
const isLoading = async function (loading) {
  const spinner = document.querySelector(".spinner-grow")
  if (loading) {
    spinner.classList.remove("d-none")
  } else {
    spinner.classList.add("d-none")
  }
}

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
      isLoading(true)
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
       isLoading(false)
    } catch (err) {
      const errorContainer = document.querySelector(
        "#error-container .text-danger"
      )
      errorContainer.classList.remove("d-none")
      errorContainer.innerText = err
    }
  } else {
    isLoading(false)
  }
}

//check invalid input

const checkInvalid = () => {
  if (nameInput.validity.valueMissing) {
    nameInput.classList.add("is-invalid")
  } else {
    nameInput.classList.remove("is-invalid")
  }

  if (descriptionInput.validity.valueMissing) {
    descriptionInput.classList.add("is-invalid")
  } else {
    descriptionInput.classList.remove("is-invalid")
  }

  if (categoryInput.validity.valueMissing) {
    categoryInput.classList.add("is-invalid")
  } else {
    categoryInput.classList.remove("is-invalid")
  }

  if (imageInput.validity.valueMissing) {
    imageInput.classList.add("is-invalid")
  } else {
    imageInput.classList.remove("is-invalid")
  }
}

//check valid input
const checkValid = (e) => {
  const currentInput = e.currentTarget

  if (currentInput.validity.valueMissing) {
    currentInput.classList.add("is-invalid")
    currentInput.classList.remove("is-valid")
  } else {
    currentInput.classList.add("is-valid")
    currentInput.classList.remove("is-invalid")
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

   isLoading(true)
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
    
    isLoading(false)

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

      isLoading(false)

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

  nameInput.addEventListener("keyup", (e) => checkValid(e))
  descriptionInput.addEventListener("keyup", (e) => checkValid(e))
  categoryInput.addEventListener("keyup", (e) => checkValid(e))
  imageInput.addEventListener("keyup", (e) => checkValid(e))
}
