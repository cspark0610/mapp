import React ,{ useContext }from 'react';
import { useEffect, useState } from "react";
import { UserContext } from '../context/UserContext';
import { MovieContext } from '../context/MovieContext';
import { Link, useHistory } from 'react-router-dom';
import { RiArrowGoBackFill } from "@react-icons/all-files/ri/RiArrowGoBackFill";
import { BsFillTrashFill } from "react-icons/bs";
import axios from 'axios';


export const UserFavorites = () => {
    // user es el nro de id del usuario logueado
    const { user } = useContext(UserContext);
    const { movies } = useContext(MovieContext);
    
    //console.log(movies);

    const history = useHistory();
    const [favorites, setFavorites] = useState([]);

const getFavoritesFromUser =async(user)=>{
    try{
    const res = await axios.get(`http://localhost:8080/api/users/${user}`);
          res.data.json
            //console.log(res.data);
          setFavorites(res.data);
        }catch(err){
            console.error(err)
        }
    };
const deleteFavoriteFromUser = async(id) => {
    try{
        const res = await axios.delete(`http://localhost:8080/api/favorites/${user}`,{data:{movieId:id}});
        res.data.json
        setFavorites(res.data);
    }catch(err){
        console.error(err)
    }
};
 
useEffect(()=>{
    getFavoritesFromUser(user);
},[]);
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
						<th className='text-center'> User Favorite Id</th>
						<th className='text-center'> User Favorite Title</th>
						<th className='text-center'> Delete Favorite </th>
					</tr>
				</thead>
				<tbody>
                {/* aca voy a mapear el array de favorites que me venga por axiosGet*/}
                { favorites.map(favorite =>{
                    
                return(
                <tr key={favorite.id}>
                    <td>{favorite.id}</td>
                    <td>{favorite.title}</td>
                    <td><button className="btn btn-danger" onClick={()=>deleteFavoriteFromUser(favorite.id)}>
                    <BsFillTrashFill/> Delete Favorite</button>
                    </td>
                </tr> 
                )}
                )}
				
				</tbody>
			</table>
		</>
    )
}

