import React, {useEffect} from "react";
import { toast } from "react-toastify";
import { ACCESS_TOKEN } from "../constants";
import { Navigate, useSearchParams } from "react-router-dom";
import { useAuth } from "src/hooks/AuthProvider";
import { useDispatch } from "react-redux";
import { login } from '../redux/slices/user.slice';


export default function OAuth2NavigateHandler() {
  const [searchParams, setSearchParams] = useSearchParams();
  
  const dispatch = useDispatch()

  //received token from google auth 
  const token = searchParams.get("token");
  const auth = useAuth();


  useEffect(() => {
    // Assume you have some logic to obtain the token after successful login
    // Set the token in localStorage
  
    // if token is available 
    if (token) {

      localStorage.setItem(ACCESS_TOKEN, token);

      // api call to get the current user
      auth.loadCurrentlyLoggedInUser();
      dispatch(login(token))
      // current user object
      let user = auth.currentUser;
      toast.success("You're successfully logged in!", {
        position: toast.POSITION.TOP_CENTER,
      });
      console.log("USER: " +JSON.stringify(user));
    }
  }, [token]);

  return token ? <Navigate to="/" /> : <Navigate to="/login" />;

}
