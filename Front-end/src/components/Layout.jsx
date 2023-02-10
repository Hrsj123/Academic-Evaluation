import { Outlet, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

import Navbar from "./header_footer/Navbar";
import Footer from "./header_footer/Footer";
import './css/layout.css';

const Layout = (props) => {

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState(null);
  const [userType, setUserType] = useState(null);

  const navigate = useNavigate();
  const effectRan = useRef(false);

  useEffect(() => {
    if (userType) {
      props.setUserType(userType);
    }
  },[userType]);

  useEffect(() => {
    let loggedInUser = localStorage.getItem("user");
    
    if (loggedInUser) {
      loggedInUser = JSON.parse(loggedInUser);
      // Checked the users refresh token is valid: if yes --> Go ahead
      // If not check id the access token is valid: if yes --> Go ahead and request a new access token
      // If not log out the user!
      if (effectRan.current == false) {
        
        fetch('http://localhost:3500/secret', {
          method: 'GET',
          credentials: 'include',
          headers: {
            authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).accessToken}`
          }
        })
        .then(res => res.status)
        .then(async status => {
          if (status === 200) {
              setIsAuthenticated(true);
              setUserName(loggedInUser.userName);
              setUserType(loggedInUser.userType);
              props.setIsAuthenticated(true);
            }
          else if (status === 403) { // If status is 403 --> accessToken is probably expired!
            console.log('Manage the error!');
              await fetch('http://localhost:3500/auth/refreshToken', {
                method: 'GET',
                credentials: 'include'                  // We dont recieve the response of the first render! (the new refresh token which is send by the server on first request)
              })
                .then(async res => {
                    let parsedData;
                    try {
                      parsedData = await res.json();      
                    } catch (error) {
                      console.log(error);
                      alert("Unable to parse the response!");        
                    }
                    return {
                        data: parsedData,
                        err: !res.ok                    
                    }
                })
                .then(({data, err}) => {
                    if (err) {
                      console.log(err);
                      localStorage.removeItem('user');
                      alert("You session has ended!");      
                      return navigate('/learner/login')        
                    }
                    
                    // Reset the accessToken in the localstorage
                    loggedInUser.accessToken = data.accessToken;
                    localStorage.removeItem(loggedInUser);    
                    localStorage.setItem('user', JSON.stringify(loggedInUser));
                    // re-set the hooks 
                    setIsAuthenticated(true);
                    setUserName(loggedInUser.userName);
                    setUserType(loggedInUser.userType);
                    props.setIsAuthenticated(true);
                });
            
            // --------------------------------
          }
        })
          return () => {
            effectRan.current = true;
          }
      }
    } 
  }, []);

  // setAuthenticated info in app.js 
  useEffect(() => {
    props.setIsAuthenticated(isAuthenticated ? true : false);
  }, [isAuthenticated]);

  return (
    <div className="layout">
      <div className="content-wrap">
        
        <Navbar 
          isAuthenticated={isAuthenticated} 
          setIsAuthenticated={setIsAuthenticated}
          userName={userName}
          setUserName={setUserName}
          userType={userType} 
          setUserType={setUserType} />                                               {/* Can pass in the post of logged in user! */ }

        <Outlet context={{ setIsAuthenticated, setUserName, setUserType }}/>                    {/* -----> Here Students' pages are added! */}

      </div>
      <Footer />
    </div>
  );
}

export default Layout