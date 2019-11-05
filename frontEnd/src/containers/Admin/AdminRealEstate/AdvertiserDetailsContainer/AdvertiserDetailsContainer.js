import React, { Component } from 'react';
import styles from '../../../../assets/css/Admin/AdminRealEstate/AdvertiserDetailsContainer/AdvertiserDetailsContainer.css';
import AdvertiserDetailsCard from '../AdvertiserDetailsCard/AdvertiserDetailsCard';

class AdvertiserDetailsContainer extends Component {
    render() {
        return (
            <div className={styles.container}>
                <div className={styles.sub_container}>
                    <div className={styles.main_header}>
                        <h2>Advertisers</h2>
                    </div>
                    <div className={styles.cards_container}>
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
                
                
            </div>
        )
    }
}

export default AdvertiserDetailsContainer;