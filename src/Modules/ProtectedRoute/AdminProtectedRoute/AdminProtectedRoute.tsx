import  { useContext } from 'react'
import { AuthContext } from '../../../Context/AuthContext'
import { Navigate } from 'react-router-dom'

export default function AdminProtectedRoute({children}:any) {
    const {loginData} = useContext(AuthContext)
    if(localStorage.getItem("foodAppToken") || loginData.role =="admin") return children
    else return <Navigate to='/login'/>
}
