import React, { useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import './Chat.css'
import axios from 'axios'
import moment from 'moment'

export default function Chat() {

    let { id } = useParams()
    const [messages, setMessages] = useState([])

    useEffect(()=>{
        getMessages()
    },[])

    const getMessages = () =>{
        axios.post(`${process.env.REACT_APP_API}/get-messages-by-chat-id`, {chatId: id})
        .then((res)=>{
          setMessages(res.data)
          console.log(res.data)
        })
        .catch((e)=>console.log(e))
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
        <input id='msg-box' />
            <button id='send-btn'>Send</button>
        </div>
        
    </div>
  )
}
