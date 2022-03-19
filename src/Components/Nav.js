import React from 'react';
import * as ReactBootStrap from 'react-bootstrap';
import firebase from "../config";
import "../CSS/index.css";
// import 'bootstrap/dist/css/bootstrap.min.css';


function Nav(){

return(
  <div>
 <ReactBootStrap.Navbar bg="danger" expand="xl">
  <ReactBootStrap.Container>
    <ReactBootStrap.Navbar.Brand href="#home">Teacher Insight</ReactBootStrap.Navbar.Brand>
    <ReactBootStrap.Navbar.Toggle aria-controls="basic-navbar-nav" />
    <ReactBootStrap.Navbar.Collapse id="basic-navbar-nav">
      <ReactBootStrap.Nav className="me-auto">
        <ReactBootStrap.Nav.Link href="/">Home</ReactBootStrap.Nav.Link>
        <ReactBootStrap.Nav.Link href="#link">My Teachers</ReactBootStrap.Nav.Link>
        <ReactBootStrap.Nav.Link href="#link">Message</ReactBootStrap.Nav.Link>
        <button onClick={() => firebase.auth().signOut()}>Sign Out</button>
      </ReactBootStrap.Nav>
    </ReactBootStrap.Navbar.Collapse>
  </ReactBootStrap.Container>
</ReactBootStrap.Navbar> 
</div>
);

}
export default Nav;