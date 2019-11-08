import React, { Component } from 'react';
import JwtDecode from 'jwt-decode';
import axios from 'axios';
import * as myConstants from '../../../Utils/Constants/Constants';
import styles from '../../../../assets/css/RealEstate/Advertise/AllAds/AllAds.css';
import HomeAdsCard from '../AdsCard/HomeAdsCard/HomeAdsCard';
import LandAdsCard from '../AdsCard/LandAdsCard/LandAdsCard';
import HomeRentCard from '../AdsCard/HomeRentCard/HomeRentCard';
import ErrorMessageModal from '../../../Utils/ErrorMessageModal/ErrorMessageModal';
import PageFooter from '../../../PageFooter/PageFooter';

class AllAds extends Component {
    state = {
        allAdsDetails: [],
        extractedPath: "",
        error: null,
        openErrorModal: false,
        homeAdsCount: 0,
        landAdsCount: 0
    }

    handleCloseErrorModal = () => {
        this.setState({openErrorModal: false});
    }

    componentDidMount() {
       
        const token = localStorage.getItem('token');
        const decodedToken = JwtDecode(token);
        const pId = decodedToken.userId;

        let path = window.location.pathname.split('/');
        let extractedPath = path[path.length - 1];
        
        axios.get(`${myConstants.SEVER_URL}/publisherAllAds?pId=` + pId)
            .then(response => {
                if(response.data.isAdsAvailable) {
                    this.setState({
                        allAdsDetails: response.data.allAds,
                        extractedPath: extractedPath
                    })

                    response.data.allAds.forEach((value) => {
                       if(extractedPath === "land-ads" ){
                           if(value.landType !== undefined) {
                               this.setState((prevState) => {
                                   return {
                                       landAdsCount: prevState.landAdsCount + 1
                                   }
                               })
                              
                           } 
                       } else if (extractedPath === "home-ads") {
                        if(value.propertyType !== undefined) {
                            this.setState((prevState) => {
                                return {
                                    homeAdsCount: prevState.homeAdsCount + 1
                                }
                            })
                           
                        }
                       }
                    })
                } else {
                    return;
                }
               
                
            })
            .catch(error => {
                this.setState({
                    error: error.message,
                    openErrorModal: true
                })
            })
    }

    render() {
        const { allAdsDetails, extractedPath, homeAdsCount, landAdsCount } = this.state;
        let content = null;
        if(allAdsDetails.length === 0) {
            content = (
                <div className={styles.no_ads_container}>
                    <h1 className={styles.oophs_message}>oops!</h1>
                    <h2 className={styles.message01}>You do not have publish any selling or rentals advertisments</h2>
                    <PageFooter />
                </div>
            )
        } else if(extractedPath === "home-ads" && homeAdsCount === 0){
            content = (
                <div className={styles.no_ads_container}>
                    <h1 className={styles.oophs_message}>oops!</h1>
                    <h2 className={styles.message01}>You do not have publish any selling or rentals advertisments</h2>
                    <h3 className={styles.message02}>Property types: Homes, Apartment, annex...</h3>
                    <PageFooter />
                </div>
            )
        } else if (extractedPath === "land-ads" && landAdsCount === 0){
            content = (
                <div className={styles.no_ads_container}>
                <h1 className={styles.oophs_message}>oops!</h1>
                <h2 className={styles.message01}>You do not have publish any advertisments</h2>
                <h3 className={styles.message02}>Property types: Lands</h3>
                <PageFooter />
                </div>
            )
        } else  {
            content = (
                <div>
                {
                    allAdsDetails.map(Ad => {
                        let card = null;
                        if(extractedPath === "advertise") {
                            if((Ad.propertyType === "Home" || "Apartment" || "Annex") && (Ad.sellOrRent === "Sell")) {
                               card = <HomeAdsCard key={Ad._id} homeDetails={Ad} />
                            } else if (Ad.landType !== undefined) {
                                card = <LandAdsCard key={Ad._id} landDetails={Ad} />
                            } else if ((Ad.propertyType === "Home" || "Apartment" || "Annex") && (Ad.sellOrRent === "Rent")) {
                                card =<HomeRentCard key={Ad._id} homeDetails={Ad} />
                            } 
                                  
                        } else if (extractedPath === "land-ads") {
                            if(Ad.landType !== undefined) {
                                card =<LandAdsCard key={Ad._id} landDetails={Ad} />
                            }
                        } else if(extractedPath === "home-ads") {
                            if((Ad.propertyType === "Home" || "Apartment" || "Annex") && (Ad.sellOrRent === "Sell")) {
                                card =<HomeAdsCard key={Ad._id} homeDetails={Ad} />
                            } else if ((Ad.propertyType === "Home" || "Apartment" || "Annex") && (Ad.sellOrRent === "Rent")) {
                                card =<HomeRentCard key={Ad._id} homeDetails={Ad} />
                            }
                        } 
                        return card;
                        
                    }
                     
                    )
                }
                
                </div>
            )
        }
        return (
            <div className={styles.container}>
            {content}
            {this.state.openErrorModal &&
                <ErrorMessageModal 
                    closeModal={this.handleCloseErrorModal}
                    error={this.state.error}
                />
            }
            </div>
        )
    }
}

export default AllAds;