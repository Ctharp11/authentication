import React, { Component } from 'react';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import axios from 'axios';

class Home extends Component {

    responseFacebook = (response) => {
        const token = response.accessToken;
        axios.post('http://localhost:5000/users/oauth/facebook', { "access_token": token })
        .then(res =>  {
            localStorage.setItem('token', res.data.token) 
            this.getUserData();
        })
        .catch(err => console.log('axios err', err))
    }

    getUserData = () => {
        const usertoken = localStorage.getItem('token');
        console.log('usertoken', usertoken);
        axios.get('http://localhost:5000/users/secret', {
                headers: {
                    'Authorization': usertoken,
                    'credentials': 'same-origin',
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then(res => this.props.logginUser(res.data))
            .catch(err => console.log(err))
    }

    render() {
        return (
            <div> 
            Home
            {this.props.togglelog
                &&
                <div>
                    <FacebookLogin
                    appId="1572751842797364"
                    callback={this.responseFacebook}
                    render={renderProps => (
                        <button onClick={renderProps.onClick}>Sign in with facebook</button>
                    )}
                    /> </div>                
            }
          </div>
        )
    }
}

export default Home;