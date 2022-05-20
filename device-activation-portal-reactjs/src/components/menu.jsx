import * as React from "react";
  
// importing material UI components
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

import { useNavigate } from 'react-router-dom';

import { AuthenticationComponent } from '../shared/AuthenticationComponent'
  
export function Menu() {
    const navigate = useNavigate();
    if(!AuthenticationComponent.instance.isLoggedIn()) {
        return (
            <div></div>
        )
    }
  return (
    <AppBar position="static">
        <Toolbar>
            { 
            <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}>
                    
                <MenuIcon />
            </IconButton>
            }
            <Button color="inherit" onClick={() => navigate('/omgevingen') }>Omgevingen</Button>
            <span style={{flex: "1 1 auto"}}></span>
        
            <Button color="inherit" onClick={() => AuthenticationComponent.instance.logout()}>Logout</Button>
        </Toolbar>
    </AppBar>
  );
}