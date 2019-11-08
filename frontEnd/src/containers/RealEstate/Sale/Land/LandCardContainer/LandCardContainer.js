import React, { Component } from 'react';
import axios from 'axios';
import { IoIosArrowDown, IoMdSearch, IoIosInformationCircle } from 'react-icons/io';
import * as myConstants from '../../../../Utils/Constants/Constants';
import styles from '../../../../../assets/css/RealEstate/Sale/Land/LandCardContainer/LandCardContainer.css';
import errorstyles from '../../../../../assets/css/RealEstate/ErrorDetatils/ErrorDetatils.css';
import LandCard from '../LandCard/LandCard';
import ErrorMessageModal from '../../../../Utils/ErrorMessageModal/ErrorMessageModal';
import PageFooter from '../../../../PageFooter/PageFooter';


class LandCardContainer extends Component {
    state = {
        isOpenSortBy: false,
        isSortByContent: "Lands for you",
        landAds: [],
        landType: null,
        landAdsCount: null,
        error: null,
        openErrorModal: false
    }

    handleCloseErrorModal = () => {
        this.setState({openErrorModal:false})
    }

    componentDidMount() {
        let path = window.location.pathname.split('/');
        let extractedPath = path[path.length - 1];
        let landType = null;
        switch(extractedPath) {
            case "bare-land-sell":
                landType = "Bare Land";
                break;
            case "beachfront-land-sell":
                landType = "Beachfront Land";
                break;
            case "land-with-house-sell":
                landType = "Land with House";
                break;
            case "cultivated-agriculture-land-sell":
                landType = "Cultivated / Agriculture";
                break;
            case "tea-estate-land-sell":
                landType = "Tea Estate Land";
                break;
            case "cocunut-estate-land-sell":
                landType = "Cocunut Estate Land";
                break;
            case "rubber-estate-land-sell":
                landType = "Rubber Estate Land";
                break;
            default: break;
        }
        this.setState({landType:landType});

        axios.get(`${myConstants.SEVER_URL}/LandAds?type=${landType}`)
            .then(response => {
                if(response.data != null) {
                    this.setState(preveState => {
                        return {
                            landAds: response.data,
                            landType: response.data[0].landType,
                            landAdsCount: response.data.length
                        }
                    })
                }
                

            })
            .catch(error => {
                this.setState({
                    error:error.message,
                    openErrorModal: true
                })
             })
    }

    handleOpenSortBy = () => {
        this.setState({ isOpenSortBy: !this.state.isOpenSortBy});
    }

    handleSortBySelection = (event) => {
        this.setState({ 
                isSortByContent: event.target.id,
                isOpenSortBy: false
            });
    }
    render() {
        const { landAds, landType } = this.state;
        let content = null;
        if(landAds.length === 0) {
            content = (
                <div className={errorstyles.error_container}>
                    <h2 className={errorstyles.error_message}>{`No ${landType} advertisments are available right now`}</h2>
                    <h3 className={errorstyles.error_message_sub}>Sorry for the inconvenience</h3>
                    <IoIosInformationCircle size="5em" color="white"/>
                    <PageFooter />
                </div>
            )
        } else {
            content = (
                <div>
                    <div className={styles.title_container}>
                        <h2 className={styles.title}>{`Real Estate & ${this.state.landType} For Sale`}</h2>
                        <div className={styles.results_and_sortBy_container}>
                            <h3 className={styles.results}>{`${this.state.landAdsCount} results`}</h3>
                            <div className={styles.sortBy_container}>
                                <span className={styles.sortBy}>Sort by: </span>
                                <button 
                                    className={styles.sortBy_button}
                                    onClick={this.handleOpenSortBy}
                                >
                                    <span>{this.state.isSortByContent}</span>
                                    <div><IoIosArrowDown size="1.5em" color="#006AFF"/></div>
                                </button>
                                <div className={this.state.isOpenSortBy ? styles.sortBy_dropdown : styles.sortBy_dropdown_hide}>
                                    <button onClick={this.handleSortBySelection} id="Price (High to Low)">Price (High to Low)</button>
                                    <button onClick={this.handleSortBySelection} id="Price (Low to High)">Price (Low to High)</button>
                                    <button onClick={this.handleSortBySelection} id="Newest">Newest</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.landCard_container}>
                    {
                        this.state.landAds.map(landAd => {
                            return (
                                <LandCard key={landAd._id} landDetails={landAd}  getCo={this.props.getCo} />
                            )
                        })
                    }
                    <PageFooter />
                    </div>
                </div>
            )
        }
        return(
            <div className={styles.container}>
                <div className={styles.search_box_container}>
                    <div className={styles.search_input_container}>
                        <input type="text" name="loaction" placeholder="Location" className={styles.search_box}/>
                        <button className={styles.search_box_button}><IoMdSearch size="1.6em" color="#006AFF" /></button>
                    </div>
                </div>
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

export default LandCardContainer;