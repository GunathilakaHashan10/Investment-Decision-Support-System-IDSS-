import React, { Component } from 'react';
import { IoIosPerson } from 'react-icons/io';
import styles from '../../../../assets/css/Admin/AdminRealEstate/AdvertiserDetailsCard/AdvertiserDetailsCard.css';
import AdvertismentsDetailModal from '../AdvertismentsDetailModal/AdvertismentsDetailModal';

class AdvertiserDetailsCard extends Component {
    state = {
        isOpenDetailModal: false
    }

    handleOpenDetailModal = () => {
        this.setState({isOpenDetailModal: true});
    }

    handleCloseDetailModal = () => {
        this.setState({isOpenDetailModal: false});
    }

    render() {
        const { isOpenDetailModal } = this.state;
        return(
            <div className={styles.container}>
                <div className={styles.Card_container_box}>
                    <div className={styles.userName}>
                        <IoIosPerson size="1.5em" color="white" />
                        <span>Hashan Gunathilaka</span>
                    </div>
                    <div className={styles.user_detail_container}>
                        <span className={styles.label_container}>
                            <span>Email</span>
                            <span>:</span>
                        </span>
                        <span className={styles.user_data}>hashan@gmail.com</span>
                    </div>
                    <div className={styles.user_detail_container}>
                        <span className={styles.label_container}>
                            <span>Address</span>
                            <span>:</span>
                        </span>
                        <span className={styles.user_data}>Habarana</span>
                    </div>
                    <div className={styles.user_detail_container}>
                        <span className={styles.label_container}>
                            <span>Contact No</span>
                            <span>:</span>
                        </span>
                        <span className={styles.user_data}>+94774747949</span>
                    </div>
                    <div className={styles.button_container}>
                        <button>Block</button>
                        <button>Remove</button>
                        <button
                            onClick={this.handleOpenDetailModal}
                        >View</button>
                    </div>
                </div>
                
                { isOpenDetailModal && 
                    <AdvertismentsDetailModal 
                        closeModal={this.handleCloseDetailModal}
                    />
                }
            </div>
        )
    }
}

export default AdvertiserDetailsCard;