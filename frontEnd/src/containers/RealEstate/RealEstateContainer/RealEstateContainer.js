import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import AdsControlPanel from '../Advertise/AdsControlPanel/AdsControlPanel';
import HomeSellAdsContainer from '../Sale/Home/HomeAdsContainer/HomeAdsContainer';
import HomeRentAdsContainer from '../Rent/Home/HomeRentAdsContainer/HomeRentAdsContainer';
import LandAdsContainer from '../Sale/Land/LandAdsContainer/LandAdsContainer';
import HomePage from '../HomePage/HomePageRealEstate';

class RealEstateContainer extends Component {
    render() {
        return(
            <div>
                <Route path={this.props.match.path} exact={true} component={HomePage}/>

                <Route path={`${this.props.match.path}/homes-sell`} component={HomeSellAdsContainer}/>
                <Route path={`${this.props.match.path}/apartments-sell`} component={HomeSellAdsContainer}/>
                <Route path={`${this.props.match.path}/commercials-sell`} component={HomeSellAdsContainer}/>
                <Route path={`${this.props.match.path}/villas-sell`} component={HomeSellAdsContainer}/>
                <Route path={`${this.props.match.path}/bungalows-sell`} component={HomeSellAdsContainer}/>

                <Route path={`${this.props.match.path}/homes-rent`} component={HomeRentAdsContainer}/>
                <Route path={`${this.props.match.path}/apartments-rent`} component={HomeRentAdsContainer}/>
                <Route path={`${this.props.match.path}/annexes-rent`} component={HomeRentAdsContainer}/>


                <Route path={`${this.props.match.path}/beachfront-land-sell`} component={LandAdsContainer}/>
                <Route path={`${this.props.match.path}/bare-land-sell`} component={LandAdsContainer}/>
                <Route path={`${this.props.match.path}/land-with-house-sell`} component={LandAdsContainer}/>
                <Route path={`${this.props.match.path}/cultivated-agriculture-land-sell`} component={LandAdsContainer}/>                
                <Route path={`${this.props.match.path}/tea-estate-land-sell`} component={LandAdsContainer}/>
                <Route path={`${this.props.match.path}/cocunut-estate-land-sell`} component={LandAdsContainer}/>
                <Route path={`${this.props.match.path}/rubber-estate-land-sell`} component={LandAdsContainer}/>

                <Route path={`${this.props.match.path}/advertise`} component={AdsControlPanel}/>
                
            </div>
        )
    }
}

export default RealEstateContainer;