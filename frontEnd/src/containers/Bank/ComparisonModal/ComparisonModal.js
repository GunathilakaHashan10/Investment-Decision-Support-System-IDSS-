import React, { Component } from 'react';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import modalStyles from '../../../assets/css/Bank/AERCalculatorModal/AERCalculatorModal.css';

class ComparisonModal extends Component {
    render() {
        return (
            <div className={modalStyles.modal}>
                <div className={modalStyles.modal_container}>
                    <h1>ComparisonModal</h1>
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