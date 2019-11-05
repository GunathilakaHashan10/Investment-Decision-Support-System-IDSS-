import React, { Component } from 'react';
import styles from '../../../../assets/css/RealEstate/Advertise/AdsPublishContainer/AdsPublishContainer.css';
import HomeAdsPublish from '../HomeAdsPublish/HomeAdsPublish';
import LandAdsPublish from '../LandAdsPublish/LandAdsPublish';

class AdsPublishContainer extends Component {
    state = {
        showHomeAdsPublish: true,
        showLandAdsPublish: false
    }

    handleShowHomeAdsPublish = () => {
        this.setState({ 
            showHomeAdsPublish: true,
            showLandAdsPublish: false
        });
    }

    handleShowLandAdsPublish = () => {
        this.setState({ 
            showHomeAdsPublish: false,
            showLandAdsPublish: true
        });
    }

    render() {
        const {showHomeAdsPublish, showLandAdsPublish} = this.state;
        return(
            <div className={styles.container}>
                <div className={styles.button_container}>
                    <button 
                        className={showHomeAdsPublish ? styles.button_active  : styles.button_home}
                        onClick={this.handleShowHomeAdsPublish}
                    >
                    Home
                    </button>
                    <button 
                        className={showLandAdsPublish ? styles.button_active :styles.button}
                        onClick={this.handleShowLandAdsPublish}
                    >
                    Land
                    </button>
                </div>
                { showHomeAdsPublish && <HomeAdsPublish />}
                { showLandAdsPublish && <LandAdsPublish />}
            </div>
        )
    }
}

export default AdsPublishContainer;