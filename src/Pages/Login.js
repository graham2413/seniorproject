import "../login.css";
import { Link } from "react-router-dom";

function Login() {
  return (
    <div className="central-box">
      <h1 className="welcome">Welcome to Teacher Insight!</h1>
      <h1 className="signintext">SIGN IN TO YOUR ACCOUNT</h1>
      <div className="user-pass">
        <h2>email@email.com</h2>
      </div>
      <br></br>
      <div className="user-pass">
        <h2>password123</h2>
      </div>
      <div>
        <h2 className="signintopage-registerintopage-buttons">Sign In</h2>
      </div>
      <div>
        <Link to="/Register" className="register-signin-links">
          I don't have an account. Sign me up!
        </Link>
      </div>
    </div>
  );
}
export default Login;
