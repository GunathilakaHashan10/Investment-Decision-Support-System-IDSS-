import React, { Component } from 'react';
import { IoIosPerson } from 'react-icons/io';
import * as myConstants from '../../../Utils/Constants/Constants';
import axios from 'axios';
import styles from '../../../../assets/css/Admin/AdminRealEstate/AdvertiserDetailsCard/AdvertiserDetailsCard.css';
import AdvertismentsDetailModal from '../AdvertismentsDetailModal/AdvertismentsDetailModal';
import ErrorMessageModal from '../../../Utils/ErrorMessageModal/ErrorMessageModal';

class AdvertiserDetailsCard extends Component {
    state = {
        isOpenDetailModal: false,
        publisherId: this.props.advDetails._id,
        allAds: [],
        error: null,
        openErrorModal: false,
        salesAdsCount: 0,
        rentAdsCount: 0,
        advertiserName: `${this.props.advDetails.firstName} ${this.props.advDetails.lastName}`
    }

    handelCloseErrorMessageModal = () =>{
        this.setState({openErrorModal: false })
    }

    componentDidMount() {
        axios
            .get(`${myConstants.SEVER_URL}/admin/getPublisherAds?publisherId=` + this.state.publisherId)
            .then(response => {
                this.setState({
                    allAds: response.data.allAds,
                    salesAdsCount: response.data.salesAdsCount,
                    rentAdsCount: response.data.rentAdsCount
                })
            })
            .catch(error => {
                this.setState({
                    error: error.message,
                    openErrorModal: true
                })
            })
    }

    handleOpenDetailModal = () => {
        this.setState({isOpenDetailModal: true});
    }

    handleCloseDetailModal = () => {
        this.setState({isOpenDetailModal: false});
    }

    render() {
        const { isOpenDetailModal, openErrorModal } = this.state;
        const { firstName, lastName, email, address, contactMe } = this.props.advDetails;
        return(
            <div className={styles.container}>
                <div className={styles.Card_container_box}>
                    <div className={styles.userName}>
                        <IoIosPerson size="1.5em" color="white" />
                        <span>{`${firstName} ${lastName}`}</span>
                    </div>
                    <div className={styles.user_detail_container}>
                        <span className={styles.label_container}>
                            <span>Email</span>
                            <span>:</span>
                        </span>
                        <span className={styles.user_data}>{email}</span>
                    </div>
                    <div className={styles.user_detail_container}>
                        <span className={styles.label_container}>
                            <span>Address</span>
                            <span>:</span>
                        </span>
                        <span className={styles.user_data}>{address}</span>
                    </div>
                    <div className={styles.user_detail_container}>
                        <span className={styles.label_container}>
                            <span>Contact No</span>
                            <span>:</span>
                        </span>
                        <span className={styles.user_data}>{contactMe}</span>
                    </div>
                    <div className={styles.button_container}>
                        <button>Block</button>
                        <button>Remove</button>
                        <button
                            onClick={this.handleOpenDetailModal}
                        >View</button>
                    </div>
                </div>
                
                { isOpenDetailModal && 
                    <AdvertismentsDetailModal 
                        closeModal={this.handleCloseDetailModal}
                        allAds={this.state.allAds}
                        salesAdsCount={this.state.salesAdsCount}
                        rentAdsCount={this.state.rentAdsCount}
                        advertiserName={this.state.advertiserName}
                    />
                }
                {openErrorModal &&
                    <ErrorMessageModal 
                        closeModal={this.handelCloseErrorMessageModal}
                        error={this.state.error}
                    />
                }
            </div>
        )
    }
}

export default AdvertiserDetailsCard;