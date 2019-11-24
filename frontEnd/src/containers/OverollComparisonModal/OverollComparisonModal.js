import React, { Component } from 'react';
import { IoIosCloseCircleOutline} from 'react-icons/io';
import modalStyles from '../../assets/css/OverollComparisonModal/OverollComparisonModal.css';
import LandPriceForecasting from './LandPriceForecasting';
import StockExpectedReturnCalculator from './stockExpectedReturnCalculator';
import BankAbsoulteReturnCalculator from './BankAbsoulteReturnCalculator';

class OverollComparisonModal extends Component {
    render() {
        return(
            <div className={modalStyles.modal}>
                <div className={modalStyles.modal_container}>
                    <h2 className={modalStyles.modal_header}>Overoll Comparison</h2>
                    <div className={modalStyles.main_container}>
                       
                        <StockExpectedReturnCalculator />
                        <LandPriceForecasting />
                        <BankAbsoulteReturnCalculator />

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
