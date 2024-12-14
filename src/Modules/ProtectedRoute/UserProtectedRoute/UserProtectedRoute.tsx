import { useContext } from 'react'
import { AuthContext } from '../../../Context/AuthContext'
import { Navigate } from 'react-router-dom'

export default function UserProtectedRoute({children}) {
    const {loginData} = useContext(AuthContext)
    if(localStorage.getItem("foodAppToken") || loginData.role =="user") return children
    else return <Navigate to='/login'/>
}
