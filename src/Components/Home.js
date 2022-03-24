import Nav from "./TeachNav"
import "../CSS/index.css"
import { useHistory } from 'react-router-dom';
import firebase from "../config";
import { getDatabase, ref, child, get } from "firebase/database";
import React, { useState,useEffect } from 'react';


function Home() {
  
  const history = useHistory();
  const dbRef = ref(getDatabase());

  const [teacherName, setTeacherName]=useState([]);

  
  const routeChange = () =>{ 
    let path = `/officeHours`; 
    history.push(path);
    
  }

  useEffect(() => {
    get(child(dbRef, `Users/Teachers/` + firebase.auth().currentUser.uid + "/fullName")).then((snapshot) => {
      if (snapshot.exists()) {
        setTeacherName(snapshot.val());
      } else {
        console.log("No fullName exists");
      }
    }).catch((error) => {
      console.error(error);
    });
  }, [])


  return (

    <div>
        <Nav/>
          <br></br>
          <h1 className="welcomeCSS">Welcome {teacherName}</h1>
          <div className="homebody">
          <button className="schedulebutton" onClick={routeChange}>Schedule Office Hours Appointment</button>
            </div>
     
    </div>

  );
}
export default Home;
