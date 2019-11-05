import React, { Component } from 'react';
import JwtDecode from 'jwt-decode';
import axios from 'axios';
import { IoIosArrowRoundBack } from 'react-icons/io';
import modalStyles from '../../../../assets/css/RealEstate/Advertise/MessageInboxModal/MessageInboxModal.css';
import MessageCard from '../MessageCard/MessageCard';

class MessageInboxModal extends Component {
    state = {
        previewMessage: false,
        advertiserMessages: this.props.advertiserMessages,
        error: null

    }

    handleSwapMessage = (e,state) => {
        this.setState({ previewMessage: true });
        state.handleViewed();
        const token = localStorage.getItem('token');
        const decodedToken = JwtDecode(token);
        const pId = decodedToken.userId;
        const messageId = e.currentTarget.id;
        
        const formData = new FormData();
        formData.append('pId', pId);
        formData.append('messageId', messageId);

        axios.post('http://localhost:5000/contact/setMessageViewed', formData)
            .then(response => {
            })
            .catch(error => {
                this.setState({
                    error: error.message
                })
                
            })
        

    }

    handleBack = () => {
        this.setState({ previewMessage: false });
    }

    render() {
        const { previewMessage, advertiserMessages } = this.state;
        let modalContent = null;
        if (!previewMessage) {
            modalContent = (
                <div className={modalStyles.modal_container}>
                    <h2 className={modalStyles.sender_name}>Messages</h2>
                    <div className={modalStyles.messages_container}>
                        { advertiserMessages.map((value, index) => {
                          return ( <MessageCard 
                                handleSwapMessage={this.handleSwapMessage}
                                senderName={value.senderName}
                                message={value.message}
                                isViewed={value.isViewed}
                                key={value._id}
                                id={value._id}
                                />)
                        })}
                    
                    </div>
                    <div className={modalStyles.button_container}>
                        <button
                            onClick={this.props.closeModal}
                        >
                        Close
                        </button>
                    </div>
                </div>
            )
        } else {
            modalContent = (
                <div className={modalStyles.modal_container}>
                    <div id={modalStyles.sender_name_container}>
                        <button 
                            id={modalStyles.back_button}
                            onClick={this.handleBack}
                        >
                        <IoIosArrowRoundBack size="2em"/>
                        </button>
                        <span id={modalStyles.sender_name_in_preview}>Hashan Gunathilaka</span>
                    </div>
                    
                
                </div>
            )
        }

        return (
            <div className={modalStyles.modal}>
                {modalContent}
            </div>
        )
    }
}

export default MessageInboxModal;