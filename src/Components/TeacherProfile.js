import React, {useContext, useState,useEffect } from 'react';
import StudentNav from './StudentNav';
import {useParams,Link} from "react-router-dom"
import { getDatabase, ref, child, get } from "firebase/database";
import { AuthContext } from "../Auth";
import { useHistory } from 'react-router-dom';
import '../CSS/index.css'

///Purpose is for students to be able to see all teachers to choose from

function TeacherProfile() {

const [user,setUser] =useState(null);

const {handle} = useParams();

const dbRef = ref(getDatabase());

const { currentUser } = useContext(AuthContext);


const history = useHistory();

const routeChange = () =>{ 
  let path = `/officeHours`; 
  history.push(path);
}


get(child(dbRef, `Users/` + handle + `/full_name`)).then((snapshot) => {
  if (snapshot.exists()) {
    var tryMe = snapshot.val();
    setUser(tryMe);

  } else {
    console.log("No name exists");
  }
}).catch((error) => {
  console.error(error);
});


  return(

      <div>

        <StudentNav/>
        <h1>{user}</h1>
        <a><Link to={`/officeHours/${handle}`} className="appointmentLB">Schedule Appointment with {user}</Link></a>


      </div>

  );
};
export default TeacherProfile;