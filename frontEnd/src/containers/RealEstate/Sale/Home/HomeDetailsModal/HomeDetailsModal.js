import React, { Component } from 'react';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import modalStyles from '../../../../../assets/css/RealEstate/Sale/Home/HomeDetailsModal/HomeDetailsModal.css';
import HomeGallery from '../HomeGallery/HomeGallery';
import HomeDetails from '../HomeDetails/HomeDetails';

class HomeDetailsModal extends Component {
    render() {
        return(
            <div className={modalStyles.modal}>
                <div className={modalStyles.modal_container}>
                    <HomeGallery homeImages={this.props.homeImages} />
                    <HomeDetails homeDetails={this.props.homeDetails} />
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

export default HomeDetailsModal;