import React, { Component } from 'react';
import ReactTooltip from 'react-tooltip';
import { IoIosMap } from 'react-icons/io';
import styles from '../../../../../assets/css/RealEstate/Sale/Home/HomeCard/HomeCard.css';
import HomeDetailsModal from '../HomeDetailsModal/HomeDetailsModal';

class HomeCard extends Component {
    state = {
        isOpenModel: false,
        homeImages: this.props.homeDetails.homeImages,
        cardHomeImage: this.props.homeDetails.homeImages[0].imagePath,
        longitude: this.props.homeDetails.longitude,
        latitude: this.props.homeDetails.latitude
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
                <div className={styles.home_card_container}>
                    <img src={`http://localhost:5000/${this.state.cardHomeImage}`} alt="home" className={styles.home_card_image} onClick={this.handleOpenModal}/>
                    <div className={styles.home_card_details} onClick={this.handleOpenModal}>
                        <h2 className={styles.home_price}>{`${this.props.homeDetails.price}M`}</h2>
                        <span className={styles.no_beds}>{`${this.props.homeDetails.bedRooms}bds`}</span>
                        <span className={styles.no_bath}>{`${this.props.homeDetails.bathRooms}ba`}</span>
                        <span className={styles.area_size}>{`${this.props.homeDetails.landSize}sqft`}</span>
                    </div>
                    <div className={styles.home_card_address} onClick={this.handleOpenModal}>
                        {this.props.homeDetails.location}
                    </div>
                    <ReactTooltip place="top" type="dark" effect="solid"/>
                    <div className={styles.home_card_sale_container} onClick={this.handleOpenModal}>
                        <span className={styles.indicator}></span>
                        <span className={styles.sale_rent_annotation}>{`Home for ${this.props.homeDetails.sellOrRent}`}</span>
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
                {this.state.isOpenModel && <HomeDetailsModal closeModal={this.handleModalClose} homeDetails={this.props.homeDetails} homeImages={this.state.homeImages}/>}
            </div>
        )
    }
}

export default HomeCard;

