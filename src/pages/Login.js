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
    const uid = result.user.uid;
    localStorage.setItem("name", name)
    localStorage.setItem("email", email)
    localStorage.setItem("userid", uid)
    
    }).catch((error) => {
    console.log(error);
    });
  }

  return (
    <div className="loginpage">
      <h3>Please sign in with Google to continue.</h3>
      <div className="login-button">
      <Button className="login-with-google-btn" size="large" onClick={signInWithGoogle}>
        Sign in with Google
      </Button>
      </div>
    </div>
  )
}

export default Login