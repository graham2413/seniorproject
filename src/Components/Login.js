import React, { useCallback, useContext } from "react";
import { withRouter, Redirect } from "react-router";
import firebase from "../config";
import { AuthContext } from "../Auth";
import { Link } from "react-router-dom";

const Login = ({ history }) => {
  const handleLogin = useCallback(
    async event => {
      event.preventDefault();
      const { email, password } = event.target.elements;
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

  return (
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
      <div>
       <Link to="/Register" className="register-signin-links">
          I don't have an account. Sign me up!
        </Link>
      </div>
    </div>
  );
};

export default withRouter(Login);