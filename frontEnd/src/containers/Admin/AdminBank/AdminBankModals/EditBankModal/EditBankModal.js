import React, { Component } from 'react';
import ReactLoading from 'react-loading';
import * as myConstants from '../../../../Utils/Constants/Constants';
import axios from 'axios';
import uuid from 'uuid';
import modalStyles from '../../../../../assets/css/Admin/AdminBank/AdminBankModals/EditBankModal/EditBankModal.css';
import InterestTable from '../Utils/InterestTable/InterestTable';
import ErrorMessageModal from '../../../../Utils/ErrorMessageModal/ErrorMessageModal';

class EditBankModal extends Component {
    state = {
        bankId:this.props.bankData._id,
        bankName: this.props.bankData.bankName,
        description: this.props.bankData.description,
        interestRates: this.props.bankData.interestRates,
        bankImage: "",
        isUpdate: false,
        error: null,
        openErrorModal: false,
        isLoading: false,
        isSuccess: null,
        message: null,
        showNotUpdatedError: false

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
        
        this.setState(() => ({
            interestRates: interestRatesCopy,
            isUpdate: true,
            showNotUpdatedError:false
        }));

    }

    monthlyHandler = (e, id) => {
        const interestRatesCopy = [ ...this.state.interestRates ];
        const index = interestRatesCopy.findIndex((interestRate) => (
            id === interestRate.interestRateId
        ));

        interestRatesCopy[index].monthly = e.target.value;
        
        this.setState(() => ({
            interestRates: interestRatesCopy,
            isUpdate: true,
            showNotUpdatedError:false
        }));

        
    }

    annualyHandler = (e, id) => {
        const interestRatesCopy = [ ...this.state.interestRates ];
        const index = interestRatesCopy.findIndex((interestRate) => (
            id === interestRate.interestRateId
        ));

        interestRatesCopy[index].annualy = e.target.value;
        
        this.setState(() => ({
            interestRates: interestRatesCopy,
            isUpdate: true,
            showNotUpdatedError:false
        }));

        
    }

    maturityHandler = (e, id) => {
        const interestRatesCopy = [ ...this.state.interestRates ];
        const index = interestRatesCopy.findIndex((interestRate) => (
            id === interestRate.interestRateId
        ));

        interestRatesCopy[index].maturity = e.target.value;
        
        this.setState(() => ({
            interestRates: interestRatesCopy,
            isUpdate: true,
            showNotUpdatedError:false
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
                    maturity: 0 
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

    bankDescriptionHandler = (e) => {
        this.setState({
            description:e.target.value,
            isUpdate: true,
            showNotUpdatedError:false
        }) 
    }

    bankImageOnChangeHandler = (e) => {
        this.setState({
            [e.target.name]:e.target.files,
            isUpdate: true,
            showNotUpdatedError:false
        })
        
    }

    updatedBankDataSubmitHandler = () => {
        const { isUpdate, description, bankImage, interestRates, bankId } = this.state;
        
        if(!isUpdate) {
           return this.setState({showNotUpdatedError: true});
        } else {
            this.setState({isLoading: true});
            const formData = new FormData();
            if(bankImage.length !== 0) {
                formData.append('id',bankId);
                for(let i=0; i<bankImage.length; i++){
                    formData.append("adsImages", bankImage[i]);
                }
            }
           
            const updatedBankData = {
                bankId: bankId,
                description:description,
                interestRates:interestRates
            }

            axios
                .post(`${myConstants.SEVER_URL}/admin/update-bank-data`, {data:updatedBankData})
                .then(response => {
                    setTimeout(() => {
                        this.setState({
                            isLoading: false,
                            isSuccess: response.data.success,
                            message: response.data.message
                        });
                        if(response.data.success && (bankImage.length !== 0)){
                            console.log("image update")
                            axios.post(`${myConstants.SEVER_URL}/admin/update-bank-image?pathName=bankImages`, formData)
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
                    },1500);
                })
                .catch(error => {
                    this.setState({
                        isLoading: false,
                        error: error.message,
                        openErrorModal: true
                    })
                })
        }
    }

    render() {
        const { bankName, description, showNotUpdatedError, openErrorModal, isSuccess, isLoading, message} = this.state;
        let content = null;
        if(isSuccess === null) {
            content = (
                <div className={modalStyles.modal}>
                <div className={modalStyles.modal_container}>
                    <div className={modalStyles.addNewBank_container}>
                        <h2 className={modalStyles.add_bank_header}>Update bank</h2>
                        <div className={modalStyles.bank_details_container}>
                            <span className={modalStyles.label_container}>
                                <span>Bank Name</span>
                                <span>:</span>
                            </span>
                            <span className={modalStyles.bank_data}>{bankName}</span>
                        </div>
                        <div className={modalStyles.bank_details_container}>
                            <span className={modalStyles.label_container}>
                                <span>Description</span>
                                <span>:</span>
                            </span>
                            <textarea 
                                className={modalStyles.bank_data_text_area} 
                                type="text" 
                                name="description" 
                                value={description}
                                onChange={this.bankDescriptionHandler}
                            />
                        </div>
                    </div>

                    <div className={modalStyles.bank_details_container}>
                        <span className={modalStyles.label_container}>
                            <span>Bank image</span>
                            <span>:</span>
                        </span>
                        <input 
                            type="file" 
                            className={modalStyles.bank_data} 
                            name="bankImage" 
                            onChange={this.bankImageOnChangeHandler} 
                            accept="image/*"
                            multiple={true} 
                        />
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
                    {showNotUpdatedError && <span className={modalStyles.error_message}>No any changes</span>}
                        <button
                            onClick={this.updatedBankDataSubmitHandler}
                            className={isLoading ? modalStyles.control_button_loading : modalStyles.control_button}
                        >
                        {isLoading 
                            ? <div className={modalStyles.loading_container}>
                                <ReactLoading type={'spin'} color={'white'} height={'15%'} width={'15%'} /> 
                                <span>wait..</span>
                            </div>
                            : "Update"
                        } 
                        </button>
                        <button
                            onClick={this.props.handleCancel}
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
                        <h4 className={modalStyles.success_message}>Updated successfully</h4>
                        
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

export default EditBankModal;