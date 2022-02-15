import "./index.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Home from "./Pages/Home";
import { AuthProvider } from "./Auth";
import PrivateRoute from "./PrivateRoute";
import React from 'react';
import { render } from 'react-dom';
import DayTimePicker from '@mooncake-dev/react-day-time-picker';
import styled from 'styled-components';
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
  }`
;
function App() {

  return( 
    <Container>
  <DayTimePicker timeSlotSizeMinutes={15} />
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
