import React, {useState,useContext} from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'
// import setHours from "date-fns/setHours";
// import setMinutes from "date-fns/setMinutes";
import Nav from './TeachNav';
import '../CSS/calendar.css'
import firebase from "../config";
import { useHistory } from 'react-router-dom';
import { getDatabase, ref, child, get } from "firebase/database";
import { AuthContext } from "../Auth";

function Calendar() {

  const[dayStrFinal, setDayStrFinal] = useState("");

  const db = firebase.database();
  const excludeDatesArray = [];
  const { currentUser } = useContext(AuthContext);

  const dbRef = ref(getDatabase());
  get(child(dbRef, `Users/Teachers/`+firebase.auth().currentUser.uid + `/bookedTimes`)).then((snapshot) => {
    if (snapshot.exists()) {
      //make below show up on page as an h1 maybe
      // console.log("Warning, you already have an appointment booked for: "+snapshot.val().booking + " , if you create a new appointment your previous slot will be deleted");
      var maybe = snapshot.val().booking;
      var finalWorks = new Date(maybe);
      //  console.log("Date object is: " + finalWorks);
      excludeDatesArray.push(finalWorks);

    } else {
      console.log("No booking in db for this user");
    }
  }).catch((error) => {
    console.error(error);
  });


get(child(dbRef, `Users/Teachers/` +firebase.auth().currentUser.uid+ `/daysToInclude`)).then((snapshot) => {
  if (snapshot.exists()) {
    var tryMe = snapshot.val().dayString;
    setDayStrFinal(tryMe);

  } else {
    console.log("No snapshot value exists");
  }
}).catch((error) => {
  console.error(error);
});
  
  const history = useHistory();
  
  const routeChangeOff = () =>{ 
    let path = `/`; 
    history.push(path);
  }
  const routeChangeTemp = () =>{ 
    let path = `/officeHoursInput`; 
    history.push(path);
  }
const [selectedDate, setSelectedDate]= useState(0);

// taking teacher input of available days
const weekObj={
monday:1,
tuesday:2,
wednesday:3,
thursday:4,
friday:5
};

for (let index = 0; index < dayStrFinal.length; index++) {

  if(dayStrFinal[index]===("1")){
    weekObj.monday= null;
  }
 else if(dayStrFinal[index]===("2")){
  weekObj.tuesday= null;
  }
  else if(dayStrFinal[index]===("3")){
    weekObj.wednesday= null;
  }
  else if(dayStrFinal[index]===("4")){
    weekObj.thursday= null;
  }
  else if(dayStrFinal[index]===("5")){
    weekObj.friday= null;
  }
  else{
    continue;
  }
}

// determines which days are available by teacher input
const isWeekday = (date) => {

  const day = date.getDay();

  return day!==0 && day!==6 && day!==weekObj.monday && day!==weekObj.tuesday && day!==weekObj.wednesday && day!==weekObj.thursday && day!==weekObj.friday;
};



 const handleSubmit = (event) => {
  event.preventDefault();  

  const timeRef = db.ref("Users/Teachers/" + firebase.auth().currentUser.uid + "/bookedTimes");
 
  try{

     var booking = String(selectedDate);

     try{
       const newTimeref = timeRef;
      newTimeref.set({
        booking
      })}
      catch (error) {
        alert(error);
      }      

    alert("Confirmed booking for: " + selectedDate);
    routeChangeOff();
  }
  catch (error) {
    alert(error);
  }
}

    return (
      <div>
      <Nav/>
      <div className="App">
          <form onSubmit={handleSubmit}>
          <div className="ohContainer">
        <DatePicker
         selected={selectedDate} 
        onChange={date=>setSelectedDate(date)}
        dateFormat="MM/dd/yyyy  EE hh:mm a"
       minDate= {new Date()} 
       isClearable
       showTimeSelect
       timeIntervals={15}
      filterDate={isWeekday}
      placeholderText="Choose an available time slot"
      withPortal
      excludeTimes={excludeDatesArray} 
      //^will need to add db values from teacher input after figuring out day by day specific times first
       /> 
       
       </div>
       
       <div className="buttonsurround">
         <input type="submit" />
       </div>
       </form>
      </div>
      <button onClick={routeChangeTemp}>Temporary link to office hour input page</button>
      </div>
    );
}
export default Calendar;