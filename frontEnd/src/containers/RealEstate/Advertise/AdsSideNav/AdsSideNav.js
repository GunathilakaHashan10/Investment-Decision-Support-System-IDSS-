import React, { Component } from 'react';
import JwtDecode from 'jwt-decode';
import axios from 'axios';
import * as myConstants from '../../../Utils/Constants/Constants';
import { IoMdArrowDropright, IoMdArrowDropleft} from 'react-icons/io';
import styles from '../../../../assets/css/Admin/ControlPanelSideNav/ControlPanelSideNav.css';
import MessageInboxModal from '../MessageInboxModal/MessageInboxModal';
import ErrorMessageModal from '../../../Utils/ErrorMessageModal/ErrorMessageModal';

class AdsSideNav extends Component {
    state = {
        isOpenMyAds: false,
        isOpenPublish: false,
        isOpenMessages: false,
        isOpenMessageInboxModal: false,
        error: null,
        errorModalOpen: false,
        advertiserMessages: []
    }

    componentDidMount() {
        const token = localStorage.getItem('token');
        const decodedToken = JwtDecode(token);
        const pId = decodedToken.userId;

        axios.get(`${myConstants.SEVER_URL}/contact/getMessages?pId=`+ pId)
            .then(response => {
                if(response.data.isMessagesAvailable) {
                    this.setState({
                        advertiserMessages: response.data.messages
                    })
                } else {
                  return this.setState({advertiserMessages: []});
                }
                
            })
            .catch(error => {
                this.setState({ 
                    error: error.message,
                    errorModalOpen: true
                 })
            })
    }

    handleCloseErrorModal = () => {
        this.setState({ errorModalOpen: false });
    }

    handleOpenMessageInboxModal = () => {
        this.setState({ 
            isOpenMessageInboxModal: true,
            isOpenMessages: false
         });
    } 

    handleCloseMessageInboxModal = () => {
        this.setState({ isOpenMessageInboxModal: false });
    } 


    handleOpenMyAds = () => {
        this.setState({ 
            isOpenMyAds: !this.state.isOpenMyAds,
            isOpenNotification: false,
            isOpenProfile: false,
            isOpenMessages: false,
            isOpenPublish: false
        });
    }

    handleOpenPublish = () => {
        this.setState({ 
            isOpenPublish: !this.state.isOpenPublish,
            isOpenMyAds: false,
            isOpenNotification: false,
            isOpenProfile: false,
            isOpenMessages: false
            
        });
    }

   

   

    handleOpenMessages = () => {
        this.setState({ 
            isOpenMessages: !this.state.isOpenMessages,
            isOpenMyAds: false,
            isOpenPublish: false
        });
    }

    handleOpenAddNewShareModal = () =>{
        this.setState({
            isOpenAddNewShareModal: true,
            isOpenMyAds: false,
        });
    }

    handleCloseAddNewShareModal = () => {
        this.setState({isOpenAddNewShareModal: false});
    }

    componentWillMount() {
        document.addEventListener('mousedown', this.handleClick, false);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClick, false);
    }

    handleCloseAllDropUp = (e) => {
      
            this.setState({
                isOpenMyAds: false,
                isOpenPublish: false,
                isOpenMessages: false,
            });
            this.props.handleNav(e);
        
    }

    handleCloseAll = () => {
      
        this.setState({
            isOpenMyAds: false,
            isOpenPublish: false,
            isOpenMessages: false,
        });
    
}

    handleClick = (e) => {  
        if(this.node.contains(e.target)) {
            return;
        }
        this.handleCloseAll();
    }

     render() {
         const { isOpenMessageInboxModal, errorModalOpen } = this.state;
        return (
            <div className={styles.sideNav_container} ref={node => this.node = node}>
                <div className={styles.button_container}>
                    <button 
                        className={styles.sideNav_button}
                        onClick={this.handleOpenMyAds}
                    >
                    <span>My Ads</span>
                    <div>{this.state.isOpenMyAds ? <IoMdArrowDropleft size="1.7em" /> :<IoMdArrowDropright size="1.7em" />}</div>
                    </button>
                    <div className={this.state.isOpenMyAds ? styles.dropSide_container : styles.dropSide_container_hide}>
                        <button 
                            className={styles.dropSide_button}
                            id= ""
                            onClick={e => this.handleCloseAllDropUp(e)}
                        >
                        All Ads
                        </button>
                        <button 
                            className={styles.dropSide_button}
                            id="/home-ads"
                            onClick={e => this.handleCloseAllDropUp(e)}
                        >
                        Home Ads
                        </button>
                        <button 
                            className={styles.dropSide_button}
                            id="/land-ads"
                            onClick={e => this.handleCloseAllDropUp(e)}
                        >
                        Land Ads
                        </button>
                    </div>
                </div>


                <div className={styles.button_container}>
                    <button 
                        className={styles.sideNav_button}
                        onClick={this.handleOpenPublish}
                    >
                    <span>Publish</span>
                    <div>{this.state.isOpenPublish ? <IoMdArrowDropleft size="1.7em" /> :<IoMdArrowDropright size="1.7em" />}</div>
                    </button>
                    <div className={this.state.isOpenPublish ? styles.dropSide_container : styles.dropSide_container_hide}>
                        <button 
                            className={styles.dropSide_button}
                            id="/publish"
                            onClick={e => this.handleCloseAllDropUp(e)}
                        >
                        Home Ads
                        </button>
                        <button 
                            className={styles.dropSide_button}
                            id="/publish"
                            onClick={e => this.handleCloseAllDropUp(e)}
                        >
                        Land Ads
                        </button>
                    </div>
                </div>

               

                <div className={styles.button_container}>
                    <button 
                        className={styles.sideNav_button}
                        onClick={this.handleOpenMessages}
                    >
                    <span>Messages</span>
                    <div>{this.state.isOpenMessages ? <IoMdArrowDropleft size="1.7em" /> :<IoMdArrowDropright size="1.7em" />}</div>
                    </button>
                    <div className={this.state.isOpenMessages ? styles.dropSide_container : styles.dropSide_container_hide}>
                        <button 
                            className={styles.dropSide_button}
                            onClick={this.handleOpenMessageInboxModal}
                        >
                        Inbox
                        </button>
                    </div>
                </div>
                { isOpenMessageInboxModal && 
                    <MessageInboxModal 
                        closeModal={this.handleCloseMessageInboxModal} 
                        advertiserMessages={this.state.advertiserMessages}
                    />
                }
                { errorModalOpen && 
                    <ErrorMessageModal 
                        closeModal={this.handleCloseErrorModal}
                        error={this.state.error}    
                    />}
            </div>
        );
    }
}

export default AdsSideNav;