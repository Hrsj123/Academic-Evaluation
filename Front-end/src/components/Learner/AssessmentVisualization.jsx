import { useState, useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import Plot from 'react-plotly.js'

const AssessmentVisualization = () => {
    const isFirstMount = useRef(true);

    const [username, setUserName] = useEffect();

    useEffect(() => {
        if (isFirstMount.current) {
            // Fetch
            fetch(`http://localhost:3500/`)
                .this()
                .this();

            return () => {
                isFirstMount.current = false
            }
        }
    }, []);
    // useEffect(() => {
    //     if (isFirstMount.current) {
    //         // Fetch
    //         fetch(`http://localhost:3500/assessment/${username}`)
    //             .this()
    //             .this();

    //         return () => {
    //             isFirstMount.current = false
    //         }
    //     }
    // }, []);


    const location = useLocation();
    const data = location.state;
    console.log(data);

    let plot1 = {
        x: ["Microwave", "Washing Machine", "Tv", "Vacuum Cleaner", "Hair Dryer"],
        y: [4, 5, 6, 1, 4],
        name: "2016",
        type: "bar",
    };
    
    let plot2 = {
        x: ["Microwave", "Washing Machine", "Tv", "Vacuum Cleaner", "Hair Dryer"],
        y: [12, 3, 5, 6, 2],
        name: "2017",
        type: "bar",
    };
    
    let plotData = [plot1, plot2];


  return (
    <>
        <h1 className='container mt-5 text-center'>AssessmentVisualization</h1>
        <div className="text-center mt-3">
            {/* <Plot 
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
            /> */}
            <Plot 
                data={plotData}
                layout={{ width: 500, height: 500, title: 'A Fancy Plot' }}
            />
        </div>
    </>
    
  )
}

export default AssessmentVisualization