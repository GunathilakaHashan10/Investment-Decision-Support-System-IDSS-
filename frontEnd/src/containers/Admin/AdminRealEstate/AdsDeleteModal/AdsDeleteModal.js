import React, { Component } from 'react';
import axios from 'axios';
import ReactLoading from 'react-loading';
import * as myConstants from '../../../Utils/Constants/Constants';
import lodingStyles from '../../../../assets/css/ReactLoading/ReactLoading.css';
import modalStyles from '../../../../assets/css/Admin/AdminBank/AdminBankModals/DeleteBankModal/DeleteBankModal.css';
import ErrorMessageModal from '../../../Utils/ErrorMessageModal/ErrorMessageModal';

class AdsDeleteModal extends Component {
    state = {
        isLoading: false,
        isDeleteSuccess: null,
        adId: this.props.adId,
        adType: null,
        error: null,
        openErrorModal: false
    }

    componentDidMount() {
        if(this.props.adType === "HomeSell" || "HomeRent") {
            this.setState({adType:"home"})
        } else {
            this.setState({adType:"land"})
        }
    }

    handelCloseErrorMessageModal = () =>{
        this.setState({openErrorModal: false })
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
                    error:error.message,
                    openErrorModal: true
                })
            })
    }

    render(){
        const { isLoading, isDeleteSuccess, openErrorModal } = this.state;
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
                    <h2 className={modalStyles.delete_bank_head}>Delete this advertisment?</h2>
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
                        <h3>Removed successfully</h3>
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

export default AdsDeleteModal;