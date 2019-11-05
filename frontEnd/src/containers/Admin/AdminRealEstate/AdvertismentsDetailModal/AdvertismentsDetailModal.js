import React, { Component } from 'react';
import modalStyles from '../../../../assets/css/Admin/AdminRealEstate/AdvertismentsDetailModal/AdvertismentsDetailModal.css';
import AdsDetailCard from '../AdsDetailCard/AdsDetailCard';

class AdvertismentsDetailModal extends Component {
    render() {
        return(
            <div className={modalStyles.modal}>
                <div className={modalStyles.modal_container}>
                    <div className={modalStyles.sub_container}>
                        <h2 className={modalStyles.advertiser_name}>Advertiser: Hashan Gunathilaka</h2>
                        <div className={modalStyles.ads_details_container}>
                            <span className={modalStyles.label_container}>
                                <span>Sales Ads</span>
                                <span>:</span>
                            </span>
                            <span className={modalStyles.ads_data}>15</span>
                        </div>
                        <div className={modalStyles.ads_details_container}>
                            <span className={modalStyles.label_container}>
                                <span>Rentals Ads</span>
                                <span>:</span>
                            </span>
                            <span className={modalStyles.ads_data}>5</span>
                        </div>
                        <div className={modalStyles.ads_details_container}>
                            <span className={modalStyles.label_container}>
                                <span>Total Ads</span>
                                <span>:</span>
                            </span>
                            <span className={modalStyles.ads_data}>20</span>
                        </div>
                        <div className={modalStyles.adsCards_container}>
                            <AdsDetailCard />
                            <AdsDetailCard />
                            <AdsDetailCard />
                            <AdsDetailCard />
                            <AdsDetailCard />
                            <AdsDetailCard />
                            <AdsDetailCard />
                            <AdsDetailCard />
                            <AdsDetailCard />
                            <AdsDetailCard />

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