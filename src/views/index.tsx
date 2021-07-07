import React from "react";
import ReactDOM from "react-dom";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Pern from './components/Pern/Pern';
import PernDetails from './components/PernDetails/PernDetails';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/pern/:uuid" render={(props) => <PernDetails {...props} />} />
        <Route exact path="/" component={Pern} />
      </Switch>
    </Router>
  );
};

ReactDOM.render(<App />, document.getElementById('react-init'));
