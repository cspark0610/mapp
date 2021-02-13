import React, { useState, useEffect } from "react";
import "./App.css";
import Movie from "./Movie";

const App = ()=>{
  //quiero renderizar inicialmente en el home las peliculas mas populares con FEATURED_API
	const FEATURED_API =
		"https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";

	const SEARCH_API =
		"https://api.themoviedb.org/3/discover/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

	const [movies, setMovies] = useState([]);
  //movies es un array con estado inicial [] que luego sera rellenado 
  //de acuerdo al useEffect
	const [searchMovie, setSearchMovie] = useState("");

	const getMovies = () => {
		fetch(FEATURED_API)
			.then( res => res.json())
			.then( data  => {
				console.log(data);
				setMovies(data.results);
			});
	};

	useEffect(() => {
		getMovies(FEATURED_API);
	}, []);

	const handleInput = (e) => {
    //https://reactgo.com/react-get-input-value/
		setSearchMovie(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (searchMovie) {
			getMovies(SEARCH_API + searchMovie);
      //si el usuario apreta enter y hace la busqueda 
      //seteo la var searchMovie a ""
			setSearchMovie("");
		}
	};

	return (
		<>
			<header className='header'>
				<form onSubmit={handleSubmit}>
				<input
					className='search'
					type='search'
					placeholder='Search...'
					value={searchMovie}
					onChange={handleInput}
				/>
        </form>
			</header>

      <div className='movie-container'>
			{movies.length > 0 && movies.map((movie) => <Movie key={movie.id} {...movie} />)}
			</div>
		</>
	);
}

export default App;
