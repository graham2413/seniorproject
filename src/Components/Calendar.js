import React, {useState} from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";

function App() {

const [selectedDate, setSelectedDate]= useState(setHours(setMinutes(new Date(), 30), 16)
);

const isWeekday = (date) => {
  const day = date.getDay();
  return day !==0 && day !==6  /*&& day== pass the array from App.js through prps to calendar, for loop through the props here to add the days. do similar for times */;
};

    return (
      <div className="App">
        <DatePicker
         selected={selectedDate} 
        onChange={date=>setSelectedDate(date)}
        dateFormat="MM/dd/yyyy  EE hh:mm a"
       minDate= {new Date()} 
       isClearable
       showTimeSelect
       timeIntervals={15}
      //includeTimes here
      filterDate={isWeekday}
      placeholderText="Choose a date and time"
       />
      </div>
    );
}

export default App;