import React, { Component } from 'react';
import styles from '../../../assets/css/Bank/BankCard/BankCard.css';

class BankCard extends Component {
    
    render() {
        return (
            <div className={styles.container}>
                <div className={styles.bankCard_container}>
                    <img 
                        src={require(`../../../assets/images/Bank/${this.props.bank.bankId}.jpeg`)}
                        alt="BankImage"
                        className={styles.bankImage}
                    />
                    <div className={styles.bank_content}>
                        <span className={styles.bank_title}>{this.props.bank.bankName}</span>
                        <span className={styles.bank_description}>{this.props.bank.description}</span>
                        <button 
                            className={styles.bank_button}
                            onClick={(e) => {
                                this.props.handleOpenModal(this.props.bank.bankId);
                            }}
                        >more</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default BankCard;