import React from 'react'
import TextField from '@mui/material/TextField'
import './Tabs.css'
import Button from '@mui/material/Button'

export default function PersonalTab() {
  return (
    <div id='personal-tab'>
        <img id='guide-img' src='https://caretestresources.s3.eu-west-2.amazonaws.com/avatar.png'/>
        <input type='file' style={{margin: '1rem auto'}}/>
        <div id='personal-info'>
            <TextField fullWidth sx={{my:1}} label="First Name" />
            <TextField fullWidth sx={{my:1}} label="Last Name" />
            <TextField fullWidth sx={{my:1}} label="Email" />
            <TextField fullWidth sx={{my:1}} label="Number inc. (+354)" />
            <Button variant='contained' sx={{backgroundColor:'#8FBCBB', color: 'white', width:200, mt:2}}>Update</Button>
        </div>

    </div>
  )
}
