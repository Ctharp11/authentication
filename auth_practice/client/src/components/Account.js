import React, { Component } from 'react';

class Account extends Component {
    
    render() {
        if (!this.props.userInfo.userInfo) {
            return null
        }
        const userInfo = this.props.userInfo.userInfo.facebook
        console.log(userInfo);
        return (
            <div> 
            {this.props.userInfo
                &&
                <div>
                    <div> Welcome {userInfo.first_name}! </div>
                    <img src={userInfo.photo} alt="you" />
                </div>
            }
            </div>
        )
    }
}

export default Account;