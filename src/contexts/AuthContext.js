import React, { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext();

const AuthContextProvider = (props) => {
    const [token, settoken] = useState(localStorage.getItem('token'));
    const [user, setUser] = useState(localStorage.getItem('user'))
    
    useEffect(()=>{
        settoken(localStorage.getItem('token'))
        setUser(localStorage.getItem('user'))
    }, [localStorage.getItem('token')])


    
    return ( 
        <AuthContext.Provider value={{token, settoken, user, setUser}}>
            {props.children}
        </AuthContext.Provider>
     );
}
 
export default AuthContextProvider;

