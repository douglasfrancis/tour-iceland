import React, { useEffect, useState} from 'react'
import './FindGuides.css'
import axios from 'axios'
import GuideContainer from './GuideContainer'

export default function FindGuides() {

    const [guides, setGuides] = useState([])

    useEffect(()=>{
        getGuides()
    },[])

    const getGuides = () =>{
        axios.get(`${process.env.REACT_APP_API}/get-guides`)
        .then((res)=>{
          setGuides(res.data)
          console.log("Guides",res.data)
        })
        .catch((e)=>console.log(e))
    }

  return (
    <div id='find-guide-page'>
        {guides.map((guide, i)=>{
            return <GuideContainer key={i} img={guide.img} name={`${guide.firstName} ${guide.lastName}`} id={guide._id}/>
        })}
    </div>
  )
}
