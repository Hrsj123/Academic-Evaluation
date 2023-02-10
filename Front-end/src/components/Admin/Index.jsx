import { Link } from 'react-router-dom';

function AdminPage() {        // Create student main-page
    return (
        <div className="container mt-5">
            <header>
                <h1 className='text-center'>Admin</h1>
            </header>
            <main>
                <p className="text-center mt-3">
                    Admin homepage for no reason at all!
                </p>
            <div className="text-center mt-5">
                <span className="col-">
                    <Link to="login">
                        <button className='btn btn-success'>Login</button>
                    </Link>
                </span>
            </div>
            </main>
        </div>
    );
}

export default AdminPage