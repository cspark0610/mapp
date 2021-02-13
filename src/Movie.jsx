import React from "react";
const IMG_API = "https://image.tmdb.org/t/p/w1280";
const URL ="https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80"

export default Movie = ({ title, poster_path, overview, vote_average }) => (
	<div className='movie'>
		<img src={poster_path ? IMG_API + poster_path : URL} alt={title} />
		<div className='movie-info'>
			<h3>{title}</h3>
			<span className={`${setVoteClass(vote_average)}`}>{vote_average}</span>
		</div>

		<div className='movie-over'>
			<h2>Overview</h2>
			<p>{overview}</p>
		</div>
	</div>
);
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
