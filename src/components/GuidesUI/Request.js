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
import moment from 'moment'
import { toast} from 'react-toastify'
import { useAuth } from '../Auth/AuthContext'

export default function Request() {
    const vatRateLow = 1.11
    const vatRateHigh = 1.24
    const tourGoferCommission = 1.125
    let { currentUser} = useAuth()
    let { id } = useParams()
    let customerGross
    const [quoteId, setQuoteId] = useState(null)
    const [guide, setGuide] = useState(0)
    const [car, setCar] = useState(0)
    const [fuel, setFuel] = useState(0)
    const [food, setFood] = useState(0)
    const [accommodation, setAccommodation] = useState(0)
    const [own, setOwn] = useState(0)
    const [vat, setVat] = useState(vatRateLow)
    const [msg, setMsg] = useState("")
    const [guideName, setGuideName] = useState("")
    const [guideEmail, setGuideEmail] = useState("")
    const [date, setDate] = useState("")

    const [request, setRequest] = useState("")

    useEffect(()=>{
        getRequest()
        getGuideInfo()
    },[])

    
    useEffect(()=>{
        if ((currentUser.uid) && (request._id))
            getQuote()
    },[currentUser.uid, request._id])


    const getRequest = () => {
        axios.post(`${process.env.REACT_APP_API}/get-request-by-id`, {id})
        .then((res)=>{
            setRequest(res.data)
            console.log('Request',res.data)
        })
        .catch((e)=>console.log(e))
    }

    const getGuideInfo = () => {
        axios.post(`${process.env.REACT_APP_API}/get-guide-by-id`, {id: currentUser.uid})
          .then((res)=>{
            let {firstName, lastName, email} = res.data
            setGuideName(`${firstName} ${lastName}`);setGuideEmail(email);
          })
          .catch((e)=>console.log(e))
      }

    const getQuote = () => {
        axios.post(`${process.env.REACT_APP_API}/get-guide-quote-for-request`, {guideId: currentUser.uid, requestId: request._id})
        .then((res)=>{
            if (res.data) {
                setQuoteId(res.data._id ?? null)
                setGuide(res.data.guideFee ?? 0)
                setCar(res.data.carFee ?? 0)
                setFuel(res.data.fuelFee ?? 0)
                setFood(res.data.foodFee ?? 0)
                setAccommodation(res.data.accommodationFee ?? 0)
                setOwn(res.data.ownFee ?? 0)
                setVat(res.data.vatRate ?? vatRateLow)
                setMsg(res.data.message ?? "")
            }
        })
        .catch((e) => {
            console.log(e)
        })
    }
    
    let total = (guide*1)+(car*1)+(fuel*1)+(food*1)+(accommodation*1)+(own*1)
    let gross = Math.round(total*vat)



    const sendQuote = () =>{
        if(!total) {
            toast.error("Please create a quote")
        } else {
            // if no previous quote then the quoteId will be undefined and this will form a create
            // if update then potentially we are overwriting existing values with the same ones
            // since all are always applied
            let quotePayload = {
                quoteId,
                guideId: currentUser.uid, 
                requestId: request._id,
                guideFee: guide, 
                carFee: car, 
                fuelFee: fuel,
                foodFee: food,
                accommodationFee: accommodation,
                ownFee: own,
                vatRate: vat,
                customerGross: gross * tourGoferCommission,
                hasPaid: false,
                message: msg,
                updatedAt: new Date()
            }

            let requestPayload = {
                guideId: currentUser.uid, 
                guideName, 
                guideEmail, 
                net: total, 
                vat, 
                msg, 
                clientEmail: request.email,
                clientName: request.name,
                requestId: request._id
            }

            axios.post(`${process.env.REACT_APP_API}/send-initial-quote`, { requestPayload, quotePayload } )
            .then((res)=>{
                toast.success(res.data)
            })
            .catch((e)=>toast.error(e))
        }
    }

  return (
    <div style={{display:'flex', flexDirection: 'row', justifyContent:'space-evenly', alignItems:'center', flexWrap:'wrap'}}>
        <div style={{display:'flex', flexDirection: 'column'}}>
            <h2>Tour details</h2>
            <p>Client name - {request && request.name}</p>
            <p>Date of tour - {moment(request.date).format('ddd, DD MMM YYYY')}</p>
            <p>No. of days - number of days</p>
            <p>Tour requested - {request && request.info.tourType}</p>
            <p>Public/Private - {request && request.info.lookingFor}</p>

            <p>Notes- {request.notes}</p>

        </div>
        <div style={{width: 500, textAlign:'center', maxWidth:'95vw'}}>
            <h2>Create Quote</h2>
            <TextField sx={{m:1, width:'46%'}}  label='Guide fee' size='small' InputProps={{startAdornment: <InputAdornment position="start">kr</InputAdornment> }} value={guide} onChange={(e)=>setGuide(e.target.value)}/>
            <TextField sx={{m:1, width:'46%'}}  label='Car fee' size='small' InputProps={{startAdornment: <InputAdornment position="start">kr</InputAdornment> }} value={car} onChange={(e)=>setCar(e.target.value)}/>
            <TextField sx={{m:1, width:'46%'}}  label='Fuel fee' size='small' InputProps={{startAdornment: <InputAdornment position="start">kr</InputAdornment> }} value={fuel} onChange={(e)=>setFuel(e.target.value)}/>
            <TextField sx={{m:1, width:'46%'}}  label='Food fee' size='small' InputProps={{startAdornment: <InputAdornment position="start">kr</InputAdornment> }} value={food} onChange={(e)=>setFood(e.target.value)}/>
            <TextField sx={{m:1, width:'46%'}}  label='Accommodation fee' size='small' InputProps={{startAdornment: <InputAdornment position="start">kr</InputAdornment> }} value={accommodation} onChange={(e)=>setAccommodation(e.target.value)}/>
            <TextField sx={{m:1, width:'46%'}}  label='Own company fee' size='small' InputProps={{startAdornment: <InputAdornment position="start">kr</InputAdornment> }} value={own} onChange={(e)=>setOwn(e.target.value)}/>
            <TextField sx={{m:1, width:'95%'}}  size='small' label='Net total' value={total} disabled InputProps={{startAdornment: <InputAdornment position="start">kr</InputAdornment> }}/>
            <FormControl>
                <FormLabel id="demo-row-radio-buttons-group-label">VAT</FormLabel>
                <RadioGroup value={vat} onChange={(e)=>setVat(e.target.value)}
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                >
                    <FormControlLabel value={vatRateLow} control={<Radio />} label="11%" />
                    <FormControlLabel value={vatRateHigh} control={<Radio />} label="24%" />
                </RadioGroup>
                </FormControl>
            <TextField sx={{my:1}} fullWidth  label='Gross total' value={gross} disabled InputProps={{startAdornment: <InputAdornment position="start">kr</InputAdornment> }}/>
            <p>Our platform fee is passed on to the client ensuring the guide always receives what they deserve.</p>

            <TextField multiline rows={5} fullWidth sx={{my:1}} label='Message' value={msg} onChange={(e)=>setMsg(e.target.value)}/>
            <Button onClick={sendQuote} variant='contained' sx={{backgroundColor: '#8FBCBB'}}>Send</Button>


        </div>
        
        
    </div>
  )
}
