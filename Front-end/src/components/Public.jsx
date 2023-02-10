import React from 'react';
import { Link } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';      
import './css/public.css';

function UserType() {
  return(                   // Just add the name of route to be redirected to!
    <div className="row justify-content-around py-5">           
      <div className='col-4'>
        <Link to="tutor"><button className="col-12 btn btn-success">Teacher</button></Link>
      </div>
      <div className='col-4'>
        <Link to="Learners"><button className="col-12 btn btn-primary">Student</button></Link>
      </div>
    </div>
  ) 
}

function Heading() {
  return (
    <div className="bg-img">
      <div className="title container pt-5 m-bottom">
        <h1 className="welcome text-center"> Welcome to Study Buddy </h1>
        <p className='text-center mt-3'> We provide an highly customizable learner-assessment tool for educators worldwide </p>

        <div className='container row I-img-container justify-content-around my-2'>
          <div className="col-5 row justify-content-center">
            <img className="img-contain" src="/images/ABC.png" alt="img-1" />
            <figcaption className='text-center'>Technology aided assessments</figcaption>
          </div>

          <div className="col-5 row justify-content-center">
            <img className="img-contain" src="/images/online_edu.png" alt="img-2" />
            <figcaption className='text-center'>Worldwide accessibility</figcaption>
          </div>
        </div>      

        <h3 className='text-center m-started'>Get Started</h3>
        <UserType />
      </div>
    </div>
  )
} 

function Features() {
  return(
    <div className='container my-5'>
      <h4 className='mt-4 text-center'>We complement what you teach</h4>
      <div className="row m-feat">
        <ul className='list-unstyled justify-content-around container row'>
          <li className='col-3'>
            <img className="feature-img-contain" src="/images/assessment.png" alt="Assessment" />
            <p className='text-center my-1'>Conducting periodic assessment and activities</p>
          </li>
          <li className='col-3'>
            <img className="feature-img-contain" src="/images/feedback.png" alt="Feedback" />
            <p className='text-center my-1'>Help provide exclusive perfomance feedback</p>
          </li> 
          <li className='col-3'>
            <img className="feature-img-contain" src="/images/result.png" alt="Result" />
            <p className='text-center my-1'>Use fuzzy assessment instead of traditional scores</p>
          </li>
        </ul>
      </div>
    </div>
  )
}

function Public() {

  return (
    <div>
      <Heading title='Get Started' />
      <Features />
    </div>
  )
}


export default Public