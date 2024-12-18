import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from "react";
import { get } from "react-hook-form";

export const AuthContext = createContext(null);

export default function AuthContextProvider(props ) {
  const [loginData, setLoginData] = useState(null);
  const [loading, setLoading] = useState(true);
  const saveLoginData = () => {
    const decodedToken = localStorage.getItem("HMSToken");
    
      const encodedToken = jwtDecode(decodedToken);
      setLoginData(encodedToken);
    
  };

  useEffect(() => {
    if (localStorage.getItem("HMSToken")) {
      saveLoginData();
    }
  }, []); 
  useEffect(() => {
    const token = localStorage.getItem("HMSToken");
    if (token) {
      
      setTimeout(() => {
        const encodedToken = jwtDecode(token);
        const rolet = encodedToken?.role;
        setLoginData({ role: `${rolet =='admin' ? 'admin':"user"}` }); 
        setLoading(false);
      }, 1000);
    } else {
      setLoading(false);
    }
  }, []);
  return (
    <AuthContext.Provider value={{ loginData, saveLoginData,loading }}>
      {props.children}
    </AuthContext.Provider>
  );
}