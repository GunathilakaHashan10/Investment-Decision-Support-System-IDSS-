import React, { Component } from 'react';
import axios from 'axios';
import modalStyles from '../../../../assets/css/RealEstate/Advertise/AdsUpdateModal/AdsUpdateModal.css';
import MessageModal from '../../../Utils/MessageModal/MessageModal';

class AdsUpdateModal extends Component {
    state = {
        price: this.props.adDetails.price,
        propertyDescription: this.props.adDetails.propertyDescription || this.props.adDetails.propertyDetails,
        oldPrice: this.props.adDetails.price,
        oldPropertyDescription: this.props.adDetails.propertyDescription || this.props.adDetails.propertyDetails,
        isDisabled: true,
        isOpenModal: false,
        response: null,
        adType: this.props.adType,
        adId: this.props.id,
    }

    handleOnchange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
        const {price, propertyDescription, oldPrice, oldPropertyDescription} = this.state;
        if(price !== oldPrice || propertyDescription !== oldPropertyDescription) {
            this.setState({isDisabled: false});
        } 
    }

    handleSubmit = (state) => {
        state.setLoading();
        const {price, propertyDescription, adType, adId} = this.state;
        const formData = new FormData();
        formData.append('price', price);
        formData.append('propertyDescription', propertyDescription);
        formData.append('adType', adType);
        formData.append('adId', adId);

        axios.post('http://localhost:5000/updateAd', formData)
            .then(response => {
                this.setState({
                    response: response.data.message
                })
                console.log(this.state.response)
                setTimeout(() => {
                    state.disAbleLoading();
                },2000);
            })
            .catch(error => {
                console.log(error);
            })

    }

    handleOpenModal = () => {
        this.setState({ isOpenModal: true });
    }

    handelCloseModal = () => {
        this.setState({ isOpenModal: false });
        window.location.reload();
    }

    handelCancel = () => {
        this.setState({ isOpenModal: false });
        
    }


    render() {
        const { price, propertyDescription, isDisabled, isOpenModal, response } = this.state;
        return (
            <div className={modalStyles.modal}>
                <div className={modalStyles.modal_container}>
                    <div className={modalStyles.shareUpdate_container}>
                        <h2 className={modalStyles.share_name}>Edit your ad</h2>
                        <div className={modalStyles.share_details_container}>
                    <span className={modalStyles.label_container}>
                        <span>Property Type</span>
                        <span>:</span>
                    </span>
                    <span className={modalStyles.share_data_notEditable}>{this.props.adDetails.propertyType || this.props.adDetails.landType}</span>

                </div>
                <div className={modalStyles.share_details_container}>
                    <span className={modalStyles.label_container}>
                        <span>Sell / Rent</span>
                        <span>:</span>
                    </span>
                    <span className={modalStyles.share_data_notEditable}>{this.props.adDetails.sellOrRent || "Sell"}</span>
                </div>
                <div className={modalStyles.share_details_container}>
                    <span className={modalStyles.label_container}>
                        <span>Price (Rs.)</span>
                        <span>:</span>
                    </span>
                    <input 
                        className={modalStyles.share_data} 
                        type="text" 
                        name="price" 
                        onChange={this.handleOnchange} 
                        value={price}
                    />
                </div>
                <div className={modalStyles.share_details_container}>
                    <span className={modalStyles.label_container}>
                        <span>Property Details</span>
                        <span>:</span>
                    </span>
                    <textarea 
                        className={modalStyles.share_data_textarea} 
                        type="text" 
                        name="propertyDescription" 
                        onChange={this.handleOnchange} 
                        value={propertyDescription}
                    />
                </div>
               
                
            </div>

                    <div className={modalStyles.button_container}>
                        <button
                        className={isDisabled ? modalStyles.button_disabled : modalStyles.control_button}
                        onClick={this.handleOpenModal}
                        >
                        Update
                        </button>
                        <button
                            className={modalStyles.control_button}
                            onClick={this.props.closeModal}
                            
                        >
                        Cancel
                        </button>
                    </div>
                </div>
                {isOpenModal && 
                    <MessageModal 
                        closeModal={this.handelCloseModal} 
                        response={response}
                        buttonName={"Yes! Update"}
                        message={"Are you sure?"}
                        handleOperation={this.handleSubmit}
                        handelCancel={this.handelCancel}
                    />}
            </div>
        )
    }
}

export default AdsUpdateModal;