import React from 'react'
import MostPopular from './MostPopular'
import PopularGuides from './PopularGuides'
import VideoHome from './VideoHome'
import Footer from './Footer'

export default function Landing() {
  return (
    <div>
        <VideoHome />
        <MostPopular />
        <PopularGuides />
        <Footer/>
    </div>
  )
}
