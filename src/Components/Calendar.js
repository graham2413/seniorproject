import React, {useState,useContext,useEffect} from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'
import StudentNav from './StudentNav';
import '../CSS/calendar.css'
import firebase from "../config";
import { useHistory } from 'react-router-dom';
import { AuthContext } from "../Auth";
import { getDatabase, ref, child, get } from "firebase/database";

function Calendar() {

  const[dayStrFinal, setDayStrFinal] = useState("");

  const db = firebase.database();
  const { currentUser } = useContext(AuthContext);

  const[ex, setEx] = useState([{time:null,date:null}]);

  const handleSetEx=(finalWorks,yes)=>{
    let temp = [...ex];
    temp.push({
      time: finalWorks.getHours().toString(),
      date: yes,
      minutes:finalWorks.getMinutes().toString()
    });
    console.log(temp);
    
    setEx(state => [...state, {
      time: finalWorks.getHours().toString(),
      date: yes,
      minutes:finalWorks.getMinutes().toString()
    }]);
    console.log(ex);
  }



  const dbRef = ref(getDatabase());

  // if booking exists push to excluded dates array
  useEffect(() => {
  get(child(dbRef, `Users/`+currentUser.uid + `/bookedTimes`)).then((snapshot) => {
    if (snapshot.exists()) {
      //make below show up on page as an h1 maybe
      // console.log("Warning, you already have an appointment booked for: "+snapshot.val().booking + " , if you create a new appointment your previous slot will be deleted");
      var maybe = snapshot.val().booking;
      var finalWorks = new Date(maybe);


      //console.log(finalWorks.getHours());
      const today = finalWorks;
      const yyyy = today.getFullYear();
      let mm = today.getMonth() + 1; // Months start at 0
      let dd = today.getDate();
      
      if (dd < 10) dd = '0' + dd;
      if (mm < 10) mm = '0' + mm;
      
      const yes = mm + '/' + dd + '/' + yyyy;
      
      handleSetEx(finalWorks,yes);
      

    } else {
      console.log("No booking in db for this user");
    }
  }).catch((error) => {
    console.error(error);
  });
  ex.map((val) =>{return console.log(val)});

}, [])

  // determines which days to render available
  get(child(dbRef, `Users/` + currentUser.uid+ `/daysToInclude`)).then((snapshot) => {
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


//handle booking submit below

const handleSubmit = (event) => {
  event.preventDefault();  

  const timeRef = db.ref("Users/" + currentUser.uid + "/bookedTimes");
 
  try{

     var booking = String(value);
     console.log(booking);

     try{
       const newTimeref = timeRef;
      newTimeref.set({
        booking
      })}
      catch (error) {
        alert(error);
      }      

    alert("Confirmed booking for: " + value);
    routeChangeOff();
  }
  catch (error) {
    alert(error);
  }
};
//value of selected date
  const [value, setValue] = useState(new Date());


  return (
    <div>
    <StudentNav/>
    <div className="App">
        <form onSubmit={handleSubmit}>
        <div className="ohContainer">

    <DatePicker
      filterDate={isWeekday}
      minTime={new Date(new Date().setHours(8, 0, 0))}
      maxTime={new Date(new Date().setHours(17, 0, 0))}
      excludeTimes={ex.map((exclude) => {
        const excDate = new Date(exclude.date);
        console.log(excDate+ " time follows: " + exclude.time);
        if(
          value &&
          excDate.getDate() === value.getDate() &&
          excDate.getFullYear() === value.getFullYear() &&
          excDate.getMonth() === value.getMonth()) 
         {
          return new Date(new Date().setHours(exclude.time, exclude.minutes));
         }
        return null;
      })}
      timeIntervals={15}
      showTimeSelect
      dateFormat="M/d/Y HH:mm"
      timeFormat="HH:mm"
      placeholderText="Choose an available time slot"
      withPortal
      minDate= {new Date()} 
      onChange={(e) => {
        setValue(new Date(e));
      }}
      selected={value}
    />

      </div>

       <div className="buttonsurround">
         <input type="submit" />
       </div>
       </form>
       {/* {ex.map((element)=>{
         return <p>{element.date}</p>
       })} */}
      </div>
      </div>
  );
}
export default Calendar;