import React, { Component } from 'react';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import modalStyles from '../../../../../assets/css/RealEstate/Sale/Home/HomeDetailsModal/HomeDetailsModal.css';
import HomeRentGallery from '../HomeRentGallery/HomeRentGallery';
import HomeRentDetails from '../HomeRentDetails/HomeRentDetails';

class HomeRentDetailsModal extends Component {
    render() {
        return(
            <div className={modalStyles.modal}>
                <div className={modalStyles.modal_container}>
                    <HomeRentGallery homeImages={this.props.homeImages}  />
                    <HomeRentDetails homeDetails={this.props.homeDetails} />
                    <button 
                        className={modalStyles.modal_closeButton}
                        onClick={this.props.closeModal}
                    >
                    <IoIosCloseCircleOutline size="2em" color="black"/>
                    </button>
                </div>
            </div>
        )
    }
}

export default HomeRentDetailsModal;