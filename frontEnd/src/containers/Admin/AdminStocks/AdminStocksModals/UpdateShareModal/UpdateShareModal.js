import React, { Component } from 'react';
import modalStyles from '../../../../../assets/css/Admin/AdminStocks/AdminStocksModals/UpdateShareModal/UpdateShareModal.css';

class UpdateShareModal extends Component {
    render() {
        const { shareData } = this.props; 
        return (
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
                            <input type="file" className={modalStyles.share_data}/>
                        </div>
                        <div className={modalStyles.button_container}>
                            <button>Update</button>
                            <button
                                onClick={this.props.closeModal}
                            >
                            Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default UpdateShareModal;