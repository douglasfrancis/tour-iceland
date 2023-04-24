import React from 'react'
import video from '../Images/iceland-header.mp4'
import logo from '../Images/iceland-logo-white.png';
import './VideoHome.css'

export default function VideoHome() {
  return (
    <div id='video-home'>
        <div id='home-overlay'> 
          <img id='home-logo' src={logo}/>
          <button id='home-btn'>View Tours</button>

          <a href="" class="scroll-down-link scroll-down-arrow" data-iconfont="ETmodules" data-icon>
      </a>
        </div>
        <video className='background' autoPlay muted loop playsInline controls={false}>
                <source src={video} type="video/mp4"/>
                Your browser does not support the video tag.
        </video>
        

    </div>
  )
}
