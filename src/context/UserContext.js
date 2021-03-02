import React, { createContext, useReducer , useEffect} from 'react';

import UserReducer from "./UserReducer";


const initialUsers = {
    //user:localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {},
    user: {}
};

// initialUser , es el array de users adentro de este objeto
export const UserContext = createContext(initialUsers);
 
export const UserProvider = ( props )=>{
    
    const [state, dispatch] = useReducer(UserReducer, initialUsers);
    
    useEffect(() => {
        //primero se pasa a string y luego se setea el state con .parse
        localStorage.setItem("user", JSON.stringify(state.user));   
    }, [state]);

    const login = (id)=> {
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

