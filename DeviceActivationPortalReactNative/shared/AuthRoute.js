import React from 'react';
import { Navigate } from "react-router-dom";
import { AuthenticationService } from "./AuthenticationService"
import PropTypes from "prop-types";

export const RequireAuth = (props) => {
    const isLoggedIn = AuthenticationService.instance.isLoggedIn();
    // const isLoggedIn = true;

    if(!isLoggedIn) {
        return <Navigate replace to="/login" />    
    }
    if(props.requiredRule && 
        AuthenticationService.instance.hasRule(props.requiredRule) === false) {
        // return <Navigate replace to="/login" />
        return null;
    }

    return <props.Component/>

}

RequireAuth.propTypes = {
    requiredRule: PropTypes.string,
    Component: PropTypes.Component,
};