import React from 'react';
import * as ReactBootStrap from 'react-bootstrap';
import firebase from "../config";
import "../CSS/index.css";

function TeachNav(){

return(
  <div>
 <ReactBootStrap.Navbar bg="warning" expand="xl">
  <ReactBootStrap.Container>
    <ReactBootStrap.Navbar.Brand className="blahblah" href="/">Teacher Insight</ReactBootStrap.Navbar.Brand>
    <ReactBootStrap.Navbar.Toggle aria-controls="basic-navbar-nav" />
    <ReactBootStrap.Navbar.Collapse id="basic-navbar-nav">
      <ReactBootStrap.Nav className="me-auto">
        <ReactBootStrap.Nav.Link href="/">Home</ReactBootStrap.Nav.Link>
        <ReactBootStrap.Nav.Link href="/appointments">My Appointments</ReactBootStrap.Nav.Link>
        <ReactBootStrap.Nav.Link href="/officeHoursInput">My Office Hours</ReactBootStrap.Nav.Link>
        <ReactBootStrap.Nav.Link href="/inputAnnouncements">My Announcements</ReactBootStrap.Nav.Link>
        <button onClick={() => firebase.auth().signOut().catch((err) => console.log(err)) &&console.log("logged out")}>Sign Out</button>
      </ReactBootStrap.Nav>
    </ReactBootStrap.Navbar.Collapse>
  </ReactBootStrap.Container>
</ReactBootStrap.Navbar> 
</div>
);

}
export default TeachNav;