import React from 'react';
import styles from './NavigationBar.css';


const NavigationBar = (props) => {
    return (
        <div>
            <header className={props.bankActive === "Bank" || props.bankActive === "Real Estate" || props.type==="admin" ? styles.main_header_fixed :styles.main_header} >
                <nav className={styles.main_nav}>
                    <ul className={localStorage.getItem('RDACTP') === '2485693124578965412478933254895464123648'? styles.main_nav_list_admin :styles.main_nav_list}>
                        <li 
                            className={localStorage.getItem('RDACTP') === '2485693124578965412478933254895464123648' ? styles.main_nav_list_item : styles.main_nav_list_item_control_panel}>
                            <button 
                                className={styles.nav_button}
                                id="controlPanel"
                                onClick={props.handleAdminControl}
                            >
                            Control Panel
                            </button>
                        </li>
                        <li className={localStorage.getItem('RDACTP') === '2485693124578965412478933254895464123648' ? styles.main_nav_list_item_admin :styles.main_nav_list_item}>
                            <div className={styles.main_nav_dropdown_container}>
                                <button 
                                    id="stockMarket" 
                                    className={styles.main_nav_dropdown_button}
                                    onClick={props.handleNav}
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
                                                        onClick={props.handleNav}
                                                    >
                                                    Ltp values
                                                    </button>
                                                    <button
                                                        id="index"
                                                        onClick={props.handleNav}
                                                    >
                                                    Index values
                                                    </button>
                                                    <button 
                                                        id="stockMarket/movingAverage"
                                                        onClick={props.handleNav}
                                                    >
                                                    Moving Average
                                                    </button>
                                                    <button 
                                                        id="stockMarket/trendLine"
                                                        onClick={props.handleNav}
                                                    >
                                                    Trend Line
                                                    </button>
                                                </div>
                                                <div className={styles.main_nav_dropdown_content_anchor_container}>
                                                    <button
                                                    id="more"
                                                    onClick={props.handleNav}
                                                    >
                                                    More
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
                                onClick={props.handleNav}
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
                                                    onClick={props.handleNav}
                                                >
                                                Homes
                                                </button>
                                                <button
                                                    id="realEstate/apartments-sell"
                                                    onClick={props.handleNav}
                                                >
                                                Apartments
                                                </button>
                                                <button
                                                    id="realEstate/commercials-sell"
                                                    onClick={props.handleNav}
                                                >
                                                Commercials
                                                </button>
                                                <button
                                                    id="realEstate/villas-sell"
                                                    onClick={props.handleNav}
                                                >
                                                Villas
                                                </button>
                                                <button
                                                    id="realEstate/bungalows-sell"
                                                    onClick={props.handleNav}
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
                                                    onClick={props.handleNav} 
                                                >
                                                Bare Lands
                                                </button>
                                                <button
                                                    id="realEstate/beachfront-land-sell"
                                                    onClick={props.handleNav}
                                                >
                                                Beachfront Land
                                                </button>
                                                <button
                                                    id="realEstate/land-with-house-sell"
                                                    onClick={props.handleNav}
                                                >
                                                Land with House
                                                </button>
                                                <button
                                                    id="realEstate/cultivated-agriculture-land-sell"
                                                    onClick={props.handleNav}
                                                >
                                                Cultivated/ Agriculture
                                                </button>
                                                <button
                                                    id="realEstate/tea-estate-land-sell"
                                                    onClick={props.handleNav}
                                                >
                                                Tea Estate Land
                                                </button>
                                                <button
                                                    id="realEstate/cocunut-estate-land-sell"
                                                    onClick={props.handleNav}
                                                >
                                                Cocunut Estate Land
                                                </button>
                                                <button
                                                    id="realEstate/rubber-estate-land-sell"
                                                    onClick={props.handleNav}
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
                                                    onClick={props.handleNav}  
                                                >
                                                Houses
                                                </button>
                                                <button
                                                    id="realEstate/apartments-rent"
                                                    onClick={props.handleNav}
                                                >
                                                Apartments
                                                </button>
                                                <button
                                                    id="realEstate/annexes-rent"
                                                    onClick={props.handleNav}
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
                                                    onClick={props.handleNav}
                                                    
                                                >
                                                Publish Your Ads
                                                </button>
                                                <button 
                                                    id="sell"
                                                    onClick={props.handleNav}
                                                >
                                                Selling Ads
                                                </button>
                                                <button>Rental Ads</button>
                                            </div>
                                            
                                        </div>
                                    </div>

                                    <div className={styles.main_nav_dropdown_content_container_item1}>
                                        <h4>Home Loans</h4>
                                        <div className={styles.main_nav_dropdown_main_container}>
                                            <div className={styles.main_nav_dropdown_content_anchor_container}>
                                                <button>Find a Bank</button>
                                                <button>Loan Calculator</button>
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
                                    onClick={props.handleNav}
                                >Bank
                                </button>
                                <div className={styles.main_nav_dropdown_content}>
                                    <h4>Banks</h4>
                                    <div className={styles.main_nav_dropdown_main_container}>
                                        <div className={styles.main_nav_dropdown_content_anchor_container}>
                                        <button>Home</button>
                                        <button>Fixed deposits</button>
                                        <button>Fix deposit Calculator</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        </li>
                    </ul>
                    <div className={styles.main_nav_logo}>
                        <button className={styles.nav_button}> {props.sectionName}</button>
                    </div>
                    <ul className={styles.main_nav_list}>
                        <li className={localStorage.getItem('RDACTP') === '2485693124578965412478933254895464123648' ? styles.main_nav_list_item_admin :styles.main_nav_list_item}>
                            <button className={styles.nav_button}>Contact us</button>
                        </li>
                        <li className={localStorage.getItem('RDACTP') === '2485693124578965412478933254895464123648' ? styles.main_nav_list_item_admin :styles.main_nav_list_item}>
                            <button className={styles.nav_button}>Settings</button>
                        </li>
                        <li className={localStorage.getItem('RDACTP') === '2485693124578965412478933254895464123648' ? styles.main_nav_list_item_admin :styles.main_nav_list_item}>
                            <button className={localStorage.getItem('RDACTP') === '2485693124578965412478933254895464123648' ? styles.nav_button : styles.nav_button_admin}>Help</button>
                        </li>
                        <li className={localStorage.getItem('RDACTP') === '2485693124578965412478933254895464123648' ? styles.main_nav_list_item_admin :styles.main_nav_list_item}>
                            <button className={styles.nav_button} onClick={props.logout}>Logout</button>
                        </li>
                    </ul>
                </nav>
            </header>
        </div>
    )
}

export default NavigationBar;


// import React from 'react';
// import styles from './NavigationBar.css';


// const NavigationBar = (props) => {
//     return (
//         <div>
//             <header className={styles.main_header} >
//                 <nav className={styles.main_nav}>
//                     <ul className={styles.main_nav_list}>
//                         <li className={styles.main_nav_list_item}>
//                             <div className={styles.main_nav_dropdown_container}>
//                                 <a href="/dashboard/stockMarket" className={styles.main_nav_dropdown_anchor}>Stocks</a>
//                                 <div className={styles.main_nav_dropdown_content}>
//                                     <div className={styles.main_nav_dropdown_content_container}>
//                                         <div className={styles.main_nav_dropdown_content_container_item}>
//                                             <h4>ChandleStick Chart</h4>
//                                             <div className={styles.main_nav_dropdown_main_container}>
//                                                 <div className={styles.main_nav_dropdown_content_anchor_container}>
//                                                     <a href="/dashboard/stockMarket">Ltp values</a>
//                                                     <a href="/">Index values</a>
//                                                     <a href="/dashboard/stockMarket/movingAverage">Moving Average</a>
//                                                     <a href="/dashboard/stockMarket/trendLine">Trend Line</a>
//                                                     <a href="/">Comparisons</a>
//                                                 </div>
//                                                 <div className={styles.main_nav_dropdown_content_anchor_container}>
//                                                     <a href="/">More</a>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </li>
//                         <li className={styles.main_nav_list_item}>
//                         <div className={styles.main_nav_dropdown_container}>
//                             <a href="/dashboard/realEstate" className={styles.main_nav_dropdown_anchor}>Real Estate</a>
//                             <div className={styles.main_nav_dropdown_content}>
//                                 <div className={styles.main_nav_dropdown_content_container}>
//                                     <div className={styles.main_nav_dropdown_content_container_item}>
//                                         <h4>Homes for sale</h4>
//                                         <div className={styles.main_nav_dropdown_main_container}>
//                                             <div className={styles.main_nav_dropdown_content_anchor_container}>
//                                                 <a href="/">Homes for sale</a>
//                                                 <a href="/">Foreclosures</a>
//                                                 <a href="/">Open houses</a>
//                                                 <a href="/">For sale by owner</a>
//                                             </div>
//                                         </div>
//                                     </div>

//                                     <div className={styles.main_nav_dropdown_content_container_item1}>
//                                         <h4>Lands for sale</h4>
//                                         <div className={styles.main_nav_dropdown_main_container}>
//                                             <div className={styles.main_nav_dropdown_content_anchor_container}>
//                                                 <a href="/">Lands for sale</a>
//                                                 <a href="/">Foreclosures</a>
//                                                 <a href="/">Open houses</a>
//                                                 <a href="/">For sale by owner</a>
//                                             </div>
                                            
//                                         </div>
//                                     </div>

//                                     <div className={styles.main_nav_dropdown_content_container_item1}>
//                                         <h4>Search for rentals</h4>
//                                         <div className={styles.main_nav_dropdown_main_container}>
//                                             <div className={styles.main_nav_dropdown_content_anchor_container}>
//                                                 <a href="/">Rental Building</a>
//                                                 <a href="/">Apartment for rent</a>
//                                                 <a href="/">Houses for rent</a>
//                                             </div>
                                            
//                                         </div>
//                                     </div>

//                                     <div className={styles.main_nav_dropdown_content_container_item1}>
//                                         <h4>Advertise</h4>
//                                         <div className={styles.main_nav_dropdown_main_container}>
//                                             <div className={styles.main_nav_dropdown_content_anchor_container}>
//                                                 <a href="/dashboard/realEstate/advertise">Publish Your Ads</a>
//                                                 <a href="/">Selling Ads</a>
//                                                 <a href="/">Rental Ads</a>
//                                             </div>
                                            
//                                         </div>
//                                     </div>

//                                     <div className={styles.main_nav_dropdown_content_container_item1}>
//                                         <h4>Home Loans</h4>
//                                         <div className={styles.main_nav_dropdown_main_container}>
//                                             <div className={styles.main_nav_dropdown_content_anchor_container}>
//                                                 <a href="/">Find a Bank</a>
//                                                 <a href="/">Loan Calculator</a>
//                                             </div>
                                            
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </li>
//                         <li className={styles.main_nav_list_item}>
//                             <div className={styles.main_nav_dropdown_container}>
//                                 <a href="/" className={styles.main_nav_dropdown_anchor}>Bank</a>
//                                 <div className={styles.main_nav_dropdown_content}>
//                                     <h4>Banks</h4>
//                                     <div className={styles.main_nav_dropdown_main_container}>
//                                         <div className={styles.main_nav_dropdown_content_anchor_container}>
//                                         <a href="/">Home</a>
//                                         <a href="/">Fixed deposits</a>
//                                         <a href="/">Fix deposit Calculator</a>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                         </li>
//                     </ul>
//                     <div className={styles.main_nav_logo}>
//                         <a href="/"> {props.sectionName}</a>
//                     </div>
//                     <ul className={styles.main_nav_list}>
//                         <li className={styles.main_nav_list_item}>
//                             <a href="/">Contact us</a>
//                         </li>
//                         <li className={styles.main_nav_list_item}>
//                             <a href="/advertise">Settings</a>
//                         </li>
//                         <li className={styles.main_nav_list_item}>
//                             <button className={styles.nav_button} onClick={props.logout}>Logout</button>
//                         </li>
//                     </ul>
//                 </nav>
//             </header>
//         </div>
//     )
// }

// export default NavigationBar;
