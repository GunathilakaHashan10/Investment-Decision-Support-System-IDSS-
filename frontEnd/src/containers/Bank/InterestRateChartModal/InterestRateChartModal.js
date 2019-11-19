import React, { Component } from 'react';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import modalStyles from '../../../assets/css/Bank/InterestRateChartModal/InterestRateChartModal.css';
import { Bar }from 'react-chartjs-2'
import axios from 'axios'

class InterestRateChartModal extends Component {
    state = {
        labels : [],
        datasets: [],
        banks:[]
    }

    options = {
        responsive: true,
        legend: {
          position: "left"
        },
        title: {
          display: true,
          text: "Chart.js Bar Chart"
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
    }

    componentDidMount() {
        axios({
            method: 'POST',
            url: `http://localhost:5000/get-bank-ir?id=${this.props.bankId}`,
            headers:{
              'Content-Type': 'application/json'
            }
        }).then((response) => {
                const interestRates = response.data.payload.interestRates
                const terms = interestRates.map((interestRate) => interestRate.term )
                const data = interestRates.map((interestRate) =>interestRate.maturity )
                this.setState(() => ({
                    labels: terms,
                    datasets: [{
                        label: this.props.bankName,
                        backgroundColor: "brown",
                        borderColor: "red",
                        borderWidth: 1,
                        data
                    }]
                }));
        }).catch(e => {
            console.log(e);                                      
        });
        
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

    compareBankHandler = (e)  => {
        const bankId = e.target.value
        if(bankId) {
            axios({
                method: 'POST',
                url: `http://localhost:5000/get-bank-ir?id=${bankId}`,
                headers:{
                  'Content-Type': 'application/json'
                }
            }).then((response) => {
                    const { interestRates, bankName } = response.data.payload
                    const data = interestRates.map((interestRate) =>interestRate.maturity )
                    const datasets = [ ...this.state.datasets ]
                    datasets[1] = {
                        label: bankName,
                        backgroundColor: "yellow",
                        borderColor: "red",
                        borderWidth: 1,
                        data
                    }
                    this.setState(() => ({
                        datasets
                    }))
            }).catch(e => {
                console.log(e);                                      
            });
        } else {
            const datasets = [ ...this.state.datasets ]
            datasets.pop()
            this.setState(() => ({
                datasets
            }))
        }
    }


    render() {
        return(
            <div className={modalStyles.modal}>
                <div className={modalStyles.modal_container}>
                    <h2 className={modalStyles.bank_name}>Interest Rates of {this.props.bankName}</h2>
                    <div className={modalStyles.compare_selection_container}>
                        <div className={modalStyles.label_container}>
                            <span className={modalStyles.label}>Compare with</span>
                            <span>:</span>
                        </div>
                        <select 
                            className={modalStyles.bank_selection}
                            onChange={this.compareBankHandler}
                        >
                            <option value="">-Select Bank-</option>
                            {
                                this.state.banks.map((bank) => 
                                    <option key={bank.bankId} value={bank.bankId}>{bank.bankName}</option>
                                )
                            }
                        </select>
                    </div>
                    <div className={modalStyles.chart_container}>
                        <Bar
                            data={{
                                labels : this.state.labels,
                                datasets : this.state.datasets
                            }}
                            width={100}
                            height={50}
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

export default InterestRateChartModal;