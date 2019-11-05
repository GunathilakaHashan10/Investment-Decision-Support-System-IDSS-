import React, { Component } from 'react';
import JwtDecode from 'jwt-decode';
import axios from 'axios';
import styles from '../../../../assets/css/RealEstate/Advertise/AllAds/AllAds.css';
import HomeAdsCard from '../AdsCard/HomeAdsCard/HomeAdsCard';
import LandAdsCard from '../AdsCard/LandAdsCard/LandAdsCard';

class AllAds extends Component {
    state = {
        allAdsDetails: [],
        extractedPath: ""
    }

    componentDidMount() {
        const token = localStorage.getItem('token');
        const decodedToken = JwtDecode(token);
        const pId = decodedToken.userId;

        let path = window.location.pathname.split('/');
        let extractedPath = path[path.length - 1];
        

        

        axios.get("http://localhost:5000/publisherAllAds?pId=" + pId)
            .then(response => {
                this.setState({
                    allAdsDetails: response.data,
                    extractedPath: extractedPath
                })
            })
            .catch(error => {
                console.log(error);
            })
    }

    render() {
        let card = null
        return (
            <div className={styles.container}>
            {
                this.state.allAdsDetails.map(Ad => {
                    if(this.state.extractedPath === "advertise") {
                        if((Ad.propertyType === "Home" || "Apartment" || "Annex") && (Ad.sellOrRent === "Sell")) {
                            card = <HomeAdsCard key={Ad._id} homeDetails={Ad} />
                        } else if (Ad.landType !== undefined) {
                            card = <LandAdsCard key={Ad._id} landDetails={Ad} />
                        }
                    } else if (this.state.extractedPath === "land-ads") {
                        if(Ad.landType !== undefined) {
                            card = <LandAdsCard key={Ad._id} landDetails={Ad} />
                        }
                    } else if(this.state.extractedPath === "home-ads") {
                        if((Ad.propertyType === "Home" || "Apartment" || "Annex") && (Ad.sellOrRent === "Sell")) {
                            card = <HomeAdsCard key={Ad._id} homeDetails={Ad} />
                        }
                    } 
                    return card;
                }
                 
                )
            }
            </div>
        )
    }
}

export default AllAds;