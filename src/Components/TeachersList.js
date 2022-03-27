import React, {useContext, useState,useEffect } from 'react';
import Nav from './TeachNav';
import { getDatabase, ref, child, get } from "firebase/database";
import { Link } from "react-router-dom";
import "../CSS/index.css";
import { AuthContext } from "../Auth";
///Purpose is for students to be able to see all teachers to choose from

function TeachersList() {

  const [teachers, setTeachers]=useState({});

  const dbRef = ref(getDatabase());
  const { currentUser } = useContext(AuthContext);
  console.log(currentUser.uid);

  useEffect(() => {
    
  get(child(dbRef, `Users/`)).then((snapshot) => {
    if (snapshot.exists()) {


        setTeachers(snapshot.val());
   
    }
   else {
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
        <div>
          <ul>
        {Object.keys(teachers).map((value, index) => {
        return <a key={value}><Link to="/teacherProfile" className="eachTeach" key={index}>{value}</Link></a>
      })}
      </ul>
      </div>

      </div>

  );
};
export default TeachersList;