import React from 'react'
import {auth, provider} from "../firebase-config";
import {signInWithPopup} from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';


function Login({setIsAuth}) {

  //Signing in with Google
  let navigate = useNavigate();
  const signInWithGoogle = () => {
    signInWithPopup(auth, provider).then((result) => {
    setIsAuth(true);
    navigate("/")
    const name = result.user.displayName;
    const email = result.user.email;

    //User information, add id
    localStorage.setItem("name", name)
    localStorage.setItem("email", email)
    
    }).catch((error) => {
    console.log(error);
    });
  }

  return (
    <div className="loginpage">
      <p>Sign in with Google to continue</p>
      <Button className="login-with-google-btn" onClick={signInWithGoogle}>
        Sign in with Google
      </Button>
    </div>
  )
}

export default Login