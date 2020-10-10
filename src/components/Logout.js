import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../contexts/AuthContext';

const Logout = () => {
    const { settoken, setUser } = useContext(AuthContext);

    useEffect(()=>{
        localStorage.setItem('token', '')
        localStorage.setItem('user', '')
        localStorage.setItem('email', '')
        settoken('');
        setUser('');
        
    }, []);

    return ( 
        <div>
            <h4>You logged out.. Thanks for your message</h4>
        </div>
    );
}
 
export default Logout;