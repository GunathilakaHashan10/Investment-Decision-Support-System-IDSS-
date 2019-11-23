import React, { Component } from 'react';
import axios from 'axios';
import * as myConstants from '../Utils/Constants/Constants';
import modalStyles from '../../assets/css/OverollComparisonModal/OverollComparisonModal.css';

class LandPriceForecasting extends Component {
    state = {
        price: "",
        perchNo: "",
        LPI: "",
        duration: "",
        formErrors: {
            price: "",
            perchNo: "",
            LPI: "",
            duration: ""
        },
        isFormErrors: false,
        error: null,
        openErrorModal: false,
        lpiValue: "",
        calculateResult: {}
    }

    onChangeHandler = (e) => {
        this.setState({ [e.target.name]:e.target.value , isFormErrors:false});
    }

    onSubmitHandler = () => {
        const { price, perchNo, LPI, duration } = this.state
        const formErrors = {...this.state.formErrors}

        if(price === "") {
            formErrors.price = "Price is required"
        } else {
            formErrors.price = ""
        }


        if(perchNo === "") {
            formErrors.perchNo = "No. of perches is required"
        } else {
            formErrors.perchNo = ""
        }

        
        if(LPI.length === 0) {
            formErrors.LPI = "Please Select LPI type"
        } else {
            formErrors.LPI = ""
        }


        if(duration === "") {
            formErrors.duration = "Duration is required"
        } else {
            formErrors.duration = ""
        }

        if(formErrors.price || formErrors.perchNo || formErrors.LPI || formErrors.duration) {
            this.setState(() => ({
                formErrors,
                isFormErrors: true
            }))
        } else {
            this.setState(() => ({
                formErrors,
                isFormErrors: false
            })) 

            const formData = new FormData();
            formData.append('LPI', LPI);
            axios.post(`${myConstants.SEVER_URL}/lpi/get-lpi`, formData)
                .then(response => {
                    const result = this.calculateExpectedValue(response.data.LPIvalue, price, perchNo, duration)
                    this.setState({lpiValue:response.data.LPIvalue, calculateResult: result})
                    
                })
                .catch(error => {
                    this.setState({
                        error:error.message,
                        openErrorModal: true
                    })
                })

        }
        
    }

    calculateExpectedValue = (lpiValue, price, noOfPerches, duration) => {
        let totalPrice = price * noOfPerches;
        let newLpi = lpiValue + 100;
        let totalExpectedValue = totalPrice;
        let d = Math.round(duration)

        while( d !== 0) {
            totalExpectedValue = ( totalExpectedValue * newLpi ) / 100
            d--
        }

        return {
            totalExpectedValue: totalExpectedValue.toFixed(2),
            totalExpectedValuePerPerch: (totalExpectedValue / noOfPerches).toFixed(2)
        }
    }
    render() {
        const { isFormErrors, calculateResult } = this.state
        const formErrors = {...this.state.formErrors}
        return (
        <div className={modalStyles.calculator_container}>
            <h3 className={modalStyles.sub_header}>Land Price Forecasting Model</h3>
            {isFormErrors && formErrors.price.length > 0 ? <span className={modalStyles.form_errors}>{formErrors.price}</span> : ""}
            <div className={modalStyles.input_container}>
                <span className={modalStyles.label_container}>
                    <span>Land price per perch(Rs.)</span>
                    <span>:</span>
                </span>
                <input 
                    type="number" 
                    name="price"
                    className={modalStyles.input_data}
                    value={this.state.price}
                    onChange={this.onChangeHandler}
                    
                />
            </div>

            {isFormErrors && formErrors.perchNo.length > 0 ? <span className={modalStyles.form_errors}>{formErrors.perchNo}</span> : ""}
            <div className={modalStyles.input_container}>
                <span className={modalStyles.label_container}>
                    <span>No. of perch</span>
                    <span>:</span>
                </span>
                <input 
                    type="number" 
                    name="perchNo"
                    className={modalStyles.input_data}
                    value={this.state.perchNo}
                    onChange={this.onChangeHandler}
                    
                />
            </div>

            {isFormErrors && formErrors.LPI.length > 0 ? <span className={modalStyles.form_errors}>{formErrors.LPI}</span> : ""}
            <div className={modalStyles.input_container}>
                <span className={modalStyles.label_container}>
                    <span>LPI Type</span>
                    <span>:</span>
                </span>
                <select 
                    className={modalStyles.input_data}
                    name="LPI"
                    value={this.state.LPI}
                    onChange={this.onChangeHandler}
                    
                >
                    <option value="">-Select-</option>
                    <option value="latest">Latest</option>
                    <option value="average">Average</option>
                </select>
            </div>

            {isFormErrors && formErrors.duration.length > 0 ? <span className={modalStyles.form_errors}>{formErrors.duration}</span> : ""}
            <div className={modalStyles.input_container}>
                <span className={modalStyles.label_container}>
                    <span>Duration(years)</span>
                    <span>:</span>
                </span>
                <input 
                    type="number" 
                    name="duration"
                    className={modalStyles.input_data}
                    value={this.state.duration}
                    onChange={this.onChangeHandler}
                />
            </div>
            <div className={modalStyles.results_container}>
                <div className={modalStyles.input_container}>
                    <span className={modalStyles.label_container}>
                        <span>Total Expected value(Rs.)</span>
                        <span>:</span>
                    </span>
                    <span className={modalStyles.input_data}>{calculateResult.totalExpectedValue}</span>
                    
                </div>
                <div className={modalStyles.input_container}>
                    <span className={modalStyles.label_container}>
                        <span>Total Expected value per perch(Rs.)</span>
                        <span>:</span>
                    </span>
                    <span className={modalStyles.input_data}>{calculateResult.totalExpectedValuePerPerch}</span>
                </div>

            </div>
            <div className={modalStyles.button_container}>
                <button
                    className={modalStyles.control_button}
                    onClick={this.onSubmitHandler}
                >
                    Calculate
                </button>
            </div>

        </div>
        )
    }
}

export default LandPriceForecasting;