import "../login.css";
import firebase from "../config";

function Home() {
  return (
    <div>
      <h1>Home Page</h1>

      <button onClick={() => firebase.auth().signOut()}>Sign Out</button>
    </div>
  );
}
export default Home;
