import React, { Component } from 'react';
import { IoIosApps, IoIosGitCompare, IoIosCalculator } from 'react-icons/io';
import styles from '../../../assets/css/Bank/BankHomePage/BankHomePage.css';

class BankHomePage extends Component {
    render() {
        return(
            <div className={styles.container}>
            
                <div className={styles.details_card}>
                    <div className={styles.image_container}>
                        <IoIosApps size="10em" color="white" className={styles.logo_image}/>
                    </div>
                    <div className={styles.header_contanier}>
                        <h2>Find a best fixed deposit</h2>
                    </div>
                    <div className={styles.description_container}>
                        Calculate your interest for the deposits and find a better fixed deposit
                    </div>
                    <button 
                        className={styles.card_button}
                        onClick={this.props.handleBank}
                    >
                    Get started
                    </button>
                
                </div>
                <div className={styles.details_card}>
                    <div className={styles.image_container}>
                        <IoIosCalculator size="10em" color="white" className={styles.logo_image}/>
                    </div>
                    <div className={styles.header_contanier}>
                        <h2>AER value</h2>
                    </div>
                    <div className={styles.description_container}>
                        Calculate Annual Effective Rate(AER) value of each fixed deposit
                    </div>
                    <button 
                        className={styles.card_button}
                        onClick={this.props.handleBank}
                    >
                    Get started
                    </button>
                </div>
                <div className={styles.details_card}>
                    <div className={styles.image_container}>
                        <IoIosGitCompare size="10em" color="white" className={styles.logo_image}/>
                    </div>
                    <div className={styles.header_contanier}>
                        <h2>Compare Fixed deposits</h2>
                    </div>
                    <div className={styles.description_container}>
                        Make a comparison among fixed deposits using interest rate or interest
                    </div>
                    <button 
                        className={styles.card_button}
                        onClick={this.props.handleBank}
                    >
                     Get started
                    </button>
                
                </div>
        
        </div>
            
        )
    }
}

export default BankHomePage;