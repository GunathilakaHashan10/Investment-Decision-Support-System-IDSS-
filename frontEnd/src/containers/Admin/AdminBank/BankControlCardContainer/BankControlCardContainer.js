import React, { Component } from 'react';
import styles from '../../../../assets/css/Admin/AdminBank/BankControlCardContainer/BankControlCardContainer.css';
import BankControlCard from '../BankControlCard/BankControlCard';

class BankControlCardContainer extends Component {
    render() {
        return(
            <div className={styles.container}>
                <div className={styles.bankControlCard_container}>
                    <BankControlCard />
                    <BankControlCard />
                    <BankControlCard />
                    <BankControlCard />
                    <BankControlCard />
                    <BankControlCard />
                
                </div>

            </div>
        )
    }
}

export default BankControlCardContainer;