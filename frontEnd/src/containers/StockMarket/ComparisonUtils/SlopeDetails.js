import React, { Component } from 'react';
import axios from 'axios';
import * as myConstants from '../../Utils/Constants/Constants';
import { timeParse } from "d3-time-format";
import styles from '../../../assets/css/StockMarket/SlopeDetails.css';
import ErrorMessageModal from '../../Utils/ErrorMessageModal/ErrorMessageModal';

const parseDate = timeParse("%Y-%m-%d");

class SlopeDetails extends Component {
    state = {
        ltpValues: [],
        xStart: null,
        xEnd: null,
        slopeOfShares: [],
        isLoding: false,
        error: null,
        openErrorModal: false
    }

    handleCloseErrorModal = () => {
        this.setState({openErrorModal:false});
    }

    componentDidMount() {
        axios.get(`${myConstants.SEVER_URL}/stock/getFile?id=` + this.props.shareId)
            .then(response => {
                
                this.setState({
                    ltpValues: response.data.result.sort(function(a, b){return parseDate(a.date) - parseDate(b.date)})
                })
                this.state.ltpValues.map((value, index) => {
                    return (this.props.trend.forEach(trendValue => {
                        if(index === trendValue.start[0]) {
                            this.setState({
                                xStart: index
                            })
                        } else if (index === trendValue.end[0]) {
                            this.setState({
                                xEnd: index
                            })
                        }
                    })
                    )
                })
            })
            .catch(error => {
                this.setState({
                    error:error.message,
                    openErrorModal:true
                })
            })
    }

    componentWillReceiveProps() {
        this.state.ltpValues.map((value, index) => {
            return (this.props.trend.forEach(trendValue => {
                if(index === trendValue.start[0]) {
                    this.setState({
                        xStart: index
                    })
                } else if (index === trendValue.end[0]) {
                    this.setState({
                        xEnd: index
                    })
                }
            })
            )
        })
    }

    handleFecthSlopes = (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append("xStart", this.state.xStart);
        formData.append("xEnd", this.state.xEnd);

        axios.post(`${myConstants.SEVER_URL}/stock/getSlope`, formData)
            .then(response => {
                this.setState({
                    slopeOfShares: response.data
                })
            })
            .catch(error => {
                this.setState({
                    error:error.message,
                    openErrorModal:true
                })
            })

    }

    render() {
        return (
            <div>
                <button type="submit" onClick={this.handleFecthSlopes} className={styles.compare_button}>compare</button>
                
                <div className={styles.main_container}>
                {this.state.slopeOfShares.map(value => {
                    return (
                        <div className={styles.shareSlope_container}>
                            <h4>{value.shareName}:</h4>
                            <h4>{value.slope}</h4>
                        </div>
                    );
                })}
                </div>
                {this.state.openErrorModal &&
                    <ErrorMessageModal 
                        closeModal={this.handleCloseErrorModal}
                        error={this.state.error}
                    />
                } 
            </div>
        )
    }
}

export default SlopeDetails;