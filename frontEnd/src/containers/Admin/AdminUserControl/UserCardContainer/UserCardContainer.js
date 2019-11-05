import React, { Component } from 'react';
import styles from '../../../../assets/css/Admin/AdminUserControl/UserCardContainer/UserCardContainer.css';
import UserCard from '../UserCard/UserCard';

class UserCardContainer extends Component {
    render(){
        return(
            <div className={styles.container }>
                <div className={styles.userControlCard_container}>
                    <UserCard />
                    <UserCard />
                    <UserCard />
                    <UserCard />
                    <UserCard />
                    <UserCard />
                    <UserCard />
                    <UserCard />
                </div>
            </div>
        )
    }
}

export default UserCardContainer;