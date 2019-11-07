import React from 'react'

const InputArea = (props) => {
    return (
        <div>
            Term: 
            <select
                onChange={props.inputTermHandler}
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
            Sort: 
            <select
                onChange={props.inputSortHandler}
            >
                {
                    props.time > 6 && <option value='monthly'>Monthly</option>
                }
                {
                    props.time > 12 && <option value='annualy'>Annualy</option>
                }
                <option value='maturity' defaultValue>Maturity</option>
            </select>
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
            />
            <button
                onClick={props.calcualateButtonHandler}
            >
                Compare
            </button>
        </div>
    );
}

export default InputArea;