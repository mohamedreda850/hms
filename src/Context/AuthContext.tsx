import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from "react";

import { AUTH_URL, axiosInstanceAdmin } from "../Services/END_POINTS/ADMIN/URLS";

export const AuthContext = createContext(null);

export default function AuthContextProvider(props ) {

  const [userData, setUserData] = useState()

  const saveLoginData = async () => {
    

      try {
        const token = localStorage.getItem("HMSToken");
    if(token){
      const decoded = jwtDecode(token);
        const response = await axiosInstanceAdmin.get(AUTH_URL.USER_Profile(decoded._id));  
        console.log(response);
        
      setUserData(response)}
      } catch (error) {
        console.log(error);
        
      }
    
  };

  useEffect(()=>{
    saveLoginData()
  },[])

  return (
    <AuthContext.Provider value={{ userData  , saveLoginData , }}>
      {props.children}
    </AuthContext.Provider>
  );
}