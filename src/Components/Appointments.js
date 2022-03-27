import TeachNav from './TeachNav';
import { getDatabase, ref, child, get } from "firebase/database";
import React, { useState,useEffect, useContext } from 'react';
import "../CSS/index.css";
import { AuthContext } from "../Auth";


function App() {

    const [appointments, setAppointments]=useState({});

    const dbRef = ref(getDatabase());
    const { currentUser } = useContext(AuthContext);



    // get(child(dbRef, `Users/` + currentUser.uid + "/bookedTimes")).then((snapshot) => {
    //   if (snapshot.exists()) {
    //     setAppointments(snapshot.val());
    //   } else {
    //     console.log("No appointments exist");
    //   }
    // }).catch((error) => {
    //   console.error(error);
    // });


  return(
<div>
<TeachNav/>
<br></br>
<h1 className="teachersList">My Appointments</h1>
{Object.keys(appointments).map((value, index) => {
        return <li className="appointmentsCSS" key={index}>{appointments[value]}</li>
      })}
</div>
    
  );
};


export default App;