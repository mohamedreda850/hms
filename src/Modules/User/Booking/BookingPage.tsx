import styles from './Booking.module.css';
import {loadStripe} from "@stripe/stripe-js"
import { CardElement, Elements, useElements, useStripe} from "@stripe/react-stripe-js"
import { Box, Button, Stack } from '@mui/material';
import { FormEvent, useState } from 'react';
import { axiosInstanceUser, BOOKING_URLS } from '../../../Services/END_POINTS/USER/URLS';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
const stripe = loadStripe("pk_test_51OTjURBQWp069pqTmqhKZHNNd3kMf9TTynJtLJQIJDOSYcGM7xz3DabzCzE7bTxvuYMY0IX96OHBjsysHEKIrwCK006Mu7mKw8",)

export default function BookingPage() {
  const params :any = useParams()
  const navigate = useNavigate()
  const payBooking=async(bookingId:string , token:string)=>{
    try {
      const res = await axiosInstanceUser.post(BOOKING_URLS.PAY_BOOKING(bookingId) , { token})
      console.log(res);
      toast.success(res?.data?.message || 'Booking Paid Successfully')
      navigate('/')
    } catch (error) {
      console.log(error);
      
    }
  }
  const CheckoutForm=()=>{
    const stripeuse = useStripe()
    const elements = useElements()
    const paymentHandler = async (e:FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      if(!elements || !stripeuse)return;
      const cardElement =elements?.getElement('card')
      if(!cardElement)return;
      const {error ,token} =await stripeuse?.createToken(cardElement)
      if(error)return
      const token1 = token?.id
      console.log(token1);
      
      await payBooking(params?.id,token1)
      
    }
    return(
  <Stack component='form' onSubmit={paymentHandler} direction='column' 
      sx={{ justifyContent:"center", alignItems:"center" , padding:"20px", borderRadius:"10px" , marginY:"50px" }}>
        <Box sx={{backgroundColor:"#f1f5f9", padding:"20px", borderRadius:"10px" , width:"40%", marginY:"20px" }}>
        <CardElement className='card'/>
        </Box>
        <Button type="submit" variant="contained" color="primary" sx={{width:"45%"}}>Pay Booking</Button>
      </Stack>
    )
  }
  return (
    <Elements stripe={stripe}>
    <CheckoutForm />
    </Elements>
  )
}

