import { Link } from 'react-router-dom';
import '../css/images.css'
function AssessmentPage() {        // Create student main-page
    return (
        <div className="container mt-5">
            <header>
                <h1 className='text-center'>Students's Assessment</h1>
            </header>
            <main>
                <p className="text-center mt-4">
                    Assess Students perfomance in 3 ways by data visualizations!
                    <div className="row">
                        <img className="assessment-index-img" src="/images/assessmentIndex.png" alt="" />
                    </div>
                </p>
                <div className='mt-4 row'>
                    <div className="row col-5">
                        <span className="text-center"><Link to="oneLearnerOneSubject"><button className='btn btn-success'>One Subject per Stundent</button></Link></span>
                    </div>
                    <div className="row col-3">
                        <span className="text-center"><Link to="oneLearnerManySubject"><button className='btn btn-primary'>Many Subject per Stundent</button></Link></span>
                    </div>
                    <div className="row col-4 mx-4">
                        <span className="text-center">
                            <Link to="ClassAverage"><button className='btn btn-warning'>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Class Average&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            </button></Link>
                        </span>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default AssessmentPage