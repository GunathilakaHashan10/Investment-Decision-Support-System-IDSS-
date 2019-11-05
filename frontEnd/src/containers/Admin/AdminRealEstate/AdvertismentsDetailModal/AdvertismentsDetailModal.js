import React, { Component } from 'react';
import modalStyles from '../../../../assets/css/Admin/AdminRealEstate/AdvertismentsDetailModal/AdvertismentsDetailModal.css';
import AdsDetailCard from '../AdsDetailCard/AdsDetailCard';

class AdvertismentsDetailModal extends Component {
    render() {
        return(
            <div className={modalStyles.modal}>
                <div className={modalStyles.modal_container}>
                    <div className={modalStyles.sub_container}>
                        <h2 className={modalStyles.advertiser_name}>{`Advertiser: ${this.props.advertiserName}`}</h2>
                        <div className={modalStyles.ads_details_container}>
                            <span className={modalStyles.label_container}>
                                <span>Sales Ads</span>
                                <span>:</span>
                            </span>
                            <span className={modalStyles.ads_data}>{this.props.salesAdsCount}</span>
                        </div>
                        <div className={modalStyles.ads_details_container}>
                            <span className={modalStyles.label_container}>
                                <span>Rentals Ads</span>
                                <span>:</span>
                            </span>
                            <span className={modalStyles.ads_data}>{this.props.rentAdsCount}</span>
                        </div>
                        <div className={modalStyles.ads_details_container}>
                            <span className={modalStyles.label_container}>
                                <span>Total Ads</span>
                                <span>:</span>
                            </span>
                            <span className={modalStyles.ads_data}>{this.props.rentAdsCount + this.props.salesAdsCount}</span>
                        </div>
                        <div className={modalStyles.adsCards_container}>
                            {this.props.allAds.map(value => {
                                let image = null;
                                let sellOrRent = null;
                                if(!value.homeImages) {
                                    image = value.landImages[0].imagePath
                                } else {
                                    image = value.homeImages[0].imagePath
                                }
                                if(!value.sellOrRent) {
                                    sellOrRent = "sell"
                                } else {
                                    sellOrRent = value.sellOrRent
                                }
                                return (
                                    <AdsDetailCard 
                                        key={value._id}
                                        ad={value}
                                        adImage={image}
                                        propertyType={value.landType || value.propertyType}
                                        sellOrRent={sellOrRent}
                                    />
                                )
                            })

                            }
                            

                        </div>
                        <div className={modalStyles.button_container}>
                            <button
                                onClick={this.props.closeModal}
                            >
                            Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default AdvertismentsDetailModal;