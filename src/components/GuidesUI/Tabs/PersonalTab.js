import React, { useEffect, useState} from 'react'
import TextField from '@mui/material/TextField'
import './Tabs.css'
import Button from '@mui/material/Button'
import axios from 'axios'
import { useAuth } from '../../Auth/AuthContext'

export default function PersonalTab() {

  const { currentUser } = useAuth();

  useEffect(()=>{
    getGuideInfo()
  },[])

  const getGuideInfo = () =>{
    axios.post(`${process.env.REACT_APP_API}/get-guide-by-id`, {id: currentUser.uid})
      .then((res)=>{
        let {firstName, lastName, email, img, number} = res.data
        setFirstName(firstName);setLastName(lastName);setEmail(email);setImg(img);setNumber(number)
      })
      .catch((e)=>console.log(e))
  }

  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [number, setNumber] = useState("")
  const [img, setImg] = useState("")

  return (
    <div id='personal-tab'>
        <img id='guide-img' src={img}/>
        <input type='file' style={{margin: '1rem auto'}}/>
        <div id='personal-info'>
            <TextField fullWidth sx={{my:1}} label="First Name" value={firstName}/>
            <TextField fullWidth sx={{my:1}} label="Last Name" value={lastName}/>
            <TextField fullWidth sx={{my:1}} label="Email" value={email}/>
            <TextField fullWidth sx={{my:1}} label="Number inc. (+354)" value={number}/>
            <Button variant='contained' sx={{backgroundColor:'#8FBCBB', color: 'white', width:200, mt:2}}>Update</Button>
        </div>

    </div>
  )
}
