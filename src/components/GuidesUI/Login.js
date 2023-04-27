import React, { useState } from 'react'
import './Login.css'
import { Link, useNavigate} from 'react-router-dom'
import {  signInWithEmailAndPassword } from "firebase/auth";
import { toast } from 'react-toastify'
import { auth } from '../../Firebase'

export default function Login() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  let navigate = useNavigate()

  const handleLogin = () =>{
    if(!email || !password){
      toast.error("Please input all fields")
    } else {
      signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        navigate('/guides')      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        toast.error(errorMessage)
      });
    }
    
  }

  return (
    <div id='login-page'>
      <div id='credentials-container'>
        <input className='login-input' placeholder='Email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
        <input className='login-input' type='password' placeholder='Password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
        <button id='login-btn' onClick={handleLogin}>Login</button>

        <Link to='/reset-password'>Forgotten Password?</Link>
      </div>
      
    </div>
  )
}
