import React, {useEffect} from "react";
import { ACCESS_TOKEN } from "../constants";
import { Navigate, useSearchParams } from "react-router-dom";

export default function OAuth2NavigateHandler() {
  const [searchParams, setSearchParams] = useSearchParams();
  const token = searchParams.get("token");

  useEffect(() => {
    // Assume you have some logic to obtain the token after successful login
    // Set the token in localStorage
    if (token) {
      localStorage.setItem(ACCESS_TOKEN, token);
    }
  }, [token]);

  return token ? <Navigate to="/products" /> : <Navigate to="/login" />;

}
