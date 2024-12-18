import { useContext } from 'react'
import { AuthContext } from '../../../Context/AuthContext'
import { Navigate } from 'react-router-dom'

export default function AdminProtectedRoute({ children }: any) {
    const { loginData ,loading}:any = useContext(AuthContext)
    if (loading) {
        return <div>Loading...</div>; 
      }
    if (localStorage.getItem("foodAppToken") || loginData.role == "admin") {console.log(loginData.role);
     return children }
    else return <Navigate to='/login' />
}
