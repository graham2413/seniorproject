import "../login.css";
import { Link } from "react-router-dom";
import { useParams } from "react-router";

function Login() {
  return (
    <div className="central-box">
      <h1 className="welcome">Welcome to Teacher Insight!</h1>
      <h1 className="signintext">SIGN IN TO YOUR ACCOUNT</h1>
      <div>
        <input
          name="email"
          type="email"
          placeholder="olemiss.email@email.com"
        />
      </div>
      <br></br>
      <div>
        <input
          name="password"
          type="password"
          placeholder="password123"
        />
      </div>
      <div>
      <button className="signintopage-registerintopage-buttons" onClick={useParams}>Sign In</button>
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
