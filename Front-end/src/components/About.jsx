import './css/about.css'

function About() {
    return (
        <div className="container">
            <div className="row mb-5 mt-5">
                <h1 className="text-center mt-5">Purpose</h1>
                <img className="img-contain mx-auto" src="/images/Purpose.jpg" alt="Purpose" />
                <p className='text-center'>
                    We are inspired to present this project which present out attempt of implementing an 
                    technology aided academin support and evaluation web application.
                </p>
            </div>
            <hr />
            <div className="row mt-5 mb-5">
                <h1 className="text-center">Problem Statement</h1>
                <p className='text-center'>
                        To help improve the quality of education delivered to the students by the aid of technology. <br />
                        To evaluate their academic perfomance by the aid of data visualization. <br />
                        And to provide possible web based resources to students with the intention to provide resources and academic support <br />
                </p>
            </div>
            <hr />
            <div className="row mt-5 mb-5">
                <h1 className="text-center">Inspiration</h1>
                <img className="img-contain mx-auto mt-5 mb-5" src="/images/Inspiration.jpg" alt="Inspiration" />
                <p className="text-center">
                    In the past 2 years (i.e. Since December 2019) Both Students and Teachers have been trying to 
                    effeciently communicate with each other via. the aid of technology .........
                </p>
            </div>
        </div>
    );
}

export default About