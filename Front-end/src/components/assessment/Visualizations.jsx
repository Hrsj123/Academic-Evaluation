import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import '../css/images.css';

const Visualizations = () => {
    
    const location = useLocation()
    const { learnerId } = location.state;
    const { subName } = location.state;             
    // const [isSet, setIsSet] = useState(false);

    function setVisualization() {        
        // setIsSet(true);
        fetch(`http://localhost:3500/assessment/${learnerId}/${subName}/sub`)
        .then(res => res.json())
        .then(data => {
            console.log(data);    
            return;   
        });
    }

    const attendance = `http://localhost:3500/images/Attendance_${learnerId}_${subName}.png`;
    const interaction = `http://localhost:3500/images/Interaction_${learnerId}_${subName}.png`;
    const marks = `http://localhost:3500/images/Marks_${learnerId}_${subName}.png`;
    const totalMarks = `http://localhost:3500/images/totalMarks_${learnerId}_${subName}.png`;
    
    // Create Visualizations!
    useEffect(() => {                           // ----------> Problem here if any!
        setVisualization();
    });

    // Iterators
    const title = ["attendance", "interaction", "marks", "totalMarks"];
    const images = [attendance, interaction, marks, totalMarks];

    return (        
        <div className="container mt-5">
            <h1 class="text-center mt-5">Visualizations</h1> <hr />

            { 
                images.map((image, index) => <img key={ index } className="plot img-fluid col-lg-6 col-12" src={ image } title={ title[index] } alt={ image } />)
            }
            <div className="mb-5"></div>
        </div>
    );
}

export default Visualizations