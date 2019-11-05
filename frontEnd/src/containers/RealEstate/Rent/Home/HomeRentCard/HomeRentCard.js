import React, { Component } from 'react';
import ReactTooltip from 'react-tooltip';
import { IoIosMap } from 'react-icons/io';
import styles from '../../../../../assets/css/RealEstate/Sale/Home/HomeCard/HomeCard.css';
import HomeRentDetailsModal from '../HomeRentDetailsModal/HomeRentDetailsModal';

class HomeRentCard extends Component {
    state = {
        isModalOpen: false,
        homeImages: this.props.homeAdDetails.homeImages,
        homeCardImage:  this.props.homeAdDetails.homeImages[0].imagePath,
        longitude: this.props.homeAdDetails.longitude,
        latitude: this.props.homeAdDetails.latitude
    }


    handleModalOpen = () =>{
        this.setState({ isModalOpen: true})
    }

    handleModalClose = () => {
        this.setState({ isModalOpen: false})
    }



    render() {
        return(
            <div className={styles.container}>
                <div className={styles.home_card_container}>
                    <img src={`http://localhost:5000/${this.state.homeCardImage}`} alt="home" className={styles.home_card_image} onClick={this.handleModalOpen}/>
                    <div className={styles.home_card_details} onClick={this.handleModalOpen}>
                        <h2 className={styles.home_rent}>{`Rs.${this.props.homeAdDetails.price}/month`}</h2>
                        <span className={styles.no_beds_rent}>{`${this.props.homeAdDetails.bedRooms}beds`}</span>
                        <span className={styles.no_bath_rent}>{`${this.props.homeAdDetails.bathRooms}bath`}</span>
                        
                    </div>
                    <div className={styles.home_card_address} onClick={this.handleModalOpen}>
                        {this.props.homeAdDetails.location}
                    </div>
                    <ReactTooltip place="top" type="dark" effect="solid"/>
                    <div className={styles.home_card_sale_container} onClick={this.handleModalOpen}>
                        <span className={styles.indicator}></span>
                        <span className={styles.sale_rent_annotation}>{`${this.props.homeAdDetails.propertyType} for rent`}</span>
                    </div>
                    <div className={styles.home_card_time_period_annotation}>
                        5 days on here
                    </div>
                    <button 
                        className={styles.love_button} 
                        onClick={state => this.props.getCo(this.state)}
                        data-tip="View on Map"
                        >
                        <IoIosMap size="3em" color="white" />
                    </button>
                </div>
                {
                    this.state.isModalOpen && 
                        <HomeRentDetailsModal 
                            closeModal={this.handleModalClose}
                            homeImages={this.state.homeImages}
                            homeDetails={this.props.homeAdDetails}
                        />}
            </div>
        )
    }
}

export default HomeRentCard;
