import { Link, Redirect } from 'react-router-dom';
import { useState, useEffect } from 'react';
import '../css/inputWidth.css';
// import { connect } from 'react-redux';

const SubjectDropdown = (props) => {

    // Values to be displayed in dropdown!
    const [subjects, setSubjects] = useState([]);

    // Placeholder of dropdowns 
    const [subNamePlaceholder, setSubNamePlaceholder] = useState('Select');

    // Dropdown -----> Display available subject
    function handleDropdown(e) {
        e.preventDefault(); 
        const val = e.target.value;                         // val = subName
        console.log(val);
        setSubNamePlaceholder(val);                     
        props.run(val);
    }

    // Api call --> get subjects  
    function callSubjectsApi() {                        // Fetch Subjects!
        fetch('http://localhost:3500/tutor/getSubjects/')   
        .then(res => res.json())
        .then(data => {
            console.log(data);
            return setSubjects(data);
        })
        .catch(err => {
            alert('Unable to reach server!');
        });
    }       

    // First api call
    useEffect(() => {           // Fetch all subject!
        callSubjectsApi();
    }, []);   

    return (
        <div className="col-12 row">
            <div className="col-4"></div>
            <div className="col-4">
                <label htmlFor="subjectsList">Select Subjects: &nbsp;</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <span className="btn btn-primary dropdown-toggle" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{subNamePlaceholder}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </span>
                <ul className="dropdown-menu"  aria-labelledby="dropdownMenuLink">
                {
                    subjects.map((subject) => {
                        return (
                            <input type="button" key={subject._id} className="dropdown-item" name="subjectsList" onClick={handleDropdown} value={subject.name} />
                        );
                    })
                }
                </ul> <br />
            </div>
        </div>
    );
}


const StudentDropdown = (props) => {
    // Values to be displayed in dropdown!
    const [learners, setLearners] = useState([]);

    // Placeholder of dropdowns 
    const [learnerPlaceholder, setLearnerPlaceholder] = useState('Select');

    // To reset learner if the subject name is changed after selecting a student!
    const [subName, setSubName] = useState('');

    // Dropdown -----> Display Learners according to subject!
    function handleLearnerDropdown(e) {                                       // --> state
        e.preventDefault();
        const value = e.target.value;                                           // value = studentName
        setLearnerPlaceholder(value);
        const targetLearner = learners.filter(learner => `${learner.firstName} ${learner.lastName}` === value);    // Ideally should filter on "_id" basis
        props.learnerName(value);
        props.learnerId(targetLearner[0]._id);     
    }

    // Api call (GET) --> get learners
    function callLearnersApi(subName) {                                                     // This function is passed as a prop to SubjectDropdown via SetValuesForm              
        fetch(`http://localhost:3500/tutor/${subName}/enrolledStudents/`)
        .then(res => res.json())
        .then(data => {
            console.log(`\nLearners enrolled in subject ${subName}:`);
            console.log(data);
            return setLearners(data);
        })
        .catch(err => {
            alert('Unable to reach server!');
        });
    }   // -> 

    useEffect(() => {
        // Initially if subject is selected followed by learner and then subject is changed again -----> We re-set the selected student!
        if (subName !== '') {                                               
            setLearnerPlaceholder('Select');
            props.resetFormPlaceholder();
            // form componrnt visible ---------->  if --------> learnerPlaceholder !== 'Select'
        }
        // Fetch learners enrolled in the selected subject!
        if (props.subName !== '') {                                             
            setSubName(props.subName);
            callLearnersApi(props.subName);          
        }
    }, [props.subName, subName]);
    
    return (
        <div className="col-12 row mt-5">    
            <div className="col-4"></div>
            <div className="col-8">
                <label htmlFor="subjectsList">Select Students: &nbsp;</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <span className={props.subName === '' ? 'btn btn-primary dropdown-toggle disabled' : 'btn btn-primary dropdown-toggle'}     // Here!
                    role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false"
                >
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{learnerPlaceholder}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </span>
                <ul className="dropdown-menu"  aria-labelledby="dropdownMenuLink">
                {
                    learners.map((learner) => {
                        return (
                            <input type="button" key={learner._id} className="dropdown-item" name="learnersList" onClick={handleLearnerDropdown} value={`${learner.firstName} ${learner.lastName}`} />
                        );  
                    })
                }
                </ul> <br />
            </div>
        </div>
    );
}


const SetValuesForm = (props) => {

    // To run function in StudentDropdown from SubjectDropdown!
    const [subName, setSubName] = useState('');

    // For display student name!
    const [studentName, setStudnetName] = useState('');

    // Required in URL for fetching old values (if any)
    const [learnerId, setLearnerId] = useState('');                            

    // Take input   
    const [attendance, setAttendance] = useState([...Array(12)]);                           // Array of values  (Both Set and Update)
    const [interaction, setInteraction] = useState([...Array(12)]);                         // Array of values  (Both Set and Update)
    const [marks, setMarks] = useState([...Array(12)]);                                     // Array of values  (Only Set)


    // Last function
    function handleSubmit(e) { 
        e.preventDefault();
        // post requests to set data!
        callSetFuzzyValuesApi();                // If subject is not set  ---> We need 1st call for adding subject in assessment table: 
        callSetFuzzyValuesApi();                // We can run one of these at ".catch()" in "getOldFuzzyValue()"!
        callSetMarksApi();
        alert('Form data submitted!');
    }

    
    function handleAttendanceInputs(e, index) {
        // Handle inputs for attendance!    -----> Update attendance hooks
        setAttendance({
            ...attendance,
            [index-1]: e.target.value
        });
    }

    
    function handleInteractionInputs(e, index) {
        // Handle inputs for interaction!    -----> Update interaction hooks
        setInteraction({
            ...interaction,
            [index-1]: e.target.value
        });
    }
    
    function handleMarksInputs(e, index) {
        // Handle inputs for marks!                         -----> Update marks hook
        setMarks({
            ...marks,
            [index-1]: e.target.value
        });
    }

    // useEffect(() => {
    //     console.log('-------------------------------------------------------------');
    //     console.log(attendance, interaction, marks);
    //     console.log('-------------------------------------------------------------');
    // }, [attendance, interaction, marks]);

    function resetPlaceholderValues() {
        setAttendance([...Array(12)]);
        setInteraction([...Array(12)]);
        setMarks([...Array(12)]);
    }

    // Api call (POST) --> set values
    function callSetFuzzyValuesApi() {
        fetch('http://localhost:3500/tutor/setFuzzyValues/', {
                method: 'POST',
                mode: 'cors',
                headers: {
                    "Content-Type": "application/json",
                },
                body: {
                    "attendance": attendance,
                    "interaction": interaction
                }
            })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                return;
            })
            .catch();                                                                   // Possible err ?
    }    

    // Api call (POST) --> set marks
    function callSetMarksApi() {                                            // Before create a form to except input!
        fetch('http://localhost:3500/tutor/setFuzzyValues/', {
                method: 'POST',
                mode: 'cors',
                headers: {
                    "Content-Type": "application/json",
                },
                body: {
                    "scores": marks,
                    "testNumber": [...Array(12)]
                }
            })
            .then(res => res.json())
            .then(data => {
            console.log(data);
            return;
            })
            .catch();                                                                   // Possible err ?
    }   


    // For update fuzzy values (GET)                                                    // Then post the newly filled value same as new    
    function callOldFuzzyValues() {
        fetch(`http://localhost:3500/tutor/${learnerId}/${subName}/getFuzzy`)                                                                
            .then(res => {
                console.log(res);
                console.log(res.ok);
                if (!res.ok) throw Error('Learner does not have assessment document!');          // Catch learners without assessment document!
                return res.json();
            })
            .then(data => {
                console.log(data); 
                setAttendance(data.assessmentVariables.filter(ele => ele.subject = subName)[0].attendance);                                                                                      //
                setInteraction(data.assessmentVariables.filter(ele => ele.subject = subName)[0].interaction);                                                                                    //
                return;                    // Set these values in hooks                                                                                     
            })
            .catch(err => {
                console.log(`Error: ${err}`);
                console.log(`No values set for attendance and interaction for ${studentName} in ${subName}`);
                setAttendance([...Array(12)].fill('new'));
                setInteraction([...Array(12)].fill('new'));
                return;
            });                                                                       // If does not exist 
    }

    // For update marks   (GET)
    function callOldMarks() {                                                       // Back end not ready to accept this request!
        fetch(`http://localhost:3500/tutor/${learnerId}/${subName}/getMarks`)                                                                
            .then(res => {  
                if (!res.ok) throw Error('Learner does not have marks set!');          // Catch learners without marks document!
                return res.json();
            })
            .then(data => {
                console.log(data);
                console.log(data.marks);
                console.log(data.marks.map(ele => ele.score));
                return setMarks(data.marks.map(ele => `Test ${ele.testNumber}:   ${ele.score}`));          // Array with [(id, score, testNumber)]
                // Hopefully ----> All scores renders sequentially!
            })
            .catch(err => {
                console.log(`Error: ${err}`);
                console.log(`No marks set before for ${studentName} in ${subName}`);
                return setMarks([...Array(12)].fill('new'));
            });
    } 

    // Should be in form component! ----> Fetched oldValues (if any)
    useEffect(() => {
        // ---------------------> Save fetched oldValues (if any) as "initial value of states" and as "place-holders"!
        if (learnerId !== '') {                             // Set it as empty again on submit!
            callOldFuzzyValues();
            callOldMarks();
        }
    }, [learnerId]); 

    return (                            // Hide the form ---> until learner not selected!
        <form className='row mt-5'>
                <SubjectDropdown 
                    run={(subName) => setSubName(subName)} 
                />

                <StudentDropdown 
                    subName={subName} 
                    learnerId={(id) => setLearnerId(id)}
                    learnerName={(name) => setStudnetName(name)}
                    resetFormPlaceholder={() => resetPlaceholderValues()}
                />
                
                {/* Set values! */}
                <div className="mt-5 text-center">
                    <div className="row">
                        <h3 className='tect-center'>{subName}</h3>
                        <h3 className='tect-center'>{studentName}</h3>
                    </div>
                    <table className="table table-bordered border-primary table-light table-hover mt-2">
                        <thead className='table-primary table-bordered border-primary'>
                            <tr>
                            <th scope="col">Week</th>
                            <th scope="col">Attendance (out of 7) </th>
                            <th scope="col">Interaction (out of 7)</th>
                            <th scope="col">Marks (out of {})</th>              
                            {/* 
                                Difficult: 1) Need to fetch subject and check it's totalMarks 
                                Easy: 2) Set a new attribute in marks schema (Something like this!)--> type:"Schame.Types.totalMarks"  ref:"Subject"
                            */}
                            </tr>
                        </thead>
                        {
                        ([...Array(12)].map((t, i) => i+1)).map((input, index) => {
                            return (
                                <tbody>
                                    <tr>
                                        <th scope="row">{index+1}</th>
                                        <td>
                                            <div class="input-group">
                                                <input type="text" class="form-control" placeholder={attendance[index]} 
                                                aria-label="Username" aria-describedby="basic-addon1"
                                                onChange={(e) => handleAttendanceInputs(e, index+1)}
                                            />
                                            </div>
                                        </td>
                                        <td>
                                            <div class="input-group">
                                                <input type="text" class="form-control" placeholder={interaction[index]} 
                                                aria-label="Username" aria-describedby="basic-addon1"
                                                onChange={(e) => handleInteractionInputs(e, index+1)}        
                                            />
                                            </div>
                                        </td>
                                        <td>
                                            <div class="input-group">
                                                <input type="text" class="form-control" placeholder={marks[index]} 
                                                aria-label="Username" aria-describedby="basic-addon1"
                                                onChange={(e) => handleMarksInputs(e, index+1)}        
                                            />
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            );
                        })
                        }
                    </table>
                </div>

                <div className="text-center mt-3 mb-5">
                    <Link to="">                            {/* Should remove Link if Redirect works! */}
                        <input className='btn btn-success' type="submit" value="Submit" onClick={handleSubmit}/>    
                    </Link>
                </div>

        </form>
    );
}


const SetAssessmentVariables = () => {   // 2* post request to set attendance and interaction!
    // For loading spinner      // -----------------> when promice state is pending ------> overlap the page
    const [isServerAlive, setIsServerAlive] = useState(false); 

    useEffect(() => {
        fetch('http://localhost:3500/')
            .then(res => {
                if (!res.ok) throw Error('Server unreachable!');
                setIsServerAlive(true);
                return res.json();
            })
            .then(data => console.log(data))
            .catch(err => {
                console.log(err);
                setIsServerAlive(false);
            });
    }, []); 

    return (
        <div className="container mt-5">
            { isServerAlive && 
                <div>
                    <h1 className="text-center">Set Attendance, Interaction and Marks</h1>
                    <SetValuesForm />
                </div>
            }
            { !isServerAlive &&
                <h1 className="text-center mt-5">
                    Server Un-reachable!
                </h1>
            }
        </div>
    );
}

export default SetAssessmentVariables

/*
<table className="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">First</th>
      <th scope="col">Last</th>
      <th scope="col">Handle</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">1</th>
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
    </tr>
    <tr>
      <th scope="row">2</th>
      <td>Jacob</td>
      <td>Thornton</td>
      <td>@fat</td>
    </tr>
    <tr>
      <th scope="row">3</th>
      <td>Larry</td>
      <td>the Bird</td>
      <td>@twitter</td>
    </tr>
  </tbody>
</table>
*/



/**
 * Take input and store it into states
 * Loading Spinner
 * Old values (if any) as place holders for input!
 */






//     <label htmlFor={input}>Week no.&nbsp;&nbsp;&nbsp; </label>&nbsp;&nbsp;&nbsp;

//     <label htmlFor={input}>Test Marks {input}:</label>&nbsp;&nbsp;&nbsp;
//     {/* <input key={input} name={input} maxLength="4" type="text" className='className="form-control onChange decWidth' onChahnge=""/>&nbsp;&nbsp;&nbsp; */}

//     <label htmlFor={input}>Test Marks{input}:</label>&nbsp;&nbsp;&nbsp;
//     {/* <input key={input} name={input} maxLength="4" type="text" className='className="form-control onChange decWidth' onChahnge=""/>&nbsp;&nbsp;&nbsp; */}

//     <label htmlFor={input}>Test Marks{input}:</label>&nbsp;&nbsp;&nbsp;
//     {/* <input key={input} name={input} maxLength="4" type="text" className='className="form-control onChange decWidth' onChahnge=""/>&nbsp;&nbsp;&nbsp; */}
// </div> 
