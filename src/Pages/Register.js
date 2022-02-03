import "../login.css";
import { Link } from "react-router-dom";

function Register() {
  return (
    <div className="central-box">
      <h1 className="welcome">Welcome to Teacher Insight!</h1>
      <h1 className="signintext">REGISTER BELOW</h1>
      <div className="user-pass">
        <h2>olemiss.email@email.com</h2>
      </div>
      <br></br>
      <div className="user-pass">
        <h2>password123</h2>
      </div>
      <div>
        <h2 className="signintopage-registerintopage-buttons">Sign Up</h2>
      </div>
      <div>
        <Link to="/" className="register-signin-links">
          I have an account. Click here to sign in.
        </Link>
      </div>
    </div>
  );
}
export default Register;
