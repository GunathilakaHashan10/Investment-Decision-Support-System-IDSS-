import React, { Component } from 'react';
import { IoIosCloseCircleOutline, IoIosAddCircleOutline } from 'react-icons/io';
import modalStyles from '../../../assets/css/Bank/AbsoluteReturnModal/AbsoluteReturnModal.css';

class AbsoluteReturnModal extends Component {
    state = {
        bankCardCount: []
    }

    handleInsertBankCard = () => {
        this.setState((prevState) => {
            if(prevState.bankCardCount.length < 3) {
                return {
                    bankCardCount: prevState.bankCardCount.concat({})
                }
            } 
        })
    }

    handleDeletBankCard = (index) => {
        const bankCardCountCopy = [...this.state.bankCardCount];
        
        bankCardCountCopy.splice(index, 1);
        this.setState(() => {
            return {
                bankCardCount: bankCardCountCopy
            }
            
        })
    }


    render() {
        const { bankCardCount } = this.state;
        return (
            <div className={modalStyles.modal}>
                <div className={modalStyles.modal_container}>
                    <h2 className={modalStyles.modal_header}>Absolute Return</h2>
                    <div className={modalStyles.input_container}>
                        <div className={modalStyles.data_input}>
                            <div className={modalStyles.label_container}>
                                <span>Deposit amount</span>
                                <span>:</span>
                            </div>
                            <input 
                                type="number" 
                                className={modalStyles.input_box} 
                            />
                        </div>
                        <div className={modalStyles.data_input}>
                            <div className={modalStyles.label_container}>
                                <span >Deposit time</span>
                                <span >:</span>
                            </div>
                            <input 
                                type="number" 
                                className={modalStyles.input_box}
                                placeholder="Months" 
                            />
                            <input 
                                type="number" 
                                className={modalStyles.input_box} 
                                placeholder="Years" 
                            />
                        
                        </div>

                    </div>
                    <div className={modalStyles.bank_container}>
                        <div className={modalStyles.addNewBank_button_container}>
                            <span className={modalStyles.add_new_bank}>Add new Bank</span>
                            <button 
                                className={modalStyles.add_new_bank_button}
                                onClick={this.handleInsertBankCard}
                            >
                                <IoIosAddCircleOutline size="2em"/>
                            </button>
                        </div>
                        <div className={modalStyles.bank_card_container}>
                        {bankCardCount.map((value, index) => {
                            return (
                                <div className={modalStyles.bank_card}  >
                                    <div className={modalStyles.input_container_bank_card}>
                                        <span className={modalStyles.label}>Bank:</span>
                                        <select className={modalStyles.lable_select}>
                                            <option>-select-</option>
                                            <option>Peoples' Bank</option>
                                            <option>Bank of Ceylon</option>
                                        </select>
                                    </div>
                                    <div className={modalStyles.input_container_bank_card}>
                                        <span className={modalStyles.label}>Term:</span>
                                        <select className={modalStyles.lable_select}>
                                            <option>-select-</option>
                                            <option>One Month</option>
                                            <option>Three Month</option>
                                        </select>
                                    </div>
                                    <button
                                        onClick={() => this.handleDeletBankCard(index)}
                                        className={modalStyles.bank_card_remove_button}
                                    >
                                        <IoIosCloseCircleOutline size="1.5em" color="black"/>
                                    </button>
                                </div>
                            )
                        })}
                            
                        </div>
                    </div>
                    <div className={modalStyles.chart_container}>
                    
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
}

export default AbsoluteReturnModal;
