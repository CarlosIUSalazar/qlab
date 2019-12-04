import React from "react";
import "../style/App.css";
// components
import Dashboard from "./Dashboard/Dashboard";
import Login from "./Login/Login";
import Landing from "./Landing/Landing";

// react-router
import { BrowserRouter, Switch, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/" component={Landing}></Route>
          <Route path="/login" component={Login}></Route>
          <Route path="/dashboard" component={Dashboard}></Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
