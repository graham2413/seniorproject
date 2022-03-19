import React, {useState} from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";
import Nav from './Nav';
import '../CSS/calendar.css'
import { Controller, useForm } from 'react-hook-form'

function App() {

const [selectedDate, setSelectedDate]= useState(setHours(setMinutes(new Date(), 30), 16)
);

const isWeekday = (date) => {
  const day = date.getDay();
  return day !==0 && day !==6  /* change to only--> day== pass the array from App.js through prps to calendar, for loop through the props here to add the days. do similar for times */;
};

/*If below array contains any slots, push to the components disabled times*/
var bookedTimes = [];

 const handleSubmit = (event) => {
  event.preventDefault();  
  //console.log(selectedDate);
  //console.log(setHours(setMinutes(new Date(), 0), 17));
  
  try{
    // 1. disable component, maybe not inside this function
    
     bookedTimes.push(selectedDate);
    
    alert("Confirmed booking for: " + selectedDate);
  }
  catch (error) {
    alert(error);
  }
}
console.log(bookedTimes);

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
      excludeTimes={bookedTimes[0]}
       /> 
       </div>
       <div className="buttonsurround">
         <input type="submit" />
       </div>
       </form>
      </div>
      </div>

      
    );
}

export default App;