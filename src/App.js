import "./index.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Home from "./Pages/Register";

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/Register" component={Register} />
          <Route path="/Home" component={Home} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
