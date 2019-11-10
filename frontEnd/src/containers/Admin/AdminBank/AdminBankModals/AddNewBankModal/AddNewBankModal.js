import React, { Component } from 'react';
import ReactLoading from 'react-loading';
import * as myConstants from '../../../../Utils/Constants/Constants';
import axios from 'axios';
import uuid from 'uuid';
import modalStyles from '../../../../../assets/css/Admin/AdminBank/AdminBankModals/AddNewBankModal/AddNewBankModal.css';
import InterestTable from '../Utils/InterestTable/InterestTable';
import ErrorMessageModal from '../../../../Utils/ErrorMessageModal/ErrorMessageModal';

class AddNewBankModal extends Component {
    state = {
        bankName: "",
        description: "",
        interestRates: [],
        bankImage: "",
        error: null,
        openErrorModal: false,
        isLoading: false,
        isSuccess: null,
        message: null,
        formErrors: {
            bankName: "",
            description: "",
            bankImage: "",
            interestRates: ""
        },
        isFormErrors: false
    }

    handelCloseErrorMessageModal = () => {
        this.setState({openErrorModal: false})
    }

    termHandler = (e, id) => {
        const interestRatesCopy = [ ...this.state.interestRates ];
        const index = interestRatesCopy.findIndex((interestRate) => (
            id === interestRate.interestRateId
        ));

        interestRatesCopy[index].term = e.target.value;
        let timeValue = 0;
        switch(e.target.value) {
            case "One Month":    timeValue = 1; break;
            case "Three Months": timeValue = 3; break;
            case "Six Months":   timeValue = 6; break;
            case "One Year":     timeValue = 12; break;
            case "Two Years":    timeValue = 24; break;
            case "Three Years":  timeValue = 36; break;
            case "Four Years":   timeValue = 48; break;
            case "Five Years":   timeValue = 60; break;
            default: break;    
        }
        interestRatesCopy[index].time = timeValue;
        
        this.setState(() => ({
            interestRates: interestRatesCopy
        }));
    }

    monthlyHandler = (e, id) => {
        const interestRatesCopy = [ ...this.state.interestRates ];
        const index = interestRatesCopy.findIndex((interestRate) => (
            id === interestRate.interestRateId
        ));

        interestRatesCopy[index].monthly = e.target.value;
        
        this.setState(() => ({
            interestRates: interestRatesCopy
        }));
    }

    annualyHandler = (e, id) => {
        const interestRatesCopy = [ ...this.state.interestRates ];
        const index = interestRatesCopy.findIndex((interestRate) => (
            id === interestRate.interestRateId
        ));

        interestRatesCopy[index].annualy = e.target.value;
        
        this.setState(() => ({
            interestRates: interestRatesCopy
        }));
    }

    maturityHandler = (e, id) => {
        const interestRatesCopy = [ ...this.state.interestRates ];
        const index = interestRatesCopy.findIndex((interestRate) => (
            id === interestRate.interestRateId
        ));

        interestRatesCopy[index].maturity = e.target.value;
        
        this.setState(() => ({
            interestRates: interestRatesCopy
        }));
    }

    addInterestRateHandler = (e) => {
        e.preventDefault();
        this.setState((prevState) => ({
            interestRates: [
                ...prevState.interestRates,
                {
                    interestRateId: uuid(),
                    term: '',
                    monthly: 0,
                    annualy: 0,
                    maturity: 0,
                    time: 0
                }
            ]
        }))
    }

    deleteInterestRateHandler = (e, id) => {
        e.preventDefault();
        const interestRatesCopy = [ ...this.state.interestRates ];
        const index = interestRatesCopy.findIndex((interestRate) => (
            id === interestRate.interestRateId
        ));

        interestRatesCopy.splice(index,1);

        this.setState(() => ({
            interestRates: interestRatesCopy
        }));
        
    }

    

    bankNameHandler = (e) => {
        const  bankName = e.target.value;

        this.setState(() => ({
            bankName
        }))

        if(bankName.length < 6) {
                this.setState((prevState) => {
                    let formErrors = {...prevState.formErrors};
                    formErrors.bankName = "minimum 6 characaters required"
                    return { 
                        formErrors,
                        isFormErrors: true
                     }
                })
        } else {
            this.setState((prevState) => {
                let formErrors = {...prevState.formErrors};
                formErrors.bankName = ""
                return { 
                    formErrors
                 }
            })
        }
    }

    bankDescriptionHandler = (e) => {
        const  description = e.target.value;

        this.setState(() => ({
            description
        }))

        if(description.length < 10) {
            this.setState((prevState) => {
                let formErrors = {...prevState.formErrors};
                formErrors.description = "minimum 10 characaters required"
                return { 
                    formErrors,
                    isFormErrors: true
                }
            })
        } else {
            this.setState((prevState) => {
                let formErrors = {...prevState.formErrors};
                formErrors.description = ""
                return { 
                    formErrors
                 }
            })
        }
    }

    bankImageOnChangeHandler = (e) => {
        this.setState({
            [e.target.name]:e.target.files,
            isFormErrors: false
        })

    }

    bankDataSubmitHandler = () => {
        const { interestRates, bankImage, bankName, description} = this.state;
        const formErrors = {...this.state.formErrors};

        if(interestRates.length === 0) {
            formErrors.interestRates = "No interestRates provided"
        } else if (interestRates.length < 8) {
            formErrors.interestRates = "minimum 8 terms required"
        } else {
            formErrors.interestRates = ""
        }

        if(bankImage.length === 0) {
            formErrors.bankImage = "No bank image provided";
        } else {
            formErrors.bankImage = "";
        }

        if(bankName.length === 0) {
            formErrors.bankName = "Bank name is required"
        } else if (bankName.length < 6) {
            formErrors.bankName = "minimum 6 characaters required"
        } else {
            formErrors.bankName = ""
        }

        if(description.length === 0) {
            formErrors.description = "Bank description is required"
        } else if (description.length < 10) {
            formErrors.description = "minimum 10 characaters required"
        } else {
            formErrors.description = ""
        }

        if( formErrors.description || formErrors.interestRates || formErrors.bankImage || formErrors.bankName) {
            this.setState(() => ({
                formErrors,
                isFormErrors: true
            }))
        } else {
            this.setState(() => {
                return {
                    formErrors,
                    isFormErrors: false
                }
            })
            this.sendAddBankAxio(bankImage, bankName, description, interestRates)
        }


////////////////////////////////////
        // if(interestRates.length === 0) {
        //     this.setState((prevState) => {
        //         let formErrors = {...prevState.formErrors};
        //         formErrors.interestRates = "No interestRates provided";
        //         return { formErrors }
        //     })
        //     this.setState({isFormErrors: true})
        // } else if(interestRates.length < 8) {
        //     this.setState((prevState) => {
        //         let formErrors = {...prevState.formErrors};
        //         formErrors.interestRates = "minimum 8 terms required";
        //         return { formErrors }
        //     })
        //     this.setState({isFormErrors: true})
        // } else if (interestRates.length > 8) {
        //     this.setState((prevState) => {
        //         let formErrors = {...prevState.formErrors};
        //         formErrors.interestRates = "";
        //         return { formErrors }
        //     })
        //     this.setState({isFormErrors: true})
        // }

        // if(bankImage.length === 0) {
        //     this.setState((prevState) => {
        //         let formErrors = {...prevState.formErrors};
        //         formErrors.bankImage = "No bank image provided";
        //         return { formErrors }
        //     })
        //     this.setState({isFormErrors: true})
        // } else {
        //     this.setState((prevState) => {
        //         let formErrors = {...prevState.formErrors};
        //         formErrors.bankImage = "";
        //         return { formErrors }
        //     })
            
        // }

        // if(bankName.length === 0) {
        //     this.setState((prevState) => {
        //         let formErrors = {...prevState.formErrors};
        //         formErrors.bankName = "Bank name is required"
        //         return {  formErrors }
        //     })
        //     this.setState({isFormErrors: true})
        // }

        // if(description.length === 0) {
        //     this.setState((prevState) => {
        //         let formErrors = {...prevState.formErrors};
        //         formErrors.description = "Bank description is required"
        //         return {  formErrors }
        //     })
        //     this.setState({isFormErrors: true})
        // }

        // if(!(formErrors.bankName !== "") || (formErrors.description !== "") || (formErrors.bankImage !== "") || (formErrors.interestRates !== "")) {
        //    return this.setState({isFormErrors: true})
        // } 
        
//         if(!isFormErrors) {

//             this.setState({isLoading: true})
//             let id = uuid();
//             const formData = new FormData();
//             formData.append('id',id);
//             for(let i=0; i<bankImage.length; i++){
//                 formData.append("adsImages", bankImage[i]);
//             }
            
//             const bankData = {
//                 bankId:id,
//                 bankName:bankName,
//                 description:description,
//                 interestRates:interestRates
//             }
            
    
//             axios.post(`${myConstants.SEVER_URL}/admin/addBankNew`, {
//                     data:bankData
//                 })
//                  .then(response => {
//                     setTimeout(() => {
//                         this.setState({
//                             isLoading: false,
//                             isSuccess: response.data.success,
//                             message: response.data.message
//                         });
//                         if(response.data.success){
//                             axios.post(`${myConstants.SEVER_URL}/admin/addBankImage?pathName=bankImages`, formData)
//                                 .then(res => {
//                                     console.log(res.data)
//                                 })
//                                 .catch(error => {
//                                     this.setState({
//                                         isLoading: false,
//                                         error: error.message,
//                                         openErrorModal: true
//                                     })
//                                 })
//                         }
//                     }, 1500);
    
//                 })
//                 .catch(error => {
//                     this.setState({
//                         isLoading: false,
//                         error: error.message,
//                         openErrorModal: true
//                     })
//                 })
//         } 
}

sendAddBankAxio( bankImage, bankName, description, interestRates ) {
    this.setState({isLoading: true})
            let id = uuid();
            const formData = new FormData();
            formData.append('id',id);
            for(let i=0; i<bankImage.length; i++){
                formData.append("adsImages", bankImage[i]);
            }
            
            const bankData = {
                bankId:id,
                bankName:bankName,
                description:description,
                interestRates:interestRates
            }
            
    
            axios.post(`${myConstants.SEVER_URL}/admin/addBankNew`, {
                    data:bankData
                })
                 .then(response => {
                    setTimeout(() => {
                        this.setState({
                            isLoading: false,
                            isSuccess: response.data.success,
                            message: response.data.message
                        });
                        if(response.data.success){
                            axios.post(`${myConstants.SEVER_URL}/admin/addBankImage?pathName=bankImages`, formData)
                                .then(res => {
                                    console.log(res.data)
                                })
                                .catch(error => {
                                    this.setState({
                                        isLoading: false,
                                        error: error.message,
                                        openErrorModal: true
                                    })
                                })
                        }
                    }, 1500);
    
                })
                .catch(error => {
                    this.setState({
                        isLoading: false,
                        error: error.message,
                        openErrorModal: true
                    })
                })
}

    render() {
        const {isSuccess, isLoading, openErrorModal, message, isFormErrors} = this.state;
        const formErrors = {...this.state.formErrors}
        let content = null;
        if(isSuccess === null) {
            content = (
                <div className={modalStyles.modal}>
                <div className={modalStyles.modal_container}>
                    <div className={modalStyles.addNewBank_container}>
                        <h2 className={modalStyles.add_bank_header}>Add new bank</h2>
                        {isFormErrors && formErrors.bankName.length > 0 ? <span className={modalStyles.form_errors}>{formErrors.bankName}</span> : ""}
                        <div className={modalStyles.bank_details_container}>
                            <span className={modalStyles.label_container}>
                                <span>Bank Name</span>
                                <span>:</span>
                            </span>
                            <input className={modalStyles.bank_data} type="text" name="bankName" onChange={this.bankNameHandler}/>
                        </div>
                        {isFormErrors && formErrors.description.length > 0 ? <span className={modalStyles.form_errors}>{formErrors.description}</span> : ""}
                        <div className={modalStyles.bank_details_container}>
                            <span className={modalStyles.label_container}>
                                <span>Description</span>
                                <span>:</span>
                            </span>
                            <textarea className={modalStyles.bank_data_text_area} type="text" name="description" onChange={this.bankDescriptionHandler}/>
                        </div>
                    </div>

                    {isFormErrors && formErrors.bankImage.length > 0 ? <span className={modalStyles.form_errors}>{formErrors.bankImage}</span> : ""}
                    <div className={modalStyles.bank_details_container}>
                        <span className={modalStyles.label_container}>
                            <span>Bank image</span>
                            <span>:</span>
                        </span>
                        <input 
                            type="file" 
                            multiple={true} 
                            className={modalStyles.bank_data} 
                            name="bankImage" 
                            onChange={this.bankImageOnChangeHandler} 
                            accept="image/*"
                            />
                    </div>
                    {isFormErrors && formErrors.interestRates.length > 0 ? <span className={modalStyles.form_errors}>{formErrors.interestRates}</span> : ""}
                    <InterestTable 
                        interestRates={this.state.interestRates}
                        termHandler={this.termHandler}
                        monthlyHandler={this.monthlyHandler}
                        annualyHandler={this.annualyHandler}
                        maturityHandler={this.maturityHandler}
                        addInterestRateHandler={this.addInterestRateHandler}
                        deleteInterestRateHandler={this.deleteInterestRateHandler}
                    />
                    <div className={modalStyles.button_container}>
                        <button
                            onClick={this.bankDataSubmitHandler}
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
            )
        } else if (isSuccess) {
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
        } else if (!isSuccess) {
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
                {openErrorModal &&
                    <ErrorMessageModal 
                        closeModal={this.handelCloseErrorMessageModal}
                        error={this.state.error}
                    />
                }
            </div>
        )
    }
}

export default AddNewBankModal;
