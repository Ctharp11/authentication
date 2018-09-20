import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';

class CreateAccountPage extends Component {
  state = {
    username: null,
    password: null,
    error: null
  }
  handleInputChanged = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }
  handleLogin = (event) => {
    event.preventDefault();

    const { username, password } = this.state;
    // const { history } = this.props;

    // clear any previous errors so we don't confuse the user
    this.setState({
      error: null
    });

    // check to make sure they've entered a username and password.
    // this is very poor validation, and there are better ways
    // to do this in react, but this will suffice for the example
    if (!username || !password) {
      this.setState({
        error: 'A username and password is required.'
      });
      return;
    }
  }
  render() {
    const { error } = this.state;

    return (
      <Grid fluid>
        <Row>
          <Col xs={6} xsOffset={3}>
            <form onSubmit={this.handleLogin}>
              <h1>Create Account</h1>
              {error &&
                <div>
                  {error}
                </div>
              }
              <div>
                <input
                  name="username"
                  hintText="Username"
                  floatingLabelText="Username"
                  onChange={this.handleInputChanged}
                />
              </div>
              <div>
                <input
                  name="password"
                  hintText="Password"
                  floatingLabelText="Password"
                  type="password"
                  onChange={this.handleInputChanged}
                />
              </div>
              <div>
                <button primary type="submit">
                  Create Account
                </button>
              </div>
            </form>
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default CreateAccountPage;
