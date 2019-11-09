import React, { Component } from 'react';
import { IoIosPerson } from 'react-icons/io'
import styles from '../../../../assets/css/Admin/AdminUserControl/UserCard/UserCard.css';
import UserRemoveModal from '../UserModals/UserRemoveModal/UserRemoveModal';

class UserCard extends Component {
    state = {
        isOpenUserRemoveModal: false
    }

    handleOpenUserRemoveModal = () => {
        this.setState({isOpenUserRemoveModal: true})
    }

    handleCloseUserRemoveModal = () => {
        this.setState({isOpenUserRemoveModal: false})
        window.location.reload()
    }

    handleCancel = () => {
        this.setState({isOpenUserRemoveModal: false})
    }


    render(){
        const { firstName, lastName, email, isAdvertiser} = this.props.user
        return(
           <div className={styles.container}>
                <div className={styles.userCard_container_box}>
                    <div className={styles.userName}>
                        <IoIosPerson size="1.5em" color="white" />
                        <span>{`${firstName} ${lastName}`}</span>
                    </div>
                    <div className={styles.user_detail_container}>
                        <span className={styles.label_container}>
                            <span>Email</span>
                            <span>:</span>
                        </span>
                        <span className={styles.user_data}>{email}</span>
                    </div>
                    <div className={styles.user_detail_container}>
                        <span className={styles.label_container}>
                            <span>Advertiser</span>
                            <span>:</span>
                        </span>
                        <span className={styles.user_data}>{isAdvertiser ? "Yes" : "No"}</span>
                    </div>
                    <div className={styles.button_container}>
                        <button>Block</button>
                        <button
                            onClick={this.handleOpenUserRemoveModal}
                        >
                        Remove
                        </button>
                    </div>
                </div>
                {this.state.isOpenUserRemoveModal &&
                    <UserRemoveModal 
                        closeModal={this.handleCloseUserRemoveModal}
                        user={this.props.user}
                        handleCancel={this.handleCancel}
                    />

                }
           </div>
        )
    }
}

export default UserCard;