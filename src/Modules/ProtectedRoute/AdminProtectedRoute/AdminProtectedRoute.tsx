import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../../Context/AuthContext'
import { Navigate } from 'react-router-dom'

export default function AdminProtectedRoute({ children }: any) {
    const {  userData  }:any = useContext(AuthContext)
    const [loginData, setLoginData] = useState([])
   useEffect(()=>{
    if (userData){
     
     setLoginData(userData.data.data.user)
     console.log(loginData)
    }
},[userData])

    if (localStorage.getItem("foodAppToken") || loginData.role == "admin") {
      console.log(loginData.role);
      
     return children }
    
}
