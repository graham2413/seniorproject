import React, { useState,useEffect } from 'react';
import Nav from './TeachNav';
import { getDatabase, ref, child, get } from "firebase/database";
import "../CSS/index.css"
import {useLocation} from "react-router-dom";

// this will render based on which teacher is selected from the teacherslist component
function TeachersList() {


const location = useLocation();

const {uid}=location.state;
console.log(uid);


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