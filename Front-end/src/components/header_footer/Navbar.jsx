import { React, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
 

function Navbar(props) {

    const navigate = useNavigate();

    const handleLogOut = (e) => {
        e.preventDefault();
        props.setIsAuthenticated(false);
        props.setUserName(null);
        props.setUserType(null);
        // --------------------
        localStorage.removeItem('user');
        // --------------------
        fetch('http://localhost:3500/auth/logout', {
            credentials: 'include'
        })
            .then(async (res) => {
                let parsedData;
                try {
                    parsedData = await res.json();
                } catch (error) {
                    console.log("Unable to convert to json!");
                }
                return {
                    data: parsedData,
                    err: !res.ok
                }
            })
            .then(({ data, err }) => {
                if (err) return alert("Unable to logout");
                console.log(data); // data recieved from the backend
                alert("LogOut successfull!");
                navigate('/');
            });
    }
    
    return (
        <nav className=" navbar navbar-expand-lg navbar-transparent bg-transparent img-dark-nav">
            <div className="container-fluid">
                <span className="navbar-brand">Study Buddy</span>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link style={{textDecoration: 'None'}} to="/">
                                <span className="nav-link active" aria-current="page">Home</span>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link style={{textDecoration: 'None'}} to="about">
                                <span className="nav-link active" >About Us</span>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link style={{textDecoration: 'None'}} to="contact">
                                <span className="nav-link active" tabIndex="-1" aria-disabled="true">Contact Us</span>
                            </Link>
                        </li>
                        
                        <li className="nav-item">
                            
                            <Link style={{textDecoration: 'None'}} to="assessment">
                                <span className="nav-link active" tabIndex="-1" aria-disabled="true">Assessment</span>
                            </Link>
                        </li>
                        {
                            props.isAuthenticated &&
                            <>
                                <li className="nav-item">
                                    <span className="nav-link active" tabIndex="-1" aria-disabled="true">{props.userName}</span>
                                </li>
                                <li className="nav-item">
                                    <span className="nav-link active" tabIndex="-1" aria-disabled="true">{props.userType}</span>
                                </li>
                                    
                            </>
                        }   
                    </ul>
                    
                    <div className="d-flex">
                        {
                            props.isAuthenticated ? 
                                <button className='btn btn-outline-success mx-2' onClick={handleLogOut}>Log Out</button>
                                    :
                                <>
                                    <Link to="login"><button className='btn btn-outline-success mx-2'>Log In</button></Link>
                                    <Link to="signup"><button className='btn btn-outline-success mx-2'>Sign up</button></Link>
                                </>
                        }
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;