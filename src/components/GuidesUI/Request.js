import React, { useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import InputAdornment from '@mui/material/InputAdornment';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export default function Request() {

    let { id } = useParams()

    useEffect(()=>{
        getRequest()
    },[])

    const getRequest = () =>{
        axios.post(`${process.env.REACT_APP_API}/get-request-by-id`, {id})
        .then((res)=>{
          console.log(res.data)
        })
        .catch((e)=>console.log(e))
    }

    const [guide, setGuide] = useState(0)
    const [car, setCar] = useState(0)
    const [fuel, setFuel] = useState(0)
    const [food, setFood] = useState(0)
    const [accomodation, setAccomodation] = useState(0)
    const [own, setOwn] = useState(0)
    const [vat, setVAT] = useState(1.11)

    let total = (guide*1)+(car*1)+(fuel*1)+(food*1)+(accomodation*1)+(own*1)


  return (
    <div>
        <div style={{width: 500, margin: '0 auto'}}>
            <h2>Create Quote</h2>
            <TextField sx={{my:1}} fullWidth label='Guide fee' size='small' InputProps={{startAdornment: <InputAdornment position="start">kr</InputAdornment> }} value={guide} onChange={(e)=>setGuide(e.target.value)}/>
            <TextField sx={{my:1}} fullWidth label='Car fee' size='small' InputProps={{startAdornment: <InputAdornment position="start">kr</InputAdornment> }} value={car} onChange={(e)=>setCar(e.target.value)}/>
            <TextField sx={{my:1}} fullWidth label='Fuel fee' size='small' InputProps={{startAdornment: <InputAdornment position="start">kr</InputAdornment> }} value={fuel} onChange={(e)=>setFuel(e.target.value)}/>
            <TextField sx={{my:1}} fullWidth label='Food fee' size='small' InputProps={{startAdornment: <InputAdornment position="start">kr</InputAdornment> }} value={food} onChange={(e)=>setFood(e.target.value)}/>
            <TextField sx={{my:1}} fullWidth label='Accomodation fee' size='small' InputProps={{startAdornment: <InputAdornment position="start">kr</InputAdornment> }} value={accomodation} onChange={(e)=>setAccomodation(e.target.value)}/>
            <TextField sx={{my:1}} fullWidth label='Own company fee' size='small' InputProps={{startAdornment: <InputAdornment position="start">kr</InputAdornment> }} value={own} onChange={(e)=>setOwn(e.target.value)}/>
            <TextField sx={{my:1}} fullWidth label='Net total' value={total} disabled InputProps={{startAdornment: <InputAdornment position="start">kr</InputAdornment> }}/>
            <FormControl>
                <FormLabel id="demo-row-radio-buttons-group-label">VAT</FormLabel>
                <RadioGroup value={vat} onChange={(e)=>setVAT(e.target.value)}
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                >
                    <FormControlLabel value={1.11} control={<Radio />} label="11%" />
                    <FormControlLabel value={1.24} control={<Radio />} label="24%" />
                </RadioGroup>
                </FormControl>
            <TextField sx={{my:1}} fullWidth label='Gross total' value={Math.round(total*vat)} disabled InputProps={{startAdornment: <InputAdornment position="start">kr</InputAdornment> }}/>
            <p>Our platform fee of 12.5% is passed on to the client ensuring the guide always receives what they deserve.</p>

            <Button variant='contained'>Send</Button>


        </div>
        
        
    </div>
  )
}
