//Below is my office hours input information component
// import React, { useState, useEffect } from 'react';
// import firebase from "./config";
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Home from './Components/Home';
import Register from './Components/Register';
import Login from './Components/Login';
import { AuthProvider } from './Auth';
import PrivateRoute from './PrivateRoute';
import Calendar from './Components/Calendar'
import OfficeHourInput from './Components/OfficeHourInput';
import TeachersList from './Components/TeachersList';
import TeacherProfile from "./Components/TeacherProfile"
import Appointments from "./Components/Appointments"

function App() {

  return(
    <AuthProvider>
    <Router>
      <div>
          <PrivateRoute exact path="/" component={Home}/>
          <Route exact path="/login" component={Login}/>
          <Route exact path="/register" component={Register}/>
          <Route exact path="/officeHours" component={Calendar}/>
          <Route exact path="/officeHoursInput" component={OfficeHourInput}/>
          <Route exact path="/teachersList" component={TeachersList}/>
          <Route exact path="/teacherProfile" component={TeacherProfile}/>
          <Route exact path="/appointments" component={Appointments}/>

      </div>
    </Router>
    </AuthProvider>
    
  );
};


export default App;