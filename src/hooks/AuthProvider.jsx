import { useContext, createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL, ACCESS_TOKEN } from "src/constants";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    
  const [currentUser, setCurrentUser] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);
  const [isLoading, setIsloading] = useState(false);
  const [token, setToken ]  = useState(localStorage.getItem(ACCESS_TOKEN) || "");

  useEffect(() => {
    loadCurrentlyLoggedInUser();
  }, [authenticated, isLoading]);
  
  function loadCurrentlyLoggedInUser() {
    getCurrentUser()
      .then((response) => {
        console.log(response);
        setCurrentUser(response);
        setAuthenticated(true);
        setIsloading(false);
      })
      .catch((error) => {
        setIsloading(false);
      });
  }

  
  const getCurrentUser = () => {
    if(!token) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/user/me",
        method: 'GET'
    });

  }

  const logOut = () => {
    setCurrentUser(null);
    setToken("");
    localStorage.removeItem(ACCESS_TOKEN);
  };

  return (
    <AuthContext.Provider value={{ token, currentUser, getCurrentUser, logOut }}>
      {children}
    </AuthContext.Provider>
  )
};


const request = (options) => {
    const headers = new Headers({
        'Content-Type': 'application/json',
    })
    
    if(localStorage.getItem(ACCESS_TOKEN)) {
        headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN))
    }

    const defaults = {headers: headers};
    options = Object.assign({}, defaults, options);

    return fetch(options.url, options)
    .then(response => 
        response.json().then(json => {
            if(!response.ok) {
                return Promise.reject(json);
            }
            return json;
        })
    );
};


export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};