import React, { Component } from 'react';
import uuid from 'uuid';
import modalStyles from '../../../../../assets/css/Admin/AdminBank/AdminBankModals/EditBankModal/EditBankModal.css';
import InterestTable from '../Utils/InterestTable/InterestTable';

class EditBankModal extends Component {
    state = {
        bankName: "",
        description: "",
        interestRates: []
    }

    termHandler = (e, id) => {
        const interestRatesCopy = [ ...this.state.interestRates ];
        const index = interestRatesCopy.findIndex((interestRate) => (
            id === interestRate.interestRateId
        ));

        interestRatesCopy[index].term = e.target.value;
        
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

    render() {
        return (
            <div className={modalStyles.modal}>
                <div className={modalStyles.modal_container}>
                    <div className={modalStyles.addNewBank_container}>
                        <h2 className={modalStyles.add_bank_header}>Update bank</h2>
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
                        <input type="file" className={modalStyles.bank_data} name="file" onChange={this.handleFileOnChange} />
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
                            onClick={this.handleOnSubmit}
                        >
                        Update
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
    }
}

export default EditBankModal;