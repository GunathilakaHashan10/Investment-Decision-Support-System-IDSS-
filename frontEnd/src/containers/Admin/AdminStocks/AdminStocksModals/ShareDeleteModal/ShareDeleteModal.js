import React, { Component } from 'react';
import axios from 'axios';
import ReactLoading from 'react-loading';
import lodingStyles from '../../../../../assets/css/ReactLoading/ReactLoading.css';
import modalStyles from '../../../../../assets/css/Admin/AdminStocks/AdminStocksModals/DeleteShareModal/DeleteShareModal.css';

class ShareDeleteModal extends Component {
    state = {
        isLoading: false,
        shareId: this.props.id,
        isDeleteSuccess: null
    }

    handleDelete = () => {
        this.setState({isLoading: true})

        axios.post('http://localhost:5000/deleteShare?id=' + this.state.shareId)
            .then(response => {
                console.log(response.data.message)
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
                    <ReactLoading type={'spinningBubbles'} color={'#006AFF'} height={'7%'} width={'7%'} />
                </div>
            </div>
        )
        
        if(isDeleteSuccess === null) {
            deleteContent = (
                <div>
                    <h2 className={modalStyles.delete_share_head}>{`Delete share ${this.props.shareName}?`}</h2>
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
                        <h3>{`${this.props.shareName} deleted successfully.`}</h3>
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

export default ShareDeleteModal;