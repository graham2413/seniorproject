import TeachNav from './TeachNav';
import StudentNav from './StudentNav';
import { getDatabase, ref, child, get } from "firebase/database";
import React, { useState,useEffect, useContext } from 'react';
import "../CSS/index.css";
import { AuthContext } from "../Auth";
///need to implement this still

function App() {

  // below for student to set the appointmetns they have by teacher
  const [studentTeachers, setStudentTeachers]=useState({});
  const [studentAppointments, setStudentAppointments]=useState([null]);

  // below for teachers to set the appointmetns they have
    // const [teacherAppointments, setTeacherAppointments]=useState([null]);

    const dbRef = ref(getDatabase());
    const { currentUser } = useContext(AuthContext);
    const [userType,setUserType]=useState(null);


    useEffect(() => {
      get(child(dbRef, `Users/` + currentUser.uid + "/type")).then((snapshot) => {
        if (snapshot.exists()) {
          setUserType(snapshot.val());
        } else {
          console.log("No ");
        }
      }).catch((error) => {
        console.error(error);
      });
    }, [])

    // set student appointments
    useEffect(() => {
    get(child(dbRef, `Users/` + currentUser.uid + "/bookedTimes")).then((snapshot) => {
      if (snapshot.exists()) {
        // setStudentAppointments(snapshot.val());
        console.log( snapshot.val());
        setStudentTeachers(snapshot.val());

      } else {
        console.log("No appointments exist");
      }
    }).catch((error) => {
      console.error(error);
    });
  }, [])

      // set teacher appointments
      // useEffect(() => {
      //   get(child(dbRef, `Users/` + currentUser.uid + "/bookedTimes")).then((snapshot) => {
      //     if (snapshot.exists()) {
      //       setStudentAppointments(snapshot.val());
      //     } else {
      //       console.log("No appointments exist");
      //     }
      //   }).catch((error) => {
      //     console.error(error);
      //   });
      // }, [])
     


  return(
    <div>
        {userType === 'teacher'? (
          <div>
                <TeachNav/>
                <br></br>
                <h1 className="teachersList">My Appointments</h1>
                {/* {Object.keys(appointments).map((value, index) => {
                        return <li className="appointmentsCSS" key={index}>{appointments[value]}</li>
                      })} */}
          </div>
        ) : (
          <div>
                <StudentNav/>
                <br></br>
                <h1 className="teachersList">My Appointments</h1>
                {/* {Object.keys(studentTeachers).map((value, index) => {
                        return <li className="appointmentsCSS" key={index}>{value}  </li>
                  
                      })} */}
          </div>
        )}
               {studentTeachers.map((element)=>{
               return <p>{element}</p>
                      })}
     
    </div>
    
  );
};


export default App;