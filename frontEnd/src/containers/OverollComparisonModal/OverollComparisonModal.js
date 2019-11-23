import React, { Component } from 'react';
import { IoIosCloseCircleOutline, IoIosAddCircleOutline } from 'react-icons/io';
import modalStyles from '../../assets/css/OverollComparisonModal/OverollComparisonModal.css';
import LandPriceForecasting from './LandPriceForecasting';
import StockExpectedReturnCalculator from './stockExpectedReturnCalculator';

class OverollComparisonModal extends Component {
    render() {
        return(
            <div className={modalStyles.modal}>
                <div className={modalStyles.modal_container}>
                    <h2 className={modalStyles.modal_header}>Overoll Comparison</h2>
                    <div className={modalStyles.main_container}>
                       
                        <StockExpectedReturnCalculator />
                        <LandPriceForecasting />
                       

                        <div className={modalStyles.calculator_container}>
                            <h3 className={modalStyles.sub_header}>Absolue Return - Fixed deposit</h3>

                        </div>



                    </div>
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

export default OverollComparisonModal;
