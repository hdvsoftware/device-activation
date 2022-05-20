import React from 'react'
import logo from './logo.svg';
import './App.css';

import { BrowserRouter as Router, Routes, Route, Navigate, useRoutes } from 'react-router-dom';

import Login from './components/login';
import CustomerList from './components/customer/customer-list';
import CustomerDetail from './components/customer/customer-detail';
import CustomerEdit from './components/customer/customer-edit';

import DeviceEdit from './components/device/device-edit';

import { RequireAuth } from './shared/AuthRoute';
import { ApiClient } from './generated/api';
import { CustomApiClient } from './CustomApiClient';
import { Menu } from './components/menu';
import { AuthenticationComponent } from './shared/AuthenticationComponent';

// import { AuthenticationComponent } from './shared/AuthenticationComponent';

const CreateRoutes = () => {
  let routes = useRoutes([
    { path:"", element: <Navigate replace to="/omgevingen" /> },
    { path: "/omgevingen", element: <RequireAuth Component={CustomerList}/> },
    { path: "/omgevingen/new", element: <RequireAuth requiredRule="customer-add" Component={CustomerList}/> },
    { path: "/omgevingen/:id", element: <RequireAuth Component={CustomerDetail}/> },
    { path: "/omgevingen/:id/edit", element: <RequireAuth requiredRule="customer-edit" Component={CustomerEdit}/> },
    // { path: "/omgevingen/:id/device", element: <Navigate replace to="/omgevingen/:id"/> },
    { path: "/omgevingen/:id/device/new", element: <RequireAuth requiredRule="device-add" Component={DeviceEdit}/> },
    { path: "/omgevingen/:id/device/:deviceId", element: <RequireAuth requiredRule="device-update" Component={DeviceEdit}/> },
    { path: "/login", element: <Login /> },
    { path: "*", element: <Navigate replace to="/"/> },
  ]);
  return routes;
}

function App() {
  ApiClient.instance = new CustomApiClient();
  ApiClient.instance.basePath = "http://localhost:8080"
  return (
    <div>
      
    
    <Router >
      {/* {AuthenticationComponent.instance.isLoggedIn() && <Menu />} */}
      <Menu />
      <CreateRoutes />
    </Router >    
    </div>
    
  );
}



export default App;
