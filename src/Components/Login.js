import React, {useState} from 'react';
import {  signInWithEmailAndPassword   } from 'firebase/auth';
import { auth } from '../firebase';
import { NavLink, useNavigate } from 'react-router-dom'
import './styling/Login.css';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState("No account yet?");
       
    const onLogin = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            navigate("/home")
            console.log(user);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
            setMessage(errorMessage);
        });
       
    }
 
    return(
        <>
            <main >
                <h1 className="title"> Flashcards </h1>        
                <section className="form">
                    <div className="login-form">                                            
                        <h1> Welcome Back </h1>                                 
                        <form>                                              
                            <div>
                                <input
                                    id="email-address"
                                    name="email"
                                    type="email"                                    
                                    required                                                                                
                                    placeholder="Email Address"
                                    onChange={(e)=>setEmail(e.target.value)}/>
                            </div>
                            <div>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"                                    
                                    required                                                                                
                                    placeholder="Password"
                                    onChange={(e)=>setPassword(e.target.value)}/>
                            </div>           
                            <div>
                                <button onClick={onLogin}>Login</button>
                            </div>                               
                        </form>
                       
                        <p className="message">
                            { message } {' '}
                            <NavLink to="/signup">Sign up</NavLink>
                        </p>                           
                    </div>
                </section>
            </main>
        </>
    )
}
 
export default Login