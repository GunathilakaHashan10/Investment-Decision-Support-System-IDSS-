import React, { Component } from 'react';
import styles from '../../../assets/css/StockMarket/TrendDetails.css';

class TrendDetails extends Component {
     
    calculateSlope = () => {
        let deltaX = null;
        let deltaY = null;
        let slope = null;

        this.props.trend.forEach(value => {
            deltaX = Math.abs(value.start[1] - value.end[1]);
            deltaY = value.end[0] - value.start[0];
            slope = (deltaY / deltaX).toFixed(2);  
        })
        return slope;
    }

    render() {
        return(
            <div className={styles.container}>
               <span className={styles.header}>Slope</span><br/>
               <span>{this.calculateSlope()}</span>
            </div>
        );
    }
}

export default TrendDetails;