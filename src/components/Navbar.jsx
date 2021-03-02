import React, { useState, useEffect, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { log, success, error } from "./utils/logs";
import axios from 'axios';

export const Navbar = () => {
    const {login ,logout } = useContext(UserContext);
    const history = useHistory();

  //   const [user, setUser] = useState([])
  //   const getUserById =async(id)=>{
  //       try{
  //           const res = await axios.get(`http://localhost:8080/api/users/${id}`);
  //           console.log(res.data);
  //           setUser(res.data);
  //       }catch(err){
  //           console.error(err)
  //       }
  //   };
  //   useEffect(()=>{
  //     getUserById();
  // },[])

    const handleLogout = async () => {
      log("logout attempt...");
      try {
        await axios.post("http://localhost:8080/api/logout");
        logout();
        success("logged out");
        history.push("/");
      } catch (err) {
        error(console.error(err));
      }
    };

   

    return ( 
        <nav className= "navbar navbar-dark bg-dark">
          <div className='container'>
            <span className='navbar-brand'><h4>{"Welcome to OMDB"}</h4></span>
            <Link to="/favorites">MOVIE LIST</Link>
            <Link to="/users">VIEW USERS</Link>
          </div>
         
          <button className="btn btn-primary"><Link to='/register' style={{color:'white'}}>Register</Link></button>
          <button className="btn btn-success" onClick={()=>login()}><Link to='/login' style={{color:'white'}}>LogIn</Link></button>
          <button className="btn btn-danger" onClick={handleLogout}>LogOut</button> 
        
        </nav>


    );
}
 
