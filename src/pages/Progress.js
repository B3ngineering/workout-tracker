import React from 'react'
import { useNavigate } from 'react-router-dom';
import {useEffect, useState} from 'react'

function Progress({isAuth}) {

  //Redirect to login page if user is not logged in
  let navigate = useNavigate();
  useEffect(() => {
  if(isAuth === false){
    navigate('/login')
  }
}, [])

  return (
    <div>
      <h1>Progress is still in progress</h1>
    </div>
  )
}

export default Progress