import React,{ useContext } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { useInput } from './utils/custom-hooks'
import axios from 'axios';
import '../form.css';
import { success, error } from "./utils/logs";

export const Login  = () => {
    const { login } = useContext( UserContext );
    const history = useHistory();
    const email = useInput("email");
    const password = useInput("password");

    const handleSubmit = async (e) => {
        e.preventDefault();
       
        try {
          // POST user credentials
          const { data } = await axios.post("http://localhost:8080/api/login", {
            email: email.value,
            password: password.value,
          });
          // Set new state
          console.log(data);
          login(data.data)
          success(`logged user ${data.email}`);
          // Redirect to home page to make a search!
          history.push("/search");
        } catch ( err ) {
          // something's not right...
          error(console.error(err.message));
          //error(response.status, response.statusText);
        }
      };

    return ( 
       <div>
        <section className='container-fluid bg'>
            <section className='row justify-content-center'>
                <section className='col-12 col-sm-6 col-md-3'>
                <form className='form-container' onSubmit={(e)=>handleSubmit(e)}>
                    <div className="form-group">
                        <label for="exampleInputEmail1">Email address</label>
                        <input type="email" 
                        className="form-control" 
                        id="exampleInputEmail1" 
                        aria-describedby="emailHelp" 
                        placeholder="Enter email"
                        {...email}
                        />
                    </div>
                    <div className="form-group">
                        <label for="exampleInputPassword1">Password</label>
                        <input type="password" 
                        className="form-control" 
                        id="exampleInputPassword1" 
                        placeholder="Password"
                        {...password}
                        />
                         <small id="emailHelp" className="form-text text-muted">We'll never share your password with anyone else.</small>
                    </div>
                    
                    <button type="submit" className="btn btn-success btn-block text-white">LOG IN</button>
                    </form>

                </section>
            </section>
        </section>
    </div>    
    );
}
 

