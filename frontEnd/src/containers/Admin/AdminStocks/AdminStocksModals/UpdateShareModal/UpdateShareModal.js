import React, { Component } from 'react';
import ReactLoading from 'react-loading';
import axios from 'axios';
import * as myConstants from '../../../../Utils/Constants/Constants';
import modalStyles from '../../../../../assets/css/Admin/AdminStocks/AdminStocksModals/UpdateShareModal/UpdateShareModal.css';
import ErrorMessageModal from '../../../../Utils/ErrorMessageModal/ErrorMessageModal';

class UpdateShareModal extends Component {
    state = {
        file: null,
        error: null,
        openErrorModal: false,
        isLoading: false,
        isSuccess: null,
        message: null,
        shareId: this.props.shareData.id
    }

    handelCloseErrorMessageModal = () =>{
        this.setState({openErrorModal: false })
    }

    handleFileOnChange = (event) => {
        this.setState({
            file: event.target.files[0]
        })
    }


    handleOnSubmit = () => {
        this.setState({isLoading:true});
        let formData = new FormData();

        formData.append('shareId',  this.state.shareId);
        formData.append('adsImages', this.state.file);

        axios.post(`${myConstants.SEVER_URL}/stock/update-share?pathName=tsvFiles`, formData)
            .then(response => {
                setTimeout(() => {
                    this.setState({
                        isLoading: false,
                        isSuccess: response.data.success,
                        message: response.data.message
                    });
                },1500)
            })
            .catch(error => {
                this.setState({
                    error:error.message,
                    openErrorModal: true
                })
            })

    } 

    render() {
        const { shareData } = this.props; 
        const {isLoading, isSuccess, message} = this.state;
        let content = null;
        if(isSuccess === null) {
            content = (
                <div className={modalStyles.modal}>
                <div className={modalStyles.modal_container}>
                    <div className={modalStyles.shareUpdate_container}>
                        <h2 className={modalStyles.share_name}>{shareData.shareName}</h2>
                        <div className={modalStyles.share_details_container}>
                            <span className={modalStyles.label_container}>
                                <span>Data Items</span>
                                <span>:</span>
                            </span>
                            <span className={modalStyles.share_data}>{shareData.dataItems}</span>
                        </div>
                        <div className={modalStyles.share_details_container}>
                            <span className={modalStyles.label_container}>
                                <span>Start Date</span>
                                <span>:</span>
                            </span>
                            <span className={modalStyles.share_data}>{shareData.startDate}</span>
                        </div>
                        <div className={modalStyles.share_details_container}>
                            <span className={modalStyles.label_container}>
                                <span>End Date</span>
                                <span>:</span>
                            </span>
                            <span className={modalStyles.share_data}>{shareData.endDate}</span>
                        </div>
                        <div className={modalStyles.share_details_container}>
                            <span className={modalStyles.label_container}>
                                <span>CSV file</span>
                                <span>:</span>
                            </span>
                            <input type="file" className={modalStyles.share_data} name="file" onChange={this.handleFileOnChange}/>
                        </div>
                        <div className={modalStyles.button_container}>
                            <button
                                onClick={this.handleOnSubmit}
                                className={isLoading ? modalStyles.control_button_loading : modalStyles.control_button}
                            >
                            {isLoading 
                                ? <div className={modalStyles.loading_container}>
                                    <ReactLoading type={'spin'} color={'white'} height={'15%'} width={'15%'} /> 
                                    <span>wait..</span>
                                </div>
                                : "Update"
                            } 
                            </button>
                            <button
                                onClick={this.props.closeModal}
                                className={modalStyles.control_button}
                            >
                            Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            )
        } else if(isSuccess) {
            content = (
                <div className={modalStyles.result_modal}>
                    <div className={modalStyles.result_modal_container}>
                        <h3 className={modalStyles.success_annotation}>{message}</h3>
                        <h4 className={modalStyles.success_message}>Updated successfully</h4>
                        
                        <div className={modalStyles.button_container}>
                            <button
                                onClick={this.props.closeModal}
                                className={modalStyles.control_button}
                            >
                            Ok
                            </button>
                        </div>

                    </div>
                </div>
            )
        } else if(!isSuccess) {
            content = (
                <div className={modalStyles.result_modal}>
                    <div className={modalStyles.result_modal_container}>
                        <h3 className={modalStyles.success_annotation}>{message}</h3>
                        <h4 className={modalStyles.success_message}>Please try again sortly</h4>
                        
                        <div className={modalStyles.button_container}>
                            <button
                                onClick={this.props.closeModal}
                                className={modalStyles.control_button}
                            >
                            Ok
                            </button>
                        </div>

                    </div>
                </div>
            )
        }

        return (
            <div>
                {content}
                {this.state.openErrorModal && 
                    <ErrorMessageModal 
                        error={this.state.error}
                        closeModal={this.handelCloseErrorMessageModal}
                    />    
                }
            </div>
        );
    }
}

export default UpdateShareModal;