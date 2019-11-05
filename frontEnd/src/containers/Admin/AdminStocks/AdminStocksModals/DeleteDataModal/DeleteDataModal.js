import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker-cssmodules.css";
import ReactLoading from 'react-loading';
import lodingStyles from '../../../../../assets/css/ReactLoading/ReactLoading.css';
import modalStyles from '../../../../../assets/css/Admin/AdminStocks/AdminStocksModals/DeleteDataModal/DeleteDataModal.css';

class DeleteDataModal extends Component {
    state = {
        minDate: new Date(this.props.shareData.startDate),
        maxDate: new Date(this.props.shareData.endDate),
        startDate: new Date(this.props.shareData.startDate),
        endDate: new Date(this.props.shareData.endDate),
        shareId: this.props.shareData.id,
        isLoading: false,
        isDeleteSuccess: null,
        result: null
    }

    handleStartDateChange = (date) => {
        this.setState({
            startDate: date
        });
      }
  
    handleEndDateChange = (date) => {
        this.setState({
            endDate: date
        });
    }

    handleDeleteData = () => {
        this.setState({isLoading: true});
        let formData = new FormData();

        formData.append('startDate', this.state.startDate);
        formData.append('endDate', this.state.endDate);
        formData.append('id', this.state.shareId);

        axios.post('http://localhost:5000/deleteData', formData)
            .then(response => {
                setTimeout(() => {
                    this.setState({
                        isDeleteSuccess: response.data.message,
                        result: response.data.result,
                        isLoading: false
                    })
                },2000)
                
            })
            .catch(error => {
                console.log(error);
            })
    }

    render() {
        const { shareData } = this.props;
        const { isLoading, isDeleteSuccess, result} = this.state;
        let mainContent = null;

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


        if(isDeleteSuccess === null){
            mainContent = (
                <div>
                    <div className={modalStyles.shareUpdate_container}>
                    <h2 className={modalStyles.share_name}>{`Delete Data on ${shareData.shareName}`}</h2>
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

                    <div className={modalStyles.deletionConfig_container}>
                        <div className={modalStyles.share_details_container}>
                            <span className={modalStyles.label_container_date}>
                                <span>Select Start Date</span>
                                <span>:</span>
                            </span>
                            <DatePicker
                                selected={this.state.startDate}
                                onChange={this.handleStartDateChange}
                                className={modalStyles.date_picker}
                                minDate={this.state.minDate}
                                maxDate={this.state.maxDate}
                            />
                        </div>
                        <div className={modalStyles.share_details_container}>
                            <span className={modalStyles.label_container_date}>
                                <span>Select End Date</span>
                                <span>:</span>
                            </span>
                            <DatePicker
                                selected={this.state.endDate}
                                onChange={this.handleEndDateChange}
                                className={modalStyles.date_picker}
                                minDate={this.state.minDate}
                                maxDate={this.state.maxDate}
                            />
                        </div>
                    </div>
                    
                    <div className={modalStyles.button_container}>
                        <button
                            onClick={this.handleDeleteData}
                        >Delete</button>
                        <button
                            onClick={this.props.handleCancel}
                        >
                        Cancel
                        </button>
                    </div>
                    </div>  
                </div>
            )
        }  else if (isDeleteSuccess === "success") {
            mainContent = (
                <div>
                    <div>
                        <h3>{result}</h3>
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
            mainContent = (
                <div>
                    <div>
                        <h3>Operation failed.</h3>
                        <div className={modalStyles.button_container_response}>
                            <button
                                onClick={this.props.handleCancel}
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
                    {isLoading ? reactLoading : mainContent}
                </div>
            </div>
        )
    }
}

export default DeleteDataModal;