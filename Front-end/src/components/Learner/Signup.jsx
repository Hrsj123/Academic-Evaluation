import { useState } from 'react';
import '../css/images.css';
import '../css/formValidation.css';
// import '../css/selectSubjectsDropdown.css';

function LearnerSignup() {
    const [learner, setLearner] = useState({
        firstName: "",
        lastName: "",
        phoneNo: "",                   
        email: "",                     
        password: "",
    });

    // const [subjects, setSubjects] = useState([]);

    // const [placeholder, setPlaceholder] = useState('Select');

    // phone number input validation!
    function maxLengthCheck(e) {
        const num = e.target.value
        if (num.length > 10) {
            e.target.value = num.slice(0, 10);
        }

    }

    function handleSubmit(event) {
        if (learner.phoneNo.length < 10) {
            event.preventDefault();
            const phoneNo = document.getElementById('phoneNo').previousElementSibling;
            phoneNo.style.display = 'contents';
            console.log(phoneNo);
            return;
        }

        // Post request!    
        console.log(learner);
        fetch('http://localhost:3500/student/', {
            method: 'POST',
            mode: 'cors',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(learner)
        })
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(err => console.log(err));                // Should prompt actually!
        
        // console.log(learner);
        alert(`New student ${learner.firstName} ${learner.lastName}`);
        setLearner({
            firstName: "",
            lastName: "",
            phoneNo: "",                    
            email: "",                      
            password: "",
        });
        
        event.preventDefault();                         // Redirect instead!
    }

    const handleInput = (e) => {
        const fieldName = e.target.name;
        const fieldValue = e.target.value; 
        console.log(fieldName, fieldValue);
        
        setLearner({
            ...learner, 
            [fieldName]: fieldValue                // [name] --> which input field is being types in !!
        })
    }
    
    // const handleDropdown = (e) => {
    //     const dropName = e.target.name;
    //     const dropValue = e.target.value;
    //     console.log(dropName, dropValue);

    //     setLearner({
    //         ...learner, 
    //         subjectsList: [dropValue]
    //     })
    //     setPlaceholder(dropValue)
    // }

 

    // get request to fetch available subjects!
    // function callApi() {
    //     fetch('http://localhost:3500/tutor/getSubjects/')
    //     .then(res => res.json())
    //     .then(data => {
    //         console.log(data);
    //         return setSubjects(data);
    //     });
    // }

    // useEffect(() => {
    //     callApi();
    // }, []);

    return (    
        <div className="container mt-4 mb-4">
            <form onSubmit={handleSubmit} className="row mt-3" method='POST'>       
                <div className="col-12 col-lg-6">
                    <h2 className="text-center">Learner Sign-up</h2>
                    <img className="img-student-register" src="/images/learnerSignup.jpg" alt="Signup" />  
                </div>

                <div className="col-12 col-lg-6">
                    <div className="row">
                        <span className="col-6">
                            <label htmlFor='firstName' className='mt-4'>Fisrt name: </label>
                            <input 
                                type="text" name='firstName' id='firstName' autoComplete='off' placeholder='Fisrt name' className='form-control mt-2' 
                                value={learner.firstName} 
                                onChange={handleInput}
                                required/>
                        </span>

                        <span className="col-6">
                            <label htmlFor='lastName' className='mt-4'>Last name: </label>
                            <input 
                                type="text" name='lastName' id='lastName' autoComplete='off' placeholder='Last name' className='form-control mt-2'
                                value={learner.lastName} 
                                onChange={handleInput}
                                required/>
                            <br />
                        </span>
                    </div>

                    <label htmlFor='phoneNo'>Phone number: </label>     <span className='error-message'>&nbsp;&nbsp;*Enter 10 digits</span>
                    <input 
                        type="number" name='phoneNo' id='phoneNo' autoComplete='off' placeholder='Enter your number' className='form-control mt-2'
                        onInput={maxLengthCheck} minLength="10" maxLength="10" 
                        value={learner.phoneNo} 
                        onChange={handleInput}
                        required/>
                    <br />

                    <label htmlFor='email'>Email: </label>
                    <input 
                        type="email" name='email' id='email' autoComplete='off' placeholder='Enter your email' className='form-control mt-2'
                        value={learner.email} 
                        onChange={handleInput}
                        required/>
                    <br />
                    

                    {/* Define conditions for accepted passwords! */}
                    <label htmlFor='password'>password: </label>
                    <input 
                        type="password" name='password' id='password' autoComplete='off' placeholder='Enter your password' className='form-control mt-2'
                        value={learner.password} 
                        onChange={handleInput}
                        required/>
                    <br />


                    {/* Re-implement: Dropdown list with multiple options (Refer to the blog in browser!)
                    
                    <label htmlFor="subjectsList">Select Subjects: &nbsp;</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <span class="btn btn-primary dropdown-toggle" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{placeholder}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </span>
                    <ul class="dropdown-menu"  aria-labelledby="dropdownMenuLink">
                    {
                        subjects.map((subject) => {
                            return (
                                <input type="button" key={subject._id} className="dropdown-item" name="subjectsList" onClick={handleDropdown} value={subject.name} />
                            );
                        })
                    }
                    </ul> <br /> */}

                    
                    <input type="submit" className="btn btn-success mt-2" value="Submit"/>
                    
                </div>
            </form> 
        </div>
    );
}

export default LearnerSignup


