import React, { Component } from 'react';
import axios from 'axios';
import ReactLoading from 'react-loading';
import { IoIosNavigate } from 'react-icons/io';
import { FaAdversal } from 'react-icons/fa';
import * as myConstants from '../../../Utils/Constants/Constants';
import styles from '../../../../assets/css/Admin/AdminRealEstate/AdsDetailCard/AdsDetailCard.css';
import HomeDetailsModal from '../../../RealEstate/Sale/Home/HomeDetailsModal/HomeDetailsModal';
import LandDetailsModal from '../../../RealEstate/Sale/Land/LandDetailsModal/LandDetailsModal';
import HomeRentDetailsModal from '../../../RealEstate/Rent/Home/HomeRentDetailsModal/HomeRentDetailsModal';
import ErrorMessageModal from '../../../Utils/ErrorMessageModal/ErrorMessageModal';

class AdsDetailCard extends Component {
    state = {
        isOpenHomeDetailsModal: false,
        isOpenLandDetailsModal: false,
        isOpenHomeRentDetailsModal: false,
        propertyType: this.props.propertyType,
        modalType: null,
        adDetails: this.props.ad,
        adId: this.props.ad._id,
        isLoadingBlock: false,
        isLoadingDelete: false,
        isBlocked: false,
        error: null,
        openErrorModal: false
    }

    componentDidMount() {
        const { propertyType, sellOrRent } = this.props;
        if((propertyType === "Home") || (propertyType === "Apartment") || (propertyType === "Annex")) {
            if((sellOrRent === "Sell")) {
                this.setState({modalType: "HomeSell"});
            } else if((sellOrRent === "Rent")){
                this.setState({modalType: "HomeRent"});
            }
        } else {
            this.setState({modalType: "LandSell"})
        }

        
    }
    

    handleCloseErrorMessageModal = () => {
        this.setState({openErrorModal: false});
    }

    handleCloseHomeDetailsModal = () => {
        this.setState({isOpenHomeDetailsModal: false});
    }

    handleCloseLandDetailsModal = () => {
        this.setState({isOpenLandDetailsModal: false});
    }

    handleCloseHomeRentDetailsModal = () => {
        this.setState({isOpenHomeRentDetailsModal: false});
    }

    handleOpenViewModal = () => {
        const { modalType } = this.state;
        if(modalType === "HomeSell"){
            this.setState({isOpenHomeDetailsModal: true});
        } else if(modalType === "HomeRent") {
            this.setState({isOpenHomeRentDetailsModal: true});
        } else if(modalType === "LandSell") {
            this.setState({isOpenLandDetailsModal: true});
        }
    }

    handleBlockAd = () => {
        this.setState({isLoadingBlock: true})
        const { modalType, adId, isBlocked } = this.state;

        if(isBlocked) {
            const formData = new FormData();
            formData.append('adType', modalType);
            formData.append('adId', adId);
    
            axios  
                .post(`${myConstants.SEVER_URL}/admin/controlBlockAd`, formData)
                .then(response => {
                    this.setState({
                        isLoadingBlock: false,
                        isBlocked: response.data.success
                    })
                })
                .catch(error => {
                    this.setState({
                        error: error.message,
                        openErrorModal: true
                    })
                })
        } else {
            const formData = new FormData();
            formData.append('adType', modalType);
            formData.append('adId', adId);
    
            axios  
                .post(`${myConstants.SEVER_URL}/admin/controlUnblock`, formData)
                .then(response => {
                    this.setState({
                        isLoadingBlock: false,
                        isBlocked: response.data.success
                    })
                })
                .catch(error => {
                    this.setState({
                        error: error.message,
                        openErrorModal: true
                    })
                })
        }
       
    }



    render() {
       const {isOpenHomeDetailsModal, isOpenHomeRentDetailsModal, isOpenLandDetailsModal, isBlocked, openErrorModal, isLoadingBlock} = this.state;
        return(
            <div>
                <div className={styles.container}>
                    <div className={styles.image_container}>
                        <img src={`${myConstants.SEVER_URL}/${this.props.adImage}`} alt="propertyImage" className={styles.image}/>
                    </div>
                    <div className={styles.details_Container}>
                        <div className={styles.details_box}>
                            <span className={styles.icon}><FaAdversal size="1rem" /></span>
                            <span className={styles.detail}>{`${this.props.propertyType} for ${this.props.sellOrRent}`}</span>
                        </div>
                        <div className={styles.details_box}>
                            <span className={styles.icon}><IoIosNavigate size="1rem" /></span>
                            <span className={styles.detail}>{this.props.ad.location}</span>
                        </div>
                    </div>
                    <div className={styles.button_container}>
                        <button
                            className={styles.control_button}
                            onClick={this.handleOpenViewModal}
                        >
                        View
                        </button>
                        <button
                            className={isLoadingBlock ? styles.control_button_loading : isBlocked ? styles.control_button_blocked : styles.control_button}
                            onClick={this.handleBlockAd}
                        >
    
                        {isLoadingBlock 
                            ?  <div className={styles.loading_container}>
                                    <ReactLoading type={'spin'} color={'white'} height={'15%'} width={'15%'} /> 
                                    <span>wait..</span>
                                </div>
                            : isBlocked  ?  "Blocked" : "Block"
                        }
                        </button>
                        <button
                            className={styles.control_button}
                        >
                        Delete
                        </button>
                    </div>
                
                </div>
                {isOpenHomeDetailsModal && 
                    <HomeDetailsModal 
                        closeModal={this.handleCloseHomeDetailsModal}
                        homeDetails={this.state.adDetails}
                        homeImages={this.props.ad.homeImages}
                    />
                }
                {isOpenHomeRentDetailsModal && 
                    <HomeRentDetailsModal 
                        closeModal={this.handleCloseHomeRentDetailsModal}
                        homeDetails={this.state.adDetails}
                        homeImages={this.props.ad.homeImages}
                    />
                }
                {isOpenLandDetailsModal &&
                    <LandDetailsModal 
                        closeModal={this.handleCloseLandDetailsModal}
                        landImages={this.props.ad.landImages}
                        landDetails={this.state.adDetails}
                        
                    />
                }
                {openErrorModal &&
                    <ErrorMessageModal 
                        closeModal={this.handleCloseErrorMessageModal}
                        error={this.state.error}
                    />
                }
            </div>
        )
    }
}

export default AdsDetailCard;