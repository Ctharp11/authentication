import React, { Component } from 'react';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import {
    Navbar, 
    NavbarBrand,
    Nav, 
    NavItem,
    NavLink,
    Container
} from 'reactstrap';
const keys = require('../keys');

class AppNav extends Component {
    constructor(props) {
        super(props);
        this.state = {
           
        }
    }

    responseFacebook = (response) => {
        console.log(response);
        if(response.status === 'unknown') {
            return;
        }
        this.props.isLogged(response)
    }

    render() {
        return (
            <div> 
                <Navbar color="dark" dark expand="sm" className="mb-5">
                    <Container> 
                        <NavbarBrand href="/"> React Auth </NavbarBrand> 
                        <Nav className="ml-auto" navbar>

                            {this.props.loggedin 
                                ?
                              <div className="nav">
                                <NavItem>
                                  <NavLink href="/account"> My Account </NavLink>
                                </NavItem>  

                                <NavItem onClick={() => this.props.logout()}>
                                    <NavLink href="/account"> Logout </NavLink>
                                </NavItem>
                              </div>
                              :
                              <NavItem>
                                <FacebookLogin
                                    appId={keys.keys.FACEBOOK_APP_ID}
                                    callback={this.responseFacebook}
                                    fields="name,email,picture"
                                    autoload={true}
                                    render={renderProps => (
                                        <button className="facebook" onClick={renderProps.onClick}>Login with Facebook</button>
                                    )}/>
                              </NavItem>
                            }
                        </Nav>
                    </Container>
                </Navbar>
            </div>
        )
    }
}

export default AppNav;