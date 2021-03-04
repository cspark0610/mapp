import React, { useEffect, useState, useContext } from "react";
import { Link,  useHistory } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

import axios from 'axios';


export const Users = () => {
    const { user } = useContext(UserContext)
    const history = useHistory();
    const [users, setUsers] = useState([]);
  

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
    },[]);

    const goBackHandle = () => {
        history.goBack();
    };
   
    const goBackStyle = {
        color: "white",
        textDecoration:"none"
    };

    return (
		<>
        <div className='goback'>
        <Link to="*" onClick={goBackHandle} style={goBackStyle}><h5>Go Back</h5></Link>
        </div>
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
                { users.map(u =>(
                <tr key={u.id}>
                    <td>{u.id}</td>
                    <td>{u.email}</td>
                    <td>{u.id===user
                        ?
                        <button className="btn btn-danger"  onClick={()=>deleteUser(u.id)}>
                        Delete</button>
                        :null
                    }</td>
                </tr> 
                )) }
				
				</tbody>
			</table>
		</>
	);
}


