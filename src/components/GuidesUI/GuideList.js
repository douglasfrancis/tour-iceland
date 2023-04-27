import React, { useState, useEffect} from 'react'
import axios from 'axios'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Modal from '@mui/material/Modal';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useAuth } from '../Auth/AuthContext';
import { toast } from 'react-toastify'
import { auth } from '../../Firebase';

export default function GuideList() {

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const {currentUser} = useAuth()

  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [number, setNumber] = useState("")
  const [guides, setGuides] = useState([])


  useEffect(()=>{
    getGuides()
  },[])

  const getGuides = () =>{
    axios.get(`${process.env.REACT_APP_API}/get-guides`)
    .then((res)=>{
      console.log(res.data)
      setGuides(res.data)
    })
    .catch((e)=>console.log(e))

  }

  const handleSave = () =>{
    if(!firstName || !lastName || !email ){
      toast.error("Please add name and email")
    } else {

      createUserWithEmailAndPassword(auth, email, "password")
        .then((userCredential) => {
          const user = userCredential.user;

          axios.post(`${process.env.REACT_APP_API}/create-new-guide`, {_id: user.uid, firstName, lastName, email, number, img:"https://caretestresources.s3.eu-west-2.amazonaws.com/avatar.png"}, 
          {headers: {'AuthToken': currentUser.accessToken}})
          .then(()=>{
            toast.success("Successfully added")
            handleClose()
            getGuides()
            setFirstName("");setLastName("");setEmail("");setNumber("");
          })
          .catch((e)=>console.log(e))
        })
        .catch((error) => {
          const errorMessage = error.message;
          toast.error(errorMessage)
        });
      }
  }

  return (
    <div style={{textAlign:'center'}}>
         <Button sx={{backgroundColor: '#8FBCBB', color:'white', margin: '2rem auto'}} variant='contained' onClick={handleOpen}>Add New Guide</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>

          <TextField sx={{my:1}} fullWidth label='First Name' value={firstName} onChange={(e)=>setFirstName(e.target.value)}/>
          <TextField sx={{my:1}} fullWidth label='Last Name' value={lastName} onChange={(e)=>setLastName(e.target.value)}/>
          <TextField sx={{my:1}} fullWidth label='Email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
          <TextField sx={{my:1}} fullWidth label='Number (inc +354)' value={number} onChange={(e)=>setNumber(e.target.value)}/>
          <Button variant='contained' onClick={handleSave}>Save</Button>

        </Box>
      </Modal>

    <table style={{width: 800, maxWidth:'90vw', margin: '1rem auto'}}>
      <thead>
        <tr style={{border:'1px solid grey'}}>
          <td></td>
          <td>Name</td>
          <td>Email</td>
          <td>Number</td>
          <td>Admin</td>
        </tr>
      </thead>
      <tbody>
      {guides.map((guide)=>{
        return <tr>
          <td><img style={{height: 40}} src={guide.img} alt={guide.firstName}/></td>
          <td>{guide.firstName} {guide.lastName}</td>
          <td>{guide.email}</td>
          <td>{guide.number}</td>
          <td>False</td>

        </tr>
 })}

      </tbody>
     
    </table>

     
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
};