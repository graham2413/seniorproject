import "./index.css";
// import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import Login from "./Pages/Login";
// import Register from "./Pages/Register";
import Home from "./Pages/Home";
// import { AuthProvider } from "./Auth";
// import PrivateRoute from "./PrivateRoute";
import React, { useState, useEffect } from 'react';
import { render } from 'react-dom';
import DayTimePicker from '@mooncake-dev/react-day-time-picker';
import styled from 'styled-components';
import db from "./config"
import {collection, getDocs} from "firebase/firestore";

const Container = styled.div
  `width: 475px;
  margin: 1em auto;
  padding: 1em;
  background-color: #fff;
  color: #333;
  border: 1px solid #f0f0f0;
  border-radius: 5px;
  text-align: center;
  box-shadow: 0 2px 4px #00000018;
  @media (max-width: 520px) {
    width: 100%;
  }`;
  
  function fakeRequest(data) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Uncomment below to trigger error:
        // return reject('Error: Something went wrong...');
        resolve({
          status: 'ok',
          scheduled: data
        });
      }, 2e3);
    });
  }

  function timeSlotValidator(slotTime) {
    const startTime = new Date(
      slotTime.getFullYear(),
      slotTime.getMonth(),
      slotTime.getDate(),
      9,
      0,
      0
    );
    const endTime = new Date(
      slotTime.getFullYear(),
      slotTime.getMonth(),
      slotTime.getDate(),
      12,
      0,
      0
    );
    // Use below to see how we need user input to fill in above slots
    // console.log("Year " +slotTime.getFullYear());
    // console.log("Month " + slotTime.getMonth());
    // console.log("Date " + slotTime.getDate());
    const isValid = (slotTime.getTime() > startTime.getTime() && slotTime.getTime()<endTime.getTime()) /*&& notBooked*/;
    return isValid;
  }


function App() {

  const [isScheduling, setIsScheduling] = useState(false);
  const [isScheduled, setIsScheduled] = useState(false);
  const [scheduleErr, setScheduleErr] = useState('');

  const [users, setUsers]=useState([]);
  const usersCollectionRef = collection(db,"Users")

  useEffect(() => {
  
    const getUsers = async () =>{
      const data = await getDocs(usersCollectionRef);
      console.log(data);
    };
    getUsers();
   
  }, []);

  const handleScheduled = dateTime => {
    console.log('Scheduled booking: ', dateTime);
    
    setIsScheduling(true);
    setScheduleErr('');
    fakeRequest(dateTime)
      .then(json => {
        setScheduleErr('');
        setIsScheduled(true);
        console.log('fake response: ', json);
      })
      .catch(err => {
        setScheduleErr(err);
      })
      .finally(() => {
        setIsScheduling(false);
        //here add to db
      });
    }

  return( 
    <Container>
  <DayTimePicker timeSlotSizeMinutes={15} onConfirm={handleScheduled} isLoading={isScheduling}
      isDone={isScheduled}
      err={scheduleErr} timeSlotValidator={timeSlotValidator}/>
  </Container>
  
  );
}
const target = document.getElementById('root');
render(

<App />, target

);
/*
      //<AuthProvider>
      <Router>
        <div>
          <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/Login" component={Login} />
          <Route exact path="/Register" component={Register} />
          </Switch>
        </div>
      </Router>
   // </AuthProvider>
*/
export default App;