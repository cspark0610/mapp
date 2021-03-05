import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import Movie from './Movie';
import { UserContext } from '../context/UserContext';
import { MdMovieFilter } from "@react-icons/all-files/md/MdMovieFilter";
import { FiUsers } from "@react-icons/all-files/fi/FiUsers";
import { SiThemoviedatabase } from "@react-icons/all-files/si/SiThemoviedatabase";


export const Search = ( ) => {
  const { user } = useContext(UserContext);
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
  const linksStyle={
    color:"white"
  }

  return (
    <>
        <div className="search-container">
            <div className="links-container">
              <Link to={`/users/${user}`} style={linksStyle}>	<span className='navbar-brand'><SiThemoviedatabase/>YOUR FAVORITES</span></Link>  
              <Link to='/favorites' style={linksStyle}><span className='navbar-brand'> <MdMovieFilter/>MOVIE LIST</span></Link>
              <Link to='/users' style={linksStyle}><span className='navbar-brand'><FiUsers/>VIEW USERS</span></Link>
            </div>
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
