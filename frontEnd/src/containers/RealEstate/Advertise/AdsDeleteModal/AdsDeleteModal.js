import React, { Component } from 'react';
import * as myConstants from '../../../Utils/Constants/Constants';
import axios from 'axios';
import ReactLoading from 'react-loading';
import lodingStyles from '../../../../assets/css/ReactLoading/ReactLoading.css';
import modalStyles from '../../../../assets/css/Admin/AdminStocks/AdminStocksModals/DeleteShareModal/DeleteShareModal.css';
import ErrorMessageModal from '../../../Utils/ErrorMessageModal/ErrorMessageModal';


class AdsDeleteModal extends Component {
    state = {
        isLoading: false,
        adId: this.props.id,
        adType: this.props.adType,
        isDeleteSuccess: null,
        error: null,
        openErrorModal: false
    }

    handleCloseErrorModal = () => {
        this.setState({openErrorModal: false});
    }

    handleDelete = () => {
        this.setState({isLoading: true});
        const formData = new FormData();
        formData.append('id', this.state.adId);
        formData.append('adType', this.state.adType);

        axios.post(`${myConstants.SEVER_URL}/deleteAd`, formData)
            .then(response => {
                setTimeout(() => {
                    this.setState({
                        isLoading: false,
                        isDeleteSuccess: response.data.message
                    })
                },2000)
                
            })
            .catch(error => {
                this.setState({
                    error: error.message,
                    openErrorModal: true
                })
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
                    <h2 className={modalStyles.delete_share_head}>Are you sure?</h2>
                    <div className={modalStyles.button_container}>
                        <button
                            onClick={this.handleDelete}
                        >
                        Delete
                        </button>
                        <button
                            onClick={this.props.handelCancel}
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
                        <h3>{`Deleted successfully.`}</h3>
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
                {this.state.openErrorModal &&
                    <ErrorMessageModal 
                        closeModal={this.handleCloseErrorModal}
                        error={this.state.error}
                    />
                }
            </div>
        )
    }
}

export default AdsDeleteModal;