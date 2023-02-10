import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/images.css';
import '../css/formValidation.css';


function RegisterTeacher() {
    const [teacher, setTeacher] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phoneNo: "",
        password: ""
    });

    function handleSubmit(e) {
        if (teacher.phoneNo.length < 10) {
            e.preventDefault();
            const phoneNo = document.getElementById('phoneNo').previousElementSibling;
            phoneNo.style.display = 'contents';
            console.log(phoneNo);
            return;
        }
        // Post request!    
        fetch(`http://localhost:3500/teacher/`, {
            method: 'POST',
            mode: 'cors',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(teacher)
        })
        .then(async res => {
            return {
                data: res.json(),
                err: !res.ok
            }
        })
        .then(({ data, err }) => {
            if (err) alert("An error occured!");
            console.log(data);
        })
        .catch(err => console.log(err));
        
        alert(`New teacher ${teacher.firstName} ${teacher.lastName} created!`);
        setTeacher({
            firstName: "",
            lastName: "",
            email: "",
            phoneNo: "",
            password: ""
        });
        
        e.preventDefault(); // Redirect instead!
    }
    
    const handleInput = (e) => {
        const fieldName = e.target.name;
        const fieldValue = e.target.value; 
        
        // Validation
        if (fieldName === 'phoneNo') {
            if (fieldValue.length > 10) return;
            for (let i = 0; i < fieldValue.length; i++)
                if (fieldValue.charCodeAt(i) < 48 || fieldValue.charCodeAt(i) > 57) return;
        }
        
        console.log(fieldName, fieldValue);

        setTeacher({
            ...teacher, 
            [fieldName]: fieldValue                // [name] --> which input field is being types in !!
        })

    }

    return (    
        <div className="container mt-4 mb-4">
            <form onSubmit={handleSubmit} className="row mt-3" method='POST'>       
                <div className="col-12 col-lg-6">
                    <h3 className="text-center">Register a Teacher</h3>
                    <img className="img-sub-register" src="/images/subjectSignup.jpg" alt="Signup" />
                </div>

                <div className="col-12 col-lg-6">
                    <div className="row mb-4">
                        <span className="col-6">
                            <label htmlFor='firstName'>First Name: </label>
                            <input 
                                type="text" name='firstName' id='firstName' autoComplete='off' placeholder='John' className='form-control mt-2' 
                                value={teacher.firstName} 
                                onChange={handleInput}
                                required/>
                        </span>

                        <span className="col-6">
                            <label htmlFor='lastName'>Last Name: </label>
                            <input 
                                type="text" name='lastName' id='lastName' autoComplete='off' placeholder='Doe' className='form-control mt-2' 
                                value={teacher.lastName} 
                                onChange={handleInput}
                                required/>
                        </span>
                    </div>

                    <label htmlFor='email'>Email: </label>
                    <input 
                        type="email" name='email' id='email' autoComplete='off' placeholder='John.doe@example.com' className='form-control mt-2'
                        value={teacher.email} 
                        onChange={handleInput}
                        required/>
                    <br />
                    
                    <label htmlFor='phoneNo'>Phone No:</label> <span className='error-message'>&nbsp;&nbsp;*Enter 10 digits</span>
                    <input 
                        type="text" name='phoneNo' id='phoneNo' autoComplete='off' placeholder='0123456789' className='form-control mt-2'
                        value={teacher.phoneNo} 
                        onChange={handleInput}
                        required/>
                    <br />

                    
                    {/* Define conditions for accepted passwords! */}
                    <label htmlFor='password'>Password:</label>
                    <input 
                        type="password" name='password' id='password' autoComplete='off' placeholder='•••••••••' className='form-control mt-2' 
                        value={teacher.password} 
                        onChange={handleInput}
                        required/>
                    <br />


                    <input type="submit" className="btn btn-success" value="Submit" />
                </div>
            </form> 
        </div>
    );
}

export default RegisterTeacher