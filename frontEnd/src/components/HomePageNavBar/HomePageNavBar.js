import React from 'react';
import styles from '../NavigationBar/NavigationBar.css';

const HomePageNavBar = (props) => {
    return (
        <div>
            <header className={styles.main_header_fixed} >
                <nav className={styles.main_nav}>
                    <ul className={styles.main_nav_list}>
                        <li className={styles.main_nav_list_item}>
                            <button className={styles.nav_button} onClick={props.openSignup}>Join</button>
                        </li>
                        <li className={styles.main_nav_list_item}>
                            <button className={styles.nav_button} onClick={props.openLogin}>Login</button>
                        </li>
                        <li className={styles.main_nav_list_item}>
                            <a href="/">Help</a>
                        </li>
                    </ul>
                    <div className={styles.main_nav_logo}>
                        <button className={styles.nav_button}>Right Decision</button>
                    </div>
                    <ul className={styles.main_nav_list}>
                        <li className={styles.main_nav_list_item}>
                            <a href="/">About us</a>
                        </li>
                        <li className={styles.main_nav_list_item}>
                            <a href="/">Contact us</a>
                        </li>
                        
                    </ul>
                </nav>
            </header>
        </div>
    );
}

export default HomePageNavBar;