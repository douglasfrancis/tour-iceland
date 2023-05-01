import React, { useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import moment from 'moment'
import { useAuth} from '../Auth/AuthContext'

export default function ClientChat() {
    let { id } = useParams()
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
        if(!message){
            return
        } else{
            axios.post(`${process.env.REACT_APP_API}/send-client-message`, {chatId: id, guideEmail: chat.guideEmail, message, guideId: chat.guideId, read: false, timeStamp: new Date(), sentBy: "Client"})
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
                {lineBreaks.map((line, i)=>{
                    return  <p key={i}>{line}</p>
                })}
               
                <p className='timestamp'>{moment(msg.timeStamp).format('HH:mm A, DD MMM')}</p>
            </div>
    })}

    <div id='message-container' >
    <input id='msg-box' value={message} onChange={(e)=>setMessage(e.target.value)}/>
        <button id='send-btn' onClick={sendMessage}>Send</button>
    </div>
    
</div>
  )
}
