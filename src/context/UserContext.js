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
    const getUserById = async(id)=>{
        try{
            const res= await axios.get(`http://localhost:8080/users/${id}`);
            const {data} =res;
            dispatch({type: "GET_USER_BY_ID"},{payload :data.data})
        }catch(err){
            console.error(err)
        }
    }
    
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

