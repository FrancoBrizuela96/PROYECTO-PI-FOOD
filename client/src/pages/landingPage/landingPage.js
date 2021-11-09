import { useHistory } from 'react-router'
import './landingPage.css'

function LandingPage() {

  const history = useHistory();

  const handleClick = (e) => {
    e.preventDefault()
    history.push('localhost:3000/home')
  }
  return (
      <div className='container'>
        <button className='buttonEAT' onClick={handleClick}>LET'S EAT !</button>
      </div>
    );
  }
  
  export default LandingPage;