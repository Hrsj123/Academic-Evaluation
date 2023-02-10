import { Link } from 'react-router-dom'


const DashHeader = () => {              // Probably a navBar
  return (
    <header className='dash-header'>
        <div className="dash-header__container">
            <Link to="/dash/notes">                                 {/* No idea what is it! */}
                <h1 className='dash-header__title'>techNotes</h1>

            </Link>

        </div>
    </header>
  )
}

export default DashHeader