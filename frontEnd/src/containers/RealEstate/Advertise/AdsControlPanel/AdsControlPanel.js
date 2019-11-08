import React, { Component } from 'react';
import JwtDecode from 'jwt-decode';
import axios from 'axios';
import { Route } from 'react-router-dom';
import ReactLoading from 'react-loading';
import * as myConstants from '../../../Utils/Constants/Constants';
import lodingStyles from '../../../../assets/css/ReactLoading/ReactLoading.css';
import styles from '../../../../assets/css/RealEstate/Advertise/AdsControlPanel/AdsControlPanel.css';
import AdsSideNav from '../AdsSideNav/AdsSideNav';
import AllAds from '../AllAds/AllAds';
import AdsPublishContainer from '../AdsPublishContainer/AdsPublishContainer';
import AdvertiserRegisterPage from '../AdvertiserRegisterPage/AdvertiserRegisterPage';
import ErrorMessageModal from '../../../Utils/ErrorMessageModal/ErrorMessageModal';

class AdsControlPanel extends Component {
    state = {
        loading: true,
        isAdvertiser: false,
        error: null,
        openErrorModal: false
    }

    handleCloseErrorModal = () => {
        this.setState({openErrorModal: false});
    }

    componentDidMount() {
        const token = localStorage.getItem('token');
        const decodedToken = JwtDecode(token);
        const uId = decodedToken.userId;

        

        axios.get(`${myConstants.SEVER_URL}/advertiser/checkIsAdvertiser?id=` + uId)
            .then(response => {
                setTimeout(() => {
                    this.setState({ 
                        isAdvertiser: response.data.isAdvertiser,
                        loading: false 
                    });
                },1500);
               
            })
            .catch(error => {
                this.setState({
                    error: error.message,
                    openErrorModal: true
                })
            })

    }

    handleNavigation = (event) => {
        this.props.history.push(`${this.props.match.url}${event.currentTarget.id}`);
    }
   
    render() {
        const { isAdvertiser } = this.state;
        let content = null;
        if(!isAdvertiser) {
            content = (<AdvertiserRegisterPage />);
        } else {
            content = (
                <div >
                    <AdsSideNav handleNav={this.handleNavigation}/>
                    <Route path={`${this.props.match.path}`} exact={true} component={AllAds}/>
                    <Route path={`${this.props.match.path}/home-ads`} component={AllAds}/>
                    <Route path={`${this.props.match.path}/land-ads`} component={AllAds}/>
                    <Route path={`${this.props.match.path}/publish`} component={AdsPublishContainer}/>
                </div>
            )
        }
        return (
            <div>
            {
                this.state.loading 
                ?   <div className={lodingStyles.react_loading_container_fixed}>
                         <ReactLoading type={'spinningBubbles'} color={'#006AFF'} height={'4%'} width={'4%'} />
                    </div>
                :
                <div>
                    {content}
                </div>
                
                    
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

export default AdsControlPanel;