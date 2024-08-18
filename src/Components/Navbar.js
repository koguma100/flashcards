import './styling/Navbar.css'
import React, { useState } from 'react';
import Home from './Home.js';
import Signup from './Signup.js';
import Login from './Login.js';
import NewSet from './NewSet.js';
import ViewSet from './ViewSet.js'
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
        setIsAuthenticated(false);
        console.log('No user is signed in.');
      }
    });

    return (
      <Router>
        <div>
          <section>
            <Routes>
              <Route path="/" element={ isAuthenticated ? <Home /> : <Login />}>Login</Route>
              <Route path="/signup" element={ <Signup />}>Sign up</Route>
              <Route path="/home" element={ isAuthenticated ? <Home /> : <Navigate to="/" />}>Home</Route>
              <Route path="/new" element={ isAuthenticated ? <NewSet /> : <Navigate to="/" />}>NewCard</Route>
              <Route path="/view" element={ <ViewSet/> }>ViewSet</Route>
            </Routes>
          </section>
        </div>
      </Router>
    );
}


export default Navbar;