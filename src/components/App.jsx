/////////////// IMPORTS
import React from "react";
// components
import Dashboard from "./Dashboard/Dashboard";
import Login from "./Login/Login";
import Landing from "./Landing/Landing";
import QuizMain from "./Quiz/QuizMain";
import QuizFinished from "./Quiz//quizFinished/QuizFinished";

// react-router
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

/////////////// COMPONENT
function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/login" component={Login}></Route>
          <Route path="/dashboard" component={Dashboard}></Route>
          <Route path="/quiz" component={QuizMain}></Route>
          <Route path="/quizFin" component={QuizFinished}></Route>
          <Route exact path="/" component={Landing}></Route>
        </Switch>
      </div>
    </Router>
  );
}

/////////////// EXPORTS
export default App;
