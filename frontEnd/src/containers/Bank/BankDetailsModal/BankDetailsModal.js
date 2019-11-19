import React, { Component } from 'react';
import { IoIosCloseCircleOutline, IoIosArrowBack } from 'react-icons/io';
import modalStyles from '../../../assets/css/Bank/BankDetailsModal/BankDetailsModal.css';
import BankDetails from '../BankDetails/BankDetails';
import FixedCalculator from '../FixedCalculator/FixedCalculator';
import InterestRateChartModal from '../InterestRateChartModal/InterestRateChartModal';


class BankDetailsModal extends Component {
    state = {
        isOpenBankDetails: true,
        isOpenFixedCalculator: false,
        isOpenInterestRateChartModal: false
    }

    handleOpenBankDetails = () => {
        this.setState({ 
            isOpenBankDetails: true,
            isOpenFixedCalculator: false 
        });
    }

    handleOpenFixedCalculator = () => {
        this.setState({ 
            isOpenBankDetails: false,
            isOpenFixedCalculator: true 
        });
    }

    handleOpenInterestRateChartModal = () => {
        this.setState({
            isOpenInterestRateChartModal: true
        })
    }

    handleCloseInterestRateChartModal = () => {
        this.setState({
            isOpenInterestRateChartModal: false
        })
    }

  

    render() {
        const { isOpenBankDetails, isOpenFixedCalculator, isOpenInterestRateChartModal } = this.state;
        return (
            <div className={modalStyles.modal}>
                <div className={modalStyles.modal_container}>
                    <div className={modalStyles.button_container}>
                        { isOpenFixedCalculator && <button 
                            className={modalStyles.back_button}
                            onClick={this.handleOpenBankDetails}
                        >
                        <IoIosArrowBack size="2em" color="black"/>
                        </button>}
                        <button 
                            className={modalStyles.calculator_button}
                            onClick={this.handleOpenFixedCalculator}
                        >
                        Fixed Calculator
                        </button>
                        <button
                            className={modalStyles.chart_button}
                            onClick={this.handleOpenInterestRateChartModal}
                         >
                            chart
                    </button>
                        
                    </div>
                    { isOpenBankDetails && <BankDetails bankId={this.props.bankId}/>}
                    { isOpenFixedCalculator && <FixedCalculator bankId={this.props.bankId} />}
                    
                    <button 
                        className={modalStyles.modal_closeButton}
                        onClick={this.props.closeModal}
                    >
                    <IoIosCloseCircleOutline size="2em" color="black"/>
                    </button>
                    
                </div>
               {isOpenInterestRateChartModal && 
                    <InterestRateChartModal 
                        closeModal={this.handleCloseInterestRateChartModal}
                    />
                }
            </div>
        );
    }
}

export default BankDetailsModal;