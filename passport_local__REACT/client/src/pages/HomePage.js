import React, { Component } from 'react';
// import { List, ListItem } from 'material-ui/List';
// import { withUser } from '../services/withUser';

class HomePage extends Component {
  state = {
    stuff: null
  }
 
  render() {

    return (
      <div>Hello</div> 
    );
  }
}

// withUser function will wrap the specified component in another component that will
// inject the currently logged in user as a prop called "user"
// export default withUser(HomePage);
export default HomePage;
