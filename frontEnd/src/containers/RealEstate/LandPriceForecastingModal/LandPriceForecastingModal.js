import React, { Component } from 'react';
import axios from 'axios';
import * as myConstants from '../../Utils/Constants/Constants';
import { IoIosCloseCircleOutline, IoMdArrowRoundBack } from 'react-icons/io';
import modalStyles from '../../../assets/css/RealEstate/LandPriceForecastingModal/LandPriceForecastingModal.css';
import CompareLand from './CompareLand/CompareLand';

class LandPriceForecastingModal extends Component {
    state = {
        compareMode: false,
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

    componentSwapHandler = () => {
        this.setState((preveState) => {
            return {
                compareMode: !preveState.compareMode
            }
        })
    }

    componentDidUpdate() {
        if(this.state.LPI.length !== 0) {
            const formData = new FormData();
            formData.append('LPI', this.state.LPI);
            axios.post(`${myConstants.SEVER_URL}/lpi/get-lpi`, formData)
                .then(response => {
                    this.setState({lpiValue:response.data.LPIvalue})
                    
                })
                .catch(error => {
                    this.setState({
                        error:error.message,
                        openErrorModal: true
                    })
                })
        }
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
        const { compareMode, isFormErrors, calculateResult } = this.state
        const formErrors = {...this.state.formErrors}
        let content = null
        if(!compareMode) {
            content = (
                <div className={modalStyles.modal}>
                 <div className={modalStyles.modal_container}>
                    <h2 className={modalStyles.modal_header}>Land Price Forecasting Model</h2>
                    <div className={modalStyles.main_container}>
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
                                onChange={this.onChangeHandler}
                                value={this.state.price}
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
                                onChange={this.onChangeHandler}
                                value={this.state.perchNo}
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
                                onChange={this.onChangeHandler}
                                value={this.state.LPI}
                            >
                                <option value="">-Select-</option>
                                <option value="latest">Latest</option>
                                <option value="average">Average</option>
                            </select>
                        </div>

                        {isFormErrors && formErrors.duration.length > 0 ? <span className={modalStyles.form_errors}>{formErrors.duration}</span> : ""}
                        <div className={modalStyles.input_container}>
                            <span className={modalStyles.label_container}>
                                <span>Investment Duration(years)</span>
                                <span>:</span>
                            </span>
                            <input 
                                type="number" 
                                name="duration"
                                className={modalStyles.input_data}
                                onChange={this.onChangeHandler}
                                value={this.state.duration}
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
                            <button
                                className={modalStyles.control_button}
                                onClick={this.componentSwapHandler}
                            >
                                Compare
                            </button>
                        </div>
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
        } else {
            content = (
                <div className={modalStyles.modal}>
                    <div className={modalStyles.compare_modal_container}>
                        <div className={modalStyles.comapre_modal_heder_container}>
                            <IoMdArrowRoundBack size="2em" onClick={this.componentSwapHandler}/>
                            <h2 className={modalStyles.modal_header}>Land Price Forecasting Model - Comparison</h2>
                        </div>
                        <div className={modalStyles.LPI_type_container}>
                            <span className={modalStyles.label_container}>
                                <span>LPI Type</span>
                                <span>:</span>
                            </span>
                            <select 
                                className={modalStyles.input_data}
                                name="LPI"
                                onChange={this.onChangeHandler}
                                value={this.state.LPI}
                            >
                                <option value="">-Select-</option>
                                <option value="latest">Latest</option>
                                <option value="average">Average</option>
                            </select>
                        </div>
                        <div className={modalStyles.main_land_data_container}>
                        
                            <div className={modalStyles.compare_input_container}>
                                <div className={modalStyles.input_container_compare}>
                                
                                    <span className={modalStyles.label_container}>
                                        <span>Land price per perch(Rs.)</span>
                                        <span>:</span>
                                    </span>
                                    {isFormErrors && formErrors.price.length > 0 ? <span className={modalStyles.form_errors_compare}>{formErrors.price}</span> : ""}
                                    <input 
                                        type="number" 
                                        name="price"
                                        className={modalStyles.input_data}
                                        onChange={this.onChangeHandler}
                                        value={this.state.price}
                                    />
                                </div>

                                
                                <div className={modalStyles.input_container_compare}>
                                    <span className={modalStyles.label_container}>
                                        <span>No. of perch</span>
                                        <span>:</span>
                                    </span>
                                    {isFormErrors && formErrors.perchNo.length > 0 ? <span className={modalStyles.form_errors_compare}>{formErrors.perchNo}</span> : ""}
                                    <input 
                                        type="number" 
                                        name="perchNo"
                                        className={modalStyles.input_data}
                                        onChange={this.onChangeHandler}
                                        value={this.state.perchNo}
                                    />
                                </div>
                            </div>
                            <div className={modalStyles.compare_input_container}>
                
                                <div className={modalStyles.input_container_compare}>
                                    <span className={modalStyles.label_container}>
                                        <span>Investment Duration(years)</span>
                                        <span>:</span>
                                    </span>
                                    {isFormErrors && formErrors.duration.length > 0 ? <span className={modalStyles.form_errors_compare}>{formErrors.duration}</span> : ""}
                                    <input 
                                        type="number" 
                                        name="duration"
                                        className={modalStyles.input_data}
                                        onChange={this.onChangeHandler}
                                        value={this.state.duration}
                                    />
                                </div>
                                
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
                        <div className={modalStyles.comapre_lands_container}>
                      
                            <CompareLand 
                                calculate={this.calculateExpectedValue}
                                lpiValue={this.state.lpiValue}
                                land="Land 1"
                            />
                            <CompareLand 
                                calculate={this.calculateExpectedValue}
                                lpiValue={this.state.lpiValue}
                                land="Land 2"
                            />

                        </div>
                        <div className={modalStyles.compare_button_container}>
                            <button
                                className={modalStyles.compare_button}
                                onClick={this.componentSwapHandler}
                            >
                                Back
                            </button>
                            <button
                                className={modalStyles.compare_button}
                            >
                                Graph
                            </button>

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
        return(
            <div>
                {content}
            </div>
        )
    }
}

export default LandPriceForecastingModal;