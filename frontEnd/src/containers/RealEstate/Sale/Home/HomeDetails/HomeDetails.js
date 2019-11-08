import React, { Component } from 'react';
import axios from 'axios';
import { IoIosCheckmark } from 'react-icons/io';
import styles from '../../../../../assets/css/RealEstate/Sale/Home/HomeDetails/HomeDetails.css';
import MessageBoxModal from '../../../MessageBoxModal/MessageBoxModal';
import PageFooterModal from '../../../PageFooterForModal/PageFooterForModal';

class HomeDetails extends Component {
    state = {
        homeAdsDetails: this.props.homeDetails,
        isOpenModal: false,
        publisherDetails: null,
        cardImage: this.props.homeDetails.homeImages[0].imagePath,
        adType: `${this.props.homeDetails.propertyType} for ${this.props.homeDetails.sellOrRent}`,
        location: this.props.homeDetails.location,
        adId: this.props.homeDetails._id,
        adVersion: 'home'
    }

    componentDidMount() {
        const pId = this.props.homeDetails.publisherId;
    
        axios.get('http://localhost:5000/advertiser/advertiserDetails?pId=' + pId)
            .then(response => {
                this.setState({
                    publisherDetails: response.data.publisher
                })
            })
            .catch(error => {
                console.log(error);
            })
    }

    handleOpenMessageBoxModal = () => {
        this.setState({ isOpenModal: true });
    }

    handleCloseMessageBoxModal = () => {
        this.setState({ isOpenModal: false });
    }


    render() { 
        const { homeAdsDetails, isOpenModal } = this.state;
        return(
            <div className={styles.homeDetails_container}>
                <div className={styles.card_details_container}>
                    <div className={styles.main_header}>
                        <span>Real Estate</span>
                    </div>
                    <div className={styles.main_details_container}>
                        <span className={styles.price_container}>{`${homeAdsDetails.price}M`}</span>
                        <span className={styles.no_beds_baths}>{`${homeAdsDetails.bedRooms} beds`}</span>
                        <span className={styles.no_beds_baths}>{`${homeAdsDetails.bathRooms} baths`}</span>
                    </div>
                    <div className={styles.location_container}>
                        <span>{`${homeAdsDetails.location}`}</span>
                    </div>
                    <div className={styles.home_card_sale_container}>
                        <span className={styles.indicator}></span>
                        <span className={styles.sale_rent_annotation}>{`${homeAdsDetails.propertyType} for sell`}</span>
                    </div>
                    <div className={styles.button_container}>
                        <button 
                            className={styles.contact_advertiser_button}
                            onClick={this.handleOpenMessageBoxModal}
                        >
                        Contact Advertiser
                        </button>
                    </div>
                </div>
                <div className={styles.more_details_container}>
                    <div className={styles.fact_and_features_container}>
                        <span>Facts and features</span>
                    </div>
                    <div>
                        <div className={styles.features_container}>
                            <div className={styles.label_container}>
                                <span>Property type</span>
                                <span>:</span>
                            </div>
                            <span className={styles.details_container}>{`${homeAdsDetails.propertyType}`}</span>
                        </div>
                        <div className={styles.features_container}>
                            <div className={styles.label_container}>
                                <span>Bed Rooms</span>
                                <span>:</span>
                            </div>
                            <span className={styles.details_container}>{`${homeAdsDetails.bedRooms}`}</span>
                        </div>
                        <div className={styles.features_container}>
                            <div className={styles.label_container}>
                                <span>Bath Rooms</span>
                                <span>:</span>
                            </div>
                            <span className={styles.details_container}>{`${homeAdsDetails.bathRooms}`}</span>
                        </div>
                        <div className={styles.features_container}>
                            <div className={styles.label_container}>
                                <span>Floors</span>
                                <span>:</span>
                            </div>
                            <span className={styles.details_container}>{`${homeAdsDetails.floors}`}</span>
                        </div>
                        <div className={styles.features_container}>
                            <div className={styles.label_container}>
                                <span>Parking space</span>
                                <span>:</span>
                            </div>
                            <span className={styles.details_container}>{`${homeAdsDetails.parkingSpace}`}</span>
                        </div>
                        <div className={styles.features_container}>
                            <div className={styles.label_container}>
                                <span>Area of Land(sqrt)</span>
                                <span>:</span>
                            </div>
                            <span className={styles.details_container}>{`${homeAdsDetails.landSize}`}</span>
                        </div>
                    </div>
                    <div className={styles.fact_and_features_container}>
                        <span>Property features</span>
                    </div>
                    <div>
                       { homeAdsDetails.AC === true && 
                        <div className={styles.property_features_container}>
                            <span className={styles.property_feature}>AC Rooms</span>
                            <span className={styles.property_feature_icon}><IoIosCheckmark size="2em" color="#006AFF" /></span>
                            </div>
                        }
                        { homeAdsDetails.hotWater === true && 
                        <div className={styles.property_features_container}>
                            <span className={styles.property_feature}>Hot water</span>
                            <span className={styles.property_feature_icon}><IoIosCheckmark size="2em" color="#006AFF" /></span>
                        </div>
                        }
                        { homeAdsDetails.serventRoom === true && 
                        <div className={styles.property_features_container}>
                            <span className={styles.property_feature}>Servent Room</span>
                            <span className={styles.property_feature_icon}><IoIosCheckmark size="2em" color="#006AFF" /></span>
                        </div>
                        }
                        { homeAdsDetails.serventToilet === true && 
                        <div className={styles.property_features_container}>
                            <span className={styles.property_feature}>Servent Toilet</span>
                            <span className={styles.property_feature_icon}><IoIosCheckmark size="2em" color="#006AFF" /></span>
                        </div>
                        }
                        { homeAdsDetails.mainLineWater === true &&
                        <div className={styles.property_features_container}>
                            <span className={styles.property_feature}>Main line water</span>
                            <span className={styles.property_feature_icon}><IoIosCheckmark size="2em" color="#006AFF" /></span>
                        </div>
                        }
                        { homeAdsDetails.overHeadWater === true &&
                        <div className={styles.property_features_container}>
                            <span className={styles.property_feature}>Over head water</span>
                            <span className={styles.property_feature_icon}><IoIosCheckmark size="2em" color="#006AFF" /></span>
                        </div>
                        }
                        
                    </div>
                    <PageFooterModal /> 
                </div>
                { isOpenModal && 
                    <MessageBoxModal 
                        closeModal={this.handleCloseMessageBoxModal} 
                        homeDetails={this.props.homeDetails}
                        publisherDetails={this.state.publisherDetails}
                        cardImage={this.state.cardImage}
                        adType={this.state.adType}
                        location={this.state.location}
                        adId={this.state.adId}
                        adVersion={this.state.adVersion}
                    />
                }
                
            </div>
        );
    }
}

export default HomeDetails;