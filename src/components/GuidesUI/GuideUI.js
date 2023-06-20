import React, { useEffect, useState} from 'react'
import { Outlet, Link } from 'react-router-dom'
import axios from 'axios'
import './GuideUI.css'
import {  signOut } from "firebase/auth";
import { auth } from '../../Firebase'
import { useAuth } from '../Auth/AuthContext';
import logo from '../../Images/iceland-logo-white.png'
import Badge from '@mui/material/Badge';
import {useInbox} from '../context/InboxContext';

export default function GuideUI() {

  useEffect(()=>{
    getGuideInfo()
},[])
const [guideName, setGuideName] = useState("")

  let { currentUser } = useAuth()
  let { unread } = useInbox()

  const getGuideInfo = () => {
    axios.post(`${process.env.REACT_APP_API}/get-guide-by-id`, {id: currentUser.uid})
      .then((res)=>{
        let {firstName, lastName} = res.data
        setGuideName(`${firstName} ${lastName}`);
      })
      .catch((e) => {
        console.log(e)
  }) 
  }

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
            <Link className='guide-nav-link' to='/guides/requests'>Requests</Link>

            <Badge badgeContent={unread.length} color='primary'  style={{verticalAlign: 'top'}}>
              <Link className='guide-nav-link' to='/guides/inbox'>Inbox</Link>
            </Badge>

          </div>

          <button id='logout-btn' title={guideName} onClick={handleLogout}>Logout</button>
      </nav>
      <main >
        <Outlet />
      </main>
    </div>
  )
}
