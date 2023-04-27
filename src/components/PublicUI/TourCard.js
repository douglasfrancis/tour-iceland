import React from 'react'
import './TourCard.css'

export default function TourCard({img, txt}) {
  return (
    <div className='tour-card'>
      <div className='card-overlay'>    
        <img className='tour-txt' src={txt}/>
      </div>
      <img className='tour-img' src={img} />

      <button className='tour-btn'>View tours</button>


    </div>
  )
}
