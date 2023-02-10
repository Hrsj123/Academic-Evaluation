// import { useState, useEffect } from "react";            // react url: "/tutor/getSubjects"

// const GetAllLearners = () => {
//     const [subjects, setSubjects] = useState([]);
    
//     function callApi() {
//         fetch('http://localhost:3500/tutor/getSubjects/')
//         .then(res => res.json())
//         .then(data => {
//             console.log(data);
//             return setSubjects(data);
//         });
//     }

//     useEffect(() => {
//         callApi();
//     }, []); 

//     return (
//         <div className="container mt-5">
//             <h1 className="text-center">Subjects List</h1>
//             {
//                 subjects.map((subject) => {
//                     return (
//                         <div key={subject._id}>
//                             { 'Subjects name: ' + subject.name } <br />
//                             { 'Total marks: ' + subject.totalMarks } <br />
//                             { 'Incharge Name: ' + subject.inchargeName } <br />
//                             { 'Description: ' + subject.description } <br />
//                             { 'Date: ' + subject.date } <br />
//                             <hr />
//                         </div>
//                     )
//                 })
//             }
//         </div>
//     );
// }

// export default GetAllLearners