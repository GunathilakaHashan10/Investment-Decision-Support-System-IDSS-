import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import BankHomePage from '../BankHomePage/BankHomePage';
import BankCardsContainer from '../BankCardsContainer/BankCardsContainer';

class BankContainer extends Component {

    handleRenderBankContainer = () => {
        this.props.history.push(`${this.props.match.url}/yourBanks`);
    }

    render() {
        return (
            <div>
                <Route 
                    exact={true} 
                    path={this.props.match.path}
                    render={props => (
                        <BankHomePage 
                            {...props}
                            handleBank={this.handleRenderBankContainer}
                        />
                    )} 
                />

                <Route 
                    path={`${this.props.match.path}/yourBanks`}
                    render={props => (
                        <BankCardsContainer 
                            {...props}
                        />
                    )} 
                />
                
            </div>
        );
    }
}

export default BankContainer;