import './styling/Navbar.css'
import React, { useState } from 'react';
import Home from './Home.js';
import Signup from './Signup.js';
import Login from './Login.js';
import { BrowserRouter as Router} from 'react-router-dom';
import { Routes, Route, Navigate } from 'react-router-dom';
import { auth  } from '../firebase.js';
import { onAuthStateChanged } from "firebase/auth";

const Navbar = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
        console.log('User is signed in:', user);
      } else {
        console.log('No user is signed in.');
      }
    });

    return (
      <Router>
        <div>
          <section>
            <Routes>
              <Route path="/" element={<Login />}>Login</Route>
              <Route path="/signup" element={<Signup />}>Sign up</Route>
              <Route path="/home" element={ isAuthenticated ? <Home /> : <Navigate to="/" />}>Home</Route>
            </Routes>
          </section>
        </div>
      </Router>
    );
}


export default Navbar;