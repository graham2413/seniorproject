import React, {useState,useEffect } from 'react';
import StudentNav from './StudentNav';
import { getDatabase, ref, child, get } from "firebase/database";
import { Link } from "react-router-dom";
import "../CSS/index.css";
///Purpose is for students to be able to see all teachers to choose from

function Teachers() {

  const [teachers, setTeachers]=useState([]);
  const [searchTerm, setSearchTerm]=useState('');

  const dbRef = ref(getDatabase());

  useEffect(() => {
  get(child(dbRef, `Users/TeachersList`)).then((snapshot) => {
    if (snapshot.exists()) {

       setTeachers(snapshot.val())
       
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

        <StudentNav/>
        <h1 className="teachersList">All Teachers</h1>
        <input onChange={event => setSearchTerm(event.target.value)} className="searchbar" type="text" placeholder="Search teachers..."/>
        <div>
          <ul>

       {Object.entries(teachers).filter((val)=>{
         if(searchTerm === ""){
        return val;
        
         }
         else if(val[0].toLowerCase().includes(searchTerm.toLowerCase())){
           return val;
         }
       }).map((value, index) => {

        return <Link to={`/teacherProfile/${value[1]}`} className="eachTeach" key={index}>{value[0]}</Link>
        })}
      </ul>
      </div>

      </div>

  );
};
export default Teachers;