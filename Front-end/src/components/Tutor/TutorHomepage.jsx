import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Plot from 'react-plotly.js'

const TutorHomepage = () => {   // Option to view and set score --> from this page (by redirect!)
  
  return (
    <div className='container'>
        {/* TODO: View All possible visualizations!!! -> Similar to Learner Hopepages third card! */}
        <div className="text-center mt-5">
          <Plot 
            data={[
              {
                x: [1, 2, 3],
                y: [2, 3, 6],
                type: 'scatter',
                mode: 'lines+markers',
                marker: { color: 'red' },
              },
              { type: 'bar', x: [1, 2, 3], y: [2, 5, 3] },
            ]}
            layout={{ width: 500, height: 500, title: 'A Fancy Plot' }}
            />
        </div>
        <Link to='/tutor/setAssessmentVariables'>
            <button className='btn btn-success'>Set Values</button> 
        </Link>
    </div>
  )
}

export default TutorHomepage