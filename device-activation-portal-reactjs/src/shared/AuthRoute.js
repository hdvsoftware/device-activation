import React from 'react';
import { Navigate } from "react-router-dom";
import { AuthenticationComponent } from "./AuthenticationComponent"
import PropTypes from "prop-types";

export const RequireAuth = (props) => {
    const isLoggedIn = AuthenticationComponent.instance.isLoggedIn();
    // const isLoggedIn = true;

    if(!isLoggedIn) {
        return <Navigate replace to="/login" />    
    }
    if(props.requiredRule && 
        AuthenticationComponent.instance.hasRule(props.requiredRule) === false) {
        // return <Navigate replace to="/login" />
        return null;
    }

    return <props.Component/>

}

RequireAuth.propTypes = {
    requiredRule: PropTypes.string
};