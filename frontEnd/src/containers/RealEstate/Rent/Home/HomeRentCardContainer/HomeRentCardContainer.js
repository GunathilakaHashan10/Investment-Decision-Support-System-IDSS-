import React, { Component } from 'react';
import axios from 'axios';
import { IoIosArrowDown, IoMdSearch } from 'react-icons/io';
import styles from '../../../../../assets/css/RealEstate/Sale/Home/HomeCardContainer/HomeCardContainer.css';
import HomeRentCard from '../HomeRentCard/HomeRentCard';

class HomeRentCardContainer extends Component {
    state = {
        isOpenSortBy: false,
        isSortByContent: "Homes for you",
        homeAdsRent: [],
        homeType: null,
        homeAdsCount: null
    }

    componentDidMount() {
        let path = window.location.pathname.split('/');
        let extractedPath = path[path.length - 1];
        let rentType = null;
        switch(extractedPath) {
            case "homes-rent":
                rentType = "Home";
                break;
            case "apartments-rent":
                rentType = "Apartment";
                break;
            case "annexes-rent":
                rentType = "Annex";
                break;
    
            default: break;
        }

        axios.get(`http://localhost:5000/homeAdsRent?type=${rentType}`)
            .then(response => {
                if(response.data != null) {
                this.setState(preveState => {
                    return {
                        homeAdsRent: response.data,
                        homeType: response.data[0].propertyType,
                        homeAdsCount: response.data.length
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
                    <h2 className={styles.title}>{`Real Estate & ${this.state.homeType}s For Rent`}</h2>
                    <div className={styles.results_and_sortBy_container}>
                        <h3 className={styles.results}>{`${this.state.homeAdsCount} results`}</h3>
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
                                <button onClick={this.handleSortBySelection} id="Bedrooms">Bedrooms</button>
                                <button onClick={this.handleSortBySelection} id="Bathrooms">Bathrooms</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.homeCard_container}>
                    {
                        this.state.homeAdsRent.map(homeAd => {
                            return ( <HomeRentCard key={homeAd._id} homeAdDetails={homeAd} getCo={this.props.getCo}/>)
                        })
                    }
                   
                
                </div>
            </div>
        )
    }
}

export default HomeRentCardContainer;