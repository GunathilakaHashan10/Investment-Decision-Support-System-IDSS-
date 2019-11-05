import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import ControlPanelSideNav from '../ControlPanelSideNav/ControlPanelSideNav';
import ShareControlCardContainer from '../AdminStocks/ShareControlCardContainer/ShareControlCardContainer';
import AdvertiserDetailsContainer from '../AdminRealEstate/AdvertiserDetailsContainer/AdvertiserDetailsContainer';
import BankControlCardContainer from '../AdminBank/BankControlCardContainer/BankControlCardContainer';
import UserCardContainer from '../AdminUserControl/UserCardContainer/UserCardContainer';

class AdminControlPanel extends Component {
    render() {
        
        return (
            <div>
                <Route path={`${this.props.match.path}`} component={ControlPanelSideNav}/>
                <Route path={`${this.props.match.path}/stock-control`} component={ShareControlCardContainer}/>
                <Route path={`${this.props.match.path}/realEsate-control`} component={AdvertiserDetailsContainer}/>
                <Route path={`${this.props.match.path}/bank-control`} component={BankControlCardContainer}/>
                <Route path={`${this.props.match.path}/user-control`} component={UserCardContainer}/>
            </div>
        );
    }
}

export default AdminControlPanel;