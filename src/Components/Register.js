import React, { useCallback } from "react";
import { withRouter } from "react-router";
import firebase from "../config";
import { Link } from "react-router-dom";
import "../CSS/login.css"

const Register = ({ history }) => {

    function validate_email(email) {
    var expression = /^[^@]+@\w+(\.\w+)+\w$/
      if (expression.test(email) === true) {
        return true
      } 
      else {
        return false
      }
    }

    function validate_password(password) {
      // Firebase only accepts lengths greater than 6
      if (password < 6) {
        return false
      } else {
        return true
      }
    }
  const handleSignUp = useCallback(async event => {
    event.preventDefault();

    const {full_name, email, password } = event.target.elements;
    validate_email(email.value);
    validate_password(password.value);

    // below two added
    const database = firebase.database()
    const auth = firebase.auth()

    if (validate_email(email.value) === false || validate_password(password.value) === false) {
      alert('Email or Password is not formatted correctly.')
      return;
    } 
    else{
      
    try {
      if(email.value)

   await auth
        .createUserWithEmailAndPassword(email.value, password.value)
      history.push("/")

          var database_ref = database.ref()

          var userData = {
            full_name: full_name.value,
            email: email.value,
            type: "student"
        }          
          database_ref.child('Users/' + firebase.auth().currentUser.uid).set(userData);

    } catch (error) {
      alert(error);
      console.log("im here");
    }
  }
  }, [history]);

  return (
    <body className="loginbody">
    <div className="central-box">
      <h1>Sign up</h1>
      <h2 className="signuptext">Students signup below, Teachers and TA's must email for account creation - cgnorri2@go.olemiss.edu</h2>
      <form onSubmit={handleSignUp}>
      <label>
          <input name="full_name" type="text" placeholder="Full name" />
        </label>
        <br></br>    <br></br>
        <label>
          <input name="email" type="email" placeholder="email@email.com" />
        </label>
        <br></br>    <br></br>
        <label>
          <input name="password" type="password" placeholder="password123" />
        </label>
        <br></br>
        <button className="signintopage-registerintopage-buttons" type="submit">Sign Up</button>
      </form>
      <div>
        <Link to="/Login" className="register-signin-links">
          I already have an account. Take me to login!
        </Link>
      </div>
    </div>
    </body>
  );
};

export default withRouter(Register);