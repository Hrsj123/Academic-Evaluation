import { useState, useEffect } from 'react';
import '../css/images.css';
import '../css/dropdown.css';
import '../css/preventRedirect.css';
import { Link } from 'react-router-dom';
// Image url: "http://localhost:3500/images/Attendance_63584742ab0339277a5220fc_Computer_Networks.png"
const OneLearnerOneSubject = () => {
    const [learners, setLearners] = useState([]);                                                               // array of learner id!
    const [subjects, setSubjects] = useState([]);

    const [learnerPlaceholder, setLearnerPlaceholder] = useState('Select');                                   
    const [subNamePlaceholder, setSubNamePlaceholder] = useState('Select');
    
    const [urlLearnerID, setUrlLearnerID] = useState('');
    const [urlSubjectName, setUrlSubjectName] = useState('');


    function handleDropdown(e) {            // For learners
        e.preventDefault();
        const name = e.target.name;
        const val = e.target.value;
        const learnerId = val.split('.')[1];
        setLearnerPlaceholder(val.split('*')[1]);
        console.log(`${name}`);
        console.log(`${learnerId}`);

        setUrlLearnerID(learnerId);                 // <-----------------------------------
        callSubjectsApi(learnerId);         
    }

    function handleDropdownSubs(e) {                        // Creates Visualization!
        e.preventDefault();                    
        const name = e.target.value;
        setSubNamePlaceholder(name);
        setUrlSubjectName(name);                  //
        console.log('*-*-*-*-**--*-*-*-*-*-*-*-*--*-*-');
        console.log(urlSubjectName);
    }

    function callSubjectsApi(learnerId) {                                                    // -----------------> After drop down has entries
        fetch('http://localhost:3500/learners/subjectsEnrolled/', {
            method: 'POST',
            mode: 'cors',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ "learnerId": learnerId })              // Check format!                             
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            return setSubjects(data);   
        });
        console.log(subjects);
    }


    function callLearnersApi() {        
        fetch('http://localhost:3500/learners/getLearners/')                        // (Gets entire learners json!)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            return setLearners(data);   
        });
    }

    useEffect(() => {
        callLearnersApi();      // Get request
    }, []);


    return (
        <div className='container mt-5'>
            <h1 className="text-center">SUBJECT BASIS ANALYSIS OF THE STUDENT</h1> <hr />
            {/* Form to create post request on url --> `${}`
             */}
            <div className="row">
                <form>
                    <div className="row">

                        {/* Set student! */}
                        <div className="dropdown col-5">
                            <label htmlFor="subjectList">Select Student: &nbsp;</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <span className="btn btn-primary dropdown-toggle" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{learnerPlaceholder}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            </span>
                            <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                            {
                                learners.map((learner) => {
                                    return (
                                        <input key={learner._id} type="button" name="learner" className="dropdown-item w-100" 
                                            value={ `☰ NAME: *${learner.firstName + learner.lastName}* ID: .${learner._id}. ` }  
                                            onClick={handleDropdown}
                                        />
                                    );
                                }) 
                            }
                            </ul>
                        </div>

                        {/* Set subject! */}
                        <div className="dropdown mt-5 col-5">
                            <label htmlFor="subjectList">Select Subject: &nbsp;</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <span className="btn btn-primary dropdown-toggle" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{subNamePlaceholder}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            </span>
                            <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                            {
                                subjects.map((subject) => { 
                                    return (
                                        <input key={subject._id} type="button" name="subject" className="dropdown-item" 
                                            value={subject.name}
                                            onClick={handleDropdownSubs}
                                        />
                                    );
                                })
                            }
                            </ul>
                        </div>
                    </div>
                    {/*Dissable Link is unfilled form!*/}
                    <Link to="../assess-student" state={{ learnerId: urlLearnerID, subName: urlSubjectName }}>              {/* Will have to set url here! */}
                        <input className="btn btn-primary" type="submit" value="Submit" />
                    </Link>
                </form>
            </div>
        </div>
    )
}

export default OneLearnerOneSubject
