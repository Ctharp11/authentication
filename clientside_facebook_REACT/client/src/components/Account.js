import React, { Component } from 'react';

class Account extends Component {
    render() {
        if (!this.props.userInfo) {
            return null
        }
        console.log(this.props.userInfo.picture.data.url)
        return (
            <div>
            <div> Welcome {this.props.userInfo.name} </div>
            <img src={this.props.userInfo.picture.data.url} alt="you" />
            <div> {this.props.userInfo.email} </div>
            </div>
        )
    }
}


export default Account;