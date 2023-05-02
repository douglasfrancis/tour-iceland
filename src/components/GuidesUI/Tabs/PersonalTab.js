import React, { useEffect, useState} from 'react'
import TextField from '@mui/material/TextField'
import './Tabs.css'
import Button from '@mui/material/Button'
import axios from 'axios'
import { useAuth } from '../../Auth/AuthContext'
import { storage } from '../../../Firebase';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { toast } from 'react-toastify'

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

  const imgRef = ref(storage, `${firstName}${lastName}/${currentUser.uid}`);

  const uploadImg = (file) =>{
      console.log(imgRef)
      uploadBytes(imgRef, file).then((snapshot) => {

          getDownloadURL(imgRef)
          .then((url) => {
              setImg(url)
          })
          .catch((error) => {
              console.log(error)
          });
      });
  }

  const updatePersonalInfo = () =>{
    if(!firstName || !lastName){
      toast.error("Please add your name")
    } else {
      axios.post(`${process.env.REACT_APP_API}/update-guide-personal`, {id: currentUser.uid, firstName, lastName, number, img})
      .then((res)=>{
        toast.success("Successfully updated")
      })
      .catch((e)=>toast.error("Error"))
    }
   
  }

  return (
    <div id='personal-tab'>
        <img id='profile-guide-img' src={img}/>
        <input type='file' style={{margin: '1rem auto'}} onChange={(e)=>uploadImg(e.target.files[0])}/>
        <div id='personal-info'>
            <TextField fullWidth sx={{my:1}} label="First Name" value={firstName} onChange={(e)=>setFirstName(e.target.value)}/>
            <TextField fullWidth sx={{my:1}} label="Last Name" value={lastName} onChange={(e)=>setLastName(e.target.value)}/>
            <TextField fullWidth sx={{my:1}} label="Email" value={email} disabled/>
            <TextField fullWidth sx={{my:1}} label="Number inc. (+354)" value={number} onChange={(e)=>setNumber(e.target.value)}/>
            <Button variant='contained' sx={{backgroundColor:'#8FBCBB', color: 'white', width:200, mt:2}} onClick={updatePersonalInfo}>Update</Button>
        </div>

    </div>
  )
}
