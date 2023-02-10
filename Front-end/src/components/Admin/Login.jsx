import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function AdminLogin() {
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);

    const [accessToken, setAccessToken] = useState(null);

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`http://localhost:3500/admin/auth`, {
                method: 'POST',
                mode: 'cors',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({                             
                    "username": username,
                    "password": password,
                    "roles": 1234
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
                if (err) return alert("Error occured!");
                setAccessToken(parsedData.accessToken);
            });
    }

    // Accessing a protected route after login!!!
    useEffect(() => {                    
        if (accessToken) {
            navigate("../setSubject", { state: { "accessToken": accessToken } });   
        }
    }, [accessToken, navigate]);


    const handleInputUsername = (e) => {
        setUsername(e.target.value);
    }

    const handleInputPassword = (e) => {
        setPassword(e.target.value);
    }

    return (
        <div className="container mt-4 mb-5">
            <h3 className="text-center">Admin Login</h3>
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

                    <input type="submit" className="btn btn-success mt-5" value="Set Subject" />
                </div>
            </form>
        </div>
    );
}

export default AdminLogin