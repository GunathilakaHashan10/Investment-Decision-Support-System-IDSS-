import React, { Component } from 'react';
import ReactTooltip from 'react-tooltip';
import { IoIosMap } from 'react-icons/io';
import styles from '../../../../../assets/css/RealEstate/Sale/Land/LandCard/LandCard.css';
import LandDetailsModal from '../LandDetailsModal/LandDetailsModal';


class LandCard extends Component {
    state = {
        isOpenModel: false,
        landImages: this.props.landDetails.landImages,
        cardLandImage: this.props.landDetails.landImages[0].imagePath,
        longitude: this.props.landDetails.longitude,
        latitude: this.props.landDetails.latitude
    }

    handleOpenModal = () => {
        this.setState({isOpenModel:true})
    }


    handleModalClose = () => {
        this.setState({isOpenModel:false})
    }
    render() {
        return(
            <div className={styles.container}>
                <div className={styles.land_card_container}>
                    <img src={`http://localhost:5000/${this.state.cardLandImage}`} alt="Land" className={styles.land_card_image} onClick={this.handleOpenModal}/>
                    <div className={styles.land_card_details} onClick={this.handleOpenModal}>
                        <h2 className={styles.home_price}>{`Rs.${this.props.landDetails.price}/perch`}</h2>
                        <span className={styles.no_perches}>{`${this.props.landDetails.areaOfLand} perches available`}</span>
                
                    </div>
                    <div className={styles.home_card_address} onClick={this.handleOpenModal}>
                       {`${this.props.landDetails.location}`}
                    </div>
                    <ReactTooltip place="top" type="dark" effect="solid"/>
                    <div className={styles.home_card_sale_container} onClick={this.handleOpenModal}>
                        <span className={styles.indicator}></span>
                        <span className={styles.sale_rent_annotation}>Land for sell</span>
                    </div>
                    <div className={styles.home_card_time_period_annotation}>
                        5 days on here
                    </div>
                    <button 
                        className={styles.love_button} 
                        onClick={state => this.props.getCo(this.state)}
                        data-tip="View on Map"
                     >
                        <IoIosMap size="2.5em" color="white" />
                    </button>
                </div>
                {this.state.isOpenModel && <LandDetailsModal closeModal={this.handleModalClose}  landImages={this.state.landImages} landDetails={this.props.landDetails}/>}
            </div>
        )
    }
}

export default LandCard;