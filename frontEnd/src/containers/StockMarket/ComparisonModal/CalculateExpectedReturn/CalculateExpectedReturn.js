import React, { Component } from 'react';
import ReactTooltip from 'react-tooltip';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import ReactLoading from 'react-loading';
import "react-datepicker/dist/react-datepicker-cssmodules.css";
import styles from '../../../../assets/css/StockMarket/CalculateExpectedReturn/CalculateExpectedReturn.css';
import ListOfExpectedReturn from '../CalculateExpectedReturn/ListOfExpectedReturn';


class CalculateExpectedReturn extends Component {
    state = {
        company: [],
        startDate: null,
        endDate: null,
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
        isLoading02: false
        
    }

    componentWillMount() {
        axios.get("http://localhost:5000/shares") 
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
                console.log(this.state.companyId);
            })
            .catch(error => {
                console.log(error);
            })

        axios.get("http://localhost:5000/getDates")
            .then(response => {
                let investmentEndDate = new Date(response.data.endDate);
                let investment_year = investmentEndDate.getFullYear();
                let investment_month = investmentEndDate.getMonth();
                let investment_day  = investmentEndDate.getDate();
            
                this.setState({
                    startDate: new Date(response.data.endDate),
                    endDate: new Date(investment_year + 1, investment_month, investment_day),
                    specificStartDate: new Date(response.data.endDate),
                    specificEndDate: new Date(investment_year + 1, investment_month, investment_day)
                })
            })
            .catch(error => {
                console.log(error);
            });
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

            axios.post("http://localhost:5000/getExpectedReturn", formData)
                .then(response => {
                    this.setState({ 
                        expectedReturn: response.data.expectedReturn.toFixed(2),
                        isLoading:false
                    })
                })
                .catch(error => {
                    console.log(error);
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

            axios.post("http://localhost:5000/getExpectedReturnOfAllShares", formData)
                .then(response => {
                    this.setState({
                        expectedReturnOfShares: response.data.sort(function(a, b){return b.expectedReturn - a.expectedReturn}),
                        isLoading02: false
                    })
                })
                .catch(error => {
                    console.log(error);
                })
        }


        
    }

    render() {
        const { startDateError, endDateError, shareIdError, investmentAmountError, expectedReturn } = this.state;
        return (
            <div className={styles.container}>
                <div className={styles.input_container}>
                
                    <div 
                        className={styles.date_picker_container} 
                        data-tip={`Select a date between ${this.convert(this.state.specificStartDate)} to ${this.convert(this.state.specificEndDate)}`}
                    >
                        <span  >Investment start Date:</span>
                        <DatePicker
                            selected={this.state.startDate}
                            onChange={this.handleStartDateChange}
                            className={startDateError ? styles.date_input_error :styles.date_input}
                            minDate={this.state.startDate}
                            maxDate={this.state.endDate}
                            
                        />
                    </div>
                    <div 
                        className={styles.date_picker_container}
                        data-tip={`Select a date between ${this.convert(this.state.specificStartDate)} to ${this.convert(this.state.specificEndDate)}`}
                    >
                        <span>Return Date:</span>
                        <DatePicker
                            selected={this.state.endDate}
                            onChange={this.handleEndDateChange}
                            className={endDateError ? styles.date_input_error :styles.date_input}
                            minDate={this.state.startDate}
                            maxDate={this.state.endDate}
                        />
                    </div>
                    <ReactTooltip place="top" type={endDateError || startDateError || shareIdError ? "error" : "dark" } effect="solid"/>
                </div>

                <div className={styles.input_container}>
                    <div className={styles.date_picker_container}>
                        <span>Investment Amount:</span>
                        <input 
                            type="number" 
                            name="amount"
                            className={ investmentAmountError ? styles.input_error : styles.input}
                            required={true}
                            onChange={this.handleChangeAmount}
                            placeholder="0.00"
                            />
                    </div>
                    <div 
                        className={styles.date_picker_container}
                        data-tip={shareIdError ? `Please select a share` : ""}
                    >
                        <span>Share:</span>
                        <select 
                            className={shareIdError ? styles.price_select_error :styles.price_select} 
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
                    
                </div>
                
                <div className={styles.button_container}>
                    <button 
                        type="submit"
                        className={styles.button}
                        onClick={this.handleCalculateExpectedReturn}
                    >
                    Calculate
                    </button>
                    <button 
                        className={styles.button}
                        onClick={this.handleCalculateExpectedReturnOfAllShares}
                    >
                    Compare
                    </button>
                    {
                        (expectedReturn === null && this.state.isLoading === true) && <ReactLoading type={'spin'} color={'#006AFF'} height={'5%'} width={'5%'} />
                        
                    }
                    {
                        (expectedReturn !== null && this.state.isLoading !== true)   && (<div className={styles.expectedReturn_container}>
                            Expected Return: {this.state.expectedReturn}
                        </div>)
                    }
                    
                </div>
                <ListOfExpectedReturn expectedReturnData={this.state.expectedReturnOfShares} isLoading={this.state.isLoading02}/>
            </div>
        );
    }
}

export default CalculateExpectedReturn;


