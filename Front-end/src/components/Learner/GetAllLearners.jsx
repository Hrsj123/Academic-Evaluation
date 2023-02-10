import { useState, useEffect } from "react";            // react url: "/learners/getLearners"

const GetAllLearners = () => {
    const [learners, setLearners] = useState([]);
    
    function callApi() {
        fetch('http://localhost:3500/learners/getLearners/')
        .then(res => res.json())
        .then(data => {
            console.log(data);
            return setLearners(data);
        });
    }

    useEffect(() => {
        callApi();
    }, []); 

    return (
        <div className="container mt-5">
            {
                learners.map((learner) => {
                    return (
                        <div key={learner._id}>
                            {
                                'My name is ' + learner.firstName + ' ' + learner.lastName + '. ' + 
                                'My email id is ' + learner.email + '.'
                            }
                        </div>
                    )
                })
            }
        </div>
    );
}

export default GetAllLearners