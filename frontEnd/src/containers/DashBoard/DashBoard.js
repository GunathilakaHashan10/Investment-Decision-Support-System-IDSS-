import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import NavigationBar from '../../components/NavigationBar/NavigationBar';
import ChartContainerPage from '../StockMarket/ChartContainerPage/ChartContainerPage';
import RealEstateContainer from '../RealEstate/RealEstateContainer/RealEstateContainer';
import BankContainer from '../Bank/BankContainer/BankContainer';
import SelectSection from './SelectSection';
import InformationPage from '../InformationPage/InformationPage';


class DashBoardPage extends Component {
    
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
            case "/dashboard/stockMarket":
                localStorage.removeItem("sectionName");
                localStorage.setItem("sectionName", "Stocks");
                this.setState({ sectionName: "Stocks"});
                break;
            case "/dashboard/realEstate":
                localStorage.removeItem("sectionName");
                localStorage.setItem("sectionName", "Real Estate");
                break;
            case "/dashboard/bank":
                localStorage.removeItem("sectionName");
                localStorage.setItem("sectionName", "Bank");
                break;
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
            case "/dashboard/stockMarket":
                localStorage.removeItem("sectionName");
                localStorage.setItem("sectionName", "Stocks");
                this.setState({ sectionName: "Stocks"});
                break;
            case "/dashboard/realEstate":
                localStorage.removeItem("sectionName");
                localStorage.setItem("sectionName", "Real Estate");
                break;
            case "/dashboard/bank":
                localStorage.removeItem("sectionName");
                localStorage.setItem("sectionName", "Bank");
                break;
            case "/admin/stockMarket":
                localStorage.removeItem("sectionName");
                localStorage.setItem("sectionName", "Stocks");
                break;
            case "/admin/realEstate":
                localStorage.removeItem("sectionName");
                localStorage.setItem("sectionName", "Real Estate");
                localStorage.setItem("LTYPE", event.currentTarget.value);
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
        return(
            <div>
                <NavigationBar 
                    sectionName={localStorage.getItem("sectionName") || "Right Decision"}
                    bankActive={localStorage.getItem("sectionName")} 
                    logout={this.handleLogout} 
                    handleNav={this.handleNavigation}
                    type="User"
                />

                <Route 
                    exact={true}  
                    path={this.props.match.path} 
                    render={props => (
                        <InformationPage 
                            {...props} 
                            handleSection={this.handleSection} 
                        />
                        )}
                    />/>
                
                <Route path={`${this.props.match.path}/stockMarket`} component={ChartContainerPage}/>

                <Route path={`${this.props.match.path}/realEstate`} component={RealEstateContainer}/>                
                
                <Route path={`${this.props.match.path}/bank`} component={BankContainer}/> 

                
            </div>
        );
    }
}

export default DashBoardPage;


// { localStorage.getItem('RDACTP') !== '2485693124578965412478933254895464123648' && 
//                         <Route 
//                             exact={true} 
//                             path={this.props.match.path} 
//                             render={props => (
//                                 <SelectSection 
//                                     {...props} 
//                                     handleSection={this.handleSection} 
//                                 />
//                                 )}
//                             />
//                     }