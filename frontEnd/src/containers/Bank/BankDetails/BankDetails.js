import React, { Component } from 'react';
import styles from '../../../assets/css/Bank/BankDetails/BankDetails.css';

import  { interestRatesTableData } from '../Utils/Table'

import axios from 'axios';

class BankDetails extends Component {
    state = {
        data: [],
        bank: {}
    }

    componentDidMount() {
            axios({
                method: 'POST',
                url: `http://localhost:5000/get-bank?id=${this.props.bankId}`,
                headers:{
                  'Content-Type': 'application/json'
                }
            }).then((response) => {
                    this.setState(() => ({
                        bank: response.data.payload,
                    }));
            }).then(() => {
                  const data = interestRatesTableData(this.state.bank.interestRates);                                                                      
                    this.setState(() => ({
                        data
                    }));                                                                                
            }).catch(e => {
                console.log(e);                                      
            });   
    }

    render() {
        return (
            <div className={styles.container}>
                <h2 className={styles.bank_head}>{this.state.bank.bankName}</h2>
                <div className={styles.bank_description}>{this.state.bank.description                                                                                                    }</div>
                <div className={styles.bank_table_container}>
                    <table className={styles.bank_table}>
                        <thead>
                            <tr className={styles.bank_table_row_head}>
                                <td>Term</td>
                                <td>Monthly</td>
                                <td>Annualy</td>
                                <td>Maturity</td>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.data.map((row, index) => (
                                    <tr className={styles.bank_table_row} key={index}>
                                        {
                                            row.map((data, index) => (
                                                <td key={index}>{data}</td>
                                            ))
                                        }
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default BankDetails;