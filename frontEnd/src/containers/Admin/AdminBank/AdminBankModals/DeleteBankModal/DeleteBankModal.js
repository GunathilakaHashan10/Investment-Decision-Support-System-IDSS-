import React, { Component } from 'react';
import axios from 'axios';
import ReactLoading from 'react-loading';
import lodingStyles from '../../../../../assets/css/ReactLoading/ReactLoading.css';
import modalStyles from '../../../../../assets/css/Admin/AdminBank/AdminBankModals/DeleteBankModal/DeleteBankModal.css';

class DeleteBankModal extends Component {
    state = {
        isLoading: false,
        isDeleteSuccess: null
    }

    handleDelete = () => {
        this.setState({isLoading: true})

        axios.post()
            .then(response => {
                setTimeout(() => {
                    this.setState({
                        isLoading: false,
                        isDeleteSuccess: response.data.message
                    })
                },2000)
                
            })
            .catch(error => {
                console.log(error);
            })
    }

    render(){
        const { isLoading, isDeleteSuccess } = this.state;
        let deleteContent = null;
        
        let reactLoading = (
            <div>
                <div>
                    <h3>Processing...</h3>
                </div>
                <div className={lodingStyles.react_loading_container_absoulte}>
                    <ReactLoading type={'spinningBubbles'} color={'#033d0b'} height={'7%'} width={'7%'} />
                </div>
            </div>
        )
        
        if(isDeleteSuccess === null) {
            deleteContent = (
                <div>
                    <h2 className={modalStyles.delete_bank_head}>{`Delete bank ${this.props.bankName}?`}</h2>
                    <div className={modalStyles.button_container}>
                        <button
                            onClick={this.handleDelete}
                        >
                        Delete
                        </button>
                        <button
                            onClick={this.props.handleCancel}
                        >
                        Cancel
                        </button>
                    </div>
                </div>
            )
        } else if (isDeleteSuccess === "success") {
            deleteContent = (
                <div>
                    <div>
                        <h3>{`${this.props.bankName} deleted successfully.`}</h3>
                        <div className={modalStyles.button_container_response}>
                            <button
                                onClick={this.props.closeModal}
                            >
                            Ok
                            </button>
                        </div>
                    </div>
                </div>
            )
        } else if (isDeleteSuccess === "failed") {
            deleteContent = (
                <div>
                    <div>
                        <h3>Operation failed.</h3>
                        <div className={modalStyles.button_container_response}>
                            <button
                                onClick={this.props.closeModal}
                            >
                            Ok
                            </button>
                        </div>
                    </div>
                </div>
            )
        }
        
        return(
            <div className={modalStyles.modal}>
                <div className={modalStyles.modal_container}>
                   
                    {isLoading ? reactLoading : deleteContent}

                </div>
            </div>
        )
    }
}

export default DeleteBankModal;