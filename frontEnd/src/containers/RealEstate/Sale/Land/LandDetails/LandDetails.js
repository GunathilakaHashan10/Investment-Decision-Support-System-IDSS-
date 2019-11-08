import React, { Component } from 'react';
import axios from 'axios';
import {IoIosGrid, IoMdPin} from 'react-icons/io';
import styles from '../../../../../assets/css/RealEstate/Sale/Land/LandDetails/LandDetails.css';
import MessageBoxModal from '../../../MessageBoxModal/MessageBoxModal';
import PageFooterModal from '../../../PageFooterForModal/PageFooterForModal';

class LandDetails extends Component {
    state = {
        landAdsDetails: this.props.landDetails,
        isOpenModal: false,
        publisherDetails: null,
        cardImage: this.props.landDetails.landImages[0].imagePath,
        adType: `${this.props.landDetails.landType} for sell`,
        location:  this.props.landDetails.location,
        adId: this.props.landDetails._id,
        adVersion: 'land'
    }

    componentDidMount() {
        const pId = this.props.landDetails.publisherId;
    
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


    render(){
        const { isOpenModal } = this.state;
        return(
            <div className={styles.landDetails_container}>
                <div className={styles.card_details_container}>
                    <div className={styles.main_header}>
                        <span>Real Estate</span>
                    </div>
                    <div className={styles.loc_and_perch_container}>
                        <div className={styles.perch_container}>
                            <IoIosGrid size="1.5em" color="green"/>
                            <span className={styles.perch_no}>{`${this.state.landAdsDetails.areaOfLand} perches available`}</span>
                        </div>
                        <div className={styles.location_container}>
                            <IoMdPin size="1.5em" color="red"/>
                            <span className={styles.location}>{`${this.state.landAdsDetails.location}`}</span>
                        </div>
                    </div>
                    <div className={styles.perch_price_container}>
                        <span className={styles.price}>{`Rs.${this.state.landAdsDetails.price}`}</span>
                        <span className={styles.perch_annotaion}>per perch</span>
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
                            <span className={styles.details_container}>{this.state.landAdsDetails.landType}</span>
                        </div>
                        <div className={styles.features_container}>
                            <div className={styles.label_container}>
                                <span>Area of land (perch)</span>
                                <span>:</span>
                            </div>
                            <span className={styles.details_container}>{this.state.landAdsDetails.areaOfLand}</span>
                        </div>
                        <div className={styles.features_container}>
                            <div className={styles.label_container}>
                                <span>Availability</span>
                                <span>:</span>
                            </div>
                            <span className={styles.details_container}>Available</span>
                        </div>
            
                    </div>
                    <div className={styles.fact_and_features_container}>
                        <span>Property details</span>
                    </div>
                    <div>
                        <p className={styles.property_details}>
                            {this.state.landAdsDetails.propertyDetails}
                        </p>
                    </div>
                    <PageFooterModal />
                </div>
                { isOpenModal && 
                        <MessageBoxModal 
                            closeModal={this.handleCloseMessageBoxModal} 
                            landDetails={this.props.landDetails}
                            publisherDetails={this.state.publisherDetails}
                            cardImage={this.state.cardImage}
                            adType={this.state.adType}
                            location={this.state.location}
                            adId={this.state.adId}
                            adVersion={this.state.adVersion}
                        />
                }
            </div>
        )
    }
}

export default LandDetails;