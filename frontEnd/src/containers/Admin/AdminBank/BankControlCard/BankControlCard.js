import React, { Component } from 'react';
import * as myConstants from '../../../Utils/Constants/Constants';
import styles from '../../../../assets/css/Admin/AdminBank/BankControlCard/BankControlCard.css';
import EditBankModal from '../AdminBankModals/EditBankModal/EditBankModal';
import DeleteBankModal from '../AdminBankModals/DeleteBankModal/DeleteBankModal';

class BankControlCard extends Component {
    state = {
        isOpenEditBankModal: false,
        isOpenDeleteBankModal: false
    }

    handleOpenEditBankModal = () => {
        this.setState({isOpenEditBankModal: true});
    }

    handleCloseEditBankModal = () => {
        this.setState({isOpenEditBankModal: false});
        window.location.reload();
    }

    handleCancelEditBankModal = () => {
        this.setState({isOpenEditBankModal: false});
    }

    handleOpenDeleteBankModal = () => {
        this.setState({isOpenDeleteBankModal: true})
    }

    handleCloseDeleteBankModal = () => {
        this.setState({isOpenDeleteBankModal: false})
        window.location.reload();
    }

    handleCancel = () => {
        this.setState({isOpenDeleteBankModal: false})
    }

    

    render() {
        const { isOpenEditBankModal, isOpenDeleteBankModal } = this.state;
        const { bankName, description, bankImage } = this.props.bankData;
        return(
            <div className={styles.container}>
                <div className={styles.bankCard_container_box}>
                    <div className={styles.bank_image_container}>
                        <img src={`${myConstants.SEVER_URL}/${bankImage[0].imagePath}`} alt="bankImage" className={styles.bank_image} />
                    </div>

                    <div className={styles.bank_card_details_container}>
                        <h2 className={styles.bank_name}>{bankName}</h2>
                        <p className={styles.description}>{description}</p>
                        <div className={styles.button_container}>
                            <button 
                                className={styles.control_button}
                                onClick={this.handleOpenEditBankModal}
                            >
                                Edit
                            </button>
                            <button 
                                className={styles.control_button}
                                onClick={this.handleOpenDeleteBankModal}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
                {isOpenEditBankModal &&
                    <EditBankModal 
                        closeModal={this.handleCloseEditBankModal}
                        bankData={this.props.bankData}
                        handleCancel={this.handleCancelEditBankModal}
                    />
                }
                {isOpenDeleteBankModal &&
                    <DeleteBankModal 
                        closeModal={this.handleCloseDeleteBankModal}
                        handleCancel={this.handleCancel}
                        bankId={this.props.bankData._id}
                        bankName={this.props.bankData.bankName}
                    />
                }
            </div>
        )
    }
}

export default BankControlCard;