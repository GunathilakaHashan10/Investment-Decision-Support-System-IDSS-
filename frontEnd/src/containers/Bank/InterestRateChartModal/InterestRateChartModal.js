import React, { Component } from 'react';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import modalStyles from '../../../assets/css/Bank/InterestRateChartModal/InterestRateChartModal.css';

class InterestRateChartModal extends Component {
    render() {
        return(
            <div className={modalStyles.modal}>
                <div className={modalStyles.modal_container}>
                    <h2 className={modalStyles.bank_name}>Interest Rates of Bank of Ceylon</h2>
                    <div className={modalStyles.compare_selection_container}>
                        <div className={modalStyles.label_container}>
                            <span className={modalStyles.label}>Compare with</span>
                            <span>:</span>
                        </div>
                        <select className={modalStyles.bank_selection}>
                            <option>-Select-</option>
                            <option>Bank of Ceylon</option>
                            <option>Peopels' Bank</option>
                            <option>HNB Bank</option>
                        </select>
                    </div>
                    <div className={modalStyles.chart_container}>
                        
                    
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

export default InterestRateChartModal;