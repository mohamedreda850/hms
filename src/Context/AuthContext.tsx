import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from "react";

import { AUTH_URL, axiosInstanceAdmin } from "../Services/END_POINTS/ADMIN/URLS";

export const AuthContext = createContext(null);

export default function AuthContextProvider(props ) {

  const [userData, setUserData] = useState()

  const saveLoginData = async () => {
    

      try {
        const decodedToken = localStorage.getItem("HMSToken");
    
      const encodedToken = jwtDecode(decodedToken);
        const response = await axiosInstanceAdmin.get(AUTH_URL.USER_Profile(encodedToken._id));  
        console.log(response);
        
      setUserData(response)
      } catch (error) {
        console.log(error);
        
      }
    
  };

  

  return (
    <AuthContext.Provider value={{ userData  , saveLoginData , }}>
      {props.children}
    </AuthContext.Provider>
  );
}