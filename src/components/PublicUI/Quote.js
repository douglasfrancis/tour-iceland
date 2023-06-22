import React, { useEffect, useState} from 'react'
import { useLocation, useParams } from 'react-router-dom'
import axios from 'axios'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import InputAdornment from '@mui/material/InputAdornment';
import moment from 'moment'
import { loadStripe } from "@stripe/stripe-js";


export default function Quote() {
    // two scenarios with content tailored to each
    //   - landing here is from an inbox quote (url /quote - or from a page refresh of same)
    //     in this case payment can be made
    //   - landing here is from a successful payment (url /success - or from a page refresh of same)
    //     in this case payment shows as made and when it transitions the booking is stored and emails sent

    let { id } = useParams()

    const [guide, setGuide] = useState("")
    const [request, setRequest] = useState("")
    const [quote, setQuote] = useState("")
    const [rates, setRates] = useState("")    // Latest currency rates obtained from API
    const [customerTotal, setCustomerTotal] = useState("")    // customer total in requested currency
    const [justPaid, setJustPaid] = useState(false)

    const location = useLocation();
    const pathname = location.pathname;

    useEffect(() => {
        getQuoteInfo()
        getCurrencyRates()
    }, [])

    useEffect(() => {
        if (quote.hasPaid) {
            document.title = 'Congratulations - Your tour is booked';
        } else {
            document.title = 'Your Quote';
        }
    }, [quote]);

    useEffect(() => {
        // get the request and guide info for the quote
        if (quote) {
            getRequest()
            getGuideInfo()
        }
    }, [quote])

    useEffect(() => {
        // if payment has just been made then create the booking from the request
        // only one booking should ever be created from this
        if (justPaid && guide && request) {
            setJustPaid(false)

            createBooking()
            sendBookingConfirmations()
        }
    }, [guide, request, justPaid])

    useEffect(() => {
        // convert the currency once we have the rate and request
        if (rates && request) {
            {convertCurrency(quote.customerGross, request.currency, "ISK", rates)}
        }
    }, [rates, request])


    const sendBookingConfirmations = async () => {
        axios.post(`${process.env.REACT_APP_API}/send-booking-confirmations`, { request, guide } )
        .then(() => {
            console.log("Booking confirmation emails sent to client and guide")
        })
        .catch(error => {
            console.log(error);
        });
    }


    const lookingForMappings = {
        'Private Tour': 'Private',
        'Public Tour': 'Group'
    };


    const createBooking = () => {
        let payload = {
            title: request.info.tourType,
            guideId: guide._id,
            requestId: request._id,
            date: moment(request.date).format("YYYY-MM-DD"),
            groupMembers: [request.name], // just the booker name added TBD how/why to know other members
            type: lookingForMappings[request.info.lookingFor] || '',
            notes: request.notes || ""}
        axios.post(`${process.env.REACT_APP_API}/create-new-booking`, payload)
        .then(() => {
            console.log("Booking created for guide")
        })
        .catch(error => {
            console.log(error);
        });
    }

    const getRequest = () => {
        axios.post(`${process.env.REACT_APP_API}/get-request-by-id`, {id: quote.requestId})
        .then((res)=>{
            setRequest(res.data)
        })
        .catch((e)=>console.log(e))
    }

    const getGuideInfo = () => {
        axios.post(`${process.env.REACT_APP_API}/get-guide-by-id`, {id: quote.guideId})
        .then((res) => {
            setGuide(res.data);
        })
        .catch((e) => console.log(e))
    }

    const getQuoteInfo = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_API}/get-quote-by-id/${id}`);

            if (pathname.includes('/success') && !res.data.hasPaid) {
                const updatedQuote = { ...res.data, hasPaid: true };
                const updatedData = await axios.put(`${process.env.REACT_APP_API}/update-quote/${id}`, { updatedQuote });
                setQuote(updatedData.data);
                setJustPaid(true)
            }
            else {
                setQuote(res.data);
            }
        } catch (error) {
            console.log(error);
        }
    };


    const [product, setProduct] = useState({
        name: "Guided Tour", // add tour type at least
        price: 0,
        productOwner: "tourgofer",
        description: "tour and guide",
        quantity: 1,
    });

    const convertCurrency = () => {
        // Check if both guideCurrency and clientCurrency exist in rates
        // guide currency for tour guide Iceland is always ISK. Maybe add this to .env in future
        const guideCurrency = "ISK"
        if (guideCurrency in rates && request.currency in rates) {
            // limitations due to free subscription, currencies always retrieved in USD
            // Convert ISK to USD first
            const usdAmount = quote.customerGross / rates[guideCurrency];

            // Convert USD to clientCurrency
            const convertedAmount = usdAmount * rates[request.currency];
            setCustomerTotal(Math.round(convertedAmount * 100)/ 100);

        } else {
            // Handle case when either guideCurrency or clientCurrency is not found in rates
            return null;
        }
    };

    const getCurrencyRates = () => {
        axios.get('https://openexchangerates.org/api/latest.json?app_id=c5a8f0e725fb40d7af7a63857e53eb64')
        .then((res) => {
            setRates(res.data.rates)
        })
        .catch((e) => {
            console.log(e)
        });
    }


    const makePayment = async () => {
        const updatedProduct = { ...product, price: customerTotal, currency: request.currency, quoteId: quote._id };
        const stripe = await loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);
        const body = { product: updatedProduct };
        const headers = {
            "Content-Type": "application/json",
        };

        const response = await fetch(
            process.env.REACT_APP_API + "/create-checkout-session",
            {
                method: "POST",
                headers: headers,
                body: JSON.stringify(body),
            }
        );

        const session = await response.json();

        const result = stripe.redirectToCheckout({
            sessionId: session.id,
        });

        if (result.error) {
            console.log(result.error);
        }
    };

    return (
        <div style={{display:'flex', flexDirection: 'row', justifyContent:'space-evenly', alignItems:'center', flexWrap:'wrap'}}>
            <div style={{display:'flex', flexDirection: 'column'}}>
                <h2>Tour details</h2>
                <p>Client name - {request && request.name}</p>
                <p>Date of tour - {moment(request.date).format('ddd, DD MMM YYYY')}</p>
                <p>No. of days - number of days</p>
                <p>Tour requested - {request && request.info.tourType}</p>
                <p>Public/Private - {request && request.info.lookingFor}</p>
                <p>Notes- {request.notes}</p>
            </div>
            <div style={{width: 500, textAlign:'center', maxWidth:'95vw'}}>
                {quote.hasPaid ? (
                    <h2>Congratulations! Your tour is booked</h2>
                ) : (
                    <h2>Your Tour Quote</h2>
                )}
                <TextField sx={{my:1}} fullWidth  label='Currency' value={request.currency} disabled InputProps={{startAdornment: <InputAdornment position="start"></InputAdornment> }}/>
                <TextField sx={{my:1}} fullWidth  label='Gross total (This is an approximate that may vary due to exchange rate fluctations from actual date of payment)' value={customerTotal} disabled InputProps={{startAdornment: <InputAdornment position="start"></InputAdornment> }}/>

                <TextField multiline rows={5} fullWidth sx={{my:1}} label='Message' disabled value={quote.message} InputProps={{startAdornment: <InputAdornment position="start"></InputAdornment> }}/>
                {quote.hasPaid ? (
                    <div>This tour is all paid up and a confirmation email sent to your provided email address.</div>
                ) : (
                    <Button onClick={makePayment} variant='contained' sx={{backgroundColor: '#8FBCBB'}}>Make Payment</Button>
                )}
            </div>
        </div>
    )
}
