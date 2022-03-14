import React, { useCallback } from "react";
import { withRouter } from "react-router";
import firebase from "../config";
import { Link } from "react-router-dom";

const Register = ({ history }) => {
  const handleSignUp = useCallback(async event => {
    event.preventDefault();
    const { email, password } = event.target.elements;
    try {
      await firebase
        .auth()
        .createUserWithEmailAndPassword(email.value, password.value);
      history.push("/");
    } catch (error) {
      alert(error);
    }
  }, [history]);

  return (
    <div className="central-box">
      <h1>Sign up</h1>
      <h2 className="signuptext">Students signup below, Teachers and TA's must email for account creation - cgnorri2@go.olemiss.edu</h2>
      <form onSubmit={handleSignUp}>
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
  );
};

export default withRouter(Register);