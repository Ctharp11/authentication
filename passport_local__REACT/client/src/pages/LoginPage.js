import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { Link } from 'react-router-dom';
// import { login } from '../utils/requests';
import axios from 'axios';


class LoginPage extends Component {
    state = {
      username: null,
      password: null
    }

    handleLogin = (e) => {
      e.preventDefault();
      axios.post('http://localhost:777/api/auth')
      .then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
  
    }

    handleInputChanged = (e) => {
      this.setState({
        [e.target.name]: e.target.value
      });
    }

render() {
    const { error } = this.state;

    return (
      <Grid fluid>
        <Row>
          <Col xs={6} xsOffset={3}>
            <form onSubmit={this.handleLogin}>
              <h1>Log In</h1>
              {error &&
                <div>
                  {error}
                </div>
              }
              <div>
                <input
                  name="username"
                  onChange={this.handleInputChanged}
                />
              </div>
              <div>
                <input
                  name="password"
                  type="password"
                  onChange={this.handleInputChanged}
                />
              </div>
              <div>
                <button type="submit">
                  Log In
                </button>
              </div>
              <p>
                or
              </p>
              <p>
                <Link to="/create">
                Register
                </Link>
              </p>
            </form>
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default LoginPage;