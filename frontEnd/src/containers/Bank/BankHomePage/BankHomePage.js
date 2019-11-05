import React, { Component } from 'react';


class BankHomePage extends Component {
    

    render() {
        return(
            <div>
                <h1>HomePage</h1>
                <button onClick={this.props.handleBank}>Get Started</button>
            </div>
        )
    }
}

export default BankHomePage;