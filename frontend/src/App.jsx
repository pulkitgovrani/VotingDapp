import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import CreateProposal from "./pages/CreateProposal";
import Vote from "./pages/Vote";
import EndProposal from "./pages/EndProposal";
import WithdrawStake from "./pages/WithdrawStake";

const App = () => {
  return (
    <Router>
      <div>
        <h1>Decentralized Voting System</h1>
        <Switch>
          <Route path="/create" component={CreateProposal} />
          <Route path="/vote" component={Vote} />
          <Route path="/end-proposal" component={EndProposal} />
          <Route path="/withdraw-stake" component={WithdrawStake} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
