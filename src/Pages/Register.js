import "../login.css";
import { Link } from "react-router-dom";
import firebaseApp from "../config";

function Register() {
  function SignIn(){
    console.log('state',this.state);
    const {email,password} = this.state;
    firebaseApp.auth().signInWithEmailAndPassword(email,password)
    .catch(error => {
      console.log('error this aint working',error);
      this.setState({error})
    })
  }
  return (
    <div className="central-box">
      <h1 className="welcome">Welcome to Teacher Insight!</h1>
      <h1 className="signintext">REGISTER BELOW</h1>
      <form onSubmit>
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
      </form>
      <div>
      <button className="signintopage-registerintopage-buttons" onClick={() => SignIn()}>Sign Up</button>
      </div>
      <div>
        <Link to="/Login" className="register-signin-links">
          I have an account. Click here to sign in.
        </Link>
      </div>
    </div>
  );
}
export default Register;