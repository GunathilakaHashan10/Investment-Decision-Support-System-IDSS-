import React, { Component } from 'react';
import modalStyles from '../../../../assets/css/RealEstate/Advertise/ResultsModal/ResultsModal.css';

class MessageModal extends Component {
    state = {
        message: this.props.message
    }

    render() {
        return(
            <div className={modalStyles.modal}>
                <div className={modalStyles.modal_container}>
                     <h3>{this.state.message}</h3>
                
               
                    <button 
                    className={modalStyles.modal_closeButton}
                    onClick={this.props.closeModal}
                    >
                    ok
                    </button>
                </div>
            </div>
        )
    }
}

export default MessageModal;