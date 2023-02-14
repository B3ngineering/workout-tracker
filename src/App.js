import React, { useState, useEffect }  from 'react';
import {BrowserRouter as Router, Routes, Route, Link, Navigate} from "react-router-dom";
import { db, signInWithGoogle} from './firebase-config';
import './App.css';
import {collection, getDocs, addDoc, updateDoc, doc, deleteDoc} from 'firebase/firestore';
import Home from "./pages/Home"
import Login from "./pages/Login"
import Workouts from "./pages/Workouts"
import Progress from "./pages/Progress"
import { signOut } from 'firebase/auth';
import {auth} from "./firebase-config";



function App() {

  const [isAuth, setIsAuth] = useState(false);

  //Handle user sign in and out
  const signUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear()
      setIsAuth(false)
      window.location.pathname = "/login";
    })
  }

  return (

      <Router>
        <nav>
          <Link to="/"> Home </Link>
          <Link to="/workouts"> Workouts </Link>
          <Link to="/progress"> Progress </Link>
          {!isAuth ? (
            <Link to="/login"> Login </Link>
          ) : (
            <Link onClick={signUserOut} to="/"> Log Out </Link>
          )}
        </nav>
        <Routes>
          <Route path="/" element={<Home isAuth={isAuth}/>} />
          <Route path="/login" element={<Login setIsAuth={setIsAuth}/>} />
          <Route path="/workouts" element={<Workouts isAuth={isAuth}/>} />
          <Route path="/progress" element={<Progress isAuth={isAuth}/>} />
        </Routes>

      </Router>
  );


}

export default App;
