import React, { useEffect, useState } from "react";
import { Link, useParams } from 'react-router-dom';

import axios from 'axios';

//import React from 'react'

export const Users = () => {
    const {id} = useParams('/:id')
    //console.log( id );

    const [users, setUsers] = useState([])
    const getUsers =async()=>{
        try{
            const res = await axios.get("http://localhost:8080/api/users");
            //console.log(res.data);
            setUsers(res.data);
        }catch(err){
            console.error(err)
        }
    }
    const deleteUser =async(id)=>{
        try{
            const res = await axios.delete(`http://localhost:8080/api/users/${id}`);
            //console.log(res.data);
            setUsers(res.data);
        }catch(err){
            console.error(err)
        }
    }
    useEffect(()=>{
        getUsers();
    },[])

    return (
		<>
			<table className='table table-dark mt-5 text-center'>
				<thead>
					<tr>
						<th className='text-center'>User ID</th>
						<th className='text-center'>User Email</th>
						<th className='text-center'>Delete User</th>
					</tr>
				</thead>
				<tbody>
                {/* aca voy a mapear el array de users que me venga por el pedido axios	*/}
                { users.map(user =>(
                <tr key={user.id}>
                    <td>{user.id}</td>
                    <td><Link to='/users/1' style={{color:'white'}}>{user.email}</Link></td>
                    <td><button className="btn btn-danger" onClick={()=>deleteUser(user.id)}>
                        Delete</button>
                    </td>
                </tr> 
                )) }
				
				</tbody>
			</table>
		</>
	);
}


