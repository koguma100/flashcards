import React, {useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {  createUserWithEmailAndPassword  } from 'firebase/auth';
import { auth, db } from '../firebase';
import { ref, set, get } from 'firebase/database'
import './styling/Login.css'; 

const Signup = () => {
    const navigate = useNavigate();
 
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [message, setMessage] = useState("Already have an account?");
    const [data, setData] = useState({});
    const [emailUsed, setEmailUsed] = useState(false);
    
    useEffect(() => {
      const checkEmail = async () => {
        try {
          // Reference to the path in the database
          const dataRef = ref(db, 'users/'); 
  
          // Fetch data from the database
          const snapshot = await get(dataRef);
  
          if (snapshot.exists()) {
            // Set data to state
            console.log(snapshot.val());

            setData( data => ({
              ...snapshot.val()
            }));
            setEmailUsed(false);
            Object.values(data).map((value, index) => {
              if (value.email === email) {
                setEmailUsed(true);
              }
            });
          } else {
            console.log('No data available');
          }
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      checkEmail();
    }, [email]);

    const handleAddData = async (key) => {
      if ((email && username) && (password && !emailUsed)) {
        // Create a reference to the location in the database
        const dataRef = ref(db, 'users/' + key);
  
        // Set data at the specified location
        set(dataRef, {
          username: username,
          email: email,
          sets: {}
        })
          .then(() => {
            console.log('Data saved successfully!');
            // Optionally clear the input fields or handle success
          })
          .catch((error) => {
            console.error('Error saving data: ', error);
            // Handle errors here
          });
      } else {
        console.log('Please enter both a key and a value.');
      }
    };
    const onSubmit = async (e) => {
      e.preventDefault()
        
      await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log("signed in");
            console.log(user.uid);
            if (!emailUsed) {
              handleAddData(user.uid);
            }
            console.log("processed data");
            navigate("/");
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
            setMessage(errorMessage);
        });
 
   
    }
 
  return (
    <main >        
        <h1 class="title"> Flashcards </h1> 
        <section class="form">
            <div class="login-form">
                <div>                  
                    <h1> Create An Account </h1>                                                                            
                    <form>  
                        <div>
                            <input
                                type="username"
                                label="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}  
                                required                                    
                                placeholder="Username"/>
                        </div>                                                                                          
                        <div>
                            <input
                                type="email"
                                label="Email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}  
                                required                                    
                                placeholder="Email address"/>
                        </div>
                        <div>
                            <input
                                type="password"
                                label="Create password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)} 
                                required                                 
                                placeholder="Password"/>
                        </div>                                             
                        <button type="submit" onClick={onSubmit}> Sign up </button>                                       
                    </form>
                   
                    <p class="message">
                        { message } {' '}
                        <NavLink to="/" >
                            Sign in
                        </NavLink>
                    </p>                   
                </div>
            </div>
        </section>
    </main>
  )
}
 
export default Signup