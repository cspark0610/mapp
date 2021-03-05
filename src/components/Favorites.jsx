
import { MovieContext } from "../context/MovieContext";
import { UserContext } from "../context/UserContext";
import React ,{useContext, useEffect, useState} from 'react';
import { useHistory, Link } from 'react-router-dom';
import { RiArrowGoBackFill } from "@react-icons/all-files/ri/RiArrowGoBackFill";
import { BsPlusSquare, BsXSquare } from "react-icons/bs";

import axios from 'axios';


export const Favorites = () => {
    const { movies, cancelMovie } = useContext(MovieContext)
    const { user } = useContext(UserContext)
    const history = useHistory();

    console.log(movies);
    const [favorites, setFavorites] = useState([]);

    //
	const postFavorites =async( id ,title, user)=>{
        //console.log(id , title);
        //console.log(user);
        try{
            const res = await axios.post("http://localhost:8080/api/favorites",{movieId: id, title: title, user:user});
            res.data.json
			setFavorites(res.data);
        }catch(err){
            console.error(err)
        }
    }
    const goBackHandle = () => {
        history.goBack();
    }
    const goBackStyle = {
        color: "white",
        textDecoration:"none"
    }
 	
	return (
		<>
        <div className='goback'>
        <Link to="*" onClick={goBackHandle} style={goBackStyle}><h5><RiArrowGoBackFill/> Go Back</h5></Link>
        </div>
        	<table className='table table-dark mt-5 text-center'>
				<thead>
					<tr>
						<th className='text-center'>Favorite Movie Id</th>
						<th className='text-center'>Favorite Movie Title</th>
						<th className='text-center'>Add To Favorites</th>
						<th className='text-center'>Cancel Movie</th>
						
					</tr>
				</thead>
				<tbody>
                {/* aca voy a mapear el array de movies que me venga por el useContext*/}
                { movies.map(movie =>{
                    //console.log(movie.id);
                    return(
                <tr key={movie.id}>
                    <td>{movie.id}</td>
                    <td>{movie.title}</td>
					<td><button className="btn btn-success" onClick={()=>postFavorites(movie.id,movie.title,user )}>
                    <BsPlusSquare/>  Add Favorite</button>
                    </td>
                    <td><button className="btn btn-danger" onClick={()=>cancelMovie(movie.id)}>
                    <BsXSquare/>  Cancel Movie</button>
                    </td>
                </tr> 
                )}
                )}
				
				</tbody>
			</table>
		</>
	);
};
