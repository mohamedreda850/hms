import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext(null);

export default function AuthContextProvider(props ) {
  const [loginData, setLoginData] = useState(null);

  const saveLoginData = () => {
    const decodedToken = localStorage.getItem("tokenums");
    if (decodedToken) {
      const encodedToken = jwtDecode(decodedToken);
      setLoginData(encodedToken);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("tokenums")) {
      saveLoginData();
    }
  }, []); 

  return (
    <AuthContext.Provider value={{ loginData, saveLoginData }}>
      {props.children}
    </AuthContext.Provider>
  );
}