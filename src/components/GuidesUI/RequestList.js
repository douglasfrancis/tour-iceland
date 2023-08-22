import React, { useState, useEffect} from 'react'
import axios from 'axios'
import moment from 'moment'
import { useNavigate } from 'react-router-dom'
import './RequestList.css'
import { useAuth } from '../Auth/AuthContext'

export default function RequestList() {

    let { currentUser } = useAuth()

    let navigate = useNavigate()

    useEffect(()=>{
        getRequests()
        getQuotesForGuide()
    }, [])

    const [requests, setRequests] = useState([])
    const [quotes, setQuotes] = useState([])

    const getRequests = () => {
        axios.get(`${process.env.REACT_APP_API}/get-requests`)
        .then((res) => {
          setRequests(res.data)
        })
        .catch((e)=>console.log(e))
    }

    const getQuotesForGuide = () => {
        axios.post(`${process.env.REACT_APP_API}/get-quotes-for-guide`, {guideId: currentUser._id})
        .then((res) => {
          setQuotes(res.data)
        })
        .catch((e) => console.log(e))
    }

    const deriveRequestStatus = (request) => {
        if (request.quoteId) {
            return 'Booked';
        } else if (quotes.some((quote) => quote.requestId === request._id)) {
            return 'Quoted';
        } else {
            return 'Open';
        }
    };

    // Display all requests not claimed by another guide (i.e. quoted by them and
    // subsequently paid or requested specifically to them  in the first place)
    // Status indicates whether the given request has now been booked by a client
    // or whether it is still available (potentially already having a quote provided)
  return (
    <div id='request-list-page'>
        <h2>Available tour requests</h2>
        <table id='request-list-table'>
            <thead>
                <tr id='thead-tr'>
                    <th>Name</th>
                    <th>Date</th>
                    <th>Tour Type</th>
                    <th>No. of days</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                {requests.length < 1
                    ? <td colSpan={6} style={{textAlign:'center'}}>No requests available</td>
                    : requests.filter((request) => currentUser.uid === request.guideId || !request.guideId).map((request, i) => {
                    return <tr key={i} onClick={() => navigate(`/guides/requests/${request._id}`)}>
                        <td>{request.name}</td>
                        <td>{moment(request.date).format('ddd, DD MMM YYYY')}</td>
                        <td>{request.info.tourType}</td>
                        <td>Number of days</td>
                        <td>{deriveRequestStatus(request)}</td>
                    </tr>
                })}
            </tbody>
        </table>
    </div>
  )
}
