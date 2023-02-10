// import './css/images.css';
import './css/Contact.css';


function Contact() {
    return (
        <>
        {/*<div className="container mt-5">
            <h1 className="text-center">Contact Us</h1>
            <img className="img-main-contact" src="/images/Contact.jpg" alt="Get our Help" />
            <p className='text-center'>
                You may contact us at any time 
            </p>
        </div>*/}
           <div className="contactform mb-5">
            <form className='pt-3 pb-4'>
                <h2 id='header'>Contact-Us</h2>
                <label htmlFor="" id='first'>First Name</label><br />
                <input type="text" name='name' id='second' required/>
                <br />
                <label htmlFor="" id='first'>Last Name</label><br />
                <input type="text" name='lastname' id='second' required/>
                <br />
                <label htmlFor="" id='first'>Email</label><br />
                <input type="email" name='email' id='second' required/>
                <br />      
                <label htmlFor="" id='first'>Questions or Queries</label><br />
                <textarea name="comment" id='second' cols="20" rows="2" required></textarea>
    
            <button type='submit' id='submit'>Submit</button>
            </form>
        </div>
        </>
      
        
    );
}

export default Contact


//---------------------------------------------------
