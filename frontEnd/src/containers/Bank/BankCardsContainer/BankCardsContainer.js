import React, { Component } from 'react';
import BankCard from '../BankCard/BankCard';
import styles from '../../../assets/css/Bank/BankCardsContainer/BankCardsContainer.css';
import BankDetailsModal from '../BankDetailsModal/BankDetailsModal';
import AERCalculatorModal from '../AERCalculatorModal/AERCalculatorModal';
import ComparisonModal from '../ComparisonModal/ComparisonModal';

import axios from 'axios';

class BankCardsContainer extends Component {
    state = {
        isOpenModal: false,
        isOpenAERmodal: false,
        isOpenComparisonModal: false,
        banks: [],
        selectBankId: '',
    }

    componentDidMount() {
        axios({
            method: 'POST',
            url: 'http://localhost:5000/get-banks',
            headers:{
              'Content-Type': 'application/json'
            }
          }).then((response) => {
                this.setState(() => ({
                    banks: response.data.payload
                }));
          }).catch(e => {
            console.log(e);
          });
    }

    handleOpenModal = (id) => {
        this.setState(() => ({
             isOpenModal: true,
             selectBankId: id
         }));
    }

    handleCloseModal = () => {
        this.setState({isOpenModal: false});
    }

    handleOpenAERmodal = () => {
        this.setState({ isOpenAERmodal: true });
    }

    handleCloseAERmodal = () => {
        this.setState({ isOpenAERmodal: false });
    }

    handleOpenComparisonModal = () => {
        this.setState({ isOpenComparisonModal: true });
    }

    handleCloseComparisonModal = () => {
        this.setState({ isOpenComparisonModal: false });
    }


    render() {
        return (
            <div className={styles.container}>
                <div className={styles.cards_container}>
                    {
                        this.state.banks.map((bank) => (
                            <BankCard 
                                key={bank.bankId}
                                bank={bank}
                                handleOpenModal={this.handleOpenModal}
                            />
                        ))
                    }
                </div>
                {
                    this.state.isOpenModal && <BankDetailsModal 
                        closeModal={this.handleCloseModal}
                        bankId={this.state.selectBankId}
                    />
                }
                
                    <button 
                        className={styles.aer_button}
                        onClick={this.handleOpenAERmodal}
                    >
                    AER Calculator
                    </button>
                    <button 
                        className={styles.comparison_button}
                        onClick={this.handleOpenComparisonModal}
                    >
                    Comparison
                    </button>

                {
                    this.state.isOpenAERmodal && <AERCalculatorModal 
                    closeModal={this.handleCloseAERmodal}
                    banks={this.state.banks}
                    />
                }
                {this.state.isOpenComparisonModal && <ComparisonModal closeModal={this.handleCloseComparisonModal}/>}
            </div>
        );
    }
}

export default BankCardsContainer;