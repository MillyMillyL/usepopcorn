import { useState, useEffect } from "react";
const KEY = "18655bb3";

export function useMovies(query) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function fetchData() {
      try {
        setIsLoading(true);
        setError("");

        const response = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
          { signal: controller.signal }
        );

        if (!response.ok)
          throw new Error("Something went wrong while fetching movies");

        const data = await response.json();

        if (data.Response === "False") throw new Error("Movie not found");

        setMovies(data.Search);
        setError("");
      } catch (err) {
        if (err.name !== "AbortError") setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    if (query.length < 3) {
      setMovies([]);
      setError("");
      return;
    }

    fetchData();

    return function () {
      controller.abort();
    };
  }, [query]);

  return { movies, isLoading, error };
}
