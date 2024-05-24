import { useContext, createContext, useState, useEffect } from "react";
import { API_BASE_URL, ACCESS_TOKEN } from "src/constants";
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);
  const [isLoading, setIsloading] = useState(true);
  const [token, setToken ]  = useState("");

  useEffect(() => {
    loadCurrentlyLoggedInUser();
  }, [authenticated, isLoading]);
  
  function loadCurrentlyLoggedInUser() {
    getCurrentUser()
      .then((response) => {
        setCurrentUser(response);
        setAuthenticated(true);
        setIsloading(false);
      })
      .catch((error) => {
        setIsloading(false);
      });
  }

  
  const getCurrentUser = () => {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    const user =  request({
        url: API_BASE_URL + "/user/me",
        method: 'GET'
    });
    return user;

  }

  const logOut = () => {
    localStorage.removeItem(ACCESS_TOKEN);
    setCurrentUser(null);
    setToken("");
    setAuthenticated(false);
    
  };

  return (
    <AuthContext.Provider value={{ token, currentUser, setToken, authenticated,setAuthenticated, loadCurrentlyLoggedInUser, logOut }}>
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