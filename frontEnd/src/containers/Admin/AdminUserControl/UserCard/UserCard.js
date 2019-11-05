import React, { Component } from 'react';
import { IoIosPerson } from 'react-icons/io'
import styles from '../../../../assets/css/Admin/AdminUserControl/UserCard/UserCard.css';

class UserCard extends Component {
    render(){
        return(
           <div className={styles.container}>
                <div className={styles.userCard_container_box}>
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
                            <span>Advertiser</span>
                            <span>:</span>
                        </span>
                        <span className={styles.user_data}>No</span>
                    </div>
                    <div className={styles.button_container}>
                        <button>Block</button>
                        <button>Remove</button>
                    </div>
                </div>
           </div>
        )
    }
}

export default UserCard;