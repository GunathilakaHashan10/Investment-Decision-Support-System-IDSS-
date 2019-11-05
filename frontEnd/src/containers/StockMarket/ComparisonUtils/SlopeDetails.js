import React, { Component } from 'react';
import axios from 'axios';
import { timeParse } from "d3-time-format";
import styles from '../../../assets/css/StockMarket/SlopeDetails.css';

const parseDate = timeParse("%Y-%m-%d");

class SlopeDetails extends Component {
    state = {
        ltpValues: [],
        xStart: null,
        xEnd: null,
        slopeOfShares: [],
        isLoding: false
    }

    componentDidMount() {
        axios.get("http://localhost:5000/getFile?id=" + this.props.shareId)
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
                console.log("xStart: " + this.state.xStart);
                console.log("xEnd: " + this.state.xEnd);
            })
            .catch(error => {
                console.log(error);
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

        axios.post("http://localhost:5000/getSlope", formData)
            .then(response => {
                // console.log(response.data);
                this.setState({
                    slopeOfShares: response.data
                })
                console.log(this.state.slopeOfShares);
            })
            .catch(error => {
                console.log(error);
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
            </div>
        )
    }
}

export default SlopeDetails;