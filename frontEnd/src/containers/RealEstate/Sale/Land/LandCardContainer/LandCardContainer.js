import React, { Component } from 'react';
import axios from 'axios';
import { IoIosArrowDown, IoMdSearch } from 'react-icons/io';
import styles from '../../../../../assets/css/RealEstate/Sale/Land/LandCardContainer/LandCardContainer.css';
import LandCard from '../LandCard/LandCard';


class LandCardContainer extends Component {
    state = {
        isOpenSortBy: false,
        isSortByContent: "Lands for you",
        landAds: [],
        landType: null,
        landAdsCount: null
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

        axios.get(`http://localhost:5000/LandAds?type=${landType}`)
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
                console.log(error);
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
        return(
            <div className={styles.container}>
                <div className={styles.search_box_container}>
                    <div className={styles.search_input_container}>
                        <input type="text" name="loaction" placeholder="Location" className={styles.search_box}/>
                        <button className={styles.search_box_button}><IoMdSearch size="1.6em" color="#006AFF" /></button>
                    </div>
                </div>
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

                </div>
            </div>
        )
    }
}

export default LandCardContainer;