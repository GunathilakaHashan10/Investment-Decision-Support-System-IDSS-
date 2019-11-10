import React, { Component } from 'react';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import modalStyles from '../../../assets/css/Bank/AERCalculatorModal/AERCalculatorModal.css';

import axios from 'axios';

import { interestRateFinder, AERCalculator } from '../Utils/Calculation';

class AERCalculatorModal extends Component {
    state = {
        selectBankId: '',
        interestRates: [],
        selectInterestRateId: '',
        AER: 0.00,
        formErrors: {
            selectBankId:'',
            selectInterestRateId: '',
        },
        isFormErrors: false
    }

    selectBankHandler = (e) => {
        const selectBankId = e.target.value;
        if(selectBankId){
            this.setState(() => ({
                selectBankId
            }))
            axios({
                method: 'POST',
                url: `http://localhost:5000/get-bank-ir?id=${selectBankId}`,
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
    } 

    selectInterestRateHandler = (e) => {
        const selectInterestRateId = e.target.value;
        this.setState(() => ({
            selectInterestRateId
        }));
    }

    calculateHandler = () => {
        const formErrors = this.state.formErrors
        if (!document.getElementById('bank-selector').value) {
            formErrors.selectBankId = 'select a bank is required'
        } else {
            formErrors.selectBankId = ''
        }
        
        if(!document.getElementById('ir-selector').value) {
            formErrors.selectInterestRateId = 'select a term is required'
        } else {
            formErrors.selectInterestRateId = ''
        }
        
        if(formErrors.selectBankId || formErrors.selectInterestRateId) {
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
            const AER = AERCalculator(maturity/100, 12/time);
            this.setState(() => ({
                AER
            }))
        } 
    }

    render() {
        const isFormErrors = this.state.isFormErrors
        const formErrors = { ... this.state.formErrors }
        return (
            <div className={modalStyles.modal}>
                <div className={modalStyles.modal_container}>
                    <h2>AER Calculator</h2>
                    <div className={modalStyles.input_container}>
                        <span className={modalStyles.input_header}>Bank: </span>
                        <select 
                            className={modalStyles.select}
                            onChange={this.selectBankHandler}
                            id="bank-selector"
                        >
                            <option value="" >Select Bank</option>
                            {
                                this.props.banks.map((bank) => (
                                    <option  key={bank.bankId} value={bank.bankId}>{bank.bankName}</option>
                                ))
                            }
                        </select>
                    </div>
                    {isFormErrors && formErrors.selectBankId.length > 0 ? <span className={modalStyles.form_errors}>{formErrors.selectBankId}</span> : ""}
                    <div className={modalStyles.input_container}>
                        <span className={modalStyles.input_header}>Term: </span>
                        <select 
                            className={modalStyles.select}
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
                    {isFormErrors && formErrors.selectInterestRateId.length > 0 ? <span className={modalStyles.form_errors}>{formErrors.selectInterestRateId}</span> : ""}
                    <button 
                        className={modalStyles.calculate_button}
                        onClick={this.calculateHandler}
                    >
                        Calculate
                    </button>
                    <div className={modalStyles.aer_value}>
                        <span className={modalStyles.aer}>AER: </span>
                        <span className={modalStyles.value}>{this.state.AER.toFixed(2)}</span>
                    </div>
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

export default AERCalculatorModal;