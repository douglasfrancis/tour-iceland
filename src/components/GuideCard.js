import React from 'react'
import './GuideCard.css'

export default function GuideCard({img, name}) {
  return (
    <div className='guide-card'>
        <img className='guide-img' src={img}/>

        <h3 style={{color:'#3B4252', fontSize:22}}>{name}</h3>
    </div>
  )
}
