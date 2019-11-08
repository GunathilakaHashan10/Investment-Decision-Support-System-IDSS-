import React from 'react';
import { IoLogoFacebook, IoLogoTwitter } from 'react-icons/io';
import styles from '../../../assets/css/PageFooter/PageFooter.css';

const PageFooterForModal = (props) => (
    <div className={styles.container_modal}>
        <div className={styles.information_container}>
        Right Decision Group is continuously working to improve the accessibility of our web experience for everyone, and we welcome feedback and accommodation requests. 
        If you wish to report an issue or seek an accommodation, please contact us.
        </div>
    
        <div className={styles.trademark_container}>
            <h2 id={styles.tradeMark}>Right Decision</h2>
            <div className={styles.icon_container}>
                <span>Follow us</span>
                <IoLogoFacebook size="2em" color="blue"/>
                <IoLogoTwitter size="2em" color="blue"/>
            </div>
        </div>
    </div>
)

export default PageFooterForModal;