import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Nav extends Component {
    render() {
        return (
            <div className="nav"> 
                <div><Link to="/">WEBSITE </Link></div>

                {this.props.loggedin
                    ?
                    <div> 
                       <span><Link to="/account">My Account</Link>  </span>
                       <span onClick={this.props.loggoutUser}> Sign out </span>
                    </div>
                    :
                    <div onClick={this.props.toggleAuth}> Sign in </div>
                }
                
            </div>

        )
    }
}

export default Nav;

