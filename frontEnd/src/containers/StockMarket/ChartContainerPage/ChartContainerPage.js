import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import axios from 'axios';

import ChandleStick from '../Charts/Index/indexChandelstick';
import ChandleStickMA from '../Charts/Index/indexMA';
import ChandleStickTrendLine from '../Charts/Index/indexTrendLine';
import ComparisonModal from '../ComparisonModal/ComparisonModal';
import styles from '../../../assets/css/ChartContainerPage/ChartContainerPage.css';

class ChartContainerPage extends Component {
    state = {
        company: [],
        companyId: "5d25fe63969e062b7126c319",
        companyTitle: 'Company name',
        isOpenComparsionModal: false
    }

    componentDidMount() {
        axios.get("http://localhost:5000/shares") 
            .then(res => {
                if(res.status !== 200) {
                    throw new Error('Fecthing shares failed');
                }
                const shareDetails = res.data;
                
                this.setState(prevState => {
                    return {
                        company: prevState.company.concat(shareDetails),
                        companyId: shareDetails[0].shareId
                        
                    }
                })
            })
            .catch(error => {
                console.log(error);
            })
    }

    
        

    handleRenderChart = (event) => {
        this.props.history.push(`${this.props.match.url}/${event.currentTarget.id}`);
    }

    handleCompanyname = (event) => {
        this.setState({ 
            companyTitle: event.currentTarget.value,
            companyId: event.currentTarget.id
        })

        console.log(this.state.companyId);
        this.props.history.push(`${this.props.match.url}`);
        
    }

    handelOpenComparsionModal = () => {
        this.setState({ isOpenComparsionModal: true });
    }

    handelCloseComparsionModal = () => {
        this.setState({ isOpenComparsionModal: false });
    }


    render() { 
        return(
            <div className={styles.container}>
                <div className={styles.main_container}>
                    <div className={styles.share_container}>
                        <div className={styles.share_header}>Share Names</div>
                        <div className={styles.share_names_container}>
                            {this.state.company.map(value => {
                                return <button 
                                        id={value.shareId} 
                                        key={value.shareId} 
                                        className={this.state.companyId === value.shareId ? styles.share_name_button_active : styles.share_name_button}
                                        onClick={this.handleCompanyname}
                                        value={value.shareName}
                                        >{value.shareName}</button>
                            })}
                        </div>
                    </div>
                    <div className={styles.chart_container}>
                        <div className={styles.chart_control_panel}>
                            <button 
                                className={styles.chart_button}
                                id="movingAverage"
                                onClick={this.handleRenderChart}
                            >
                            Moving Average
                            </button>
                            <button 
                            className={styles.chart_button_middel}
                            id="trendLine"
                            onClick={this.handleRenderChart}
                            >
                            Trend Line
                            </button>
                            <button 
                            className={styles.chart_button}
                            onClick={this.handelOpenComparsionModal}
                            >
                            Comparison
                            </button>
                        </div>

                        {this.state.isOpenComparsionModal && <ComparisonModal closeModal={this.handelCloseComparsionModal}/>}

                        <div className={styles.chart_component_container}>
                            <Route 
                            exact={true} 
                            path={this.props.match.path} 
                            render={props => (
                                <ChandleStick 
                                {...props}
                                companyId={this.state.companyId}
                                />
                            )}/>
                            <Route 
                                path={`${this.props.match.path}/movingAverage`} 
                                render={props => (
                                    <ChandleStickMA 
                                    {...props}
                                    companyId={this.state.companyId}
                                    />
                            )}/>
                            <Route 
                                path={`${this.props.match.path}/trendLine`} 
                                render={props => (
                                    <ChandleStickTrendLine 
                                    {...props}
                                    companyId={this.state.companyId}
                                    />
                            )}/>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

export default ChartContainerPage;