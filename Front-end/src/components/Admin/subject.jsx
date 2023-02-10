import { useState } from 'react';       // Adding subject!
import { useLocation } from 'react-router-dom';

import '../css/images.css';

function RegisterSubject() {
    const [subject, setSubject] = useState({
        title: "",
        description: "",
    });

    const location = useLocation();         // To access refreshToken!

    function handleSubmit(event) {
        event.preventDefault();

        // Post request!    
        fetch('http://localhost:3500/subject', {
            method: "POST",
            mode: 'cors',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${location.state.accessToken}`
            },
            body: JSON.stringify(subject)
        })   
        .then(res => res.json())
        .then(data => console.log(data));
        
        setSubject({
            title: "",
            description: "",
        });
        
    }
    
    const handleInput = (e) => {
        const fieldName = e.target.name;
        const fieldValue = e.target.value; 
        console.log(fieldName, fieldValue);

        setSubject({
            ...subject, 
            [fieldName]: fieldValue                // [name] --> which input field is being types in !!
        })

    }

    return (    
        <div className="container mt-4 mb-4">
            <h3 className="text-center">Register a Subject</h3>
            <form onSubmit={handleSubmit} className="row mt-3">       
                <div className="col-12 col-lg-6">
                    <img className="img-sub-register" src="/images/subjectSignup.jpg" alt="Signup" />
                </div>
                <div className="col-12 col-lg-6 mt-5">
                    <label htmlFor='title'>Subject Name: </label>
                    <input 
                        type="text" name='title' id='title' autoComplete='off' placeholder='Subject name' className='form-control mt-2' 
                        value={subject.title} 
                        onChange={handleInput}
                        required />
                    <br />

                    <label htmlFor='description'>Subject description: </label>
                    <textarea name="description" cols="10" rows="2" id='description' autoComplete='off' placeholder='Description' className='form-control mt-2'
                        value={subject.description} 
                        onChange={handleInput}> 
                    </textarea>
                    <br />

                    <input type="submit" className="btn btn-success" value="Submit" />
                </div>
            </form> 
        </div>
    );
}

export default RegisterSubject