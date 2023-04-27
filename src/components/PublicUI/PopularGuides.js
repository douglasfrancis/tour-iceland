import React from 'react'
import GuideCard from './GuideCard'
import './PopularGuides.css'
import Guide1 from '../../Images/guide1.jpg'
import Guide2 from '../../Images/guide2.jpg'
import Guide3 from '../../Images/guide3.jpg'
import Simon from '../../Images/simon.jpeg'

export default function PopularGuides() {
  return (
    <div id='guides-container'>
        <h2 style={{color: '#8FBCBB', margin: 0}}>Featured Guides</h2>

        <div id='guides'>
          <GuideCard img={Guide1} name={'Sigurður'}/>
          <GuideCard img={Simon} name={'Símon'}/>
          <GuideCard img={Guide2} name={'Jón'}/>
          <GuideCard img={Guide3} name={'Gunnar'}/>

        </div>
    </div>
  )
}
