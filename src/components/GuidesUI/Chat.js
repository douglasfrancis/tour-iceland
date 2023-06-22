import React, { useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import './Chat.css'
import axios from 'axios'
import moment from 'moment'
import { useAuth} from '../Auth/AuthContext'

// guide side chat, i.e. for messages from guide to client
export default function Chat() {

    let { id } = useParams()
    let { currentUser } = useAuth()
    const [messages, setMessages] = useState([])
    const [message, setMessage] = useState("")
    const [chat, setChat] = useState("")

    useEffect(()=>{
        getMessages()
        getChat()
    },[])

    const getChat = () =>{
        axios.post(`${process.env.REACT_APP_API}/get-chat-by-id`, {chatId: id})
        .then((res)=>{
          setChat(res.data)
          console.log("Chat",res.data)
        })
        .catch((e)=>console.log(e))
    }

    const getMessages = () =>{
        axios.post(`${process.env.REACT_APP_API}/get-messages-by-chat-id`, {chatId: id})
        .then((res)=>{
          setMessages(res.data)
          console.log(res.data)
        })
        .catch((e)=>console.log(e))
    }

    const sendMessage = () =>{
        if (!message){
            return
        } else{
            axios.post(`${process.env.REACT_APP_API}/send-guide-message`, {chatId: id, clientEmail: chat.clientEmail, message, guideId: currentUser.uid, read: true, timeStamp: new Date(), sentBy: "Guide"})
            .then((res)=>{
              setMessage("")
              getMessages()
              console.log(res.data)
            })
            .catch((e)=>console.log(e))
        }
       
    }

  return (
    <div id='chat-page'>
        {messages.map((msg, i)=>{
            let lineBreaks = msg.message.split('.')
            return <div key={i} className={msg.sentBy === "Guide" ? 'guide-msg' : 'client-msg'}>
                    <p style={{ whiteSpace: 'pre-wrap' }}>{msg.message}</p>
                    <p className='timestamp'>{moment(msg.timeStamp).format('HH:mm A, DD MMM')}</p>
                </div>
        })}

        <div id='message-container' >
            <textarea id='msg-box' value={message} onChange={(e) => setMessage(e.target.value)} />
            <button id='send-btn' onClick={sendMessage}>Send to client</button>
        </div>
        
    </div>
  )
}
