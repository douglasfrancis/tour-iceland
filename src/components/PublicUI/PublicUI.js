import React from 'react'
import { Outlet, Link } from 'react-router-dom'
import Footer from './Footer'
import SendIcon from '@mui/icons-material/Send';
import logo from '../../Images/iceland-logo-white.png'

export default function PublicUI() {
  return (
    <div>
        <nav id='find-nav'>
        <Link to='/'>
          <img id='find-logo' src={logo}/>
        </Link>

        <div>
          <Link to='/find/guides' className='find-nav-link'>Guides</Link>
          <Link className='find-nav-link'>Companies</Link>
          <Link className='find-nav-link'>Tours</Link>
        </div>
        

        <Link to='/find' style={{display:'flex', justifyContent:'center', alignItems:"center"}}>
          <SendIcon sx={{color:'#fff'}} />
          <p className='find-nav-link'>Post tour request</p>
        </Link>

      </nav>

        <Outlet/>
        <Footer />
    </div>
  )
}
