import React, { Component } from 'react';
import * as myConstants from '../../Utils/Constants/Constants';
import axios from 'axios';
import InputArea from '../InputArea/InputArea'
import CompareTable from '../CompareTable/CompareTable'
import ErrorMessageModal from '../../Utils/ErrorMessageModal/ErrorMessageModal';

class ComparisonContainer extends Component {
    state = {
        amount : '',
        sortType:'maturity',
        time : 1,
        wantInterest: false,
        error: null,
        openErrorModal: false,
        tableData: [],
        irRateTopicChange: true
    }

    componentDidMount() {
        const formData = new FormData()
        formData.append('time',this.state.time)
        formData.append('sortType',this.state.sortType)
        formData.append('amount',this.state.amount && this.state.wantInterest? this.state.amount : '')

        axios.post(`${myConstants.SEVER_URL}/compare-bank`, formData)
            .then(response => {
                this.setState(() => ({
                    tableData: response.data.payload
                }))
            })
            .catch(error => {
                this.setState({
                    error: error.message,
                    openErrorModal: true
                })
            })
    }

    handleCloseErrorModal = () => {
        this.setState({openErrorModal: false})
    }

    inputAmountHandler = (e) => {
        const amount = e.target.value
        this.setState(() => ({
            amount
        }));
    }

    inputSortHandler = (e) => {
        const sortType = e.target.value
        this.setState(() => ({
            sortType
        }))
    }

    inputTermHandler = (e) => {
        const time = e.target.value
        this.setState(() => ({
            time
        }))
    }

    inputCheckBoxHandler = (e) => {
            this.setState((preState) => {
                return {
                    wantInterest: !preState.wantInterest
                }
            })
        
    }

    calcualateButtonHandler = (e) => {
        if(this.state.wantInterest && this.state.amount) {
            this.setState(() => ({
                irRateTopicChange: false
            }))
        } else {
            this.setState(() => ({
                irRateTopicChange: true
            }))
        }

        const formData = new FormData()
        formData.append('time',this.state.time)
        formData.append('sortType',this.state.sortType)
        formData.append('amount',this.state.amount && this.state.wantInterest? this.state.amount : '')

        axios.post(`${myConstants.SEVER_URL}/compare-bank`, formData)
            .then(response => {
                this.setState(() => ({
                    tableData: response.data.payload
                }))
            })
            .catch(error => {
                this.setState({
                    error: error.message,
                    openErrorModal: true
                })
            })

    }

    render() {
        console.log(this.state.tableData)
        return (
            <div>
                <InputArea 
                    inputAmountHandler={this.inputAmountHandler}
                    inputSortHandler={this.inputSortHandler}
                    inputTermHandler={this.inputTermHandler}
                    inputCheckBoxHandler={this.inputCheckBoxHandler}
                    calcualateButtonHandler={this.calcualateButtonHandler}
                    amount={this.state.amount}
                    time={this.state.time}
                    wantInterest={this.state.wantInterest}
                />
                <h2>
                {
                    this.state.irRateTopicChange ? 'Interest Rate Table' : 'Interest Table'
                }
                </h2>
                    
                <CompareTable
                    tableData={this.state.tableData}
                    irRateTopicChange={this.state.irRateTopicChange}
                />
                {this.state.openErrorModal && 
                    <ErrorMessageModal 
                        closeModal={this.handleCloseErrorModal}
                        error={this.state.error}
                    />
                }
            </div>
        );
    }
}

export default ComparisonContainer;