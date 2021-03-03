import React, { createContext, useReducer , useEffect} from 'react';

import UserReducer from "./UserReducer";


const initialUsers = {
    user: localStorage.getItem("user") !=='undefined'? JSON.parse(localStorage.getItem("user")) : {},
   
    };

// initialUser , es el array de users adentro de este objeto
export const UserContext = createContext(initialUsers);
 
export const UserProvider = ( props )=>{
    //console.log(initialUsers.user);
    
    const [state, dispatch] = useReducer(UserReducer, initialUsers);
    
    useEffect(() => {
        //primero se pasa a string y luego se setea el state con .parse
        localStorage.setItem("user", JSON.stringify(state.user));   
    }, [state]);

    const login = (id)=> {
        console.log('soy el id del login', id);
        dispatch({type :"LOGIN" , payload:id })
    };

    const logout = ()=> {
        dispatch({type :"LOGOUT"})
       
    };
    
    return(
        <UserContext.Provider 
        value={{ user: state.user, 
                 login, 
                 logout,
                 
               }}>
            {props.children}
        </UserContext.Provider>
    );
};

