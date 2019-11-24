import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import ReactTooltip from 'react-tooltip';
import * as myConstants from '../Utils/Constants/Constants';
import modalStyles from '../../assets/css/OverollComparisonModal/OverollComparisonModal.css';
import "react-datepicker/dist/react-datepicker-cssmodules.css";


class StockExpectedReturnCalculator extends Component {
    state = {
        company: [],
        startDate: null,
        endDate: null,
        startDateFix: null,
        endDateFix: null,
        specificStartDate:null,
        specificEndDate: null,
        startDateError: false,
        endDateError: false,
        shareId: null,
        shareIdError: false,
        investmentAmountError: false,
        investmentAmount: null,
        expectedReturn: null,
        expectedReturnOfShares: [],
        isLoading: false,
        isLoading02: false,
        error: null,
        openErrorModal: false,
        companyList: [],
        totalAmount: ""
        
    }

    handleCloseErrorModal = () => {
        this.setState({openErrorModal:false});
    }

    componentWillMount() {
        axios.get(`${myConstants.SEVER_URL}/stock/shares`) 
            .then(res => {
                if(res.status !== 200) {
                    throw new Error('Fecthing shares failed');
                }
                const shareDetails = res.data;
                
                this.setState(prevState => {
                    return {
                        company: prevState.company.concat(shareDetails),
                        companyId: shareDetails[0].shareId
                        
                    }
                })
            })
            .catch(error => {
                this.setState({
                    error:error.message,
                    openErrorModal:true
                })
            })
            

        axios.get(`${myConstants.SEVER_URL}/shareCompare/getDates`)
            .then(response => {
                let investmentEndDate = new Date(response.data.endDate);
                let investment_year = investmentEndDate.getFullYear();
                let investment_month = investmentEndDate.getMonth();
                let investment_day  = investmentEndDate.getDate();
            
                this.setState({
                    startDate: new Date(response.data.endDate),
                    startDateFix: new Date(response.data.endDate),
                    endDate: new Date(investment_year + 1, investment_month, investment_day),
                    endDateFix: new Date(investment_year + 1, investment_month, investment_day),
                    specificStartDate: new Date(response.data.endDate),
                    specificEndDate: new Date(investment_year + 1, investment_month, investment_day)
                })
            })
            .catch(error => {
                this.setState({
                    error:error.message,
                    openErrorModal:true
                })
            })
    }

    convert = (str) => {
        var date = new Date(str),
          mnth = ("0" + (date.getMonth() + 1)).slice(-2),
          day = ("0" + date.getDate()).slice(-2);
        return [date.getFullYear(), mnth, day].join("-");
    }
    
   
    handleStartDateChange = (date) => {
      this.setState({
        startDate: date,
        startDateError: false
      });
    }

    handleEndDateChange = (date) => {
      this.setState({
        endDate: date,
        endDateError: false
      });
    }

    handleSelectShare = (event) => {
        this.setState({ 
            shareId: event.target.value,
            shareIdError: false
        })
    }

    handleChangeAmount = (event) => {
        this.setState({ 
            investmentAmount: event.target.value,
            investmentAmountError: false
        });
    }

    handleCalculateExpectedReturn = () => {
        const { 
            startDate, 
            endDate, 
            specificStartDate, 
            specificEndDate, 
            shareId, 
            startDateError ,
            endDateError, 
            shareIdError, 
            investmentAmount,
            investmentAmountError} = this.state;
        
        if((specificStartDate <= startDate ) && (specificEndDate >= startDate)) {
            // console.log("valid Startdate");
        } else {
            this.setState({startDateError: true });
        }

        if((specificStartDate < endDate) && (specificEndDate >= endDate)) {
            // console.log("valid Enddate");
        } else {
            this.setState({endDateError: true });
        }

        if(shareId) {
            this.setState({ shareIdError: false });
        } else {
            this.setState({ shareIdError: true });
        }

        if(investmentAmount == null) {
            this.setState({ investmentAmountError: true });
        }

        if(startDateError | endDateError | shareIdError | investmentAmountError) {
            console.log("form Errors");
        } else {
            this.setState({isLoading: true});
            const formData = new FormData();
            formData.append('shareId', this.state.shareId);
            formData.append('startDate', this.state.startDate);
            formData.append('endDate', this.state.endDate);
            formData.append('investmentAmount', this.state.investmentAmount);

            axios.post(`${myConstants.SEVER_URL}/shareCompare/getExpectedReturn`, formData)
                .then(response => {
                    console.log(response.data.expectedReturn)
                    if(response.data.expectedReturn !== undefined) {
                        this.setState((prevState) => ({
                            expectedReturn: response.data.expectedReturn.toFixed(2),
                            isLoading:false,
                            totalAmount: parseFloat(response.data.expectedReturn.toFixed(2)) + parseFloat(prevState.investmentAmount)
                        }))  
                    }
                    
                })
                .catch(error => {
                    this.setState({
                        error:error.message,
                        openErrorModal:true
                    })
                })
        }


        
    }

    handleCalculateExpectedReturnOfAllShares = () => {
        const { 
            startDate, 
            endDate, 
            specificStartDate, 
            specificEndDate,  
            startDateError ,
            endDateError, 
            shareIdError, 
            investmentAmount,
            investmentAmountError} = this.state;
        
        if((specificStartDate <= startDate ) && (specificEndDate >= startDate)) {
            // console.log("valid Startdate");
        } else {
            this.setState({startDateError: true });
        }

        if((specificStartDate < endDate) && (specificEndDate >= endDate)) {
            // console.log("valid Enddate");
        } else {
            this.setState({endDateError: true });
        }

        // if(shareId) {
        //     this.setState({ shareIdError: false });
        // } else {
        //     this.setState({ shareIdError: true });
        // }

        if(investmentAmount == null) {
            this.setState({ investmentAmountError: true });
        }

        if(startDateError | endDateError | shareIdError | investmentAmountError) {
            console.log("form Errors");
        } else {
            this.setState({isLoading02: true});
            const formData = new FormData();
            formData.append('startDate', this.state.startDate);
            formData.append('endDate', this.state.endDate);
            formData.append('investmentAmount', this.state.investmentAmount);

            axios.post(`${myConstants.SEVER_URL}/shareCompare/getExpectedReturnOfAllShares`, formData)
                .then(response => {
                    this.setState({
                        expectedReturnOfShares: response.data.sort(function(a, b){return b.expectedReturn - a.expectedReturn}),
                        isLoading02: false
                    })
                    
                })
                .catch(error => {
                    this.setState({
                        error:error.message,
                        openErrorModal:true
                    })
                })
        }


        
    }
    render () {
        const { startDateError, endDateError, shareIdError, investmentAmountError, expectedReturn, totalAmount} = this.state;
        return (
            <div className={modalStyles.calculator_container}>
                <h3 className={modalStyles.sub_header}>Calculate Expected Return - Stock market</h3>
                <div 
                    className={modalStyles.input_container}
                    data-tip={`Select a date between ${this.convert(this.state.specificStartDate)} to ${this.convert(this.state.specificEndDate)}`}
                >
                    <span className={modalStyles.label_container}>
                        <span>Investment start Date</span>
                        <span>:</span>
                    </span>
                    <DatePicker
                        selected={this.state.startDate}
                        onChange={this.handleStartDateChange}
                        className={startDateError ? modalStyles.date_input_error :modalStyles.date_input}
                        minDate={this.state.startDateFix}
                        maxDate={this.state.endDateFix}
                        
                    />
                </div>
                <div 
                    className={modalStyles.input_container}
                    data-tip={`Select a date between ${this.convert(this.state.specificStartDate)} to ${this.convert(this.state.specificEndDate)}`}
                >
                    <span className={modalStyles.label_container}>
                        <span>Return Date</span>
                        <span>:</span>
                    </span>
                    <DatePicker
                        selected={this.state.endDate}
                        onChange={this.handleEndDateChange}
                        className={endDateError ? modalStyles.date_input_error :modalStyles.date_input}
                        minDate={this.state.startDateFix}
                        maxDate={this.state.endDateFix}
                    />
                </div>
                <ReactTooltip place="top" type={endDateError || startDateError || shareIdError ? "error" : "dark" } effect="solid"/>

                <div className={modalStyles.input_container}>
                    <span className={modalStyles.label_container}>
                        <span>Amount(Rs.)</span>
                        <span>:</span>
                    </span>
                    <input 
                        type="number" 
                        name="amount"
                        className={ investmentAmountError ? modalStyles.input_error : modalStyles.input_data}
                        required={true}
                        onChange={this.handleChangeAmount}
                        placeholder="0.00"
                        
                    />
                </div>

                <div 
                    className={modalStyles.input_container}
                    data-tip={shareIdError ? `Please select a share` : ""}
                >
                    <span className={modalStyles.label_container}>
                        <span>Company</span>
                        <span>:</span>
                    </span>
                    <select 
                        className={shareIdError ? modalStyles.price_select_error :modalStyles.price_select} 
                        onChange={this.handleSelectShare}
                    >
                        <option value="">-Select a share-</option>
                        {this.state.company.map(value => {
                            return(
                                <option 
                                    key={value.shareId}
                                    value={value.shareId}
                                >
                                {value.shareName}
                                </option>
                            );
                        })}
                    </select>
                </div>
                <div className={modalStyles.results_container}>
                    <div className={modalStyles.input_container}>
                        <span className={modalStyles.label_container}>
                            <span>Total Expected value(Rs.)</span>
                            <span>:</span>
                        </span>
                        <span className={modalStyles.input_data}>{totalAmount}</span>
                        
                    </div>
                    <div className={modalStyles.input_container}>
                        <span className={modalStyles.label_container}>
                            <span>Total Expected Return(Rs.)</span>
                            <span>:</span>
                        </span>
                        <span className={modalStyles.input_data}>{expectedReturn}</span>
                        
                    </div>

                </div>
                <div className={modalStyles.button_container}>
                    <button
                        className={modalStyles.control_button}
                        onClick={this.handleCalculateExpectedReturn}
                    >
                        Calculate
                    </button>
                </div>
            </div>
        )
    }
}

export default StockExpectedReturnCalculator;