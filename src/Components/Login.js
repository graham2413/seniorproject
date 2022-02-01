import "../login.css";

function Login() {
  return (
    <div className="central-box">
      <h1 className='signintext'>SIGN IN TO YOUR ACCOUNT</h1>
      <div className='user-pass'>
        <h2>email@email.com</h2>
      </div><br></br>
      <div className='user-pass'>
        <h2>password123</h2>
      </div>
      <div>
        <h2>Sign In</h2>
      </div>
      <div>
        <h3>I don't have an account. Sign me up!</h3>
      </div>
    </div>
    
  );
}
export default Login;
