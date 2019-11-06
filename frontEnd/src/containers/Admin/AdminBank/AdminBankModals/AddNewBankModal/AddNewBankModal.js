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
        message: null
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
            case "Two Months":   timeValue = 2; break;
            case "Three Months": timeValue = 3; break;
            case "Six Months":   timeValue = 6; break;
            case "One Year":     timeValue = 12; break;
            case "Two Years":    timeValue = 24; break;
            case "Three Years":  timeValue = 36; break;
            case "Four Years":   timeValue = 48; break;
            case "Five Years":   timeValue = 60; break;
            case "Ten Years":    timeValue = 120; break;
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
    }

    bankDescriptionHandler = (e) => {
        const  description = e.target.value;

        this.setState(() => ({
            description
        }))
    }

    bankImageOnChangeHandler = (e) => {
        this.setState({
            [e.target.name]:e.target.files
        })
    }

    bankDataSubmitHandler = () => {
        this.setState({isLoading: true})
        const {bankName, bankImage, description, interestRates} = this.state;
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
        const {isSuccess, isLoading, openErrorModal, message} = this.state;
        let content = null;
        if(isSuccess === null) {
            content = (
                <div className={modalStyles.modal}>
                <div className={modalStyles.modal_container}>
                    <div className={modalStyles.addNewBank_container}>
                        <h2 className={modalStyles.add_bank_header}>Add new bank</h2>
                        <div className={modalStyles.bank_details_container}>
                            <span className={modalStyles.label_container}>
                                <span>Bank Name</span>
                                <span>:</span>
                            </span>
                            <input className={modalStyles.bank_data} type="text" name="bankName" onChange={this.bankNameHandler}/>
                        </div>
                        <div className={modalStyles.bank_details_container}>
                            <span className={modalStyles.label_container}>
                                <span>Description</span>
                                <span>:</span>
                            </span>
                            <textarea className={modalStyles.bank_data_text_area} type="text" name="description" onChange={this.bankDescriptionHandler}/>
                        </div>
                    </div>

                    <div className={modalStyles.bank_details_container}>
                        <span className={modalStyles.label_container}>
                            <span>Bank image</span>
                            <span>:</span>
                        </span>
                        <input type="file" multiple={true} className={modalStyles.bank_data} name="bankImage" onChange={this.bankImageOnChangeHandler} />
                    </div>
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
                        >
                        {isLoading 
                            ? <div className={modalStyles.loading_container}>
                                <ReactLoading type={'spin'} color={'white'} height={'20%'} width={'20%'} /> 
                                <span>wait..</span>
                            </div>
                            : "Add"
                        }        
                        </button>
                        <button
                            onClick={this.props.closeModal}
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

