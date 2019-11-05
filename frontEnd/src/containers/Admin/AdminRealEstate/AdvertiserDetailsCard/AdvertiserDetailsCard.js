import React, { Component } from 'react';
import { IoMdPerson, IoIosMail, IoIosPhonePortrait, IoIosNavigate } from 'react-icons/io';
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
                <div className={styles.profile_pic_container}>
                    <IoMdPerson size="8rem"  />
                </div>

                <div className={styles.details_container}>
                    <div className={styles.detail_box}>
                        <span className={styles.icon_container}><IoMdPerson size="1.5rem"  /></span>
                        <span className={styles.detail}>Hashan Gunathilaka</span>
                    </div>
                    <div className={styles.detail_box}>
                        <span className={styles.icon_container}><IoIosNavigate size="1.5rem"  /></span>
                        <span className={styles.detail}>School Road, Habarana</span>
                    </div>
                    <div className={styles.detail_box}>
                        <span className={styles.icon_container}><IoIosMail size="1.5rem"  /></span>
                        <span className={styles.detail}>hashan5912014@gmail.com</span>
                    </div>
                    <div className={styles.detail_box}>
                        <span className={styles.icon_container}><IoIosPhonePortrait size="1.5rem"  /></span>
                        <span className={styles.detail}>+94774747949</span>
                    </div>
                </div>
                <div className={styles.time_period}>
                    <span>Since 1 year</span>
                </div>

                <button 
                    className={styles.moreDetails_button}
                    onClick={this.handleOpenDetailModal}
                >
                    Advertisment Details
                </button>
                { isOpenDetailModal && <AdvertismentsDetailModal closeModal={this.handleCloseDetailModal}/>}
            </div>
        )
    }
}

export default AdvertiserDetailsCard;