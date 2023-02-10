

const Footer = (props) => {
  return (
    <footer className="footer" style={{backgroundColor: "#f1f1f1", paddingTop: "5px"}}>
      <p className='text-center pt-3'>© {new Date().getFullYear()} Study Buddy</p>
      <p className='float-end'>{props.type}</p>
    </footer>
  )
}

export default Footer