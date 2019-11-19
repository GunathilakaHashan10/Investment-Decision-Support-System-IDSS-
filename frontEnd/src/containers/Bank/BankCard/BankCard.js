import React, { Component } from 'react';
import * as myConstants from '../../Utils/Constants/Constants';
import styles from '../../../assets/css/Bank/BankCard/BankCard.css';

class BankCard extends Component {
    
    render() {
        //console.log(this.props.bank.bankImage[0].imagePath)
        return (
            <div className={styles.container}>
                <div className={styles.bankCard_container}>
                    <img 
                        src={`${myConstants.SEVER_URL}/${this.props.bank.bankImage[0].imagePath}`}
                        alt="BankImage"
                        className={styles.bankImage}
                    />
                    <div className={styles.bank_content}>
                        <span className={styles.bank_title}>{this.props.bank.bankName}</span>
                        <span className={styles.bank_description}>{this.props.bank.description}</span>
                        <button 
                            className={styles.bank_button}
                            onClick={(e) => {
                                this.props.handleOpenModal(this.props.bank.bankId, this.props.bank.bankName);
                            }}
                        >more</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default BankCard;