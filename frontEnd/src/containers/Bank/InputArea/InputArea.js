import React from 'react'
import styles from '../../../assets/css/Bank/InputArea/InputArea.css';

const InputArea = (props) => {
    return (
        <div className={styles.container}>
            <div className={styles.input_container}>
                <span>Term: </span>
                <select
                    onChange={props.inputTermHandler}
                    className={styles.select_box}
                >
                    <option value="1">One Months</option>
                    <option value="3">Three Months</option>
                    <option value="6">Six Months</option>
                    <option value="12">One Years</option>
                    <option value="24">Two Years</option>
                    <option value="36">Three Years</option>
                    <option value="48">Four Years</option>
                    <option value="60">Five Years</option>
                </select>
            </div>
            <div className={styles.input_container}>
            <span>Sort: </span>
            <select
                onChange={props.inputSortHandler}
                className={styles.select_box}
            >
                {
                    props.time > 6 && <option value='monthly'>Monthly</option>
                }
                {
                    props.time > 12 && <option value='annualy'>Annualy</option>
                }
                <option value='maturity' defaultValue>Maturity</option>
            </select>
            </div>
            <div className={styles.input_container}>
                <input
                    type="checkBox"
                    value="yes"
                    onChange={props.inputCheckBoxHandler}
                    
                />
                <input 
                    type="number" 
                    placeholder="Input your amount"
                    onChange={props.inputAmountHandler}
                    value={props.amount}
                    disabled={!props.wantInterest}
                    className={styles.input_area}
                />
            </div>
            <button
                onClick={props.calcualateButtonHandler}
                className={styles.compare_button}
            >
                Compare
            </button>
        </div>
    );
}

export default InputArea;