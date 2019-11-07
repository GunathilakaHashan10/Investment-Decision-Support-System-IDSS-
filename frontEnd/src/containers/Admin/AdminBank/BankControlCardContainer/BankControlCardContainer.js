import React, { Component } from 'react';
import axios from 'axios';
import ReactLoading from 'react-loading';
import * as myConstants from '../../../Utils/Constants/Constants';
import lodingStyles from '../../../../assets/css/ReactLoading/ReactLoading.css';
import styles from '../../../../assets/css/Admin/AdminBank/BankControlCardContainer/BankControlCardContainer.css';
import BankControlCard from '../BankControlCard/BankControlCard';
import ErrorMessageModal from '../../../Utils/ErrorMessageModal/ErrorMessageModal';

class BankControlCardContainer extends Component {
    state = {
        bankData: [],
        isLoading: false,
        error: null,
        openErrorModal: false,
        isSuccess: null
    }

    handelCloseErrorMessageModal = () =>{
        this.setState({openErrorModal: false })
    }

    componentDidMount() {
        this.setState({ isLoading: true });

        axios
            .get(`${myConstants.SEVER_URL}/admin/get-all-banks`)
            .then(response => {
                setTimeout(() => {
                    this.setState({
                        isLoading: false,
                        isSuccess: response.data.success,
                        bankData: response.data.docs
                    })
                }, 1000);
                
            })
            .catch(error => {
                this.setState({
                    error: error.message,
                    openErrorModal: true
                })
            })
    }
    render() {
        const { openErrorModal, bankData, isSuccess, isLoading } = this.state;
        let content = null;
        if(isLoading) {
            content = (
                <div className={lodingStyles.react_loading_container_fixed}>
                    <ReactLoading type={'spinningBubbles'} color={'#006AFF'} height={'4%'} width={'4%'} />
                </div>
            )
        } else if(isSuccess) {
            content = (
                <div className={styles.bankControlCard_container}>
                    {bankData.map(value => {
                        return (
                            <BankControlCard 
                                key={value._id}
                                bankData={value}
                            />
                        )
                    })}
                </div>
            )
        } else if(!isSuccess) {
            content = (
                <div className={styles.bankControlCard_container}>
                    <h1>No Banks</h1>
                   
                </div>
            )
        }
        return(
            <div className={styles.container}>
                {content}
                {openErrorModal && 
                    <ErrorMessageModal 
                        error={this.state.error}
                        closeModal={this.handelCloseErrorMessageModal}
                    />    
                }
            </div>
        )
    }
}

export default BankControlCardContainer;