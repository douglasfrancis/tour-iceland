import React, { useState} from 'react'
import { Link } from 'react-router-dom'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { TextField } from '@mui/material';
import './Find.css'
import SendIcon from '@mui/icons-material/Send';
import logo from '../../Images/iceland-logo-white.png'
import moment from 'moment'
import { toast } from 'react-toastify'
import axios from 'axios'

export default function Find() {

  const [applicant, setApplicant ] = useState("")
  const [lookingFor, setLookingFor ] = useState("")
  const [tourType, setTourType ] = useState("")
  const [name, setName ] = useState("")
  const [email, setEmail ] = useState("")
  const [date, setDate ] = useState("")
  const [groupSize, setGroupSize ] = useState("")
  const [notes, setNotes ] = useState("")
  const [loading, setLoading ] = useState(false)
  const [sent, setSent ] = useState(false)

  const handleSubmit = () =>{
    if(!applicant || !lookingFor || !date){
      toast.error("Please add all required fields")
    } else{
      setLoading(true)
      let payload = {title: "Request", date: moment(date).format("YYYY-MM-DD"), name, email, info: {applicant, lookingFor, tourType, groupSize}, notes, backgroundColor:'##D08770' , borderColor:'##D08770', textColor:'#fff'}
      console.log(payload)
      axios.post(`${process.env.REACT_APP_API}/create-new-request`, payload)
      .then(()=>{
        toast.success("Successfully added")
        setSent(true); setLoading(false)
        setName("");setDate("");setEmail([]);setApplicant("");setLookingFor("");setGroupSize("");setNotes("");setTourType("")
      })
      .catch((e)=>{console.log(e);setLoading(false)})
    }
  }

  return (
    <div id='find-page' >
      <nav id='find-nav'>
        <Link to='/'>
          <img id='find-logo' src={logo}/>
        </Link>

        <div>
          <Link className='find-nav-link'>Guides</Link>
          <Link className='find-nav-link'>Companies</Link>
          <Link className='find-nav-link'>Tours</Link>
        </div>
        

        <Link to='/find' style={{display:'flex', justifyContent:'center', alignItems:"center"}}>
          <SendIcon sx={{color:'#fff'}} />
          <p className='find-nav-link'>Post tour request</p>
        </Link>

      </nav>


      <div style={{width:600}}>
        <h1 style={{color: '#3B4252'}}>Post a tour request - We'll take care of the rest</h1>
        <h3 style={{color: '#3B4252'}}>Get responses from Tour Iceland's trusted and reviewed tour guides</h3>
      </div>

      <div>
      <Box sx={{ minWidth: 120, width: 600, maxWidth:'95vw'}}>

      <div style={{display:'flex', justifyContent:'space-between'}}>
      <FormControl fullWidth sx={{my:1}}>
        <FormLabel id="demo-row-radio-buttons-group-label">I am a</FormLabel>
        <RadioGroup value={applicant} onChange={(e)=>setApplicant(e.target.value)}
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
        >
          <FormControlLabel value="Individual" control={<Radio />} label="Individual" />
          <FormControlLabel value="Company" control={<Radio />} label="Company" />
        
        </RadioGroup>
        </FormControl>

        <FormControl fullWidth sx={{my:1}}>
        <FormLabel id="demo-row-radio-buttons-group-label">Looking for a</FormLabel>
        <RadioGroup value={lookingFor} onChange={(e)=>setLookingFor(e.target.value)}
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
        >
          <FormControlLabel value="Private Tour" control={<Radio />} label="Private tour" />
          <FormControlLabel value="Public Tour" control={<Radio />} label="Public tour" />
        
        </RadioGroup>
        </FormControl>
        </div>
        
        <div style={{margin: '1rem 0'}}>
          <label>Date of tour</label>
          <input id='request-date' type='date' value={date} onChange={(e)=>setDate(e.target.value)}/>
        </div>

        <div style={{display:'flex', justifyContent:'space-between'}}>
        <TextField sx={{my:1, width:285}}   label='Name' value={name} onChange={(e)=>setName(e.target.value)}/>

        <TextField sx={{my:1, width:285}}   label='Email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
        </div>
        
        <FormControl fullWidth sx={{my:1}}>
          <InputLabel id="demo-simple-select-label">Tour type</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={tourType}
            label="Tour type"
            onChange={(e)=>setTourType(e.target.value)}
          >
            <MenuItem value={"Golden Circle"}>Golden Circle</MenuItem>
            <MenuItem value={"Lagoons"}>Lagoons</MenuItem>
            <MenuItem value={"Custom"}>Custom</MenuItem>
          </Select>
        </FormControl>

       
        <TextField sx={{my:1}} fullWidth  label='Group size (if applicable)' value={groupSize} onChange={(e)=>setGroupSize(e.target.value)}/>

        <TextField sx={{my:1}} fullWidth multiline rows={3} label='Notes' value={notes} onChange={(e)=>setNotes(e.target.value)}/>

        <button onClick={handleSubmit} id='request-btn' disabled={loading}>Post request</button>
    </Box>
        
      </div>
      
    </div>
  )
}
