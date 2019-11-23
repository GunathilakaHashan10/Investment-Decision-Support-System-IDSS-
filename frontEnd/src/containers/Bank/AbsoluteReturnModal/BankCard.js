import React, {Component} from 'react'
import { IoIosCloseCircleOutline, IoIosAddCircleOutline } from 'react-icons/io';
import modalStyles from '../../../assets/css/Bank/AbsoluteReturnModal/AbsoluteReturnModal.css';
import * as myConstants from '../../Utils/Constants/Constants';
import axios from 'axios';
//import ErrorMessageModal from '../../Utils/ErrorMessageModal/ErrorMessageModal';

class BankCard extends Component {
    state = {
        selectBankId: '',
        selectTerm: '',
        totalInterest: '',
        error: ''
    }

    selectTermHandler = (e) => {
        const selectTerm = e.target.value
        this.setState(() => ({
            selectTerm
        }))
    }

    selectBankHandler = (e) => {
        const selectBankId = e.target.value
        this.setState(() => ({
            selectBankId
        }))
    }

    calculateHandler = (e) => {
        const { selectBankId, selectTerm} = this.state
        if(selectBankId && selectTerm) {
            this.setState(() => ({
                error: ''
            }))
            const formData = new FormData()
            formData.append('bankId', selectBankId)
            formData.append('Term', selectTerm)
            formData.append('depositAmount', this.props.depositAmount)
            formData.append('depositTime', this.props.depositTime)

        axios.post(`${myConstants.SEVER_URL}/get-absolute-return-chart`, formData)
            .then(response => {
                const { chartData, totalAmount, totalInterest, bankName } = response.data.payload
                this.setState(() => ({
                    totalInterest
                }))
                this.props.bankChartDataController(this.props.bankCardId, {
                    bankName: `${bankName} ${this.state.selectTerm}`,
                    data: chartData
                })
            })
            .catch(error => {
                console.log(error.message)
                // this.setState({
                //     error: error.message,
                //     openErrorModal: true
                // })
            })
        } else {
            this.setState(() => ({
                error: 'Please fill all fields'
            }))
        }
    }

    render() {
        return (
            <div className={modalStyles.bank_card}  >
                <div className={modalStyles.input_container_bank_card}>
                    <span className={modalStyles.label}>Bank:</span>
                        <select 
                            className={modalStyles.lable_select}
                            defaultValue={this.state.bankId}
                            onChange={this.selectBankHandler}
                        >
                            <option value=''>-Select Bank-</option>
                            {
                                this.props.banks.map((bank) => (
                                    <option key={bank.bankId} value={bank.bankId}>{bank.bankName}</option>
                                ))
                            }
                        </select>
                </div>
                <div className={modalStyles.input_container_bank_card}>
                    <span className={modalStyles.label}>Term:</span>
                    <select 
                        className={modalStyles.lable_select}
                        defaultValue={this.state.selecteTerm}
                        onChange={this.selectTermHandler}
                    >
                            <option value=''>-select-</option>
                            <option value={'1 maturity'}>One Months - Maturity</option>
                            {this.props.depositTime >=3  && <option value={'3 maturity'}>Three Months - Maturity</option>}
                            {this.props.depositTime >=6  && <option value={'6 maturity'}>Six Months - Maturity</option>}
                            {this.props.depositTime >=12  && <option value={'12 monthly'}>One Years - Monthly</option>}
                            {this.props.depositTime >=12  && <option value={'12 maturity'}>One Years - Maturity</option>}
                            {!(this.props.depositTime%24)  && <option value={'24 monthly'}>Two Years - Monthly</option>}
                            {!(this.props.depositTime%24)  && <option value={'24 annualy'}>Two Years - Annualy</option>}
                            {!(this.props.depositTime%24)  && <option value={'24 maturity'}>Two Years - Maturity</option>}
                            {!(this.props.depositTime%36)  && <option value={'36 monthly'}>Three Years - Monthly</option>}
                            {!(this.props.depositTime%36)  && <option value={'36 annualy'}>Three Years - Annualy</option>}
                            {!(this.props.depositTime%36)  && <option value={'36 maturity'}>Three Years - Maturity</option>}
                            {!(this.props.depositTime%48)  && <option value={'48 monthly'}>Four Years - Monthly</option>}
                            {!(this.props.depositTime%48)  && <option value={'48 annualy'}>Four Years - Annualy</option>}
                            {!(this.props.depositTime%48)  && <option value={'48 maturity'}>Four Years - Maturity</option>}
                            {!(this.props.depositTime%60)  && <option value={'60 monthly'}>Five Years - Monthly</option>}
                            {!(this.props.depositTime%60)  && <option value={'60 annualy'}>Five Years - Annualy</option>}
                            {!(this.props.depositTime%60)  && <option value={'60 maturity'}>Five Years - Maturity</option>}
                     </select>
                </div>
                {
                    this.state.totalInterest && <div>Total Interest : {this.state.totalInterest.toFixed(2)}</div>    
                }
                <button
                    onClick={this.calculateHandler}
                >
                    Calculate
                </button>
                { this.state.error && <span className={modalStyles.form_errors}>{this.state.error}</span> }
                <button
                    onClick={() => this.props.handleDeletBankCard(this.props.bankCardId)}
                    className={modalStyles.bank_card_remove_button}
                >
                    <IoIosCloseCircleOutline size="1.5em" color="black"/>
                </button>
            </div>
        )
    }
    
}

export default BankCard