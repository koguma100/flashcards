import React, {useState} from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {  createUserWithEmailAndPassword  } from 'firebase/auth';
import { auth } from '../firebase';
import './styling/Login.css'; 

const Signup = () => {
    const navigate = useNavigate();
 
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
 
    const onSubmit = async (e) => {
      e.preventDefault()
     
      await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            
            console.log(user);
            navigate("/login")
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
            // ..
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
                        Already have an account?{' '}
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