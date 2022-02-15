import "../login.css";
import firebaseApp from "../config";

function Home() {
  return (
    <div>
      <h1>Home Page</h1>

      <button onClick={() => firebaseApp.auth().signOut()}>Sign Out</button>
    </div>
  );
}
export default Home;
