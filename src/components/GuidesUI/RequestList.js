import React, { useState, useEffect} from 'react'
import axios from 'axios'
import moment from 'moment'
import { useNavigate } from 'react-router-dom'
export default function RequestList() {

    let navigate = useNavigate()

    useEffect(()=>{
        getRequests()
    },[])

    const [requests, setRequests] = useState([])

    const getRequests = () =>{
        axios.get(`${process.env.REACT_APP_API}/get-requests`)
        .then((res)=>{
          setRequests(res.data)
        })
        .catch((e)=>console.log(e))
      }

  return (
    <div>
        <h1>Requests</h1>
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Date</th>
                    <th>Tour Type</th>
                    <th>No. of days</th>
                </tr>
            </thead>
            <tbody>
                {requests.map((request, i)=>{
                    return <tr key={i} onClick={()=>navigate(`/guides/requests/${request._id}`)}>
                        <td>{request.name}</td>
                        <td>{moment(request.date).format('ddd, DD MMM YYYY')}</td>
                        <td>{request.info.tourType}</td>
                        <td>Number of days</td>

                    </tr>
                })}
            </tbody>

        </table>
    </div>
  )
}
