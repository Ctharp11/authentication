import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom'
import AppNav from './components/AppNav';
import Main from './components/Main';
import Account from './components/Account';
import createHistory from 'history/createBrowserHistory';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const history = createHistory()

class App extends Component {
  constructor() {
    super();
    this.state  = {
      loggedin: false,
      userInfo: ''
    }
  }

  componentDidMount() {
    const user = localStorage.getItem('loggedin');
    if (user === 'true') {
      this.isLoggedIn();
    }
  }

  isLoggedIn = (userInfo) => {
    this.setState({ loggedin: true });
    this.setState({ userInfo });
    localStorage.setItem('loggedin', true);
  }

  logout = () => {
    console.log(window.FB)
    // window.FB.logout(function(response){
    //   console.log(response);
    // })
    this.setState({ loggedin: false});
    localStorage.removeItem('loggedin');
  }

  passProps = (Component, props) => {
    return <Component {...props} /> 
  }
  
  render() {
    const appProps = {
      loggedin: this.state.loggedin,
      isLogged: this.isLoggedIn,
      logout: this.logout,
      userInfo: this.state.userInfo,
      browser: this.props
    }
    return (
      <Router history={history}>
        <div>
        <AppNav {...appProps} />
        <Switch>
          <Route exact path="/" component={Main} />
          <Route exact path="/account" render={() => this.passProps(Account, appProps)} />
        </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
