import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';
import ViewHome from './components/ViewHome';
import ViewRepos from './components/ViewRepos';
import ViewCommits from './components/ViewCommits';



class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={ViewHome} />
          <Route path="/:user/repos" component={ViewRepos} />
          <Route path="/repos/:user/:repo/commits" component={ViewCommits} />
        </div>
      </Router>
    );
  }
}

export default App;
