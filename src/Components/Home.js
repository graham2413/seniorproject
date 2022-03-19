import Nav from "./Nav"
import "../CSS/index.css"
import { useHistory } from 'react-router-dom';

function Home() {
  
  const history = useHistory();
  
  const routeChange = () =>{ 
    let path = `/officeHours`; 
    history.push(path);
  }

  return (

    <div>
        <Nav/>
          <br></br>
          <div className="homebody">
          <button onClick={routeChange}>Schedule Office Hours Appointment</button>
            </div>
     
    </div>

  );
}
export default Home;
