import React, { Component } from 'react';
import { IoIosNavigate } from 'react-icons/io';
import { FaAdversal } from 'react-icons/fa';
import styles from '../../../../assets/css/Admin/AdminRealEstate/AdsDetailCard/AdsDetailCard.css';
import HomeImage from '../../../../assets/images/Homes/h1.jpg';

class AdsDetailCard extends Component {
    render() {
        return(
            <div className={styles.container}>
                <div className={styles.image_container}>
                    <img src={HomeImage} alt="homeImage" className={styles.image}/>
                </div>
                <div className={styles.details_Container}>
                    <div className={styles.details_box}>
                        <span className={styles.icon}><FaAdversal size="1rem" /></span>
                        <span className={styles.detail}>Home for Sell</span>
                    </div>
                    <div className={styles.details_box}>
                        <span className={styles.icon}><IoIosNavigate size="1rem" /></span>
                        <span className={styles.detail}>Temple Road, Habarana</span>
                    </div>
                </div>
                <div className={styles.button_container}>
                    <button>View</button>
                    <button>Block</button>
                    <button>Delete</button>
                </div>
            </div>
        )
    }
}

export default AdsDetailCard;