import React from 'react'
import './Home.css'
import TourCard from './TourCard'
import lava from '../Images/lava.jpg'
import whale from '../Images/whale.jpg'
import whales from '../Images/whales.png'
import golden from '../Images/golden.png'
import waterfall from '../Images/waterfall.jpg'
import fireice from '../Images/fireice.png'


export default function MostPopular() {
  return (
    <div id='most-popular-container'>

        <h2>Most Popular Tours</h2>

        <div id='popular-container'>
            <TourCard img={lava} txt={fireice}/>
            <TourCard img={whale} txt={whales}/>
            <TourCard img={waterfall} txt={golden}/>

        </div>
    </div>
  )
}
