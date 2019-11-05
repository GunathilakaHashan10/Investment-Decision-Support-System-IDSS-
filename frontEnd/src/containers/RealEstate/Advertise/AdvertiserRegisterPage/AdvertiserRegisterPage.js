import React, { Component } from 'react';
import JwtDecode from 'jwt-decode';
import axios from 'axios';
import ReactLoading from 'react-loading';
import styles from '../../../../assets/css/RealEstate/Advertise/AdvertiserRegisterPage/AdvertiserRegisterPage.css';
import EX1 from '../../../../assets/images/Homes/ExH2.jpg';
import MessageModal from '../MessageModal/MessageModal';

class AdvertiserRegisterPage extends Component {
    state = {
        companyName: null,
        contactNo: null,
        address: null,
        message: null,
        isModalOpen: false,
        isLoading: false,
        error: null
    }

    handelOnChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleModalClose = () => {
        this.setState({ isModalOpen: false });
        window.location.reload();
    }

    handleSubmit = (e) => {
        const { contactNo, address } = this.state;
        if(contactNo !== null && address !== null) {
            e.preventDefault();
            this.setState({ isLoading: true });

            const token = localStorage.getItem('token');
            const decodedToken = JwtDecode(token);
            const uId = decodedToken.userId;

            const formData = new FormData();
            formData.append('companyName', this.state.companyName);
            formData.append('contactNo', this.state.contactNo);
            formData.append('address', this.state.address);
            formData.append('userId', uId);

            axios.post('http://localhost:5000/advertiser/registerAdvertiser', formData)
                .then(response => {
                    console.log(response.data)
                    setTimeout(() => {
                        this.setState({
                            message: response.data.message,
                            isLoading: false
                        })
                        if(this.state.message != null) {
                            this.setState({ isModalOpen: true});
                        }
                        
                    }, 2500);
                    
                })
                .catch(error => {
                    console.log(error);
                })
        } else {
            this.setState({ error: true });
        }
    }

    render() {
        return(
            <div className={styles.container}>
                <div className={styles.side_image_container}>
                    <img src={EX1} alt="home" className={styles.background_image}/>
                    <div>
                        <span className={styles.annotaion}>Start your buisness here</span>
                    </div>
                </div>
                <div >
                <form className={styles.form_container}>
                <h3 className={styles.form_header}>Register as advertiser</h3>
                    <input
                        className={styles.form_input}
                        type="text"
                        name="companyName"
                        placeholder="Comapany Name(Optinal)"
                        required={false}
                        onChange={this.handelOnChange}
                        
                    />

                    <input
                        className={styles.form_input}
                        type="text"
                        name="address"
                        placeholder="Your address"
                        required={true}
                        onChange={this.handelOnChange}
                    />

                    <input
                        className={styles.form_input}
                        type="text"
                        name="contactNo"
                        placeholder="Your contact number"
                        required={true}
                        onChange={this.handelOnChange}
                    />

                    <button 
                        className={styles.form_button}
                        onClick={this.handleSubmit}
                    >
                     { this.state.isLoading && 
                        ( <div className={styles.react_loading_container}>
                            <ReactLoading type={'spin'} color={'white'} height={'1.5em'} width={'1.5em'} />
                        </div>) }
                    <span className={styles.button_annotation}>Register</span> 
                    </button>
                
            </form>
                </div>
            {this.state.isModalOpen && <MessageModal closeModal={this.handleModalClose} message={this.state.message}/>}
            </div>
        )
    }
}

export default AdvertiserRegisterPage;