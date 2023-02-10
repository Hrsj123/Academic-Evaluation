import React from 'react'
import { Link } from 'react-router-dom'
import '../css/images.css'

function TutorPage() {
    return (
        <div className="container mt-4">
            <header>
                <h1 className='text-center'>Teachers</h1>
            </header>
            <main className='row'>
                <p className="text-center mb-0">
                    Register with us and manage handling many students with ease!
                </p>
                <img className="img-fluid img-tutor" src="/images/tutor.jpg" alt="Tutor" />
            <div className="text-center mt-4 mb-3 row">
                <div className="col-1"></div>
                <span className="text-center mt-1 col-3">
                    <Link to="setAssessmentVariables" >                                    {/* Prevernt redirect on click without entering valres! */}
                        <button className="btn btn-primary">Set Values</button>
                    </Link> 
                </span>
                <div className="col-1"></div>
                <span className="text-center mt-1 col-3">
                    <Link to="login">
                        <button className='btn btn-success'>Log In </button>
                    </Link>
                </span>
                <div className="col-1"></div>
                <span className="text-center mt-1 col-3">
                    <Link to="signup">
                        <button className='btn btn-success'>Sign Up</button>
                    </Link>
                </span>
            </div>
            </main>
        </div>
    );
}

export default TutorPage