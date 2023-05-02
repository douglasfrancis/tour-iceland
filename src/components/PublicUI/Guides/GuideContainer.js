import React from 'react'
import './GuideContainer.css'
import { Link } from 'react-router-dom'

export default function GuideContainer({img, name, id}) {
  return (
    <div id='guide-container'>
        <img className='guide-container-img' src={img} alt={name}/>
        <div className='guide-container-info'>
          <h3>{name}</h3>

          <Link to={`/find/guides/${id}`}><button className='view-guide-btn'>View guide</button></Link>
        </div>

       
    </div>
  )
}
