import React, { useEffect, useCallback, useContext, useState} from "react";
import { withRouter, Redirect } from "react-router";
import firebase from "../config";
import { AuthContext } from "../Auth";
import { Link } from "react-router-dom";
import "../CSS/login.css"
import {sendPasswordResetEmail } from "firebase/auth";

const Login = ({ history }) => {

  const [emailforReset, setemailforReset]=useState([]);

  const handleLogin = useCallback(
    async event => {
      event.preventDefault();
      const { email, password } = event.target.elements;
      setemailforReset(email.value);
      try {
        await firebase
          .auth()
          .signInWithEmailAndPassword(email.value, password.value);
        history.push("/");
      } catch (error) {
        alert(error);
      }
    },
    [history]
  );

  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    return <Redirect to="/" />;
  }

  function resetPassword() { sendPasswordResetEmail(firebase.auth(), emailforReset)
  .then(() => {
alert("Password reset email sent!")
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  alert(error);
  })}


  return (
    <body className="loginbody">
    <div className="central-box">
      <h1>Welcome to Teacher Insight</h1>
      <h2 className="signintext">Log in below</h2>
      <form onSubmit={handleLogin}>
        <label> 
          <input name="email" type="email" placeholder="email@email.com" />
        </label>
        <br></br>    <br></br>
        <label>
          <input name="password" type="password" placeholder="password123" />
        </label>
        <br></br>
        <button className="signintopage-registerintopage-buttons" type="submit">Log in</button>
      </form>
      <button onClick={resetPassword}>Reset Password</button>
      <div>
       <Link to="/Register" className="register-signin-links">
          I don't have an account. Sign me up!
        </Link>
      </div>
    </div>
    </body>
  );
};

export default withRouter(Login);