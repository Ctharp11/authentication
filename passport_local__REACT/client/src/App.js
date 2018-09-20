import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';


import CreateAccountPage from './pages/CreateAccountPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import NotFoundPage from './pages/NotFoundPage';
import AuthFailedPage from './pages/AuthFailedPage';
import MembersOnlyPage from './pages/MembersOnlyPage';

import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';

// import { withUser, update } from './services/withUser';
// import { getUser } from './utils/requests';
import { login } from './utils/requests';


class App extends Component {

  render() {
    const { user } = 'Cameron';
    return (
    <div> 
    <Router>
      <div>
        <Navbar
          user={user}
        />
        <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/create" component={CreateAccountPage} />
        <Route exact path="/auth/failed" component={AuthFailedPage} />
        <ProtectedRoute exact path="/membersonly" component={MembersOnlyPage} />
        <Route component={NotFoundPage} />
       </Switch>
      </div>
    </Router>
    </div>
    );
  }
}

export default App;
