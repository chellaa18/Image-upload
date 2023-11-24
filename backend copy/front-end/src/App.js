import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Registration from "./components/register/Registration";
import Login from "./components/login/Login";
import Dashboard from "./components/dashboard/Dashboard";

import EditUser from "./components/editUser/EditUser";
import AddProducts from "./components/addproducts/AddProducts";
import Home from "./components/home/Home";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import GetAccount from "./components/metamask/GetAccount";
import ReadContract from "./components/metamask/ReadContract";
import Admin from "./components/admin/Admin";
import AdminLogin from "./components/login/AdminLogin";
import TestNet from "./components/metamask/TestNet";
// import CKEditorComponent from './components/admin/contents/CKEditorComponent';

// function PrivateRoute({ component }) {
//   const isAuthenticated = localStorage.getItem("loggedInUser"); // Your authentication logic here

//   if (isAuthenticated) {
//     return component;
//   } else {

//     return <Navigate to="/login" />;
//   }
// }

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/login" element={<Login />} />

        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/edituser/:id" element={<EditUser />} />
        <Route path="/addproducts" element={<AddProducts />} />

        <Route path="/getaccount" element={<GetAccount />} />
        <Route path="/readcontract" element={<ReadContract />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/adminlog" element={<AdminLogin />} />
        <Route path="/testnet" element={<TestNet />} />
        {/* <Route path="/ckeditor" element={<CKEditorComponent />} /> */}
      </Routes>

      <ToastContainer />
      
    </div>
  );
}

export default App;
