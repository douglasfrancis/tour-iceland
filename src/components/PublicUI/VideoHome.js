import React from 'react'
import { Link } from 'react-router-dom';
import video from '../../Images/iceland-header.mp4'
import logo from '../../Images/iceland-logo-white.png';
import login from '../../Images/login.png';

import './VideoHome.css'

export default function VideoHome() {
  return (
    <div id='video-home'>
      
        <div id='home-overlay'> 
          <Link to={'/guides'}><img src={login} style={{position:'absolute', top:10, right:10, height: 40}}/></Link>
          <img id='home-logo' src={logo}/>
          <Link to='/find'><button id='home-btn'>Find a guide</button></Link>

          <a href="" className="scroll-down-link scroll-down-arrow" data-iconfont="ETmodules" data-icon>
          </a>
        </div>


        <video className='background' autoPlay muted loop playsInline controls={false}>
                <source src={video} type="video/mp4"/>
                Your browser does not support the video tag.
        </video>
        
    </div>
  )
}
