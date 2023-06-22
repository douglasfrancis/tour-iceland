import React, { useState, useEffect} from 'react'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import moment from 'moment'
import { toast } from 'react-toastify'
import { useAuth} from '../Auth/AuthContext'
import axios from 'axios'
import ViewBooking from './ViewBooking';
import { useNavigate} from 'react-router-dom'

export default function Calendar() {

  const [open, setOpen] = useState(false);
  const [view, setView] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  let { currentUser} = useAuth()
  let navigate = useNavigate()
  const [title, setTitle] = useState("")
  const [date, setDate] = useState("")
  const [type, setType] = useState("")
  const [notes, setNotes] = useState("")
  const [member, setMember] = useState("")
  const [members, setMembers] = useState([])
  const [bookings, setBookings] = useState([])
  const [requests, setRequests] = useState([])
  const [event, setEvent] = useState("")

  const addMember = () =>{
    if(!member){
      return
    } else {
      setMembers(prev => [...prev, member])
      setMember("")
    }
  }

  useEffect(()=>{
    getBookings()
    getRequests()
  },[])

  const getBookings = () =>{
    axios.post(`${process.env.REACT_APP_API}/get-bookings-by-id`, {id: currentUser.uid}, 
    {headers: {'AuthToken': currentUser.accessToken}})
    .then((res)=>{
      setBookings(res.data)
    })
    .catch((e)=>console.log(e))
  }

  const getRequests = () =>{
    axios.get(`${process.env.REACT_APP_API}/get-requests`)
    .then((res)=>{
      setRequests(res.data)
    })
    .catch((e)=>console.log(e))
  }

  const createBooking = () =>{
    if(!title || !date ){
      toast.error("Please add a title and date")
    } else {
      let payload = {title, guideId: currentUser.uid, date: moment(date).format("YYYY-MM-DD"), groupMembers: members, type, notes}
      console.log(payload)
      axios.post(`${process.env.REACT_APP_API}/create-new-booking`, payload, 
          {headers: {'AuthToken': currentUser.accessToken}})
          .then(()=>{
            toast.success("Successfully added")
            handleClose()
            getBookings()
            setTitle("");setDate("");setMembers([]);setType("");setNotes("")
          })
          .catch((e)=>console.log(e))
    }
  }

  return (
    <div style={{padding: '2rem', maxWidth: 1200, margin:'0 auto', textAlign:'center'}}>
      <Fab sx={{backgroundColor: '#8FBCBB', my: '1rem'}} aria-label="add" onClick={handleOpen}>
        <AddIcon sx={{color: '#fff'}}/>
      </Fab>

      <FullCalendar
        plugins={[ dayGridPlugin ]}
        initialView="dayGridMonth"
        eventSources={[bookings, requests]}
        eventClick={function(info){
          console.log(info)
          if (info.event.title === "Request") {
              navigate(`/guides/requests/${info.event.extendedProps._id}`)
          } else {
            setEvent(info.event)
            setView(true)
          }
        }}
      />

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            New Booking
          </Typography>
          <Typography id="modal-modal-description" sx={{ my: 2 }}>
            Manually add your bookings to help view and manage your availability
          </Typography>

          <TextField fullWidth sx={{my:1}} label='Booking Title eg. Golden Cirlce' value={title} onChange={(e)=>setTitle(e.target.value)}/>

          <div style={{marginTop: '1rem'}}> 
            <label>Date of booking </label>
            <input style={{height:50, width:180, padding: 10, border: '1px solid grey', borderRadius:3}} type='date' value={date} onChange={(e)=>setDate(e.target.value)}/>
          </div>

          <FormControl sx={{my:2}}>
            <FormLabel id="demo-row-radio-buttons-group-label">Booking type</FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              value={type} onChange={(e)=>setType(e.target.value)}
            >
              <FormControlLabel value="Private" control={<Radio />} label="Private" />
              <FormControlLabel value="Group" control={<Radio />} label="Group" />             
            </RadioGroup>
          </FormControl>

          <TextField sx={{ width:'80%', mr:1}} label='Add group member' value={member} onChange={(e)=>setMember(e.target.value)}/>

          <Fab sx={{backgroundColor: '#8FBCBB'}} aria-label="add" onClick={addMember}>
            <AddIcon sx={{color: '#fff'}}/>
          </Fab>

          {members.map((client, i)=>{
            return  <Typography key={i} id="modal-modal-description" sx={{ my: 2 }}>
            {client}
          </Typography>
          })}

          <TextField sx={{my:1}} fullWidth multiline rows={2} label="Notes" value={notes} onChange={(e)=>setNotes(e.target.value)}/>

          <Button variant='contained' sx={{backgroundColor: '#8FBCBB', mt:2}} onClick={createBooking}>Create Booking</Button>
        </Box>
      </Modal>

      <ViewBooking event={event} view={view} setView={setView}/>

    </div>
  )
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  maxHeight: '90vh',
  overflow: 'scroll'
};