import React from 'react';
import {useParams} from 'react-router-dom';
import { useEffect, useState } from "react";
import { UserContext } from '../context/UserContext';

export const UserFavorites = () => {
    const params =useParams()
    const { user } = useContext(UserContext);
   
const getFavoritesFromUser =async(user)=>{
    try{
    const res = await axios.get(`http://localhost:8080/api/users/${user}`);
            res.data.json
            //console.log(res.data);
           // setUsers(res.data);
        }catch(err){
            console.error(err)
        }
    };
const deleteFavoriteFromUser = async(id,user) => {
    try{
        const res = await axios.delete(`http://localhost:8080/api/users/${user}`,{data:{movieId:id,user:user}});
        res.data.json
        
    }catch(err){
        console.error(err)
    }
};
 

useEffect(()=>{
    getFavoritesFromUser();
},[])

    return (
        <>
        	<table className='table table-dark mt-5 text-center'>
				<thead>
					<tr>
						<th className='text-center'>Favorite User Movie Id</th>
						<th className='text-center'>Favorite User Movie Title</th>
						<th className='text-center'>Delete Favorite </th>
					</tr>
				</thead>
				<tbody>
                {/* aca voy a mapear el array de favorites que me venga por axiosGet*/}
                { favorites.map(favorite =>(
                <tr key={favorite.id}>
                    <td>{favorite.id}</td>
                    <td>{favorite.title}</td>
                    <td><button className="btn btn-danger" onClick={()=>deleteFavoriteFromUser(movie.id, user)}>
                        Delete Favorite</button>
                    </td>
                </tr> 
                )) }
				
				</tbody>
			</table>
		</>
    )
}

