import React, { Component } from 'react';
import styles from '../../../../../assets/css/RealEstate/Sale/Land/LandCard/LandCard.css';
import AdsDeleteModal from '../../AdsDeleteModal/AdsDeleteModal';
import AdsUpdateModal from '../../AdsUpdateModal/AdsUpdateModal';


class LandAdsCard extends Component {
    state = {
        cardLandImage: this.props.landDetails.landImages[0].imagePath,
        isModalOpen: false,
        adId: this.props.landDetails._id,
        adType: 'land',
        isOpenAdsUpdateModal: false
    }


    handleModalOpen = () => {
        this.setState({isModalOpen: true});
    }

    handleModalClose = () => {
        this.setState({isModalOpen: false});
        window.location.reload();
    }

    handelCancel = () => {
        this.setState({isModalOpen: false});
    }

    handleOpenAdsUpdateModal = () => {
        this.setState({ isOpenAdsUpdateModal: true })
    }

    handleCloseAdsUpdateModal = () => {
        this.setState({ isOpenAdsUpdateModal: false })
    }

    render() {
        const { isModalOpen, adId, adType, isOpenAdsUpdateModal } = this.state;
        let location = this.props.landDetails.location.split(',');
        let city = location[location.length - 1];
        return(
            <div className={styles.container}>
                <div className={styles.land_card_container}>
                    <img src={`http://localhost:5000/${this.state.cardLandImage}`} alt="Land" className={styles.land_card_image} />
                    <div className={styles.land_card_details} >
                        <h2 className={styles.home_price}>{`Rs.${this.props.landDetails.price}/perch`}</h2>
                        <span className={styles.no_perches}>{`${this.props.landDetails.areaOfLand} perches available`}</span>
                
                    </div>
                    <div className={styles.home_card_address} >
                       {`${city}`}
                    </div>
                    
                    <div className={styles.home_card_sale_container} >
                        <span className={styles.indicator}></span>
                        <span className={styles.sale_rent_annotation}>{`${this.props.landDetails.landType} for sell`}</span>
                    </div>
                    <div className={styles.home_card_time_period_annotation}>
                        5 days on here
                    </div>
                    <div className={styles.button_container}>
                        <button
                            onClick={this.handleOpenAdsUpdateModal}
                        >
                        Edit
                        </button>
                        <button
                            onClick={this.handleModalOpen}
                        >
                        Delete
                        </button>
                    </div>
                </div>
            
             { isModalOpen && 
                    <AdsDeleteModal 
                        closeModal={this.handleModalClose} 
                        id={adId} 
                        handelCancel={this.handelCancel} 
                        adType={adType}
                    />
            }
             { isOpenAdsUpdateModal && 
                    <AdsUpdateModal 
                        closeModal={this.handleCloseAdsUpdateModal} 
                        id={adId} 
                        adDetails={this.props.landDetails} 
                        adType={adType} 
                    />
            }
            </div>
        )
    }
}

export default LandAdsCard;