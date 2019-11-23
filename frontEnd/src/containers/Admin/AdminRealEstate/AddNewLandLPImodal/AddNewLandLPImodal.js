import React, { Component } from 'react';
import ReactLoading from 'react-loading';
import axios from 'axios';
import * as myConstants from '../../../Utils/Constants/Constants';
import modalStyles from '../../../../assets/css/Admin/AdminRealEstate/AddNewLandLPImodal/AddNewLandLPImodal.css';
import ErrorMessageModal from '../../../Utils/ErrorMessageModal/ErrorMessageModal';

class AddNewLandLPImodal extends Component {
    state = {
        error: null,
        openErrorModal: false,
        isLoading: false,
        isSuccess: null,
        message: null,
        formErrors: {
            district: "",
            year: "",
            LPI_1: ""
        },
        district: "",
        year: "",
        LPI_1: 0,
        LPI_2: 0,
        isFormErrors: false
    }

    handelCloseErrorMessageModal = () =>{
        this.setState({openErrorModal: false })
    }

    onChangeHandler = (e) => {
        this.setState({ [e.target.name]:e.target.value, isFormErrors: false })
    }

    onSubmitHandler = () => {
        const { district, year, LPI_1, LPI_2 } = this.state
        const formErrors = {...this.state.formErrors}

        if(district.length === 0) {
            formErrors.district = "District is required"
        } else {
            formErrors.district = ""
        }

        if(year.length === 0) {
            formErrors.year = "Year is required"
        } else {
            formErrors.year = ""
        }

        if(LPI_1 === 0) {
            formErrors.LPI_1 = "LPI is required"
        } else {
            formErrors.LPI_1 = ""
        }

        if(formErrors.district || formErrors.year || formErrors.LPI_1) {
            this.setState(() => ({
                formErrors,
                isFormErrors: true
            }))
        } else {
            this.setState(() => ({
                formErrors,
                isFormErrors: false,
                isLoading:true
            }))
            let formData = new FormData();
    
            formData.append('district',  district);
            formData.append('year', year);
            formData.append('LPI_1', LPI_1);
            formData.append('LPI_2', LPI_2);
    
            axios.post(`${myConstants.SEVER_URL}/admin/add-new-LPI`, formData)
                .then(response => {
                    setTimeout(() => {
                        this.setState({
                            isLoading: false,
                            isSuccess: response.data.success,
                            message: response.data.message
                        });
                    },1500)
                })
                .catch(error => {
                    this.setState({
                        error:error.message,
                        openErrorModal: true
                    })
                })
        }

    }





    render(){
        const {isLoading, isSuccess, message, isFormErrors} = this.state;
        const formErrors = {...this.state.formErrors}
        let content = null
        if(isSuccess === null) {
            content = (
                <div className={modalStyles.modal}>
            <div className={modalStyles.modal_container}>
                <div className={modalStyles.main_contanier}>
                    <h2 className={modalStyles.main_header}>Add Land LPI value</h2>
                    {isFormErrors && formErrors.district.length > 0 ? <span className={modalStyles.form_errors}>{formErrors.district}</span> : ""}
                    <div className={modalStyles.input_container}>
                        <span className={modalStyles.label_container}>
                            <span>District</span>
                            <span>:</span>
                        </span>
                        <select 
                            className={modalStyles.input_data}
                            name="district"
                            onChange={this.onChangeHandler}
                        >
                            <option>-Select-</option>
                            <option value="Colombo">Colombo</option>
                        </select>
                        
                    </div>
                    {isFormErrors && formErrors.year.length > 0 ? <span className={modalStyles.form_errors}>{formErrors.year}</span> : ""}
                    <div className={modalStyles.input_container}>
                        <span className={modalStyles.label_container}>
                            <span>Year</span>
                            <span>:</span>
                        </span>
                        <input 
                            type="number" 
                            name="year"
                            className={modalStyles.input_data}
                            placeholder="2019"
                            onChange={this.onChangeHandler}
                        />
                    </div>
                    {isFormErrors && formErrors.LPI_1.length > 0 ? <span className={modalStyles.form_errors}>{formErrors.LPI_1}</span> : ""}
                    <div className={modalStyles.input_container}>
                        <span className={modalStyles.label_container}>
                            <span>LPI(1st half) %</span>
                            <span>:</span>
                        </span>
                        <input 
                            type="number" 
                            name="LPI_1"
                            className={modalStyles.input_data} 
                            placeholder="30%"
                            onChange={this.onChangeHandler}
                        />
                    </div>
                    <div className={modalStyles.input_container}>
                        <span className={modalStyles.label_container}>
                            <span>LPI(2nd half) %</span>
                            <span>:</span>
                        </span>
                        <input 
                            type="number" 
                            name="LPI_2"
                            className={modalStyles.input_data} 
                            placeholder="30%"
                            onChange={this.onChangeHandler}
                        />
                    </div>

                    <div className={modalStyles.button_container}>
                        <button
                                onClick={this.onSubmitHandler}
                                className={isLoading ? modalStyles.control_button_loading : modalStyles.control_button}
                            >
                            {isLoading 
                                ? <div className={modalStyles.loading_container}>
                                    <ReactLoading type={'spin'} color={'white'} height={'15%'} width={'15%'} /> 
                                    <span>wait..</span>
                                </div>
                                : "Add"
                            } 
                        </button>
                        <button
                            onClick={this.props.closeModal}
                            className={modalStyles.control_button}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
            )
        } else if(isSuccess) {
            content = (
                <div className={modalStyles.result_modal}>
                    <div className={modalStyles.result_modal_container}>
                        <h3 className={modalStyles.success_annotation}>{message}</h3>
                        <h4 className={modalStyles.success_message}>Added successfully</h4>
                        
                        <div className={modalStyles.button_container}>
                            <button
                                onClick={this.props.closeModal}
                                className={modalStyles.control_button}
                            >
                            Ok
                            </button>
                        </div>

                    </div>
                </div>
            )
        } else if(!isSuccess) {
            content = (
                <div className={modalStyles.result_modal}>
                    <div className={modalStyles.result_modal_container}>
                        <h3 className={modalStyles.success_annotation}>{message}</h3>
                        <h4 className={modalStyles.success_message}>Please try again sortly</h4>
                        
                        <div className={modalStyles.button_container}>
                            <button
                                onClick={this.props.closeModal}
                                className={modalStyles.control_button}
                            >
                            Ok
                            </button>
                        </div>

                    </div>
                </div>
            )
        }
        return (
            <div>
                {content}
                {this.state.openErrorModal && 
                    <ErrorMessageModal 
                        error={this.state.error}
                        closeModal={this.handelCloseErrorMessageModal}
                    />    
                }

            </div>
        )
    }
}

export default AddNewLandLPImodal;