import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import AdminControlPanel from '../AdminControlPanel/AdminControlPanel';
import NavigationBar from '../../../components/NavigationBar/NavigationBar';
import ChartContainerPage from '../../StockMarket/ChartContainerPage/ChartContainerPage';
import RealEstateContainer from '../../RealEstate/RealEstateContainer/RealEstateContainer';
import BankContainer from '../../Bank/BankContainer/BankContainer';

class AdminContainer extends Component {

    handleAdminControlPanel = (event) => {
        this.props.history.push(`${this.props.match.url}/${event.currentTarget.id}`);
    }

    handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('expiryDate');
        localStorage.removeItem('RDACTD');
        localStorage.removeItem('RDACTP');
        localStorage.removeItem("sectionName");
        this.props.history.push("/");
    }

    handleSection = (event) => {
        switch(`${this.props.match.url}/${event.currentTarget.id}`) {
            case "/admin/stockMarket":
                localStorage.removeItem("sectionName");
                localStorage.setItem("sectionName", "Stocks");
                break;
            case "/admin/realEstate":
                localStorage.removeItem("sectionName");
                localStorage.setItem("sectionName", "Real Estate");
                break;
            case "/admin/bank":
                localStorage.removeItem("sectionName");
                localStorage.setItem("sectionName", "Bank");
                break;
            default: break;
        }
        this.props.history.push(`${this.props.match.url}/${event.currentTarget.id}`);
    }

    handleNavigation = (event) => {
        switch(`${this.props.match.url}/${event.currentTarget.id}`) {
            case "/admin/stockMarket":
                localStorage.removeItem("sectionName");
                localStorage.setItem("sectionName", "Stocks");
                break;
            case "/admin/realEstate":
                localStorage.removeItem("sectionName");
                localStorage.setItem("sectionName", "Real Estate");
                break;
            case "/admin/bank":
                localStorage.removeItem("sectionName");
                localStorage.setItem("sectionName", "Bank");
                break;
            default: break;
        }
        this.props.history.push(`${this.props.match.url}/${event.currentTarget.id}`);
    }

    render() {
        return (
            <div>
                <Route 
                    path={this.props.match.path} 
                    render={props => (
                        <NavigationBar 
                            {...props}
                            sectionName={localStorage.getItem("sectionName") || "Right Decision"}
                            handleAdminControl={this.handleAdminControlPanel}
                            bankActive={localStorage.getItem("sectionName")}
                            logout={this.handleLogout}
                            handleNav={this.handleNavigation}
                            type="admin"
                        />
                    )}/>
                <Route path={`${this.props.match.path}/controlPanel`} component={AdminControlPanel}/>

                <Route path={`${this.props.match.path}/stockMarket`} component={ChartContainerPage}/>

                <Route path={`${this.props.match.path}/realEstate`} component={RealEstateContainer}/>                
                
                <Route path={`${this.props.match.path}/bank`} component={BankContainer}/> 
    
            </div>
        )
    }
}

export default AdminContainer;