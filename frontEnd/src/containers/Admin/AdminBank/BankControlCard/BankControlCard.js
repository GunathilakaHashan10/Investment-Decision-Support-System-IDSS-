import React, { Component } from 'react';
import styles from '../../../../assets/css/Admin/AdminBank/BankControlCard/BankControlCard.css';
import BankImage from '../../../../assets/images/Bank/4934c535-4470-4626-bea0-a5fd9cff5caa.jpeg';
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
        return(
            <div className={styles.container}>
                <div className={styles.bankCard_container_box}>
                    <div className={styles.bank_image_container}>
                        <img src={BankImage} alt="bankImage" className={styles.bank_image} />
                    </div>

                    <div className={styles.bank_card_details_container}>
                        <h2 className={styles.bank_name}>Bank of Ceylon</h2>
                        <p className={styles.description}>Your Money will grow with us,Giving you the best return in town!</p>
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
                    />
                }
                {isOpenDeleteBankModal &&
                    <DeleteBankModal 
                        closeModal={this.handleCloseDeleteBankModal}
                        bankName="Bank of Ceylon"
                        handleCancel={this.handleCancel}
                    />
                }
            </div>
        )
    }
}

export default BankControlCard;