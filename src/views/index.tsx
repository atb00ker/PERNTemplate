import React from "react";
import ReactDOM from "react-dom";
import Pern from './components/pern';
import PernDetails from './components/pernDetails';
import { HashRouter as Router, Route } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Route path="/pern/:uuid" render={(props) => <PernDetails {...props} />} />
      <Route exact path="/" component={Pern} />
    </Router>
  );
};

ReactDOM.render(<App />, document.getElementById('react-init'));
