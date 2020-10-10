import React, { useContext } from 'react';
import { Route } from 'react-router-dom';
import { Redirect } from 'react-router';
import { AuthContext } from '../contexts/AuthContext';


const ProtectedRoute = ({ component: Component, ...rest }) => {
    const {token} = useContext(AuthContext);
    return (
        <Route {...rest} render=
        {
            () => token ? (<Component/>)
                            :(<Redirect to={{ pathname: "/login" }} />)
        } 
    />
    )
    }
export default ProtectedRoute;