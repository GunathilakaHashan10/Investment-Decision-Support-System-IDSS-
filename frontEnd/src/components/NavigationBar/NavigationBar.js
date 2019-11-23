import React, { Component} from 'react';
import styles from './NavigationBar.css';
import OverollComparisonModal from '../../containers/OverollComparisonModal/OverollComparisonModal';


class  NavigationBar extends Component {
    state = {
        isOpenOverollComparisonModal: false
    }

    overollComparisonModalOpenHandler = () => {
        this.setState({ isOpenOverollComparisonModal: true })
    }

    overollComparisonModalCloseHandler = () => {
        this.setState({ isOpenOverollComparisonModal: false })
    }

    render () {
    return (
        <div>
            <header className={this.props.bankActive === "Bank" || this.props.bankActive === "Real Estate" || this.props.type==="admin" || this.props.type === "User" ? styles.main_header_fixed : styles.main_header} >
                <nav className={styles.main_nav}>
                    <ul className={localStorage.getItem('RDACTP') === '2485693124578965412478933254895464123648'? styles.main_nav_list_admin :styles.main_nav_list}>
                        <li 
                            className={localStorage.getItem('RDACTP') === '2485693124578965412478933254895464123648' ? styles.main_nav_list_item : styles.main_nav_list_item_control_panel}>
                            <button 
                                className={styles.nav_button}
                                id="controlPanel"
                                onClick={this.props.handleAdminControl}
                            >
                            Control Panel
                            </button>
                        </li>
                        <li className={localStorage.getItem('RDACTP') === '2485693124578965412478933254895464123648' ? styles.main_nav_list_item_admin :styles.main_nav_list_item}>
                            <div className={styles.main_nav_dropdown_container}>
                                <button 
                                    id="stockMarket" 
                                    className={styles.main_nav_dropdown_button}
                                    onClick={this.props.handleNav}
                                >
                                Stocks
                                </button>
                                <div className={styles.main_nav_dropdown_content}>
                                    <div className={styles.main_nav_dropdown_content_container}>
                                        <div className={styles.main_nav_dropdown_content_container_item}>
                                            <h4>ChandleStick Chart</h4>
                                            <div className={styles.main_nav_dropdown_main_container}>
                                                <div className={styles.main_nav_dropdown_content_anchor_container}>
                                                    <button
                                                        id="stockMarket"
                                                        onClick={this.props.handleNav}
                                                    >
                                                    Ltp values
                                                    </button>
                    
                                                    <button 
                                                        id="stockMarket/movingAverage"
                                                        onClick={this.props.handleNav}
                                                    >
                                                    Moving Average
                                                    </button>
                                                    <button 
                                                        id="stockMarket/trendLine"
                                                        onClick={this.props.handleNav}
                                                    >
                                                    Trend Line
                                                    </button>
                                                </div>
                            
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li className={localStorage.getItem('RDACTP') === '2485693124578965412478933254895464123648' ? styles.main_nav_list_item_admin :styles.main_nav_list_item}>
                        <div className={styles.main_nav_dropdown_container}>
                            <button 
                                id="realEstate" 
                                className={styles.main_nav_dropdown_button}
                                onClick={this.props.handleNav}
                            >
                            Real Estate
                            </button>
                            <div className={styles.main_nav_dropdown_content}>
                                <div className={styles.main_nav_dropdown_content_container}>
                                    <div className={styles.main_nav_dropdown_content_container_item}>
                                        <h4>Sales</h4>
                                        <div className={styles.main_nav_dropdown_main_container}>
                                            <div className={styles.main_nav_dropdown_content_anchor_container}>
                                                <button
                                                    id="realEstate/homes-sell"
                                                    onClick={this.props.handleNav}
                                                >
                                                Homes
                                                </button>
                                                <button
                                                    id="realEstate/apartments-sell"
                                                    onClick={this.props.handleNav}
                                                >
                                                Apartments
                                                </button>
                                                <button
                                                    id="realEstate/commercials-sell"
                                                    onClick={this.props.handleNav}
                                                >
                                                Commercials
                                                </button>
                                                <button
                                                    id="realEstate/villas-sell"
                                                    onClick={this.props.handleNav}
                                                >
                                                Villas
                                                </button>
                                                <button
                                                    id="realEstate/bungalows-sell"
                                                    onClick={this.props.handleNav}
                                                >
                                                Bungalows
                                                </button>
                                                
                                            </div>
                                        </div>
                                    </div>

                                    <div className={styles.main_nav_dropdown_content_container_item1}>
                                        <h4>Lands</h4>
                                        <div className={styles.main_nav_dropdown_main_container}>
                                            <div className={styles.main_nav_dropdown_content_anchor_container}>
                                                <button
                                                    id="realEstate/bare-land-sell"
                                                    onClick={this.props.handleNav} 
                                                >
                                                Bare Lands
                                                </button>
                                                <button
                                                    id="realEstate/beachfront-land-sell"
                                                    onClick={this.props.handleNav}
                                                >
                                                Beachfront Land
                                                </button>
                                                <button
                                                    id="realEstate/land-with-house-sell"
                                                    onClick={this.props.handleNav}
                                                >
                                                Land with House
                                                </button>
                                                <button
                                                    id="realEstate/cultivated-agriculture-land-sell"
                                                    onClick={this.props.handleNav}
                                                >
                                                Cultivated/ Agriculture
                                                </button>
                                                <button
                                                    id="realEstate/tea-estate-land-sell"
                                                    onClick={this.props.handleNav}
                                                >
                                                Tea Estate Land
                                                </button>
                                                <button
                                                    id="realEstate/cocunut-estate-land-sell"
                                                    onClick={this.props.handleNav}
                                                >
                                                Cocunut Estate Land
                                                </button>
                                                <button
                                                    id="realEstate/rubber-estate-land-sell"
                                                    onClick={this.props.handleNav}
                                                >
                                                Rubber Estate Land
                                                </button>
                                            </div>
                                            
                                        </div>
                                    </div>

                                    <div className={styles.main_nav_dropdown_content_container_item1}>
                                        <h4>Rentals</h4>
                                        <div className={styles.main_nav_dropdown_main_container}>
                                            <div className={styles.main_nav_dropdown_content_anchor_container}>
                                                <button
                                                    id="realEstate/homes-rent"
                                                    onClick={this.props.handleNav}  
                                                >
                                                Houses
                                                </button>
                                                <button
                                                    id="realEstate/apartments-rent"
                                                    onClick={this.props.handleNav}
                                                >
                                                Apartments
                                                </button>
                                                <button
                                                    id="realEstate/annexes-rent"
                                                    onClick={this.props.handleNav}
                                                >
                                                Annexes
                                                </button>
                                                
                                            </div>
                                            
                                        </div>
                                    </div>

                                    <div className={styles.main_nav_dropdown_content_container_item1}>
                                        <h4>Advertise</h4>
                                        <div className={styles.main_nav_dropdown_main_container}>
                                            <div className={styles.main_nav_dropdown_content_anchor_container}>
                                                <button 
                                                    id="realEstate/advertise"
                                                    onClick={this.props.handleNav}
                                                    
                                                >
                                                Publish Your Ads
                                                </button>
                                                <button 
                                                    id="sell"
                                                    onClick={this.props.handleNav}
                                                >
                                                Selling Ads
                                                </button>
                                                <button>Rental Ads</button>
                                            </div>
                                            
                                        </div>
                                    </div>

                
                                </div>
                            </div>
                        </div>
                    </li>
                        <li className={localStorage.getItem('RDACTP') === '2485693124578965412478933254895464123648' ? styles.main_nav_list_item_admin :styles.main_nav_list_item}>
                            <div className={styles.main_nav_dropdown_container}>
                                <button 
                                    id="bank" 
                                    className={styles.main_nav_dropdown_button}
                                    onClick={this.props.handleNav}
                                >Fixed Deposits
                                </button>
                                <div className={styles.main_nav_dropdown_content}>
                                    <h4>Fixed Deposits</h4>
                                    <div className={styles.main_nav_dropdown_main_container}>
                                        <div className={styles.main_nav_dropdown_content_anchor_container}>
                                        <button
                                            id="bank" 
                                            onClick={this.props.handleNav}
                                        >Home</button>
                                        <button
                                            id="bank/yourBanks"
                                            onClick={this.props.handleNav}
                                        >Fixed deposits</button>
                    
                                    </div>
                                </div>
                            </div>
                        </div>
                        </li>
                    </ul>
                    <div className={styles.main_nav_logo}>
                        <button 
                            id=""
                            onClick={this.props.handleNav}
                            className={styles.nav_button}> {this.props.sectionName}</button>
                    </div>
                    <ul className={styles.main_nav_list}>
                        <li className={localStorage.getItem('RDACTP') === '2485693124578965412478933254895464123648' ? styles.main_nav_list_item_admin :styles.main_nav_list_item}>
                            <button 
                                className={styles.nav_button}
                                onClick={this.overollComparisonModalOpenHandler}
                            >
                                Compare
                            </button>
                        </li>
                        <li className={localStorage.getItem('RDACTP') === '2485693124578965412478933254895464123648' ? styles.main_nav_list_item_admin :styles.main_nav_list_item}>
                            <button className={styles.nav_button}>Contact us</button>
                        </li>
                        
                        <li className={localStorage.getItem('RDACTP') === '2485693124578965412478933254895464123648' ? styles.main_nav_list_item_admin :styles.main_nav_list_item}>
                            <button 
                                className={styles.nav_button} 
                                onClick={this.props.logout}
                            >
                                Logout
                            </button>
                        </li>
                    </ul>
                </nav>
            </header>
            {this.state.isOpenOverollComparisonModal &&
                <OverollComparisonModal 
                    closeModal={this.overollComparisonModalCloseHandler}
                />
            }
        </div>
    )
    }
}

export default NavigationBar;

{/* <li className={localStorage.getItem('RDACTP') === '2485693124578965412478933254895464123648' ? styles.main_nav_list_item_admin :styles.main_nav_list_item}>
                            <button className={localStorage.getItem('RDACTP') === '2485693124578965412478933254895464123648' ? styles.nav_button : styles.nav_button_admin}>Help</button>
                        </li> */}