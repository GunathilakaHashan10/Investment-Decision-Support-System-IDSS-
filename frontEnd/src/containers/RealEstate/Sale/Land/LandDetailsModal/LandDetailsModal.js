import React, { Component } from 'react';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import modalStyles from '../../../../../assets/css/RealEstate/Sale/Home/HomeDetailsModal/HomeDetailsModal.css';
import LandGallery from '../LandGallery/LandGallery';
import LandDetails from '../LandDetails/LandDetails';

class LandDetailsModal extends Component {
    render(){
        return(
            <div className={modalStyles.modal}>
                <div className={modalStyles.modal_container}>
                    <LandGallery landImages={this.props.landImages}/>
                    <LandDetails landDetails={this.props.landDetails}/>
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

export default LandDetailsModal;