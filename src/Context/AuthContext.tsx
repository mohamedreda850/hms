import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from "react";
import { get } from "react-hook-form";

export const AuthContext = createContext(null);

export default function AuthContextProvider(props ) {
  const [loginData, setLoginData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(true);

  const saveLoginData = () => {
    const decodedToken = localStorage.getItem("HMSToken");
    
      const encodedToken = jwtDecode(decodedToken);
      setLoginData(encodedToken);
    setUserId(encodedToken._id);
  };

  useEffect(() => {
    if (localStorage.getItem("HMSToken")) {
      saveLoginData();
    }
  }, []); 
  useEffect(() => {
    const token = localStorage.getItem("HMSToken");
    if (token) {
      const encodedToken = jwtDecode(token);
      const rolet = encodedToken?.role;
      setLoginData({ role: `${rolet =='admin' ? 'admin':"user"}` }); 
      setUserId(encodedToken._id);
      setLoading(false);
     
    } else {
      setLoading(false);
    }
  }, []);
  return (
    <AuthContext.Provider value={{userId, loginData, saveLoginData,loading }}>
      {props.children}
    </AuthContext.Provider>
  );
}