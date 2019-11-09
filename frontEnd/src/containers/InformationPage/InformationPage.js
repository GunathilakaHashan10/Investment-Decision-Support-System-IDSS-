import React from 'react';
import { MdAccountBalance, MdFindInPage, MdTimeline } from 'react-icons/md'
import styles from '../../assets/css/DashBodard/DashBodard.css';

const InformationPage = (props) => {
  return  (<div className={styles.container}>
                    <div className={styles.details_card}>
                        <div className={styles.image_container}>
                            <MdTimeline size="10em" color="white" className={styles.logo_image}/>
                        </div>
                        <div className={styles.header_contanier}>
                            <h2>See stock Data</h2>
                        </div>
                        <div className={styles.description_container}>
                           Study the market performance of stocks by comparing with each
                        </div>
                        <button 
                            className={styles.card_button}
                            onClick={props.handleSection}
                            id="stockMarket"
                        >
                        See Stocks
                        </button>
                    </div>
                    <div className={styles.details_card}>
                        <div className={styles.image_container}>
                            <MdAccountBalance size="10em" color="white" className={styles.logo_image}/>
                        </div>
                        <div className={styles.header_contanier}>
                            <h2>Find a best fixed deposit</h2>
                        </div>
                        <div className={styles.description_container}>
                            Calculate your interest for the deposits and find a better fixed deposit
                        </div>
                        <button 
                            className={styles.card_button}
                            onClick={props.handleSection}
                            id="bank"
                        >
                        See Fixed deposits
                        </button>
                    
                    </div>
                    <div className={styles.details_card}>
                        <div className={styles.image_container}>
                            <MdFindInPage size="10em" color="white" className={styles.logo_image}/>
                        </div>
                        <div className={styles.header_contanier}>
                            <h2>Find a property</h2>
                        </div>
                        <div className={styles.description_container}>
                            Find a good property to invest your money
                        </div>
                        <button 
                            className={styles.card_button}
                            onClick={props.handleSection}
                            id="realEstate"
                        >
                        See Real estate
                        </button>
                    
                    </div>
                
                </div>)
}

export default InformationPage;