import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Link, Switch, Route } from 'react-router-dom';

import Login from './components/Login';
import FriendsList from './components/FriendsList';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Friends List App</h1>
      </header>
      <Router>
        <Switch>
          <Route path='/login' component={Login} />
          <PrivateRoute path='/friendslist' component={FriendsList} redirect='/login' />
          <Route component={Login} />
        </Switch>
      </Router>
    </div>

  );
}

export default App;
