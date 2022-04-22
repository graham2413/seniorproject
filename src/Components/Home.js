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
  const [canc,setCanc]=useState([null]);
  


  const handleCanc=(val)=>{
 
    setCanc(state => [...state, [val]
    ]);
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

  useEffect(() => {
    firebase.database().ref(`Users/${currentUser.uid}/canceledSlot`).once('value', function(snapshot){
            snapshot.forEach(
                function(ChildSnapshot){
                // console.log(ChildSnapshot.val());
                handleCanc(ChildSnapshot.val().update);
    
                }
            );
        });
              }, [])
    

    function cancRender() {
        
      if(canc!==null){

       return canc.map((element,index)=>{
          if(element!==null){
            // console.log(element);
            return <div><li>Your booking for {element} was cancelled.</li> <button onClick={() => clearNotif(element)}>Clear this notification</button></div>
          }
        })
      }

    }

    function clearNotif(element) {

    
      firebase.database().ref(`Users/${currentUser.uid}/canceledSlot`).once("value").then(function(snapshot) {
        snapshot.forEach(function(child) {
          
          console.log(child.ref.key);
          if(child.ref.key===element[0]){
            try{
           child.ref.remove();
             //call below to refresh page after deletion
           window.location.reload(false);
          }
           catch(error){
             console.log(error);
           }
          }
        })
      });

    //       firebase.database().ref(`Users/${currentUser.uid}/canceledSlot`).once('value', function(snapshot){
    //         snapshot.forEach(
    //             function(ChildSnapshot){
    //              console.log(ChildSnapshot.val());
    //             // console.log(ChildSnapshot.val().update);

    //             if(element[0]=== ChildSnapshot.val().update){
    //               ChildSnapshot.remove();
    //               console.log("yellow");
    //             }
    
    //             }
    //         );
    //     });
    }

  return (

    <div>
        {userType === 'teacher'? (
        <div>
          <TeachNav />
          <br></br>
        <div className="welcBox"> <h1 className="welcomeCSS">Welcome to Teacher Home, {teacherName}</h1> </div>
          <div className="homebody">
        <div>  <Link to={`/officeHoursInput`} className="appointmentLB">Change/Set your Office Hours times here</Link> </div>      </div> <br></br><br></br>
          <Link to={`/inputAnnouncements`} className="appointmentLB">Change announcements here</Link>

        


        </div>
        ) : (
          <div>
          <StudentNav />
          <br></br>
          <h1 className="welcomeCSS">Welcome to Student Home, {teacherName}</h1>
          <div className="homebody">
          <Link to={`/teachers`} className="appointmentLB">Schedule Office Hours Appointment</Link>
            <br></br>  <br></br>
            
            
            
            </div>
            <div className="cancAppCont">
           <p>  If a Teacher cancelled an appointment, it is below</p>
            
            <ol>
            {cancRender()}
            </ol>
            </div>

        </div>
        )}
     
    </div>

  );
}
export default Home;
