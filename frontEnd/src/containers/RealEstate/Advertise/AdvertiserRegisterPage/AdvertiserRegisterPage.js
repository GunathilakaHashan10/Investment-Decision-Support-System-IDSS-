import React, { Component } from 'react';
import JwtDecode from 'jwt-decode';
import axios from 'axios';
import ReactLoading from 'react-loading';
import * as myConstants from '../../../Utils/Constants/Constants';
import styles from '../../../../assets/css/RealEstate/Advertise/AdvertiserRegisterPage/AdvertiserRegisterPage.css';
import EX1 from '../../../../assets/images/Homes/ExH2.jpg';
import MessageModal from '../MessageModal/MessageModal';
import ErrorMessageModal from '../../../Utils/ErrorMessageModal/ErrorMessageModal';

class AdvertiserRegisterPage extends Component {
    state = {
        companyName: null,
        contactNo: null,
        address: null,
        message: null,
        isModalOpen: false,
        isLoading: false,
        error: null,
        openErrorModal: false,
        formErrors: {
            address: "",
            contactNo: ""
        },
        isFormErrors: false
    }

    handleCloseErrorModal = () => {
        this.setState({openErrorModal: false});
    }

    handelOnChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })

        const formErrors = {...this.state.formErrors}
        const { name, value } = e.target;
        
        switch(name) {
            case "address":
                if(value.length < 6) {
                    formErrors.address = "minimum 6 characters required";
                } else {
                    formErrors.address = ""
                }
                break;
            case "contactNo": {
                if(value.length < 9) {
                    formErrors.contactNo = "contact no is not valid"
                } else {
                    formErrors.contactNo = ""
                }
                break;
            }   
            default: break;   
        }
        this.setState({ formErrors });
    }

    handleModalClose = () => {
        this.setState({ isModalOpen: false });
        window.location.reload();
    }

    handleSubmit = (e) => {
        e.preventDefault();
        
        const { address, contactNo, companyName } = this.state;
        const formErrors = {...this.state.formErrors};

        if(formErrors.address.length > 0){
            return this.setState({isFormErrors:true});
        } else if(formErrors.contactNo.length > 0) {
            return this.setState({isFormErrors:true});
        }
        const formData = new FormData();
        const token = localStorage.getItem('token');
        const decodedToken = JwtDecode(token);
        const uId = decodedToken.userId;

        this.setState({ isLoading: true });
        formData.append('companyName',companyName);
        formData.append('contactNo', contactNo);
        formData.append('address',address);
        formData.append('userId', uId);

        axios.post(`${myConstants.SEVER_URL}/advertiser/registerAdvertiser`, formData)
            .then(response => {
                setTimeout(() => {
                    this.setState({
                        message: response.data.message,
                        isLoading: false
                    })
                    if(this.state.message != null) {
                        this.setState({ isModalOpen: true});
                    }
                    
                }, 1500);
                
            })
            .catch(error => {
                this.setState({
                    error: error.message,
                    openErrorModal: true
                })
            })
        
    }

    render() {
        const { isFormErrors } = this.state;
        const formErrors = {...this.state.formErrors};
        return(
            <div className={styles.container}>
                <div className={styles.side_image_container}>
                    <img src={EX1} alt="home" className={styles.background_image}/>
                    <div>
                        <span className={styles.annotaion}>Start your buisness here</span>
                    </div>
                </div>
                <div >
                <form className={styles.form_container} onSubmit={this.handleSubmit}>
                <h3 className={styles.form_header}>Register as advertiser</h3>
                    <input
                        className={styles.form_input}
                        type="text"
                        name="companyName"
                        placeholder="Comapany Name(Optinal)"
                        required={false}
                        onChange={this.handelOnChange}
                        
                    />
                    {isFormErrors && formErrors.address.length > 0 ? <span className={styles.error_message}>{formErrors.address}</span> : ""}
                    <input
                        className={styles.form_input}
                        type="text"
                        name="address"
                        placeholder="Your address"
                        required={true}
                        onChange={this.handelOnChange}
                    />

                    {isFormErrors && formErrors.contactNo.length > 0 ? <span className={styles.error_message}>{formErrors.contactNo}</span> : ""}
                    <input
                        className={styles.form_input}
                        type="text"
                        name="contactNo"
                        placeholder="Your contact number"
                        required={true}
                        onChange={this.handelOnChange}
                    />

                    <button 
                        type="submit"
                        className={styles.form_button}
                    >
                     { this.state.isLoading && 
                        ( <div className={styles.react_loading_container}>
                            <ReactLoading type={'spin'} color={'white'} height={'1.5em'} width={'1.5em'} />
                        </div>) }
                    <span className={styles.button_annotation}>Register</span> 
                    </button>
                
            </form>
                </div>
            {this.state.isModalOpen && 
                <MessageModal 
                    closeModal={this.handleModalClose} 
                    message={this.state.message}
                    />
            }
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

export default AdvertiserRegisterPage;