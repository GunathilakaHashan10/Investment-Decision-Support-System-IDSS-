import React, { Component } from 'react';
import styles from '../../../../assets/css/Admin/AdminRealEstate/AdvertiserDetailsContainer/AdvertiserDetailsContainer.css';
import AdvertiserDetailsCard from '../AdvertiserDetailsCard/AdvertiserDetailsCard';

class AdvertiserDetailsContainer extends Component {
    render() {
        return (
            <div className={styles.container}>
                <div className={styles.advertiserControlCard_container}>
                    <AdvertiserDetailsCard />
                    <AdvertiserDetailsCard />
                    <AdvertiserDetailsCard />
                    <AdvertiserDetailsCard />
                    <AdvertiserDetailsCard />
                    <AdvertiserDetailsCard />
                    <AdvertiserDetailsCard />
                    <AdvertiserDetailsCard />
                    <AdvertiserDetailsCard />
                    <AdvertiserDetailsCard />
                </div>
                
                
            </div>
        )
    }
}

export default AdvertiserDetailsContainer;