import React, { Component } from 'react';
import ReactLoading from 'react-loading';
import styles from '../../../../assets/css/StockMarket/CalculateExpectedReturn/ListOfExpectedReturn.css';

class ListOfExpectedReturn extends Component {
    render() {
        return(
            <div className={styles.container}>
                <div className={styles.main_container} >
                {
                    (this.props.isLoading === false) &&
                    this.props.expectedReturnData.map(value => {
                    return (
                        <div className={styles.share_container}>
                            <span className={styles.share_name}>{value.share}</span>
                            <span className={styles.share_slope}>{value.expectedReturn.toFixed(2)}</span>
                        </div>
                    );
                })}
                {
                    (this.props.isLoading === true) && 
                    <div className={styles.react_loading_container}>
                        <ReactLoading type={'spin'} color={'#006AFF'} height={'5%'} width={'5%'} />
                    </div>
                    
                }
                </div>
            </div>
        );
    }
}

export default ListOfExpectedReturn;


