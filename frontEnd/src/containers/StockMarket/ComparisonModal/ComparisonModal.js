import React, { Component } from 'react';
import { IoIosCloseCircleOutline } from 'react-icons/io';

import CalculateSlope from './CalculateSlope/CalculateSlope';
import CalculateExpectedReturn from './CalculateExpectedReturn/CalculateExpectedReturn';
import modalStyles from '../../../assets/css/StockMarket/ComparisonModal/ComparisonModal.css';

class ComparisonModal extends Component {
    state = {
        showClaculateSlope: true,
        showCalculateExpectedReturn: false
    }

    handleshowClaculateSlope = () => {
        this.setState({ 
            showClaculateSlope: true,
            showCalculateExpectedReturn: false 
        });
    }

    handelCalculateExpectedReturn = () => {
        this.setState({ 
            showClaculateSlope: false,
            showCalculateExpectedReturn: true
            
        });
    }




    render() {
        const { showClaculateSlope, showCalculateExpectedReturn } = this.state;
        return(
            <div className={modalStyles.modal}>
                <div className={modalStyles.modal_container}>
                    <div className={modalStyles.select_button_container}>
                        <button     
                            className={ showClaculateSlope ? modalStyles.select_button_active :modalStyles.select_button}
                            onClick={this.handleshowClaculateSlope}
                        >Calculate Slope
                        </button>
                        <button 
                            className={ showCalculateExpectedReturn ? modalStyles.select_button_active :modalStyles.select_button}
                            onClick={this.handelCalculateExpectedReturn}
                        >Calculate Expected Return
                        </button>
                    </div>
                    {showClaculateSlope && <CalculateSlope />}
                    {showCalculateExpectedReturn && <CalculateExpectedReturn />}
                    
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