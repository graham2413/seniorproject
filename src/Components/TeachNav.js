import React from 'react';
import * as ReactBootStrap from 'react-bootstrap';
import firebase from "../config";
import "../CSS/index.css";
import { useHistory } from 'react-router-dom';

// import 'bootstrap/dist/css/bootstrap.min.css';

function TeachNav(){

  // const history = useHistory();
  
  // const routeChange = () =>{ 
  //   let path = `/login`; 
  //   history.push(path);
  // }

return(
  <div>
 <ReactBootStrap.Navbar bg="danger" expand="xl">
  <ReactBootStrap.Container>
    <ReactBootStrap.Navbar.Brand href="/">Teacher Insight</ReactBootStrap.Navbar.Brand>
    <ReactBootStrap.Navbar.Toggle aria-controls="basic-navbar-nav" />
    <ReactBootStrap.Navbar.Collapse id="basic-navbar-nav">
      <ReactBootStrap.Nav className="me-auto">
        <ReactBootStrap.Nav.Link href="/">Home</ReactBootStrap.Nav.Link>
        <ReactBootStrap.Nav.Link href="/appointments">My Appointments</ReactBootStrap.Nav.Link>
        <button onClick={() => firebase.auth().signOut().catch((err) => console.log(err)) &&console.log("logged out")/*&& routeChange()*/}>Sign Out</button>
      </ReactBootStrap.Nav>
    </ReactBootStrap.Navbar.Collapse>
  </ReactBootStrap.Container>
</ReactBootStrap.Navbar> 
</div>
);

}
export default TeachNav;