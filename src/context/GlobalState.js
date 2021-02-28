import React, { createContext, useReducer, useEffect } from "react";
import AppReducer from "./AppReducer";

//https://medium.com/analytics-vidhya/crud-with-react-hooks-a5b186b4732
//https://reactjs.org/docs/context.html?

// initial state , es el array de favorites
const initialState = {
  favorites: localStorage.getItem("favorites")
    ? JSON.parse(localStorage.getItem("favorites"))
    : [],
 
};

// create context
export const GlobalContext = createContext(initialState);

// provider components
export const GlobalProvider = (props) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  useEffect(() => {
    //primero se pasa a string y luego se setea el state con .parse
    localStorage.setItem("favorites", JSON.stringify(state.favorites));
   
  }, [state]);

  // TWO actions agregar a la tabla de favoritos desde el compoenete Movie
  const addMovieToFavorites = (movie) => {
    dispatch({ type: "ADD_MOVIE_TO_FAVORITES", payload: movie });
  };
  // desde el componente Favorites voy a usar esta accion delete
  const deleteMovieFromFavorites = (id) => {
    dispatch({ type: "DELETE_MOVIE_FROM_FAVORITES", payload: id });
  };


  return (
    <GlobalContext.Provider
      value={{
        favorites: state.favorites,
        addMovieToFavorites,
        deleteMovieFromFavorites,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
  
};
