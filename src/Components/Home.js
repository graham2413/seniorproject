import Nav from "./TeachNav"
import "../CSS/index.css"
import { useHistory, Link } from 'react-router-dom';
import firebase from "../config";
import { getDatabase, ref, child, get } from "firebase/database";
import React, { useState,useEffect,useContext } from 'react';
import { AuthContext } from "../Auth";
import TeachNav from "./TeachNav";
import StudentNav from "./StudentNav";


function Home() {
  
  const history = useHistory();
  const dbRef = ref(getDatabase());

  const [teacherName, setTeacherName]=useState(null);
  const { currentUser } = useContext(AuthContext);

  const [userType,setUserType]=useState(null);
  
  const routeChangeTemp = () =>{ 
    let path = `/officeHoursInput`; 
    history.push(path);
  }

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
    
  useEffect(() => {
    get(child(dbRef, `Users/` + currentUser.uid + "/full_name")).then((snapshot) => {
      if (snapshot.exists()) {
        setTeacherName(snapshot.val());
      } else {
        console.log("No fullName exists");
      }
    }).catch((error) => {
      console.error(error);
    });
  }, []);


  return (

    <div>
        {userType === 'teacher'? (
        <div>
          <TeachNav />
          <br></br>
          <h1 className="welcomeCSS">Welcome to Teacher Home, {teacherName}</h1>
          <div className="homebody">
          <Link to={`/officeHoursInput`} className="appointmentLB">Change/Set your Office Hours times here</Link>
            </div>


        </div>
        ) : (
          <div>
          <StudentNav />
          <br></br>
          <h1 className="welcomeCSS">Welcome to Student Home, {teacherName}</h1>
          <div className="homebody">
          <Link to={`/teachers`} className="appointmentLB">Schedule Office Hours Appointment</Link>
            </div>


        </div>
        )}
     
    </div>

  );
}
export default Home;
