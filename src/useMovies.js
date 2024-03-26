import { useState, useEffect } from "react";

const KEY = "356eae85";
//a custom hook needs to use atleast one hook otherwise its a regular function
export function useMovies(query) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(
    function () {
      // if there is a callback func call it
      //   callback?.();
      //abort controller browser api
      const controller = new AbortController();

      async function fetchMovies() {
        try {
          setIsLoading(true);
          setError("");
          const res = await fetch(
            `http://www.omdbapi.com/?i=tt3896198&apikey=${KEY}&s=${query}`,
            //to cancel a req if another request is made
            { signal: controller.signal }
          );
          //error handling
          if (!res.ok)
            throw new Error("Something went wrong with fetching movies");
          //convert data into json
          const data = await res.json();
          //you can fetch a movie that does not exist
          if (data.Response === "False") throw new Error("Movie not Found");

          setMovies(data.Search);

          setError("");
        } catch (err) {
          //once a request is cancelled an abort controller throws an error,
          if (err.name !== "AbortError") {
            console.log(err.message);
            setError(err.message);
          }
          //happens irregardles of whether the request is successfull or not
        } finally {
          setIsLoading(false);
        }
      }
      if (query.length < 3) {
        setMovies([]);
        setError("");
        return;
      }

      //close the movie details before calling the function
      //   handleCloseMovie();
      //calling the function

      fetchMovies();
      //clean up func, this will cancel a request if another request is made
      //we want to cancel a request every time a new request comes in
      //so no more race conditions, and we prevent unnecessary data from being fetched
      return function () {
        controller.abort();
      };
    },
    [query]
  );
  return { movies, isLoading, error };
}
