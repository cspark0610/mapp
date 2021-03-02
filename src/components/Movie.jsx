import React,{useContext} from "react";
import { MovieContext } from "../context/MovieContext";


const IMG_API = "https://image.tmdb.org/t/p/w1280";
const IMG_DEFAULT ="https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80";

const Movie = ({ movie }) =>{
	
	//voy a usar la funcion addMovie con useContext
	//y el array movies para habilitar o deshabilitar el boton
	const {addMovie, movies } = useContext(MovieContext);

	let movieStored = movies.find(item => item.id === movie.id);
	let invalidateButton = movieStored ? true :false
	
	return(
	
	<div className='movie'>
	<button id="add" className="btn btn-primary"
	onClick={()=> addMovie( movie )}
	disabled={invalidateButton}
	>Add To MovieList</button>
		
	<img src={movie.poster_path ? IMG_API + movie.poster_path : IMG_DEFAULT} alt={movie.title} />
		
		<div className='movie-info'>
			<h3>{movie.title}</h3>
			<span id ="tag" className={`${setVoteClass(movie.vote_average)}`}>{movie.vote_average}</span>
		</div>
		<div className='movie-over'>
			<h2>Overview</h2>
			<p>{movie.overview}</p>
		</div>	
	</div>
	)
};

export default Movie;

// retorno con esta funcion setVoteClass el className 'tag green' 
//'tag orange' y 'tag red' de acuerdo al vote_average

const setVoteClass = (vote) => {
	if (vote > 8) {
		return "green";
	} else if (vote > 5) {
		return "orange";
	} else {
		return "red";
	}
};
