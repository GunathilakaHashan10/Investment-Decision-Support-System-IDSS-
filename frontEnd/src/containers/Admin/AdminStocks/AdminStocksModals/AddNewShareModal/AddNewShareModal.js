import React, { Component } from 'react';
import axios from 'axios';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import modalStyles from '../../../../../assets/css/Admin/AdminStocks/AdminStocksModals/UpdateShareModal/UpdateShareModal.css';

class AddNewShareModal extends Component {
    state = {
        shareName: null,
        shareTag: null,
        duration: null,
        file: null
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

        axios.post('http://localhost:5000/upload?pathName=tsvFiles', formData)
            .then(res => {
                console.log(res.data)
            })
            .catch(error => {
                console.log(error);
            }) 

    } 

    render() {
        return (
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
                            >
                            Add
                            </button>
                            <button
                                onClick={this.props.closeModal}
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
        );
    }
}

export default AddNewShareModal;