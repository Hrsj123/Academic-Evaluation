import { useState, useEffect } from 'react';
import { useOutletContext, useNavigate } from 'react-router-dom';

function StudentLogin() {
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);

    const [accessToken, setAccessToken] = useState(null);

    // In case we wish to access accessToken(one saved in local storage!)
    const { setIsAuthenticated, setUserName, setUserType } = useOutletContext();

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        fetch(`http://localhost:3500/student/auth`, {
                method: 'POST',
                mode: 'cors',
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({                             
                    "username": username,
                    "password": password,
                    "roles": 3456
                })
            })
            .then(async res => {
                let err = false;
                let parsedData;
                try {
                    parsedData = await res.json();
                } catch (error) {
                    console.log("Invalid username or password");
                    console.log({error: error.message});             // If only a status code is recieved from the server and no json message!
                    err = true;
                }
                return {
                    parsedData: parsedData,
                    err: err ? (true) : (res.status >= 400 ? true : false)
                }
            })
            .then(({parsedData, err}) => {
                if (err) {
                    setIsAuthenticated(false);
                    setUserName(null);
                    setUserType(null);
                    return alert("Error occured!");
                };
                console.log(parsedData);
                setAccessToken(parsedData.accessToken);             
                setIsAuthenticated(true);                                               // Concluded!
                setUserName(username);
                setUserType("Student");
                const user = {
                    userName: username,
                    accessToken: parsedData.accessToken,                                                               
                    userType: "Student"
                }
                localStorage.setItem("user", JSON.stringify(user));
                alert("Login successfull!");
                navigate(`../users/${username}`);                                       // This part is reached only when user is authenticated!
            });

            e.preventDefault();   
    }

    const handleInputUsername = (e) => {
        setUsername(e.target.value);
    }

    const handleInputPassword = (e) => {
        setPassword(e.target.value);
    }

    return (
        <div className="container mt-4 mb-5">
            <h3 className="text-center">Student Login</h3>
            <form onSubmit={handleSubmit} className="row mt-3" method='POST'>
                <div className="col-12 col-lg-6">
                    <img className="img-sub-register" src="/images/subjectSignup.jpg" alt="Signup" />
                </div>
                <div className="col-12 col-lg-6">
                    <div className="my-5"></div>
                    
                    <label htmlFor='username'>Username: </label>
                    <input 
                        type="text" name='username' id='username' autoComplete='off' placeholder='Username' className='form-control mt-2' 
                        onChange={handleInputUsername}
                        required/>
                    <br />

                    <label htmlFor='password'>Password:</label>
                    <input 
                        type="password" name='password' id='password' autoComplete='off' placeholder='Password' className='form-control mt-2'
                        onChange={handleInputPassword}
                        required/>
                    <br />

                    <input type="submit" className="btn btn-success mt-5" value="Submit" />
                </div>
            </form>
        </div>
    );
}

export default StudentLogin