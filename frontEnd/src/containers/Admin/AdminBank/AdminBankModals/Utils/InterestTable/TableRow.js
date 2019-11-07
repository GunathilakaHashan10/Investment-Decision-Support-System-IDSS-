import React from 'react';
import { IoIosTrash } from 'react-icons/io';
import styles from './TableRow.css';

const TableRow = (props) => {
    const row = {
        ...props.row
    }
    return(
        <div className={styles.row_container}>
            <select className={styles.input_field} value={row.term}  onChange={(e) => props.termHandler(e, row.interestRateId)}>
                <option>-select-</option>
                <option value="One Month">One Month</option>
                <option value="Three Months">Three Months</option>
                <option value="Six Months">Six Months</option>
                <option value="One Year">One Year</option>
                <option value="Two Years">Two Years</option>
                <option value="Three Years">Three Years</option>
                <option value="Four Years">Four Years</option>
                <option value="Five Years">Five Years</option>
            </select>

            <input 
                type="number" 
                className={styles.input_field}
                value={row.monthly} 
                onChange={(e) => props.monthlyHandler(e, row.interestRateId)}
            />
            <input 
                type="number" 
                className={styles.input_field} 
                value={row.annualy} 
                onChange={(e) => props.annualyHandler(e, row.interestRateId)}
            />
            <input 
                type="number" 
                className={styles.input_field} 
                value={row.maturity} 
                onChange={(e) => props.maturityHandler(e, row.interestRateId)}
            />

            <button 
                className={styles.delete_button}
                onClick={(e) => props.deleteInterestRateHandler(e, row.interestRateId)}
            >
                <IoIosTrash size="1.5em" color="#615f5f79"/>
            </button>
        </div>
    )
}

export default TableRow;