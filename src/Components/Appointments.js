import Nav from './TeachNav';
import { getDatabase, ref, child, get } from "firebase/database";
import React, { useState,useEffect } from 'react';
import firebase from "../config";
import "../CSS/index.css"

function App() {

    const [appointments, setAppointments]=useState({});

    const dbRef = ref(getDatabase());


    useEffect(() => {
    get(child(dbRef, `Users/Teachers/` + firebase.auth().currentUser.uid + "/bookedTimes")).then((snapshot) => {
      if (snapshot.exists()) {
        setAppointments(snapshot.val());
      } else {
        console.log("No appointments exist");
      }
    }).catch((error) => {
      console.error(error);
    });
  }, [])

  return(
<div>
<Nav/>
<br></br>
<h1 className="teachersList">My Appointments</h1>
{Object.keys(appointments).map((value, index) => {
        return <li className="appointmentsCSS" key={index}>{appointments[value]}</li>
      })}
</div>
    
  );
};


export default App;