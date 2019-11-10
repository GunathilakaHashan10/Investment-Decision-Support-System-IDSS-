import React, { Component } from 'react';
import styles from '../../../assets/css/Bank/FixedCalculator/FixedCalculator.css';

import axios from 'axios';

import { interestRateFinder, returnCalculor } from '../Utils/Calculation';

class FixedCalculator extends Component {
    state = {
        interestRates: [],
        selectInterestRateId: '',
        depositAmount: '',
        irAmount:0,
        formErrors: {
            depositAmount:'',
            selectInterestRateId: '',
        },
        isFormErrors: false
    }

    componentDidMount() {
            axios({
                method: 'POST',
                url: `http://localhost:5000/get-bank-ir?id=${this.props.bankId}`,
                headers:{
                  'Content-Type': 'application/json'
                }
            }).then((response) => {
                    this.setState(() => ({
                        interestRates: response.data.payload.interestRates
                    }));
            }).catch(e => {
                console.log(e);                                      
            });   
    }

    depositAmountHandler = (e) => {
        const text=  e.target.value;
        this.setState(() => ({
            depositAmount: text
        }))
    }

    selectInterestRateHandler = (e) => {
        const selectInterestRateId = e.target.value;
        this.setState(() => ({
            selectInterestRateId
        }));
    }

    calculateHandler = () => {
        const formErrors = this.state.formErrors
        if (!document.getElementById('depositor').value) {
            formErrors.depositAmount = 'deposit amount is required'
        } else {
            formErrors.depositAmount = ''
        }
        
        if(!document.getElementById('ir-selector').value) {
            formErrors.selectInterestRateId = 'select a term is required'
        } else {
            formErrors.selectInterestRateId = ''
        }
        
        if(formErrors.depositAmount || formErrors.selectInterestRateId) {
            this.setState(() => ({
                formErrors,
                isFormErrors: true
            }))
        } else {
            this.setState(() => ({
                formErrors,
                isFormErrors: false
            }))
            const  { maturity, time } = interestRateFinder(this.state.selectInterestRateId,this.state.interestRates);
            const irAmount = returnCalculor(maturity/100, time, parseFloat(this.state.depositAmount));
            this.setState(() => ({
                irAmount
            }))
        }
    }

    render() {
        const isFormErrors = this.state.isFormErrors
        const formErrors = { ...this.state.formErrors }
        return (
            <div className={styles.container}>
                <h2 className={styles.header}>Fixed Deposit Calculator</h2>
                <div className={styles.input_container}>
                    <span className={styles.input_label}>Deposit Amount:</span>
                    <input 
                        className={styles.input}
                        type="number" 
                        name="depositAmount" 
                        required={true}
                        value={this.state.depositAmount}
                        onChange={this.depositAmountHandler}
                        id="depositor"
                    />
                </div>
                {isFormErrors && formErrors.depositAmount.length > 0 ? <span className={styles.form_errors}>{formErrors.depositAmount}</span> : ""}
                <div className={styles.input_container}>
                    <span className={styles.input_label}>Deposit Period:</span>
                    <select 
                        className={styles.select}
                        onChange={this.selectInterestRateHandler}
                        id="ir-selector"
                    >
                        <option value="" >Please select</option>
                        {
                            this.state.interestRates.map((interestRate) => (
                                <option
                                    key={interestRate.interestRateId}
                                    value={interestRate.interestRateId}
                                >
                                    {interestRate.term}
                                </option>
                            )) 
                        }
                    </select>
                </div>
                {isFormErrors && formErrors.selectInterestRateId.length > 0 ? <span className={styles.form_errors}>{formErrors.selectInterestRateId}</span> : ""}
                <button 
                    className={styles.calculate_button}
                    onClick={this.calculateHandler}
                >
                    Calculate
                </button>
                <div className={styles.interestAmount_container}>
                    <span className={styles.interestAmount_head}>Interest Amount</span>
                    <span className={styles.interestAmount}>Rs: {this.state.irAmount.toFixed(2)}</span>
                </div>
            </div>
        );
    }
}

export default FixedCalculator;