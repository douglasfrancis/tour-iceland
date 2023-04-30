import React, { useEffect, useState} from 'react'
import { useAuth } from '../Auth/AuthContext'
import axios from 'axios'
import Avatar from '@mui/material/Avatar';
import moment from 'moment'
import './Inbox.css'
import { useNavigate } from 'react-router-dom';

export default function Inbox() {
  let navigate = useNavigate()
  let { currentUser} = useAuth()
  const [chats, setChats] = useState([])

  useEffect(()=>{
    getChats()
  },[])

  const getChats = () =>{
    axios.post(`${process.env.REACT_APP_API}/get-chats-by-id`, {id: currentUser.uid})
      .then((res)=>{
        setChats(res.data)
      })
      .catch((e)=>console.log(e))
  }

  return (
    <div id='inbox-page'>
      <div id='inbox-container'>
       
            {chats.map((chat, i)=>{
              return <div key={i} className='inbox-row' onClick={()=>navigate(`/guides/inbox/${chat._id}`)}>
                <div style={{display:'flex'}}>
                  <Avatar sx={{ width: 50, height: 50, mr:3 }}>{chat.clientName.charAt(0)}</Avatar>
                  <p className='inbox-name'> {chat.clientName}</p>
                </div>
                <p  style={{textAlign:'right'}}>{moment(chat.lastMsgAdded).fromNow()}</p>
              </div>

            })}
      
      </div>
    </div>
  )
}
