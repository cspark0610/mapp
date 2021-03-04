import React, { useState } from "react";
import { Link } from "react-router-dom";
import Movie from './Movie';

export const Search = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const onChange = (e) => {
    e.preventDefault();

    setQuery(e.target.value);

    fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_MAPP}&language=en-US&page=1&include_adult=false&query=${e.target.value}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (!data.errors) {
          setResults(data.results);
        }else{
          setResults([]);
          setQuery("")
        } 
      });
    
  };

  return (
    <>
        <div className="search-container">
        <Link to='/favorites' style={{ color: "white" }}>
					<span className='navbar-brand'>MOVIE LIST</span>
				</Link>
				<Link to='/users' style={{ color: "white" }}>
					<span className='navbar-brand'>VIEW USERS</span>
				</Link>
        <input
            className='search'
            type='search'
            placeholder='Search...'
            value={query}
            onChange={onChange}
        />
        </div>
   
    <div className='movie-container'>
    {results.length > 0 && results.map((movie) => <Movie key={movie.id} movie={movie} />)}
    </div>
    </>
  )
};
