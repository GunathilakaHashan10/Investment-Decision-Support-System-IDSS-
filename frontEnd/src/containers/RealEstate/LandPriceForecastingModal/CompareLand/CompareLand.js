import React, { Component } from 'react';
import modalStyles from '../../../../assets/css/RealEstate/LandPriceForecastingModal/LandPriceForecastingModal.css';

class CompareLand extends Component {
    state = {
        price: 0,
        perchNo: 0,
        duration: 0,
        formErrors: {
            price: "",
            perchNo: "",
            LPI: "",
            duration: ""
        },
        isFormErrors: false,
        calculateResult: {}
    }


    onChangeHandler = (e) => {
        this.setState({ [e.target.name]:e.target.value , isFormErrors:false});
    }

    calculateExpectedLandValue = () => {
        const { price, perchNo, duration } = this.state
        const formErrors = {...this.state.formErrors}

        if(price === 0) {
            formErrors.price = "Price is required"
        } else {
            formErrors.price = ""
        }


        if(perchNo === 0) {
            formErrors.perchNo = "No. of perches is required"
        } else {
            formErrors.perchNo = ""
        }

        if(duration === 0) {
            formErrors.duration = "Duration is required"
        } else {
            formErrors.duration = ""
        }

        if(this.props.lpiValue === "") {
            formErrors.LPI = "Please select LPI type"
        } else {
            formErrors.LPI = ""
        }


        if(formErrors.price || formErrors.perchNo || formErrors.duration || formErrors.LPI) {
            this.setState(() => ({
                formErrors,
                isFormErrors: true
            }))
        } else {
            this.setState(() => ({
                formErrors,
                isFormErrors: false
            }))

            const result = this.props.calculate(this.props.lpiValue, price, perchNo, duration)
            this.setState({calculateResult: result})
        }
    }

    render() {
        const { isFormErrors, calculateResult } = this.state
        const formErrors = {...this.state.formErrors}
        return (
            <div className={modalStyles.main_land_data_container}>
                            <div className={modalStyles.compare_input_container}>
                            
                                <div className={modalStyles.input_container_compare}>
                                    <span className={modalStyles.label_container}>
                                        <span>{`${this.props.land} price per perch (Rs.)`}</span>
                                        <span>:</span>
                                    </span>
                                    {isFormErrors && formErrors.price.length > 0 ? <span className={modalStyles.form_errors_compare}>{formErrors.price}</span> : ""}
                                    <input 
                                        type="number" 
                                        name="price"
                                        className={modalStyles.input_data}
                                        onChange={this.onChangeHandler}
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
                                    />
                                </div>
                                
                            </div>
                            <div className={modalStyles.results_container}>
                            {isFormErrors && formErrors.LPI.length > 0 ? <span className={modalStyles.form_errors_compare}>{formErrors.LPI}</span> : ""}
                                    <div className={modalStyles.input_container}>
                                        <span className={modalStyles.label_container}>
                                            <span>Total Expected value (Rs.)</span>
                                            <span>:</span>
                                        </span>
                                        <span className={modalStyles.input_data}>{calculateResult.totalExpectedValue}</span>
                                        
                                    </div>
                                    <div className={modalStyles.input_container}>
                                        <span className={modalStyles.label_container}>
                                            <span>Total Expected value per perch (Rs.)</span>
                                            <span>:</span>
                                        </span>
                                        <span className={modalStyles.input_data}>{calculateResult.totalExpectedValuePerPerch}</span>
                                    </div>

                                </div>
                                <div className={modalStyles.button_container}>
                                
                                    <button
                                        className={modalStyles.control_button}
                                        onClick={this.calculateExpectedLandValue}
                                    >
                                        Calculate
                                    </button>
                                </div>
                        </div>
        )
    }
}

export default CompareLand;
