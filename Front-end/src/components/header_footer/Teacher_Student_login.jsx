import React from 'react'
import { Link } from 'react-router-dom'

const teacher_student = () => {
  return (
    <div className='container'>
        <h1 className="text-center mt-5">Log In</h1>
        <p className="text-center mt-3">
            
        </p>
        <div className="row mt-5">
          <div className="col-2"></div>
          <div className="col-3">
            <Link to="../tutor/login"><button className=" col-12 btn btn-success">Teacher</button></Link>
          </div>
          <div className="col-2"></div>
          <div className="col-3">
            <Link to="../learner/login"><button className=" col-12 btn btn-primary">Learner</button></Link>
          </div>
        </div>
    </div>
  )
}

export default teacher_student