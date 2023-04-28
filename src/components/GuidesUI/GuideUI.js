import React from 'react'
import { Outlet, Link } from 'react-router-dom'
import './GuideUI.css'
import {  signOut } from "firebase/auth";
import { auth } from '../../Firebase'
import logo from '../../Images/iceland-logo-white.png'
export default function GuideUI() {

  const handleLogout = () =>{
    signOut(auth).then(() => {
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
    });
  }
  return (
    <div>
      <nav id='guide-nav'>
          <Link to='/'>
            <img src={logo} style={{height:70}}/>
          </Link>
          

          <div>
            <Link className='guide-nav-link' to='/guides'>Calendar</Link>
            <Link className='guide-nav-link' to='/guides/profile'>Profile</Link>
            <Link className='guide-nav-link' to='/guides/list'>Guides</Link>
          </div>

          <button id='logout-btn' onClick={handleLogout}>Logout</button>
      </nav>
      <main >
        <Outlet />
      </main>
    </div>
  )
}
