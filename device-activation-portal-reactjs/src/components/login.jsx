import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthenticationComponent } from '../shared/AuthenticationComponent';
import Button from "@mui/material/Button";

function Login(props){
   const navigate = useNavigate();
   const [errorMessages, setErrorMessages] = useState({});
   const handleSubmit = (event) => {
      //Prevent page reload
      event.preventDefault();
  
      var { uname, pass } = document.forms[0];
      AuthenticationComponent.instance.login(
         uname.value, 
         pass.value, 
         (result) => {
            if(result.succes) {
              navigate('/omgevingen')
            } else {
              setErrorMessages({ name: "credentials", message: result.message });
            }
         });
        
    };

   const renderErrorMessage = (name) =>
      name === errorMessages.name && (
         <div className="error">{errorMessages.message}</div>
   );

   const renderForm = (
      <div className="form">
        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <label>Gebruikersnaam </label>
            <input type="text" name="uname" required />
          </div>
          <div className="input-container">
            <label>Wachtwoord </label>
            <input type="password" name="pass" required />
          </div>
          <div className="login-errormessages">
            {renderErrorMessage("credentials")}
          </div>
          
          <div className="button-container">
          <Button type="submit">Inloggen</Button>
            {/* <input type="submit"/> */}
          </div>
        </form>
      </div>
    );

    return (
      <div className="app">
        <div className="login-form">
          <div className="title">Login</div>
          {renderForm}
        </div>
      </div>
    );
}
export default Login;