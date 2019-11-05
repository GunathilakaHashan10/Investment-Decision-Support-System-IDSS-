import React, { Component } from 'react';
import ReactLoading from 'react-loading';
import JwtDecode from 'jwt-decode';
import axios from 'axios';
import { TiMediaStop } from 'react-icons/ti';
import modalStyles from '../../../assets/css/RealEstate/MessageBoxModal/MessageBoxModal.css';
import ErrorMessageModal from '../../Utils/ErrorMessageModal/ErrorMessageModal';


class MessageBoxModal extends Component {
    state = {
        cardImage: this.props.cardImage,
        adType:  this.props.adType,
        location: this.props.location,
        publisherName: `${this.props.publisherDetails.firstName} ${this.props.publisherDetails.lastName}`,
        message: null,
        response: null,
        messageError: null,
        isErrors: false,
        error: null,
        errorModalOpen: false,
        isLoading: false,
        isSuccess: false
    }

    handleOnChange = (e) => {
        const { name, value } = e.target;
        this.setState({ 
            [name]: value,
            isErrors: false,
            isSuccess: false
         })

        if (value.length < 20) {
            this.setState({messageError: "minimum 20 characaters required"});
        } else {
            this.setState({messageError: null});
        }
    }

    handleCloseErrorModal = () => {
        this.setState({ errorModalOpen: false });
    }

    handleSubmit = () => {
        const { message, messageError } = this.state;
        if(message === null) {
            return this.setState({ 
                messageError: "Message is empty",
                isErrors: true
            })
        } else if(messageError !== null) {
            return this.setState({ 
                isErrors: true 
            })
        } else {
        this.setState({isLoading: true });
        const token = localStorage.getItem('token');
        const decodedToken = JwtDecode(token);
        const senderId = decodedToken.userId;
        const publisherId = this.props.publisherDetails._id;
        const adId = this.props.adId;
        const adVersion = this.props.adVersion;
        const date = new Date();

        const formData = new FormData();
        formData.append('senderId', senderId);
        formData.append('publisherId', publisherId);
        formData.append('adId', adId);
        formData.append('adVersion', adVersion);
        formData.append('date', date);
        formData.append('message', message);
        
        axios.post('http://localhost:5000/contact/sendMessage', formData)
            .then(response => {
                this.setState({
                    response: response.data.message,
                    isLoading: false,
                    isSuccess: response.data.success
                })
            })
            .catch(error => {
               this.setState({ 
                   error: error.message,
                   errorModalOpen: true
                })
            })
        }
    }

    render(){
        const {cardImage, adType, location, publisherName, errorModalOpen, isErrors, messageError, isLoading, isSuccess } = this.state;
        return(
            <div className={modalStyles.modal}>
                <div className={modalStyles.modal_container}>
                    <h2 className={modalStyles.advertiser_name}>{`Advertiser - ${publisherName}`}</h2>
                    <div className={modalStyles.advertisment_container}>
                        <span className={modalStyles.advertisment_annotation}>Advertisment</span>
                    </div>
                    <div className={modalStyles.advertisment_card}>
                        <div className={modalStyles.image_container}>
                            <img src={`http://localhost:5000/${cardImage}`} alt="ad_Image" className={modalStyles.image_thumbanail}/>
                        </div>
                        <div className={modalStyles.details_container}>
                            <div className={modalStyles.detail_sub_container}>
                                <span className={modalStyles.icon}><TiMediaStop size="1em" color="#615f5f79"/></span>
                                <span className={modalStyles.detail}>{adType}</span>
                            </div>
                            <div className={modalStyles.detail_sub_container}>
                                <span className={modalStyles.icon}><TiMediaStop size="1em" color="#615f5f79"/></span>
                                <span className={modalStyles.detail}>{location}</span>
                            </div>
                        </div>
                    </div>
                    <div className={modalStyles.advertisment_container}>
                        <span className={modalStyles.advertisment_annotation}>Message</span>
                    </div>
                    {isErrors && <span id={modalStyles.error_message}>{messageError}</span>}
                    {isSuccess &&  <span id={modalStyles.success_message}>Message sent</span>}
                    <textarea 
                        id={isErrors ? modalStyles.testarea_error : isSuccess ? modalStyles.testarea_error_success : modalStyles.textarea}
                        placeholder={"Type your message here"}
                        name="message"
                        onChange={this.handleOnChange}
                    />
                    <div className={modalStyles.button_container}>
                        <button
                            onClick={this.handleSubmit}
                        >
                        {isLoading ? <ReactLoading type={'spin'} color={'white'} height={'15%'} width={'15%'} /> : "Send"}
                        </button>
                        <button
                            onClick={this.props.closeModal}
                        >
                        Cancel
                        </button>
                    </div>
                </div>
                { errorModalOpen && 
                        <ErrorMessageModal 
                            closeModal={this.handleCloseErrorModal}
                            error={this.state.error}    
                        />}
            </div>
        )
    }
}

export default MessageBoxModal;