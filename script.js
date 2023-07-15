const searchButton = document.getElementById("search-button");
const searchInput = document.getElementById("search-input");
const featuredMovieContainer = document.getElementById("featured-movie");
const movieContainer = document.getElementById("movie-container");

searchButton.addEventListener("click", searchMovie);

async function searchMovie() {
  const searchTerm = searchInput.value;

  // Clear previous search results
  movieContainer.innerHTML = "";

  // Fetch search results from API
  const response = await fetch(
    `https://www.omdbapi.com/?apikey=d9b316c&s=${searchTerm}`
  );
  const data = await response.json();

  if (data.Response === "True") {
    const movies = data.Search;

    movies.forEach((movie) => {
      const movieCard = createMovieCard(movie);
      movieContainer.appendChild(movieCard);
    });
  } else {
    const errorMessage = document.createElement("p");
    errorMessage.textContent = "No movies found.";
    movieContainer.appendChild(errorMessage);
  }
}

async function fetchRandomMovies() {
  // Fetch a list of random movies from the API
  const response = await fetch(
    "https://www.omdbapi.com/?apikey=d9b316c&s=action&type=movie&page=1"
  );
  const data = await response.json();

  if (data.Response === "True") {
    const movies = data.Search;

    // Get a random movie from the list
    const randomIndex = Math.floor(Math.random() * movies.length);
    const randomMovie = movies[randomIndex];

    // Fetch the details of the random movie
    const movieResponse = await fetch(
      `https://www.omdbapi.com/?apikey=d9b316c&i=${randomMovie.imdbID}`
    );
    const movieData = await movieResponse.json();

    if (movieData.Response === "True") {
      const featuredMovieCard = createMovieCard(movieData);
      featuredMovieContainer.appendChild(featuredMovieCard);
    } else {
      const errorMessage = document.createElement("p");
      errorMessage.textContent = "Failed to load featured movie.";
      featuredMovieContainer.appendChild(errorMessage);
    }
  } else {
    const errorMessage = document.createElement("p");
    errorMessage.textContent = "Failed to load random movies.";
    featuredMovieContainer.appendChild(errorMessage);
  }
}

function createMovieCard(movie) {
  const movieCard = document.createElement("div");
  movieCard.classList.add("movie-card");

  const movieImage = document.createElement("img");
  movieImage.src = movie.Poster !== "N/A" ? movie.Poster : "placeholder.png";
  movieImage.alt = movie.Title;

  const movieTitle = document.createElement("h3");
  movieTitle.textContent = movie.Title;

  const movieYear = document.createElement("p");
  movieYear.textContent = `Year: ${movie.Year}`;

  movieCard.appendChild(movieImage);
  movieCard.appendChild(movieTitle);
  movieCard.appendChild(movieYear);

  return movieCard;
}

fetchRandomMovies();


function createMovieCard(movie) {
  const movieCard = document.createElement("div");
  movieCard.classList.add("movie-card");

  const movieImage = document.createElement("img");
  movieImage.src = movie.Poster !== "N/A" ? movie.Poster : "placeholder.png";
  movieImage.alt = movie.Title;

  const movieTitle = document.createElement("h3");
  movieTitle.textContent = movie.Title;

  const movieYear = document.createElement("p");
  movieYear.textContent = `Year: ${movie.Year}`;

  const movieRated = document.createElement("p");
  movieRated.textContent = `Rated: ${movie.Rated}`;

  const movieRuntime = document.createElement("p");
  movieRuntime.textContent = `Runtime: ${movie.Runtime}`;

  const movieGenre = document.createElement("p");
  movieGenre.textContent = `Genre: ${movie.Genre}`;

  movieCard.appendChild(movieImage);
  movieCard.appendChild(movieTitle);
  movieCard.appendChild(movieYear);
  movieCard.appendChild(movieRated);
  movieCard.appendChild(movieRuntime);
  movieCard.appendChild(movieGenre);

  return movieCard;
}
