import React, { useState, useEffect} from 'react'
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
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

export default function ViewBooking({event, view, setView}) {

    const [title, setTitle] = useState("")
    const [date, setDate] = useState("")
    const [type, setType] = useState("")
    const [notes, setNotes] = useState("")
    const [guideId, setGuideId] = useState("")
    const [member, setMember] = useState("")
    const [members, setMembers] = useState("")

    useEffect(()=>{
        if(event){
            setTitle(event.title); setDate(event.startStr); setType(event.extendedProps.type); setMembers(event.extendedProps.groupMembers); setNotes(event.extendedProps.notes); setGuideId(event.extendedProps.guideId)
        } else {
            return
        }
    },[event])

    const addMember = () =>{
        if(!member){
          return
        } else {
          setMembers(prev => [...prev, member])
          setMember("")
        }
      }
  return (
    <Modal
        open={view}
        onClose={()=>setView(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
            {console.log(event)}

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

          {members && members.map((client, i)=>{
            return  <Typography key={i} id="modal-modal-description" sx={{ my: 2 }}>
            {client}
          </Typography>
          })}

          <TextField sx={{my:1}} fullWidth multiline rows={2} label="Notes" value={notes} onChange={(e)=>setNotes(e.target.value)}/>

          <Button variant='contained' sx={{backgroundColor: '#8FBCBB', mt:2}} >Update Booking</Button>
        </Box>
      </Modal>
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