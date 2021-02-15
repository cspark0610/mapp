import React, { useState, useEffect } from "react";
import "./App.css";
import Movie from "./Movie";
 

const App = ()=>{
  //quiero renderizar inicialmente en el home las peliculas mas populares con FEATURED_API
	const HOME_API =
		`https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${process.env.REACT_APP_MAPP}&page=1`;

	const SEARCH_API =
		`https://api.themoviedb.org/3/discover/movie?&api_key=${process.env.REACT_APP_MAPP}&query=`


	
	const [movies, setMovies] = useState([]);
  //movies es un array con estado inicial [] que luego sera rellenado 
  //de acuerdo al useEffect
	const [searchMovie, setSearchMovie] = useState("");

	const getMovies = (API_GENERICA) => {
		fetch(API_GENERICA)
			.then( res => res.json())
			.then( data  => {
				//console.log(data);
				setMovies(data.results);
			});
	};

	useEffect(() => {
		getMovies(HOME_API)
	}, []);

	const handleSubmit = (e) => {
		e.preventDefault();
		if (searchMovie) {
		
			getMovies(SEARCH_API + searchMovie);
			setSearchMovie("");
		}
		console.log(SEARCH_API+searchMovie);
	};


	const handleOnChange = (e) => {
		//https://reactgo.com/react-get-input-value/
			setSearchMovie(e.target.value);
	};
	
	return (
		<>
			<header className='header'>
				<h2 className="title">OMBD</h2>

				<form onSubmit={handleSubmit}>
				<input
					className='search'
					type='search'
					placeholder='Search...'
					value={searchMovie}
					onChange={handleOnChange}
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
