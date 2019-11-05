import React, { Component } from 'react';
import axios from 'axios';
import queryString from 'query-string';
import ReactLoading from 'react-loading';
import HomePageNavBar from '../../components/HomePageNavBar/HomePageNavBar';
import SignupModal from '../../components/SignupModal/SignupModal';
import LoginModal from '../../components/LoginModal/LoginModal';
import ResetPasswordModal from '../../components/ResetPasswordModal/ResetPasswordModal';
import ErrorMessageModal from '../Utils/ErrorMessageModal/ErrorMessageModal';
import ImageSlider from './ImageSlider';
import styles from '../../assets/css/HomePage/HomePage.css';

class HomePage extends Component {
    state = {
        isOpenSignup: false,
        isOpenLogin: false,
        isOpenResetPasswordModal: false,
        isVarificationSuccess: false,
        isLoading: false,
        error: null,
        openErrorModal: false,
        userEmail: null
    }

    handleCloseErrorMessageModal = () => {
        this.setState({ openErrorModal: false });
    }

    componentDidMount() {
        const value = queryString.parse(this.props.location.search);
        const token = value.token;
        const resetPasswordToken = value.resetPasswordToken;

        if(token) {
            this.setState({isLoading: true})
            axios.get('http://localhost:5000/auth/verifyEmail', {
                        params: {
                            verifiedToken: token
                        }
                    })
                    .then(response => {
                        setTimeout(() => {
                            if(response.data.message === "email was verified successfully") {
                                this.setState({ 
                                    isVarificationSuccess: true,
                                    isLoading: false,
                                    isOpenLogin: true,
                                    userEmail: response.data.userEmail
                                 });
                            } else {
                                this.setState({ 
                                    isVarificationSuccess: false,
                                    isLoading: false
                                 });
                            }
                        }, 2000);
                        
                    })
                    .catch(error => {
                        this.setState({
                            error: error.message,
                            openErrorModal: true
                        })
                    })
        }
        if(resetPasswordToken) {
            this.setState({isLoading: true})
            console.log(resetPasswordToken)
            axios
                .get('http://localhost:5000/auth/verifyResetPassword', {
                    params: {
                        resetPasswordToken: resetPasswordToken
                    }
                })
                .then(response => {
                    setTimeout(() => {
                        this.setState({
                            isLoading: false,
                            userEmail: response.data.userEmail,
                            isOpenResetPasswordModal: true
                        })
                    }, 2000);
                    console.log(response.data)
                })
                .catch(error => {
                    if(error.message === "Request failed with status code 500"){
                        this.setState({
                            error: "Reset password token was expired",
                            openErrorModal: true,
                            isLoading: false
                        })
                    }
                    
                })
        }
    }

    handleOpenSignupModal = () => {
        this.setState({ isOpenSignup: true });
    }

    handleOpenLoginModal = () => {
        this.setState({ isOpenLogin: true });
    }

    handleCloseSignupModal = () => {
        this.setState({ isOpenSignup: false });
    }

    handleCloseLoginModal = () => {
        this.setState({ isOpenLogin: false });
    }

    handleCloseResetPasswordModal = () => {
        this.setState({ isOpenResetPasswordModal: false});
    }

    

    
    render() {
      
        return (
                <div className={styles.page_container}>
                    <HomePageNavBar 
                        openSignup={this.handleOpenSignupModal}
                        openLogin={this.handleOpenLoginModal}
                    />
                    <div className={styles.homePage_content}>
                        <ImageSlider />
                        <div className={styles.button_container}>
                            <button 
                                className={styles.getStarted_button}
                                onClick={this.handleOpenSignupModal}
                            >
                            Get started
                            </button>
                        </div>
                        <div className={styles.homePage_card_container}>
                            <div className={styles.homePage_card}>
                                <div className={styles.card_details_container}>
                                    <div className={styles.card_header}>
                                        Stock market
                                    </div>
                                    <div className={styles.details_container}>
                                        <div className={styles.card_detail}>
                                            Graphical view of stocks data
                                        </div>
                                        <div className={styles.card_detail}>
                                            calculations
                                        </div>
                                        <div className={styles.card_detail}>
                                            Moving average line
                                        </div>
                                        <div className={styles.card_detail}>
                                            Trend line
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.homePage_card}>
                                <div className={styles.card_details_container}>
                                    <div className={styles.card_header}>
                                        Banking
                                    </div>
                                    <div className={styles.details_container}>
                                        <div className={styles.card_detail}>
                                            Fixed Deposits information
                                        </div>
                                        <div className={styles.card_detail}>
                                            Calculate Interest & AER
                                        </div>
                                        <div className={styles.card_detail}>
                                            Compare your calculations
                                        </div>
                                        
                                    </div>
                                </div>
                            </div>
                            <div className={styles.homePage_card}>
                                <div className={styles.card_details_container}>
                                    <div className={styles.card_header}>
                                        Real Estate
                                    </div>
                                    <div className={styles.details_container}>
                                        <div className={styles.card_detail}>
                                            Find a better property
                                        </div>
                                        <div className={styles.card_detail}>
                                            Start your Advertising
                                        </div>
                                       
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {
                        this.state.isLoading &&
                            <div className={styles.loading_container}>
                                <ReactLoading type={'spin'} color={'white'} height={'10%'} width={'10%'} /> 
                            </div>
                    }
                    {this.state.isOpenLogin && 
                        <LoginModal 
                            history={this.props.history} 
                            closeModal={this.handleCloseLoginModal}
                            userEmail={this.state.userEmail}
                            isVerifiedNow={this.state.isVarificationSuccess}
                        />
                    }
                    {this.state.isOpenSignup && 
                        <SignupModal 
                            history={this.props.history} 
                            closeModal={this.handleCloseSignupModal}
                        />
                    }
                    {this.state.isOpenResetPasswordModal &&
                        <ResetPasswordModal 
                            history={this.props.history}
                            closeModal={this.handleCloseResetPasswordModal}
                            userEmail={this.state.userEmail}
                        />

                    }
                    {this.state.openErrorModal &&
                        <ErrorMessageModal 
                            closeModal={this.handleCloseErrorMessageModal}
                            error={this.state.error}
                        />
                        
                    }


                </div>
        )
    }
}

export default HomePage;