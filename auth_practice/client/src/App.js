import React, { Component } from 'react';
import {Route, Switch, withRouter} from 'react-router-dom';
import Nav from './components/Nav';
import Home from './components/Home';
import Account from './components/Account';
import axios from 'axios';

import './App.css';

class App extends Component {
  constructor () {
    super();
    this.state = {
      togglelog: false,
      userInfo: '',
      loggedin: false
    }
  }

  componentDidMount() {
    console.log(this.props)
    const usertoken = localStorage.getItem('token');
    if (usertoken) {
      this.setState({ loggedin: true })
      axios.get('http://localhost:5000/users/secret', {
                headers: {
                    'Authorization': usertoken,
                    'credentials': 'same-origin',
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then(res => this.setState({ userInfo: res.data }))
            .catch(err => console.log(err))
    }
  }

  logginUser = (userInfo) => {
    console.log('userInfo', userInfo)
    this.setState({ userInfo, loggedin: true })
    this.props.history.push('/account');
  }

  loggoutUser = () => {
    this.setState({ loggedin: false })
    localStorage.removeItem('token');
    this.props.history.push('/');
  }

  toggleAuth = () => {
    this.setState({ togglelog: !this.state.togglelog });
  }

  render() {
    const allProps = {
      browser: this.props,
      togglelog: this.state.togglelog,
      toggleAuth: this.toggleAuth,
      userInfo: this.state.userInfo,
      loggedin: this.state.loggedin,
      logginUser: this.logginUser,
      loggoutUser: this.loggoutUser
    }
    return (
        <div>
          <Nav {...allProps} />
          <div className="container">
            <Switch>
              <Route exact path="/" render={() => <Home {...allProps} />} />
              <Route exact path="/account" render={() => <Account {...allProps} />} />
            </Switch>
          </div>
        </div>
    );
  }
}

export default withRouter(App);
