import React, { createContext, useReducer, useEffect } from "react";
import MovieReducer from "./MovieReducer";

//https://medium.com/analytics-vidhya/crud-with-react-hooks-a5b186b4732
//https://reactjs.org/docs/context.html?

// initial state , es el array de favorites
const initialState = {
  movies: localStorage.getItem("movies")
    ? JSON.parse(localStorage.getItem("movies"))
    : [],
 
};

// create context
export const MovieContext = createContext(initialState);

// provider components
export const MovieProvider = (props) => {
  const [state, dispatch] = useReducer(MovieReducer, initialState);

  useEffect(() => {
    //primero se pasa a string y luego se setea el state con .parse
    localStorage.setItem("movies", JSON.stringify(state.movies));
   
  }, [state]);

  // TWO actions agregar a la tabla de favoritos desde el compoenete Movie
  const addMovie = (movie) => {
    dispatch({ type: "ADD_MOVIE", payload: movie });
  };
  // desde el componente Favorites voy a usar esta accion delete
  const deleteMovieFromFavorites = (id) => {
    dispatch({ type: "DELETE_MOVIE_FROM_FAVORITES", payload: id });
  };


  return (
    <MovieContext.Provider
      value={{
        movies: state.movies,
        addMovie,
        deleteMovieFromFavorites,
      }}
    >
      {props.children}
    </MovieContext.Provider>
  );
  
};
