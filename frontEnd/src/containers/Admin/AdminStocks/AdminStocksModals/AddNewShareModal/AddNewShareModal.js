import React, { Component } from 'react';
import ReactLoading from 'react-loading';
import axios from 'axios';
import * as myConstants from '../../../../Utils/Constants/Constants';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import modalStyles from '../../../../../assets/css/Admin/AdminStocks/AdminStocksModals/UpdateShareModal/UpdateShareModal.css';
import ErrorMessageModal from '../../../../Utils/ErrorMessageModal/ErrorMessageModal';

class AddNewShareModal extends Component {
    state = {
        shareName: null,
        shareTag: null,
        duration: null,
        file: null,
        error: null,
        openErrorModal: false,
        isLoading: false,
        isSuccess: null,
        message: null
    }

    handelCloseErrorMessageModal = () =>{
        this.setState({openErrorModal: false })
    }

    handleOnchange = (event) => {
        this.setState({
            [event.target.name]: event.target.value 
        })
    }

    handleFileOnChange = (event) => {
        this.setState({
            file: event.target.files[0]
        })
    }

    handleOnSubmit = () => {
        let formData = new FormData();

        formData.append('shareName', this.state.shareName);
        formData.append('shareTag', this.state.shareTag);
        formData.append('duration', this.state.duration);
        formData.append('adsImages', this.state.file);

        

        axios.post(`${myConstants.SEVER_URL}/upload?pathName=tsvFiles`, formData)
            .then(response => {
                setTimeout(() => {
                    this.setState({
                        isLoading: false,
                        isSuccess: response.data.success,
                        message: response.data.message
                    }, 1500);
                })
            })
            .catch(error => {
                this.setState({
                    error:error.message,
                    openErrorModal: true
                })
            })

    } 

    render() {
        const {isLoading, isSuccess, message} = this.state;
        let content = null;
        if(isSuccess === null) {
            content = (
                <div className={modalStyles.modal}>
                <div className={modalStyles.modal_container}>
                    <div className={modalStyles.shareUpdate_container}>
                        <h2 className={modalStyles.share_name}>Add new Share</h2>
                        <div className={modalStyles.share_details_container}>
                            <span className={modalStyles.label_container}>
                                <span>Share name</span>
                                <span>:</span>
                            </span>
                            <input className={modalStyles.share_data} type="text" name="shareName" onChange={this.handleOnchange}/>
        
                        </div>
                        <div className={modalStyles.share_details_container}>
                            <span className={modalStyles.label_container}>
                                <span>Share Tag</span>
                                <span>:</span>
                            </span>
                            <input className={modalStyles.share_data} type="text" name="shareTag" onChange={this.handleOnchange}/>
                        </div>
                        <div className={modalStyles.share_details_container}>
                            <span className={modalStyles.label_container}>
                                <span>Duration</span>
                                <span>:</span>
                            </span>
                            <input className={modalStyles.share_data} type="text" name="duration" onChange={this.handleOnchange}/>
                        </div>
                        <div className={modalStyles.share_details_container}>
                            <span className={modalStyles.label_container}>
                                <span>CSV file</span>
                                <span>:</span>
                            </span>
                            <input type="file" className={modalStyles.share_data} name="file" onChange={this.handleFileOnChange} />
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
                                : "Add"
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
                    

                    <button 
                        className={modalStyles.modal_closeButton}
                        onClick={this.props.closeModal}
                    >
                    <div><IoIosCloseCircleOutline size="2em" color="black"/></div>
                    </button>
                </div>
             </div>
            )
        } else if (isSuccess) {
            content = (
                <div className={modalStyles.result_modal}>
                    <div className={modalStyles.result_modal_container}>
                        <h3 className={modalStyles.success_annotation}>{message}</h3>
                        <h4 className={modalStyles.success_message}>Added successfully</h4>
                        
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
        } else if (!isSuccess) {
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

export default AddNewShareModal;