import { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios';
import { useAuth } from '../Auth/AuthContext';

const InboxContext = createContext("");

export function useInbox(){
    return useContext(InboxContext)
}

export function InboxProvider ({children}){
    const { currentUser} = useAuth()

    const [unread, setUnread] = useState([])
   
useEffect(() => {
    if(currentUser){
        getUnread()
    } else{
        return
    }
  }, []);

  const getUnread =  () => {
    axios.post(`${process.env.REACT_APP_API}/get-unread-msgs`, {id: currentUser.uid})
    .then(function(res){
    
      setUnread(res.data)
      console.log(res.data)

    })
    .catch((e)=>{
      console.log(e)
    })
  }

    const value = {
        unread, getUnread
    }
    
    return (
        <InboxContext.Provider value={value}>
                {children}
        </InboxContext.Provider>

    )
}
