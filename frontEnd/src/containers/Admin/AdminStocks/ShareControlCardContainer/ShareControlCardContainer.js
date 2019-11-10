import React, { Component } from 'react';
import axios from 'axios';
import ReactLoading from 'react-loading';
import * as myConstants from '../../../Utils/Constants/Constants';
import ShareControlCard from '../ShareControlCard/ShareControlCard';
import UpdateShareModal from '../AdminStocksModals/UpdateShareModal/UpdateShareModal';
import ShareDeleteModal from '../AdminStocksModals/ShareDeleteModal/ShareDeleteModal';
import DeleteDataModal from '../AdminStocksModals/DeleteDataModal/DeleteDataModal';
import lodingStyles from '../../../../assets/css/ReactLoading/ReactLoading.css';
import styles from '../../../../assets/css/Admin/AdminStocks/ShareControlCardContainer/ShareControlCardContainer.css';
import ErrorMessageModal from '../../../Utils/ErrorMessageModal/ErrorMessageModal';

class ShareControlCardContainer extends Component {
    state = {
        adminShareDetailsArray:[],
        isLoading: false,
        isOpenUpdateShareModal: false,
        isOpenDeleteShareModal: false,
        isOpenDeleteDataModal: false,
        shareId: null,
        shareName: null,
        shareData: {},
        error: null,
        openErrorModal: false
    }

    handleCloseErrorModal = () => {
        this.setState({openErrorModal:false});
    }

    componentDidMount() {
        this.setState({ isLoading: true});
        axios.get(`${myConstants.SEVER_URL}/admin/adminShares`)
            .then(response => {
                this.setState(prevState => {
                    return {
                        adminShareDetailsArray: prevState.adminShareDetailsArray.concat(response.data),
                        isLoading: false
                    }
                });
            })
            .catch(error => {
                this.setState({
                    error:error.message,
                    openErrorModal: true
                })
            })
    }

    handleCloseUpdateShareModal = () => {
        this.setState({ isOpenUpdateShareModal:false });
    }

    handleCloseDeleteShareModal = () => {
        this.setState({ isOpenDeleteShareModal:false });
        window.location.reload();
    }

    handleCancel = () => {
        this.setState({ isOpenDeleteShareModal:false });
    }

    handleCloseDeleteDataModal = () => {
        this.setState({ isOpenDeleteDataModal:false });
        window.location.reload();
    }

    handleCancelDeleteDataModal = () => {
        this.setState({ isOpenDeleteDataModal:false });
    }

    handleSetShareId = (event,state) => {
        this.setState({
            shareId: event.currentTarget.id,
            shareData: state.shareData,
            isOpenUpdateShareModal:true
        });
    }

    handleSetShareIdOfDeleteModal = (event) => {
        this.setState({
            shareId: event.currentTarget.id,
            shareName: event.target.value,
            isOpenDeleteShareModal:true
        });
    }

    handleSetDeleteDataModal = (event,state) => {
        this.setState({
            shareData: state.shareData,
            isOpenDeleteDataModal:true
        });
    }



    render() {
        
        const { isLoading, isOpenUpdateShareModal, isOpenDeleteShareModal, isOpenDeleteDataModal ,shareId, shareName, shareData } = this.state;
        
        return(
            <div className={styles.container}>

               { <div className={styles.ShareControlCard_container}>
                    {this.state.adminShareDetailsArray.map(value => {
                        return (
                            <ShareControlCard 
                                key={value.shareName}
                                handleSetShareId={this.handleSetShareId}
                                handleSetShareIdDelete={this.handleSetShareIdOfDeleteModal}
                                handleSetDeleteDataModal={this.handleSetDeleteDataModal}
                                shareData={value}
                                shareName={value.shareName}
                            />
                        )
                    })}
                </div>}
                {
                    isLoading === true && 
                    
                        <div className={lodingStyles.react_loading_container_fixed}>
                            <ReactLoading type={'spinningBubbles'} color={'#006AFF'} height={'4%'} width={'4%'} />
                        </div>
                   
                }
                {isOpenUpdateShareModal && 
                    <UpdateShareModal 
                        closeModal={this.handleCloseUpdateShareModal} 
                        shareData={shareData}
                    />
                }
                {isOpenDeleteShareModal && 
                    <ShareDeleteModal 
                        closeModal={this.handleCloseDeleteShareModal} 
                        id={shareId} 
                        shareName={shareName} 
                        handleCancel={this.handleCancel}
                    />
                }
                {isOpenDeleteDataModal && 
                    <DeleteDataModal 
                        closeModal={this.handleCloseDeleteDataModal} 
                        shareData={shareData} 
                        handleCancel={this.handleCancelDeleteDataModal}
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

export default ShareControlCardContainer;