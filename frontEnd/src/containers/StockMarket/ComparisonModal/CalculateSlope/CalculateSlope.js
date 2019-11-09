import React, { Component } from 'react';
import ReactTooltip from 'react-tooltip';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker-cssmodules.css";
import * as myConstants from '../../../Utils/Constants/Constants';
import ListOfSlope from './ListOfSlope';
import styles from '../../../../assets/css/StockMarket/CalculateSlope/CalculateSlope.css';
import ErrorMessageModal from '../../../Utils/ErrorMessageModal/ErrorMessageModal';

class CalculateSlope extends Component {
        state = {
          startDate: null,
          endDate: null,
          priceType: null,
          slopeData: [],
          isLoading: false,
          error: null,
          openErrorModal: false
        }

        handleCloseErrorModal = () => {
            this.setState({openErrorModal:false});
        }
      
     
      handleStartDateChange = (date) => {
        this.setState({
          startDate: date
        });
      }

      handleEndDateChange = (date) => {
        this.setState({
          endDate: date
        });
      }

      handelOnchangePriceType = (event) => {
          this.setState({
              priceType: event.target.value
          })
      }

      componentDidMount() {
          axios.get(`${myConstants.SEVER_URL}/shareCompare/getDates`)
                .then(response => {
                    this.setState({
                        startDate: new Date(response.data.startDate),
                        endDate: new Date(response.data.endDate)
                    })
                })
                .catch(error => {
                    this.setState({
                        error:error.message,
                        openErrorModal:true
                    })
                })
      }

      handleSubmit = () => {
          this.setState({ isLoading: true})
          const formData = new FormData();
          formData.append('startDate', this.state.startDate);
          formData.append('endDate', this.state.endDate);
          formData.append('priceType', this.state.priceType);
       

          axios.post(`${myConstants.SEVER_URL}/shareCompare/getSlopeResults`, formData)
                .then(response => {
                    this.setState({
                        slopeData: response.data.sort(function(a, b){return b.slope - a.slope}),
                        isLoading: false
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


    render() {
        return (
            <div className={styles.container}>
                <div 
                    className={styles.date_picker_container}
                    data-tip={`Select a date between ${this.convert(this.state.startDate)} to ${this.convert(this.state.endDate)}`}
                >
                    <span>Start Date:</span>
                    <DatePicker
                        selected={this.state.startDate}
                        onChange={this.handleStartDateChange}
                        className={styles.date_input}
                        minDate={this.state.startDate}
                        maxDate={this.state.endDate}
                    />
                </div>
                <div 
                    className={styles.date_picker_container}
                    data-tip={`Select a date between ${this.convert(this.state.startDate)} to ${this.convert(this.state.endDate)}`}
                >
                    <span>End Date:</span>
                    <DatePicker
                        selected={this.state.endDate}
                        onChange={this.handleEndDateChange}
                        className={styles.date_input}
                        minDate={this.state.startDate}
                        maxDate={this.state.endDate}
                    />
                </div>
                <ReactTooltip place="top" type="dark" effect="solid"/>
                <div className={styles.date_picker_container}>
                    <span>Price type:</span>
                    <select className={styles.price_select} name="priceType" onChange={this.handelOnchangePriceType}>
                        <option>-type-</option>
                        <option value="open">Open</option>
                        <option value="close">Close</option>
                        <option value="high">High</option>
                        <option value="low">Low</option>
                    </select>
                </div>
                <div className={styles.button_container}>
                    <button 
                        className={styles.button} 
                        onClick={this.handleSubmit}
                    >Calculate</button>
                </div>
                <ListOfSlope slopeData={this.state.slopeData} isLoading={this.state.isLoading}/>
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

export default CalculateSlope;
