import React, { useState,useEffect } from 'react';
import Nav from './TeachNav';
import { getDatabase, ref, child, get } from "firebase/database";
import { Link } from "react-router-dom";
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
        <h1 className="teachersList">All Teachers</h1>
        <h2>Search Bar Here</h2>
        {Object.keys(teachers).map((value, index) => {
        return <a><Link to="/teacherProfile" className="eachTeach" key={index}>{value}</Link></a>
      })}

      </div>

  );
};
export default TeachersList;