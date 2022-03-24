import React, { useState,useEffect } from 'react';
import Nav from './TeachNav';
import { getDatabase, ref, child, get } from "firebase/database";
import "../CSS/index.css"

function TeachersList() {

  const [teachers, setTeachers]=useState({});

  const dbRef = ref(getDatabase());
  
  useEffect(() => {
  get(child(dbRef, `Users/`)).then((snapshot) => {
    if (snapshot.exists()) {
        setTeachers(snapshot.val().Teachers);
  
    } else {
      console.log("No teachers exist");
    }
  }).catch((error) => {
    console.error(error);
  });
}, [])

    
  return(

      <div>

        <Nav/>
        <h1>Teacher Name here</h1>
        <h2>Info</h2>
        <h3>Schedule Appointment button here</h3>

      </div>

  );
};
export default TeachersList;