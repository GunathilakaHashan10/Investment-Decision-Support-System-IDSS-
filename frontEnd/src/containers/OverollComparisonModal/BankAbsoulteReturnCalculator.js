import React, { Component } from 'react';
import modalStyles  from '../../assets/css/OverollComparisonModal/OverollComparisonModal.css';

class BankAbsoulteReturnCalculator extends Component {
    render() {
        return (
            <div className={modalStyles.calculator_container}>
                <h3 className={modalStyles.sub_header}>Absolue Return - Fixed deposit</h3>
                <div className={modalStyles.input_container}>
                    <span className={modalStyles.label_container}>
                        <span>Investment amount(Rs.)</span>
                        <span>:</span>
                    </span>
                    <input 
                        type="number" 
                        name="amount"
                        className={modalStyles.input_data}
                    />
                </div>
                <div className={modalStyles.input_container}>
                    <span className={modalStyles.label_container}>
                        <span>Duration(Years.)</span>
                        <span>:</span>
                    </span>
                    <input 
                        type="number" 
                        name="duration"
                        className={modalStyles.input_data}
                    />
                </div>
                <div className={modalStyles.input_container}>
                    <span className={modalStyles.label_container}>
                        <span>Bank</span>
                        <span>:</span>
                    </span>
                    <select 
                        className={modalStyles.input_data}
                        name="bank"
                        
                    >
                        <option value="">-Select-</option>
                        <option >Peoples' Bank</option>
                        <option >Commercial Bank</option>
                    </select>
                </div>
                <div className={modalStyles.input_container}>
                    <span className={modalStyles.label_container}>
                        <span>Term</span>
                        <span>:</span>
                    </span>
                    <select 
                        className={modalStyles.input_data}
                        name="bank"
                        
                    >
                        <option value="">-Select-</option>
                        <option >One Month</option>
                        <option >Three Month</option>
                    </select>
                </div>
                <div className={modalStyles.results_container}>
                    <div className={modalStyles.input_container}>
                        <span className={modalStyles.label_container}>
                            <span>Total Interest(Rs.)</span>
                            <span>:</span>
                        </span>
                        <span className={modalStyles.input_data}></span>
                        
                    </div>
                    <div className={modalStyles.input_container}>
                        <span className={modalStyles.label_container}>
                            <span>Total Expected value(Rs.)</span>
                            <span>:</span>
                        </span>
                        <span className={modalStyles.input_data}></span>
                    </div>
                </div>
                <div className={modalStyles.button_container}>
                    <button
                        className={modalStyles.control_button}
                        
                    >
                        Calculate
                    </button>
                </div>

            </div>
        )
    }
}

export default BankAbsoulteReturnCalculator;