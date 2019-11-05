import React from 'react';
import { IoIosAdd } from 'react-icons/io';
import styles from './InterestTable.css';
import TableRow from './TableRow';

const InterestTable = (props) => {
    return(
        <div className={styles.container}>
            <h4 className={styles.interestRate_table_head}>Add Interest Rates</h4>
            <div className={styles.interestRate_table_container}>
                <div className={styles.table_header}>
                    <div className={styles.header}>Term</div>
                    <div className={styles.header}>Monthly</div>
                    <div className={styles.header}>Annualy</div>
                    <div className={styles.header}>Maturity</div>
                    <button
                        className={styles.add_row_button}
                        onClick={props.addInterestRateHandler}
                    >
                        <IoIosAdd size="1.5em" color="#615f5f79"/> 
                    </button>
                </div>
                <div className={styles.table_row_container}>
                {
                    props.interestRates.map((row) => {
                        return (
                            <TableRow 
                                row={row}
                                key={row.interestRateId}
                                termHandler={props.termHandler}
                                monthlyHandler={props.monthlyHandler}
                                annualyHandler={props.annualyHandler}
                                maturityHandler={props.maturityHandler}
                                deleteInterestRateHandler={props.deleteInterestRateHandler}
                            />
                        )
                    })
                }
                </div>
            </div>
            
        </div>
       
    )
}

export default InterestTable;