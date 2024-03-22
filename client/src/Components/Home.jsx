import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import { useEffect, useState, useRef } from "react";
import StarRating from "./StarRating/StarRating.js";
import { useMovies } from "../customHooks/useMovies";
import { useLocalStorage } from "../customHooks/useLocalStorage";
import { useKey } from "../customHooks/useKey";
import ChatWidget from "./ChatWidget/ChatWidget";
import "./Home.css";
import Logo from "./Main/Logo.jsx";

// export default function Home() {
//   const navigate = useNavigate();

//   axios.defaults.withCredentials = true;
//   function handleLogout() {
//     axios
//       .get("http://localhost:3000/auth/logout")
//       .then((res) => {
//         if (res.data.status) {
//           navigate("/login");
//         }
//       })
//       .catch((err) => console.log(err));
//   }

//   return (
//     <div>
//       Home
//       <button>
//         <Link to="/dashboard">Dashboard</Link> <br /> <br />
//       </button>
//       <button>
//         <Link to="/login">Login</Link>
//       </button>
//       <button onClick={handleLogout}>Logout</button>
//     </div>
//   );
// }

const tempMovieData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
];

const tempWatchedData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

const KEY = "77557d42";

export default function Home() {
  const [query, setQuery] = useState("inception");
  const [selectMovieId, setSelectMovieId] = useState(null);

  const [watched, setWatched] = useLocalStorage([], "watched");

  const { isLoading, error, movies } = useMovies(
    query,
    handleCloseMovieDetails
  );

  function handleSelectMovieId(movieId) {
    setSelectMovieId((selectMovieId) =>
      movieId === selectMovieId ? null : movieId
    );
  }

  function handleCloseMovieDetails() {
    setSelectMovieId(null);
  }

  function handleAddWatchedMovie(newMovie) {
    setWatched((watched) => [...watched, newMovie]);

    // Close movie details after add
    handleCloseMovieDetails();
  }

  function handleDeleteWatchedMovie(movieId) {
    setWatched((watched) =>
      watched.filter((movie) => movie.imdbID !== movieId)
    );
  }

  return (
    <>
      <NavBar>
        <Logo />
        <SearchBar
          query={query}
          setQuery={setQuery}
          onCloseMovieDetails={handleCloseMovieDetails}
        />
        <NumberResults movies={movies} />
        <DisplayLogin />
      </NavBar>

      <Main>
        <Box>
          {isLoading && <Loader />}
          {error && <ErrorMessage message={error} />}
          {!isLoading && !error && (
            <SearchedMoviesList
              movies={movies}
              onSelectMovieId={handleSelectMovieId}
            />
          )}
        </Box>

        <Box>
          {selectMovieId ? (
            <MovieDetails
              selectMovieId={selectMovieId}
              onCloseMovieDetails={handleCloseMovieDetails}
              onAddWatchedMovie={handleAddWatchedMovie}
              watched={watched}
              key={selectMovieId}
            />
          ) : (
            <>
              <WathchedMoviesSummary watched={watched} />

              <WatchedMoviesList
                watched={watched}
                onDeleteWatchedMovie={handleDeleteWatchedMovie}
              />
            </>
          )}
        </Box>

        {/* <ChatWidget /> */}
      </Main>
    </>
  );
}

function NavBar({ children }) {
  return <nav className="nav-bar">{children}</nav>;
}

function SearchBar({ query, setQuery, onCloseMovieDetails }) {
  // Auto focus on mount
  const inputEl = useRef(null);
  useEffect(function () {
    inputEl.current.focus();
  }, []);

  // Press Enter to clear query and start new search, also avoid clear query while typing
  useKey("enter", () => {
    if (document.activeElement !== inputEl.current) {
      inputEl.current.focus();
      setQuery("");
      onCloseMovieDetails();
    }
  });

  return (
    <input
      ref={inputEl}
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}

function NumberResults({ movies }) {
  return (
    <p className="num-results">
      Found <strong>{movies?.length || 0}</strong> results
    </p>
  );
}

function DisplayLogin() {
  return (
    <Link to="/login" className="display-login">
      Login / Signup
    </Link>
  );
}

function Main({ children }) {
  return <main className="main">{children}</main>;
}

function Loader() {
  return <p className="loader">LOADING</p>;
}

function ErrorMessage({ message }) {
  return <p className="error">{message}</p>;
}

function Box({ children }) {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="box">
      <button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
        {isOpen ? "–" : "+"}
      </button>
      {isOpen && children}
    </div>
  );
}

function MovieDetails({
  selectMovieId,
  onCloseMovieDetails,
  onAddWatchedMovie,
  watched,
}) {
  const [movieDetails, setMovieDetails] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [rating, setRating] = useState(null);

  // Count how many times user click on rating before actual add move
  const countRef = useRef(0);
  useEffect(
    function () {
      if (rating) countRef.current++;
    },
    [rating]
  );

  const alreadyAddedMovie = watched.find(
    (movie) => movie.imdbID === selectMovieId
  );

  const {
    Title: title,
    Poster: poster,
    Released: released,
    Runtime: runtime,
    Genre: genre,
    imdbRating,
    Plot: plot,
    Actors: actors,
    Director: director,
  } = movieDetails;

  function handleWatchedMovie() {
    const movie = {
      imdbID: selectMovieId,
      Title: title,
      Poster: poster,
      runtime: runtime.split(" ")[0],
      imdbRating,
      userRating: rating,
      countDecisionRating: countRef.current,
    };

    onAddWatchedMovie(movie);
  }

  useEffect(
    function () {
      async function fetchMovieDetails() {
        setIsLoading(true);

        const res =
          await fetch(`http://www.omdbapi.com/?apikey=${KEY}&i=${selectMovieId}
      `);

        const data = await res.json();

        // console.log(data);
        setMovieDetails(data);

        setIsLoading(false);
      }

      fetchMovieDetails();
    },
    [selectMovieId]
  );

  useEffect(
    function () {
      if (!title) return;
      document.title = `Movie | ${title}`;

      return () => (document.title = "usePopcorn");
    },

    [title]
  );

  useKey("Escape", onCloseMovieDetails);
  return (
    <div className="details">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={onCloseMovieDetails}>
              ←
            </button>
            <img src={poster} alt={`Poster movie of ${title}`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} · {runtime}
              </p>
              <p>{genre}</p>
              <p>⭐️ {imdbRating} IMDb Rating</p>
            </div>
          </header>

          <section>
            <div className="rating">
              {alreadyAddedMovie ? (
                <p>You rated this movie {alreadyAddedMovie.userRating} stars</p>
              ) : (
                <StarRating size={24} maxRating={10} onSetRating={setRating} />
              )}
              {rating > 0 && (
                <button className="btn-add" onClick={handleWatchedMovie}>
                  Add
                </button>
              )}
            </div>

            <p>
              <em>{plot}</em>
            </p>
            <p>Staring {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </>
      )}
    </div>
  );
}

function WathchedMoviesSummary({ watched }) {
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));

  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating.toFixed(2)}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating.toFixed(2)}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime} min</span>
        </p>
      </div>
    </div>
  );
}

function WatchedMoviesList({ watched, onDeleteWatchedMovie }) {
  return (
    <ul className="list list-movies">
      {watched.map((movie) => (
        <li key={movie.imdbID}>
          <button
            className="btn-delete"
            onClick={() => onDeleteWatchedMovie(movie.imdbID)}
          >
            Ⅹ
          </button>
          <img src={movie.Poster} alt={`${movie.Title} poster`} />
          <h3>{movie.Title}</h3>
          <div>
            <p>
              <span>⭐️</span>
              <span>{movie.imdbRating}</span>
            </p>
            <p>
              <span>🌟</span>
              <span>{movie.userRating}</span>
            </p>
            <p>
              <span>⏳</span>
              <span>{movie.runtime} min</span>
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
}
function SearchedMoviesList({ movies, onSelectMovieId }) {
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <li key={movie.imdbID} onClick={() => onSelectMovieId(movie.imdbID)}>
          <img src={movie.Poster} alt={`${movie.Title} poster`} />
          <h3>{movie.Title}</h3>
          <div>
            <p>
              <span>🗓</span>
              <span>{movie.Year}</span>
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
}
