
import { MovieContext } from "../context/MovieContext";
import React ,{useContext, useEffect, useState} from 'react';
import axios from 'axios';


export const Favorites = () => {
    const { movies } = useContext(MovieContext)
    console.log(movies);
    const [favorites, setFavorites] = useState([]);

	const postFavorites =async( )=>{
        try{
            const res = await axios.post("http://localhost:8080/api/favorites",{movieId:movies.id, title:movies.title});
            res.data.json
			setFavorites(res.data);
        }catch(err){
            console.error(err)
        }
    }
    const deleteFavorite =async(id)=>{
        try{
            const res = await axios.delete(`http://localhost:8080/api/favorites/${id}`);
            //console.log(res.data);
            setFavorites(res.data);
        }catch(err){
            console.error(err)
        }
    };

	// useEffect({
	// 	postFavorites()
	// },[])
	

	return (
		<>
        	<table className='table table-dark mt-5 text-center'>
				<thead>
					<tr>
						<th className='text-center'>Favorite Movie Id</th>
						<th className='text-center'>Favorite Movie Title</th>
						<th className='text-center'>Add To Favorites</th>
						<th className='text-center'>Delete Movie</th>
					</tr>
				</thead>
				<tbody>
                {/* aca voy a mapear el array de favorites que me venga por el useContext*/}
                { movies.map(movie =>(
                <tr key={movie.id}>
                    <td>{movie.id}</td>
                    <td>{movie.title}</td>
					<td><button className="btn btn-success" onClick={( )=>postFavorites( )}>
                        Add Favorite</button>
                    </td>
                    <td><button className="btn btn-danger" onClick={()=>deleteFavorite(movie.id)}>
                        Delete Favorite</button>
                    </td>
                </tr> 
                )) }
				
				</tbody>
			</table>
		</>
	);
};
