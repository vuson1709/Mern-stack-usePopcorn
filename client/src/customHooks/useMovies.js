import { useEffect, useState } from "react";

const KEY = process.env.REACT_APP_OMDBAPI_API_KEY;

export function useMovies(query, callback) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(
    function () {
      callback?.();

      async function fetchMovies() {
        try {
          setIsLoading(true);
          setError("");

          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${KEY}&s="${query}"`
          );

          if (!res.ok) throw new Error("Can't fetch data");

          const data = await res.json();
          // console.log(data);
          if (data.Response === "False") throw new Error(data.Error);

          setMovies(data.Search);
        } catch (err) {
          console.log(err.message);
          setError(err.message);
        } finally {
          setIsLoading(false);
        }
      }

      if (query.length < 3 || !query.trim()) {
        setError("");
        setMovies([]);
        return;
      }

      const timer = setTimeout(fetchMovies, 1000);
      return () => clearTimeout(timer);
    },
    [query]
  );

  return { isLoading, error, movies };
}
