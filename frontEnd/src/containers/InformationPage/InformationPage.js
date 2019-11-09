import React from 'react';
import styles from '../../assets/css/DashBodard/DashBodard.css';
import cardImage1 from '../../assets/images/Dashboard/stock.png';
import cardImage2 from '../../assets/images/Dashboard/fd.png';
import cardImage3 from '../../assets/images/Dashboard/realestate.jpeg';

const InformationPage = (props) => {
  return  (<div className={styles.container}>
                    <div className={styles.details_card}>
                        <div className={styles.image_container}>
                            <img src={cardImage1} alt="logo" className={styles.logo_image}/>
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
                            <img src={cardImage2} alt="logo" className={styles.logo_image}/>
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
                            <img src={cardImage3} alt="logo" className={styles.logo_image}/>
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