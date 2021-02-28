
import { GlobalContext } from "../context/GlobalState";
import React ,{useContext} from 'react';
//import axios from 'axios';

export const Favorites = () => {
    const { favorites, deleteMovieFromFavorites } = useContext(GlobalContext)

    console.log(favorites);

	return (
		<>
        	<table className='table mt-5 text-center'>
				<thead>
					<tr>
						<th className='text-center'>Favorite Movie Id</th>
						<th className='text-center'>Favorite Movie Title</th>
						<th className='text-center'>Delete Favorite</th>
					</tr>
				</thead>
				<tbody>
                {/* aca voy a mapear el array de favorites que me venga por el useContext*/}
                { favorites.map(favorite =>(
                <tr key={favorite.id}>
                    <td>{favorite.id}</td>
                    <td>{favorite.title}</td>
                    <td><button className="btn btn-danger" onClick={()=>deleteMovieFromFavorites(favorite.id)}>
                        Delete Favorite</button>
                    </td>
                </tr> 
                )) }
				
				</tbody>
			</table>
		</>
	);
};
