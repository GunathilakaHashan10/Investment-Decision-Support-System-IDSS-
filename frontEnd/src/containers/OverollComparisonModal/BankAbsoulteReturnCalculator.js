import React, { Component } from 'react';
import modalStyles  from '../../assets/css/OverollComparisonModal/OverollComparisonModal.css';
import * as myConstants from '../Utils/Constants/Constants';
import axios from 'axios';

class BankAbsoulteReturnCalculator extends Component {
    state = {
        investAmount:'',
        durationTime: '',
        selectedBank:'',
        selectedTerm:'',
        banks:[],
        formErrors: {
            invesmentAmount: "",
            durationTime: "",
            selectedBank: "",
            selectedTerm: ""
        },
        isFormErrors: false,
        selectedTermDisbaled: false,
        totalInterest: '',
        totalExpectedValue:''
    }

    componentDidMount() {
        axios({
            method: 'POST',
            url: 'http://localhost:5000/get-banks-names',
            headers:{
              'Content-Type': 'application/json'
            }
          }).then((response) => {
                const banks = response.data.payload.filter((bank) => bank.bankId !== this.props.bankId )
                this.setState(() => ({
                    banks
                }));
          }).catch(e => {
            console.log(e);
          });
    }

    selectBankHandler = (e) => {
        const selectedBank = e.target.value;
        this.setState(() => ({
            selectedBank,
            formErrors: {
                invesmentAmount: "",
                durationTime: "",
                selectedBank: "",
                selectedTerm: ""
            },
            isFormErrors: false
        }))
    }

    investAmountHandler = (e) => {
        const  investAmount = e.target.value;
        this.setState(() => ({
            investAmount,
            formErrors: {
                invesmentAmount: "",
                durationTime: "",
                selectedBank: "",
                selectedTerm: ""
            },
            isFormErrors: false
        }))
    }

    durationTimeHandler = (e) => {
        const durationTime = e.target.value;
        const formErrors = { ...this.state.formErrors}
        let isFormErrors;
        if(durationTime > 5) {
            formErrors.durationTime = "Please Enter Value Below 5"
            isFormErrors= true
        }else {
            formErrors.durationTime = ""
            isFormErrors = false
        }
        this.setState(() => ({
            durationTime: Math.round(durationTime)*12,
            formErrors,
            isFormErrors,
            selectedTermDisbaled: false,
        }))
    }

    selectedTermHandler = (e) => {
        const selectedTerm = e.target.value
            this.setState(() => ({
                selectedTerm,
                formErrors: {
                    invesmentAmount: "",
                    durationTime: "",
                    selectedBank: "",
                    selectedTerm: ""
                },
                isFormErrors: false
            }))
        }


    selectedTermClickHandler = () => {
        const formErrors = { ...this.state.formErrors};
        let isFormErrors
        if(!this.state.durationTime){
            formErrors.durationTime = "fill this field before select term";
            isFormErrors = true;
            this.setState(() => ({
                formErrors,
                isFormErrors,
                selectedTermDisbaled: true
            }))
        }
    }

    calculateHandler = () => {
        const { selectedBank, selectedTerm, investAmount, durationTime, formErrors} = this.state
        let isFormErrors
        if(!durationTime) {
            formErrors.durationTime = "Duration is required"
            isFormErrors= true
        } else {
            formErrors.durationTime = ""
            isFormErrors= false
        }

        if (!investAmount) {
            formErrors.invesmentAmount = "Invesment amount is required"
            isFormErrors= true
        } else {
            formErrors.invesmentAmount = ""
            isFormErrors= false
        }

        if (!selectedTerm) {
            formErrors.selectedTerm = "Term is required"
            isFormErrors= true
        } else {
            formErrors.selectedTerm = ""
            isFormErrors= false
        }
        if (!selectedBank) {
            formErrors.selectedBank = "Bank is required"
            isFormErrors= true
        } else {
            formErrors.selectedBank = ""
            isFormErrors= false
        }

        if(!(isFormErrors || formErrors.invesmentAmount || formErrors.durationTime || formErrors.selectedBank ||formErrors.selectedTerm)){
            const formData = new FormData()
            formData.append('bankId', selectedBank)
            formData.append('Term', selectedTerm)
            formData.append('depositAmount', investAmount)
            formData.append('depositTime', durationTime)

            axios.post(`${myConstants.SEVER_URL}/get-absolute-return-chart`, formData)
            .then(response => {
                const { totalInterest, totalAmount } = response.data.payload
                this.setState(() => ({
                    totalInterest : totalInterest.toFixed(2),
                    totalExpectedValue: totalAmount.toFixed(2)
                }))
            })
            .catch(error => {
                console.log(error.message)
                // this.setState({
                //     error: error.message,
                //     openErrorModal: true
                // })
            })
        } else {
            console.log(formErrors)
            this.setState(() => ({
                formErrors,
                isFormErrors: true
            }))
        }
        
    }
    

    render() {
        const { isFormErrors, formErrors} = this.state
        return (
            <div className={modalStyles.calculator_container}>
                <h3 className={modalStyles.sub_header}>Absolue Return - Fixed deposit</h3>
                {isFormErrors && formErrors.invesmentAmount.length > 0 ? <span className={modalStyles.form_errors}>{formErrors.invesmentAmount}</span> : ""}
                <div className={modalStyles.input_container}>
                    <span className={modalStyles.label_container}>
                        <span>Investment amount(Rs.)</span>
                        <span>:</span>
                    </span>
                    <input 
                        type="number" 
                        name="amount"
                        className={modalStyles.input_data}
                        onChange={this.investAmountHandler}
                    />
                </div>
                {isFormErrors && formErrors.durationTime.length > 0 ? <span className={modalStyles.form_errors}>{formErrors.durationTime}</span> : ""}
                <div className={modalStyles.input_container}>
                    <span className={modalStyles.label_container}>
                        <span>Duration(Years.)</span>
                        <span>:</span>
                    </span>
                    <input 
                        type="number" 
                        name="duration"
                        className={modalStyles.input_data}
                        onChange={this.durationTimeHandler}
                    />
                </div>
                {isFormErrors && formErrors.selectedBank.length > 0 ? <span className={modalStyles.form_errors}>{formErrors.selectedBank}</span> : ""}
                <div className={modalStyles.input_container}>
                    <span className={modalStyles.label_container}>
                        <span>Bank</span>
                        <span>:</span>
                    </span>
                    <select 
                        className={modalStyles.input_data}
                        name="bank"
                        defaultValue={this.state.selectedBank}
                        onChange={this.selectBankHandler}
                    >
                        <option value="">-Select Bank-</option>
                       {
                           this.state.banks.map((bank) => (
                               <option key={bank.bankId} value={bank.bankId}>{bank.bankName}</option>
                           ))
                       }
                    </select>
                </div>
                {isFormErrors && formErrors.selectedTerm.length > 0 ? <span className={modalStyles.form_errors}>{formErrors.selectedTerm}</span> : ""}
                <div className={modalStyles.input_container}>
                    <span className={modalStyles.label_container}>
                        <span>Term</span>
                        <span>:</span>
                    </span>
                    <select 
                        className={modalStyles.input_data}
                        name="bank"
                        defaultValue={this.state.selectedTerm}
                        onChange={this.selectedTermHandler}
                        disabled = {this.state.selectedTermDisbaled}
                        onClick = {this.selectedTermClickHandler}
                    >
                        <option value=''>-select-</option>
                        <option value={'1 maturity'}>One Months - Maturity</option>
                        {this.state.durationTime >=3  && <option value={'3 maturity'}>Three Months - Maturity</option>}
                        {this.state.durationTime >=6  && <option value={'6 maturity'}>Six Months - Maturity</option>}
                        {this.state.durationTime >=12  && <option value={'12 monthly'}>One Years - Monthly</option>}
                        {this.state.durationTime >=12  && <option value={'12 maturity'}>One Years - Maturity</option>}
                        {!(this.state.durationTime%24)  && <option value={'24 monthly'}>Two Years - Monthly</option>}
                        {!(this.state.durationTime%24)  && <option value={'24 annualy'}>Two Years - Annualy</option>}
                        {!(this.state.durationTime%24)  && <option value={'24 maturity'}>Two Years - Maturity</option>}
                        {!(this.state.durationTime%36)  && <option value={'36 monthly'}>Three Years - Monthly</option>}
                        {!(this.state.durationTime%36)  && <option value={'36 annualy'}>Three Years - Annualy</option>}
                        {!(this.state.durationTime%36)  && <option value={'36 maturity'}>Three Years - Maturity</option>}
                        {!(this.state.durationTime%48)  && <option value={'48 monthly'}>Four Years - Monthly</option>}
                        {!(this.state.durationTime%48)  && <option value={'48 annualy'}>Four Years - Annualy</option>}
                        {!(this.state.durationTime%48)  && <option value={'48 maturity'}>Four Years - Maturity</option>}
                        {!(this.state.durationTime%60)  && <option value={'60 monthly'}>Five Years - Monthly</option>}
                        {!(this.state.durationTime%60)  && <option value={'60 annualy'}>Five Years - Annualy</option>}
                        {!(this.state.durationTime%60)  && <option value={'60 maturity'}>Five Years - Maturity</option>}
                    </select>
                </div>
                <div className={modalStyles.results_container}>
                    <div className={modalStyles.input_container}>
                        <span className={modalStyles.label_container}>
                            <span>Total Interest(Rs.)</span>
                            <span>:</span>
                        </span>
                        <span className={modalStyles.input_data}>{this.state.totalInterest}</span>
                        
                    </div>
                    <div className={modalStyles.input_container}>
                        <span className={modalStyles.label_container}>
                            <span>Total Expected value(Rs.)</span>
                            <span>:</span>
                        </span>
                        <span className={modalStyles.input_data}>{this.state.totalExpectedValue}</span>
                    </div>
                </div>
                <div className={modalStyles.button_container}>
                    <button
                        className={modalStyles.control_button}
                        onClick= {this.calculateHandler}
                    >
                        Calculate
                    </button>
                </div>

            </div>
        )
    }
}

export default BankAbsoulteReturnCalculator;