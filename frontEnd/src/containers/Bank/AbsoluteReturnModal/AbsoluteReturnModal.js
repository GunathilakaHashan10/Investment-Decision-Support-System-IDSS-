import React, { Component } from 'react';
import { IoIosCloseCircleOutline, IoIosAddCircleOutline } from 'react-icons/io';
import modalStyles from '../../../assets/css/Bank/AbsoluteReturnModal/AbsoluteReturnModal.css';
import uuid from 'uuid'
import axios from 'axios'
import { Scatter }from 'react-chartjs-2'

import BankCard from './BankCard'

class AbsoluteReturnModal extends Component {
    state = {
        bankCards: [],
        depositAmount: '',
        depositTime:'',
        banks:[],
        disabled: false,
        datasets: [],
        error: ''
    }

    options = {
        responsive: true,
        legend: {
          position: "left"
        },
        title: {
          display: true,
          text: "Total Interest Chart"
        },
    }

    componentDidMount() {
        axios({
            method: 'POST',
            url: 'http://localhost:5000/get-banks-names',
            headers:{
              'Content-Type': 'application/json'
            }
          }).then((response) => {
                const banks = response.data.payload
                this.setState(() => ({
                    banks
                }));
          }).catch(e => {
            console.log(e);
          });
    }

    handleInsertBankCard = () => {
        if(!(this.state.depositAmount && this.state.depositTime)) {
            this.setState(() => ({
                error: 'Plese fill above fields'
            }))
            return
        } else {
            this.setState(() => ({
                error: '',
                disabled: true
            }))
        }
        if(this.state.bankCards.length < 3) {
            this.setState((prevState) => ({
                error: '',
                bankCards: [ ...prevState.bankCards, {
                    id: uuid(),
                    chart: {}
                } ]
            }))
        } else {
            this.setState(() => ({
                error: 'Only 3 cards can be compared'
            }))    
        }
    }

    handleDeletBankCard = (id) => {
        const bankCards = [ ...this.state.bankCards ].filter((bankCard) => (bankCard.id !== id))
        const datasets = bankCards.map((bankCard,index) => {
            let borderColor = ''
            if(index === 0){
                borderColor = "blue"
            } else if (index === 1){
                borderColor = "red"
            } else {
                borderColor = "green"
            }
            return ({
                id,
                label: bankCard.chart.bankName,
                borderColor,
                showLine: true,
                data: bankCard.chart.data,
                fill: false
            })
        })
        this.setState(() => ({
            bankCards,
            datasets,
        }))

        if(bankCards.length === 0){
            this.setState(() => ({
                disabled: false
            }))
        }
    }

    depositAmountHandler = (e) => {
        const depositAmount = e.target.value
        this.setState(() => ({
            depositAmount
        }))
    }

    depositTimeHandler = (e) => {
        const depositTime = e.target.value
        this.setState(() => ({
            depositTime
        }))
    }

    bankChartDataController = (id, chart) =>  {
        const bankCards = [ ...this.state.bankCards ]
        const bankCardIndex = bankCards.findIndex((bankCard) => (bankCard.id === id))
        bankCards[bankCardIndex].chart = chart
        const datasets = bankCards.map((bankCard,index) => {
            let borderColor = ''
            if(index === 0){
                borderColor = "blue"
            } else if (index === 1){
                borderColor = "red"
            } else {
                borderColor = "green"
            }
            return ({
                id,
                label: bankCard.chart.bankName,
                borderColor,
                showLine: true,
                data: bankCard.chart.data,
                fill: false
            })
        })
        this.setState(() => ({
            bankCards,
            datasets,
        }))
    }

    render() {
        return (
            <div className={modalStyles.modal}>
                <div className={modalStyles.modal_container}>
                    <h2 className={modalStyles.modal_header}>Absolute Return</h2>
                    <div className={modalStyles.input_container}>
                        <div className={modalStyles.data_input}>
                            <div className={modalStyles.label_container}>
                                <span>Deposit amount</span>
                                <span>:</span>
                            </div>
                            <input 
                                type="number" 
                                className={modalStyles.input_box}
                                value={this.state.depositAmount}
                                onChange={this.depositAmountHandler}
                                disabled={this.state.disabled} 
                            />
                        </div>
                        <div className={modalStyles.data_input}>
                            <div className={modalStyles.label_container}>
                                <span >Deposit time</span>
                                <span >:</span>
                            </div>
                            <select 
                                className={modalStyles.lable_select} 
                                defaultValue={this.state.depositTime}
                                onChange={this.depositTimeHandler}
                                disabled={this.state.disabled}
                            >
                            <option value=''>-Select Time-</option>
                            <option value='1'>One Month</option>
                            <option value='3'>Three Months</option>
                            <option value='6'>Six Months</option>
                            <option value='12'>One Year</option>
                            <option value='24'>Two Years</option>
                            <option value='36'>Three Years</option>
                            <option value='48'>Four Years</option>
                            <option value='60'>Five Years</option>
                            </select>
                            
                        
                        </div>
                    </div>
                    { this.state.error && <span className={modalStyles.form_errors}>{this.state.error}</span> }
                    <div className={modalStyles.bank_container}>
                        <div className={modalStyles.addNewBank_button_container}>
                            <span className={modalStyles.add_new_bank}>Add new Bank</span>
                            <button 
                                className={modalStyles.add_new_bank_button}
                                onClick={this.handleInsertBankCard}
                            >
                                <IoIosAddCircleOutline size="2em"/>
                            </button>
                        </div>
                        <div className={modalStyles.bank_card_container}>
                            {
                                this.state.bankCards.map((bankCard) => (
                                    <BankCard 
                                        key={bankCard.id} 
                                        bankCardId={bankCard.id}
                                        handleDeletBankCard={this.handleDeletBankCard}
                                        banks={this.state.banks}
                                        depositTime={this.state.depositTime}
                                        depositAmount={this.state.depositAmount}
                                        bankChartDataController={this.bankChartDataController}
                                    />
                                ))
                            }
                        </div>
                    </div>
                    <div className={modalStyles.chart_container}>
                        <Scatter
                            data={{
                                datasets : this.state.datasets
                            }}
                            width={600}
                            height={250}
                            options={this.options}
                        />
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

export default AbsoluteReturnModal;
// <input 
//                                 type="number" 
//                                 className={modalStyles.input_box} 
//                                 placeholder="Years" 
//                                 value={this.state.depositYears}
//                                 onChange={this.depositYearsHandler}
//                                 disabled={this.state.disabled}   
//                             />

// <input 
// type="number" 
// className={modalStyles.input_box}
// placeholder="Deposit Time"
// value={this.state.depositTime}
// onChange={this.depositTimeHandler}
// disabled={this.state.disabled}   
// />
// <select
// className={modalStyles.input_box}
// onChange={this.monthYearHandler}
// defaultValue={this.state.monthsOrYears}
// >
// <option value="months">Months</option>
// <option value="years">Years</option>
// </select>