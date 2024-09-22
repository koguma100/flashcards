import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from '../firebase';
import {  signOut } from "firebase/auth";
import { useNavigate, useLocation } from 'react-router-dom';
import './styling/Home.css';
import { get, ref } from "firebase/database";

const Home = () => {
    const [userInfo, setUserInfo] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const [data, setData] = useState({});
    const [dataLoaded, setDataLoaded] = useState(false);

    const handleLogout = () => {               
      signOut(auth).then(() => {
      // Sign-out successful.
          navigate("/");
          console.log("Signed out successfully")
      }).catch((error) => {
        console.log(error);
      });
    }
     
    const createNewSet = () => {
      navigate("/new");
    }

    const viewSet = (title, userData) => {
      navigate('/view', { state: { title: title , userData: userData} });
    };

    useEffect(()=>{
        onAuthStateChanged(auth, (user) => {
            if (user) {
              // User is signed in, see docs for a list of available properties
              // https://firebase.google.com/docs/reference/js/firebase.User
              setUserInfo(user.uid);              
            } else {
              // User is signed out
              // ...
              console.log("user is logged out")
            }
          });
         
    }, [auth])

    useEffect(() => {
      const fetchData = async () => {
        try {
          // Reference to the path in the database
          const dataRef = ref(db, 'users/' + auth.currentUser.uid); 
  
          // Fetch data from the database
          const snapshot = await get(dataRef);
  
          if (snapshot.exists()) {
            // Set data to state
            console.log(snapshot.val());

            setData( data => ({
              ...snapshot.val()
            }));
            console.log(data)
            setDataLoaded(true);
          
          } else {
            console.log('No data available');
          }
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      fetchData();
    }, [userInfo, location]);
 
  return (
    <section>
      <div className="navigation">
        <h1 className="title no-select"> Welcome back, { data.username }!</h1>
        <button className="logout-button no-select" onClick={handleLogout}>Logout</button>
      </div>
         
      <div className="card-sets top-border">
        <h2 className="no-select">Flashcard Sets</h2>
        { dataLoaded && "sets" in data? 
          Object.entries(data.sets).map(([key]) => (
            <div className="card-block-wrapper" key={key} onClick={() => viewSet(key, data)}>
              
              <div className="flash-card-block no-select">
                {/* <div className="card-set-image-wrapper">
                  <img className="card-set-image" src="#"></img>
                </div>  */}
                <div className="card-set-Name">{key}</div> 
              </div>
            </div>
          ))
          : !dataLoaded ? <div className="card-block-wrapper">
              <div className="spinner"></div>
            </div>
            : <div></div>
        }
        <div className="card-block-wrapper">
          <div className="flash-card-block no-select" onClick={createNewSet}> 
            <div className="plus-symbol"> + </div>
            Create new set 
          </div>
        </div>

      </div>
      
    </section>
  )
}
 
export default Home
 