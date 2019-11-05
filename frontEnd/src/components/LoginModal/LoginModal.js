import React, { Component } from 'react';
import axios from 'axios';
import ReactLoading from 'react-loading';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import styles from '../SignupModal/AuthModal.css';
import formStyles from '../SignupModal/Auth.css';


class LoginModal extends Component {
    state = {
        email: null || this.props.userEmail,
        password: null,
        isVerified: true,
        isPasswordInCorrect: false,
        isEmailExits: false,
        isLoading: false,
        isVerifiedNow: false || this.props.isVerifiedNow,
        isOpenResetPassword: false,
        rEmail: null,
        error: null,
        openErrorModal: false,
        isResetLinkSuccess: false,
        resetPasswordResponse: null
    }

    handleOnChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
            isEmailExits: false,
            isPasswordInCorrect: false,
        });
    }

    handleOnChangeResetPasswordEmail = (event) => {
        this.setState({
            [event.target.name]:event.target.value
        })
    }

    handleSwapResetModal = () => {
        this.setState({ isOpenResetPassword: true});
    }

    handleSubmit = (event) => {
        this.setState({ isLoading: true });
        event.preventDefault();
        fetch('http://localhost:5000/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: this.state.email,
                    password: this.state.password
                })
            })
            .then(res => {
            if (res.status === 422) {
                throw new Error('Validation failed');
            }

            if (res.status === 401) {
                this.setState({ isPasswordInCorrect: true, isLoading: false});
            } else {
                this.setState({ isPasswordInCorrect: false });
            }

            if (res.status === 402) {
                this.setState({ isEmailExits: true, isLoading: false });
            } else {
                this.setState({ isEmailExits: false });
            }
            return res.json();
            })
            .then(resData => {
                setTimeout(() => {
                    this.setState({isLoading:false})
                    if(resData.message === 'User is not verified' ) {
                        return this.setState({ isVerified: false });
                    }
                    localStorage.setItem('token', resData.token);
                    localStorage.setItem('RDACTD', resData.userId);
                    localStorage.setItem('RDACTP', resData.accountType);
                    const remainingMilliseconds = 60 * 60 * 1000;
                    const expiryDate = new Date(
                        new Date().getTime() + remainingMilliseconds
                    );
                    localStorage.setItem('expiryDate', expiryDate.toISOString());

                    if(resData.accountType === "2485693124578965412478933254895464123648") {
                        this.props.history.push("/admin");
                        window.location.reload();
                    } else if (resData.accountType === "284695743215") {
                        this.props.history.push("/dashboard");
                        window.location.reload();
                    } else {
                        this.props.history.push("/");
                        // window.location.reload();
                    }
                },3000)
                
            })
            .catch(error => {
                this.setState({
                    error: error.message,
                    openErrorModal: true
                })
            })
    }

    handleSubmitResetPasswordEmail = (event) => {
        this.setState({ isLoading: true });
        event.preventDefault();

        const formData = new FormData();
        formData.append('rEmail', this.state.rEmail);

        axios.post('http://localhost:5000/auth/resetPassword', formData)
            .then(response => {
                setTimeout(() => {
                    this.setState({
                        isResetLinkSuccess: response.data.success,
                        isLoading: false,
                        resetPasswordResponse: response.data.message
                    })
                })
            })
            .catch(error => {
                this.setState({
                    error: error.message,
                    openErrorModal: true
                })
            })
    }

    render() {
        const { isLoading, email, isVerifiedNow, isOpenResetPassword, isResetLinkSuccess, resetPasswordResponse } = this.state;
        let renderedComponent = null;
        if(this.state.isVerified) {
            if(isOpenResetPassword) {
                if(!isResetLinkSuccess) {
                renderedComponent = (
                    <div className={styles.modal}>
                        <div className={styles.modal_container}>
                            <form className={formStyles.form_container} onSubmit={this.handleSubmitResetPasswordEmail}>
                                <h3>Reset Password</h3>
                                <input
                                    className={formStyles.form_input}
                                    type="email"
                                    name="rEmail"
                                    placeholder="Your email"
                                    required={true}
                                    onChange={this.handleOnChangeResetPasswordEmail}
                                />
                                {isResetLinkSuccess && <span>Success</span>}
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
                    if(resetPasswordResponse === "Email sent successfully."){
                        messageType = "Please visit your email and click the reset password link"
                    } else if(resetPasswordResponse === "Email is not valid") {
                        messageType = "Entered email is not registered"
                    } else if(resetPasswordResponse === "Failed to send email") {
                        messageType = "Please try again"
                    }
                    renderedComponent = (
                        <div className={styles.modal}>
                            <div className={styles.modal_container}>
                            <h3 className={styles.success_annotation}>{resetPasswordResponse}</h3>
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
            } else {
                renderedComponent = (
                    <div className={styles.modal}>
                        <div className={styles.modal_container}>
                            <form className={formStyles.form_container} onSubmit={this.handleSubmit}>
                                <h3>Login</h3>

                                    {this.state.isEmailExits && <span className={formStyles.form_errors}>A user with this email could not be found.</span>}
                                    {isVerifiedNow && <span className={formStyles.verified_annotation}>verified</span>}
                                    <input
                                        className={isVerifiedNow ? formStyles.form_input_email_verified : formStyles.form_input}
                                        type="email"
                                        name="email"
                                        placeholder="Your email"
                                        value={email}
                                        required={true}
                                        onChange={this.handleOnChange}
                                    />

                                    {this.state.isPasswordInCorrect && <span className={formStyles.form_errors}>Password is incorrect</span>}

                                    <input
                                        className={formStyles.form_input}
                                        type="password"
                                        name="password"
                                        placeholder="Your password"
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
                                            "Login"
                                    }
                                    </button>
                                    <br/><br/>

                                    <button 
                                        className={formStyles.reset_pw_link}
                                        onClick={this.handleSwapResetModal}
                                    >
                                        Don't remember password
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
                );
                            }
        } else {
            renderedComponent = (
                <div className={styles.modal}>
                    <div className={styles.modal_container}>
                        <h3 className={styles.success_annotation}>Please verify your account</h3>
                        <h4 className={styles.emial_success}>Please visit to your email and click the verification link</h4>
                    <button 
                        className={styles.modal_closeButton}
                        onClick={this.props.closeModal}
                    >
                    <IoIosCloseCircleOutline size="2em" color="black"/>
                    </button>
                    </div>
                </div>
            );
        }
        return (
            <div>
                {renderedComponent}
            </div>
        );
    }
}

export default LoginModal;