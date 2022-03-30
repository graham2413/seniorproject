import React, {/*useContext,*/ useState,useEffect } from 'react';
import StudentNav from './StudentNav';
import { getDatabase, ref, child, get } from "firebase/database";
import { Link } from "react-router-dom";
import "../CSS/index.css";
///Purpose is for students to be able to see all teachers to choose from

function Teachers() {

  const [teachers, setTeachers]=useState([]);

  const dbRef = ref(getDatabase());

  useEffect(() => {
  get(child(dbRef, `Users/TeachersList`)).then((snapshot) => {
    if (snapshot.exists()) {

      //  console.log(snapshot.val());
       setTeachers(snapshot.val())
       
    }
   else {
      console.log("No teachers exist");
    }
  }).catch((error) => {
    console.error(error);
  });
}, [])

// function tryFunc(){

//   for (const [key, value] of Object.entries(teachers)) {
//     console.log(`${key} ${value}`); 
//     // return <p>${key} ${value}</p>
//   }
// }


  return(

      <div>

        <StudentNav/>
        <h1 className="teachersList">All Teachers</h1>
        <h2>Search Bar Here</h2>
        <div>
          <ul>

       {Object.entries(teachers).map((value, index) => {

        return <Link to={`/teacherProfile/${value[1]}`} className="eachTeach" key={index}>{value[0]}</Link>
        })}
      </ul>
      </div>

      </div>

  );
};
export default Teachers;