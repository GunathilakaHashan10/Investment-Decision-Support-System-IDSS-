import React, { Component } from 'react';
import axios from 'axios';
import * as myConstants from '../../../Utils/Constants/Constants';
import styles from '../../../../assets/css/Admin/AdminUserControl/UserCardContainer/UserCardContainer.css';
import UserCard from '../UserCard/UserCard';
import ErrorMessageModal from '../../../Utils/ErrorMessageModal/ErrorMessageModal';

class UserCardContainer extends Component {
    state = {
        error: null,
        openErrorModal: false,
        userData: [],
        isSuccess: false
    }

    handleCloseErrorModal = () => {
        this.setState({openErrorModal:false})
    }

    componentDidMount() {
        axios
            .get(`${myConstants.SEVER_URL}/admin/get-all-users`)
            .then((response) => {
                if(response.data.success) {
                    this.setState({
                        userData:response.data.userData,
                        isSuccess: response.data.success
                    })
                } 
            })
            .catch((error) => {
                this.setState({
                    error:error.message,
                    openErrorModal: true
                })
            })
    }

    render(){
        const { userData, isSuccess } = this.state;
        let content = null;
        if(isSuccess) {
            content = (
                <div className={styles.userControlCard_container}>
                    { userData.map((user) => {
                        let card = null;
                        if(user.accountType !== "2485693124578965412478933254895464123648") {
                            card = ( <UserCard 
                                key={user._id}
                                user={user}
                             />)
                        }
                        return card;
                        
                    })
                    }
                </div>
            )
        } else {
            content = (
                <div className={styles.userControlCard_container}>
                    <h1>No users</h1>
                    <h1>No users</h1>
                    <h1>No users</h1>
                    <h1>No users</h1>
                </div>
            )
        }
        return(
            <div className={styles.container }>
                {content}
                {this.state.openErrorModal &&
                    <ErrorMessageModal 
                        closeModal={this.handleCloseErrorModal}
                        error={this.state.error}
                    />
                }
            </div>
        )
    }
}

export default UserCardContainer;