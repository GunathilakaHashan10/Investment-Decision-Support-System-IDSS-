import React, { Component } from 'react';
import ReactLoading from 'react-loading';
import axios from 'axios';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import styles from '../SignupModal/AuthModal.css';
import formStyles from '../SignupModal/Auth.css';

class ResetPasswordModal extends Component {
    state = {
        isLoading:false,
        isSuccess: false,
        serverResponse: null,
        password: null,
        confirmPassword: null,
        isPasswordMatch: true,
        userEmail: this.props.userEmail
    }

    handleOnChange = (e) => {
        this.setState({
            [e.target.name]:e.target.value,
            isPasswordMatch: true
        })
    }

    handleSubmit = (e) => {
        this.setState({isLoading: true});
        e.preventDefault();
        const { password, confirmPassword, userEmail } = this.state;

        if(password !== confirmPassword) {
            return this.setState({ isPasswordMatch: false, isLoading: false});
        }

        const formData = new FormData();
        formData.append('newPassword', password);
        formData.append('userEmail', userEmail);

        axios
            .post('http://localhost:5000/auth/resetNewPassword', formData)
            .then(response => {
                setTimeout(() => {
                    this.setState({
                        isSuccess: response.data.success,
                        serverResponse: response.data.message,
                        isLoading: false
                    })
                },2000);
                console.log(response.data)
            })
            .catch(error => {
                this.setState({
                    isSuccess: true,
                    serverResponse: error.message
                })
            })


        
    }

    render() {
        const { isLoading, serverResponse, isPasswordMatch, isSuccess } = this.state;
        let modalContent = null;

        if(!isSuccess) {
            modalContent = (
                <div className={styles.modal}>
                <div className={styles.modal_container}>
                    <form className={formStyles.form_container} onSubmit={this.handleSubmit}>
                        <h3>Reset Password</h3>

                        <input
                            className={formStyles.form_input}
                            type="password"
                            name="password"
                            placeholder="Your new password"
                            required={true}
                            onChange={this.handleOnChange}
                        />
                        { !isPasswordMatch ? (
                            <span className={formStyles.form_errors}>Passwords are not matched</span>)
                            : ""
                        }

                        <input
                            className={formStyles.form_input}
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirm password"
                            required={true}
                            onChange={this.handleOnChange}
                        />

                        <button 
                            className={isLoading ? formStyles.form_button_loading : formStyles.form_button}
                            type={isLoading ? "" : "submit"}
                            
                        >
                        {isLoading 
                            ? 
                                <div className={formStyles.loading_container}>
                                    <ReactLoading type={'spin'} color={'white'} height={'20%'} width={'20%'} /> 
                                    <span>Please wait..</span>
                                </div>
                            :
                                "Reset"
                        }
                        </button>
                    </form>
                    <button 
                        className={styles.modal_closeButton}
                        onClick={this.props.closeModal}
                    >
                    <IoIosCloseCircleOutline size="2em" color="black"/>
                    </button>
                </div>
                
            
            </div>
            )
        } else {
            let messageType = null;
            if(serverResponse === "Reset password successfully") {
                messageType = "Your passoword was changed";
            } else if(serverResponse === "Invalid Request") {
                messageType = "Your reset password link is not valid";
            } else {
                messageType = "Please try again sortly";
            }
            modalContent = (
                <div className={styles.modal}>
                    <div className={styles.modal_container}>
                        <h3 className={styles.success_annotation}>{serverResponse}</h3>
                        <h4 className={styles.emial_success}>{messageType}</h4>
                        <button 
                            className={styles.modal_closeButton}
                            onClick={this.props.closeModal}
                        >
                        <IoIosCloseCircleOutline size="2em" color="black"/>
                        </button>
                    </div>
                    
                </div>
            )
        }
        return(
            <div>
                {modalContent}
            </div>
        )
    }
} 

export default ResetPasswordModal;