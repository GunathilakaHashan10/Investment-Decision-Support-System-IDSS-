import React, { Component } from 'react';
import * as myConstants from '../../../Utils/Constants/Constants';
import ReactLoading from 'react-loading';
import axios from 'axios';
import styles from '../../../../assets/css/Admin/AdminRealEstate/AdvertiserDetailsContainer/AdvertiserDetailsContainer.css';
import lodingStyles from '../../../../assets/css/ReactLoading/ReactLoading.css';
import AdvertiserDetailsCard from '../AdvertiserDetailsCard/AdvertiserDetailsCard';
import ErrorMessageModal from '../../../Utils/ErrorMessageModal/ErrorMessageModal';

class AdvertiserDetailsContainer extends Component {
    state = {
        isLoading: false,
        isSuccess: null,
        advertiserDetails: [],
        error: null,
        openErrorModal: false
    }

    handelCloseErrorMessageModal = () =>{
        this.setState({openErrorModal: false })
    }

    componentDidMount() {
        this.setState({ isLoading: true });

        axios
            .get(`${myConstants.SEVER_URL}/admin/getAdvertisers`)
            .then(response => {
                setTimeout(() => {
                    this.setState({
                        isLoading: false,
                        isSuccess: response.data.success,
                        advertiserDetails: response.data.docs
                    })
                }, 1000);
                
            })
            .catch(error => {
                this.setState({
                    error: error.message,
                    openErrorModal: true
                })
            })
    }
    render() {
        const { openErrorModal, advertiserDetails, isSuccess, isLoading } = this.state;
        let content = null;
        if(isLoading) {
            content = (
                <div className={lodingStyles.react_loading_container_fixed}>
                    <ReactLoading type={'spinningBubbles'} color={'#006AFF'} height={'4%'} width={'4%'} />
                </div>
            )
        } else if(isSuccess) {
            content = (
                <div className={styles.advertiserControlCard_container}>
                    {advertiserDetails.map(value => {
                        return (
                            <AdvertiserDetailsCard 
                                key={value._id}
                                advDetails={value}
                            />
                        )
                    })}
                </div>
            )
        } else if(!isSuccess) {
            content = (
                <div className={styles.advertiserControlCard_container}>
                    <h1>No advertisers</h1>
                   
                </div>
            )
        }
        return (
            <div className={styles.container}>
                {content}
                {openErrorModal && 
                    <ErrorMessageModal 
                        error={this.state.error}
                        closeModal={this.handelCloseErrorMessageModal}
                    />    
                }
                
            </div>
        )
    }
}

export default AdvertiserDetailsContainer;