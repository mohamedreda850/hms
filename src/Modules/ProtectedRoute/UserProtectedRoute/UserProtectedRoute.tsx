import { useContext } from 'react'
import { AuthContext } from '../../../Context/AuthContext'
import { Navigate } from 'react-router-dom'

export default function UserProtectedRoute({children}) {
    const {userData} = useContext(AuthContext)
    if(localStorage.getItem("foodAppToken") || userData.data.data.user.role =="user") return children
    else return <Navigate to='/auth/login'/>
}
