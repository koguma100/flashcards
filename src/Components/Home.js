import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../firebase';
import {  signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import './styling/Home.css';

const Home = () => {
    const [userInfo, setUserInfo] = useState("");
    const navigate = useNavigate();

    const handleLogout = () => {               
      signOut(auth).then(() => {
      // Sign-out successful.
          navigate("/");
          console.log("Signed out successfully")
      }).catch((error) => {
        console.log(error);
      });
    }

    useEffect(()=>{
        onAuthStateChanged(auth, (user) => {
            if (user) {
              // User is signed in, see docs for a list of available properties
              // https://firebase.google.com/docs/reference/js/firebase.User
              const uid = user.uid;
              // ...
              console.log("uid", uid);
              setUserInfo(uid);
            } else {
              // User is signed out
              // ...
              console.log("user is logged out")
            }
          });
         
    }, [])
 
  return (
    <section>
      <div className="navigation">
        <h1 className="title">Welcome back { userInfo } </h1>
        <button className="logout-button" onClick={handleLogout}>Logout</button>
      </div>
         
      
      <div className="card-sets">
        
        <div className="flash-card-block"> 
          <div className="plus-symbol"> + </div>
          Create new set 
          </div>
      </div>
    </section>
  )
}
 
export default Home
 