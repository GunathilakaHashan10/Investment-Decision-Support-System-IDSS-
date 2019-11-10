import React, { Component } from 'react';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import modalStyles from '../../../assets/css/Bank/ComparisonModal/ComparisonModal.css';

import ComparisonContainer from '../ComparisonContainer/ComparisonContainer';

class ComparisonModal extends Component {
    render() {
        return (
            <div className={modalStyles.modal}>
                <div className={modalStyles.modal_container}>
                    <ComparisonContainer/>
                    <button 
                        className={modalStyles.modal_closeButton}
                        onClick={this.props.closeModal}
                    >
                    <IoIosCloseCircleOutline size="2em" color="black"/>
                    </button>
                </div>
                
            </div>
        );
    }
}

export default ComparisonModal;