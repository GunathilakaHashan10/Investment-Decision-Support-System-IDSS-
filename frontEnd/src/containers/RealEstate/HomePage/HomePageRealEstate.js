import React, { Component } from 'react';
import styles from '../../../assets/css/RealEstate/HomePage/HomePage.css';

class HomePageRealEstate extends Component {
    render() {
        return(
            <div className={styles.container}>
                <main>
                    <div className={styles.main_background}>
                        <div className={styles.main_background_content}>
                            <h1 className={styles.main_background_title}>Reimagine home</h1>
                            <h2 className={styles.main_background_subtitle}>We'll help you find a place you'll love</h2>
                            <input type="text" name="location" placeholder="Enter location or district" className={styles.main_background_searchBox}/>
                        </div>
                    </div>
                </main>
            </div>
        );
    }
}

export default HomePageRealEstate;