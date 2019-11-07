import React from 'react';
import styles from '../../../assets/css/Bank/BankDetails/BankDetails.css';

const CompareTable = (props) =>  (
    <div className={styles.container}>
            <table className={styles.bank_table}>
                <thead>
                    <tr className={styles.bank_table_row_head}>
                        <td>Bank Name</td>
                        <td>{
                            props.irRateTopicChange ? 'Interest Rate' : 'Interest (for a Month)'
                        }</td>
                    </tr>
                </thead>
                <tbody>
                {
                    props.tableData.map((row, index) => (
                        <tr className={styles.bank_table_row} key={index}>
                                <td>{row.bankName}</td>
                                <td>{row.interestRate > 0 ? row.interestRate : '-'}</td>
                        </tr>
                    ))
                }
                </tbody>
            </table>
        </div>
);

export default CompareTable;