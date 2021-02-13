import React, { useState, useEffect } from "react";
import "./App.css";
import Movie from "./Movie";

const App = ()=>{
	const FEATURED_API =
		"https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";

	const SEARCH_API =
		"https://api.themoviedb.org/3/discover/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

	const [movies, setMovies] = useState([]);
	const [searchMovie, setSearchMovie] = useState("");

	const getMovies = () => {
		fetch(FEATURED_API)
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				setMovies(data.results);
			});
	};

	useEffect(() => {
		getMovies(FEATURED_API);
	}, []);

	const handleOnChange = (e) => {
		setSearchMovie(e.target.value);
	};

	const handleOnSubmit = (e) => {
		e.preventDefault();
		if (searchMovie) {
			getMovies(FEATURED_API + searchMovie);
			setSearchMovie("");
		}
	};

	return (
		<>
			<header className='header'>
				<form onSubmit={handleOnSubmit} />
				<input
					className='search'
					type='search'
					placeholder='Search...'
					value={searchMovie}
					onChange={handleOnChange}
				/>
			</header>

			<div className='movie-container'>
				{movies.length > 0 && movies.map((movie) => <Movie key={movie.id} {...movie} />)}
			</div>
		</>
	);
}

export default App;
