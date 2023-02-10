import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

const LearnerHomepage = () => {

  const [subjects, setSubjects] = useState([]);

  const [selectedSubject, setSelectedSubject] = useState('-- Select --');

  const effectRan = useRef(false);

  useEffect(() => {
    if (effectRan.current === false) {

      fetch('http://localhost:3500/subject', {
        method: 'GET',
        headers: {
          authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).accessToken}`
        }
      })
        .then(async res => {
          let parsedData;
          try {
            parsedData = await res.json();
          } catch (error) {
            console.log(error);
          }
          return {
            data: parsedData,
            err: !res.ok
          }
        })
        .then(({ data, err }) => {
          if (err) alert('An error occured!');
          console.log(data);
          setSubjects(data);
        });

      return () => {
        effectRan.current = true;
      }
    }
  }, []);

  const handleSubject = (e) => {
    e.preventDefault();
    let value = e.target.value;
    console.log(value);
    setSelectedSubject(value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:3500/student/registerSubject', {
      method: 'POST', 
      headers: {
        authentication: `Bearer ${JSON.parse(localStorage.getItem('user')).accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: JSON.parse(localStorage.getItem('user')).userName,
        subject: selectedSubject
      })
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        alert('Request sent successfully!');
      });
      
  }

  return (
    <div className='container'>
      <h1 className='text-center mt-5 mb-3'>Learner Homepage</h1>

      {/* Give Exam */}
      <div className="card my-4">
        <h1 className='text-center mt-3'>GIVE TEST</h1>
        <div className="card-body text-center">
          <img src="..." className="card-img-top" alt="..." />
          <p className="card-text">Assess yourself by giving tests (Will probably work on that later!)</p>
          <a href="#" className="btn btn-primary">Let's Go!</a>
        </div>
      </div> 
      
      <div className="row mb-5">
        {/* 1 */}
        <div className="card col-lg-5 col-12 mx-lg-5 mx-0">
          <h1 className='text-center mt-3'>Select Subject</h1>
          <div className="card-body text-center">
            <img src="..." className="card-img-top" alt="..." />
            <p className="card-text">Get yourself enrolled in various subjects!</p>

            <div className="row text-center">
              <div className="dropdown col-lg-6 col-12">
                <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                  {selectedSubject}
                </button>
                <ul className="dropdown-menu">
                  {      
                    subjects.map((subject) => 
                      <button key={subject.subjectCode} className="dropdown-item" onClick={handleSubject} value={subject.title}>{subject.title}</button>
                    )
                  }
                  
                </ul>

              </div>
              <div className="col-lg-6 col-12 mt-lg-0 mt-3">
                <button onClick={handleSubmit} className="btn btn-primary">Set subjects</button>
              </div>
            </div>
          </div>
        </div> 
        {/* 2 */}
        <div className="card col-lg-5 col-12 mx-lg-4 mx-0 mt-lg-0 mt-5">
          <h1 className='text-center mt-3'>Scores</h1>
          <div className="card-body text-center">
            <img src="..." className="card-img-top" alt="..." />
            <p className="card-text">Assess yourself based upom your previous tests!</p>
            <Link to='./viewAssessment' state={{ analysisType: "Self" }}>
              <button href="#" className="btn btn-primary mx-4">Self Analysis</button>
            </Link>
            <Link to='./viewAssessment' state={{ analysisType: "Avg" }}>
              <button href="#" className="btn btn-primary mx-4">Class Average</button>
            </Link>
          </div>
        </div> 
      </div>
    </div>
  )
}

export default LearnerHomepage


// {/* <button>Select Subjects</button>        
// <button>View Score</button>             {/* --> Sub: your score: class avg socre */}
// <button>Give Exam</button>              --> May redirect to a different pages 