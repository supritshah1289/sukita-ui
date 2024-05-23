import React, {useEffect} from "react";
import { ACCESS_TOKEN } from "../constants";
import { Navigate, useSearchParams } from "react-router-dom";
import { useAuth } from "src/hooks/AuthProvider";

export default function OAuth2NavigateHandler() {
  const [searchParams, setSearchParams] = useSearchParams();
  
  //received token from google auth 
  const token = searchParams.get("token");
  const auth = useAuth();


  useEffect(() => {
    // Assume you have some logic to obtain the token after successful login
    // Set the token in localStorage
  
    //if token is available 
    if (token) {

      localStorage.setItem(ACCESS_TOKEN, token);
      
      //api call to get the current user
      auth.loadCurrentlyLoggedInUser();
      
      //current user object
      let user = auth.currentUser;
      console.log("USER: " +JSON.stringify(user));
    }
  }, [token]);

  return token ? <Navigate to="/products" /> : <Navigate to="/login" />;

}
