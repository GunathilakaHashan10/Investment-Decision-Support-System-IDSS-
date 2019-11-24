import React, { Component } from 'react';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import modalStyles from '../../../../assets/css/StockMarket/CalculateSlope/SlopeCompareGraphModal.css';
import { Bar } from 'react-chartjs-2';

class ExpectedReturnCompareModal extends Component {
    state = {
        labels : [],
        chartData: {},
        comapanyList: []
    }

    options = {
        responsive: true,
        legend: {
          position: "left"
        },
        title: {
          display: true,
          text: "Expected Comparison Bar Chart"
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
    }

    componentWillMount() {
        if(this.props.company.length === 0) {
            this.setState({comapanyList: this.props.expectedReturnData})
        } else {
        const comapanyListCopy = []
            this.props.company.forEach((value, index) => {
                this.props.expectedReturnData.forEach((company, indexCompany) => {
                    if(value === indexCompany) {
                        comapanyListCopy.push(company)
                       return
                    }
                })
            })
            
            this.setState({comapanyList: comapanyListCopy})
        }
        
    }

    componentDidMount() {
        const labels = []
        const data = []
        this.state.comapanyList.forEach((company, index) => {
            labels.push(company.share)
            data.push(company.expectedReturn.toFixed(2))
            
        })
        this.setState(() => ({
            chartData: {
                labels:labels,
                datasets: [{ 
                    label: "Expected Return (Rs.)",
                    backgroundColor: "brown",
                    borderColor: "red",
                    borderWidth: 1,
                    data: data
                }]
            }
        }))

        

    }

    render () {
        console.log(this.state.datasetsCompany)
        return (
            <div className={modalStyles.modal}>
                <div className={modalStyles.modal_container}>
                    <div className={modalStyles.graph_container}>
                        <Bar
                            data={this.state.chartData}
                            width={100}
                            height={50}
                            options={this.options}
                        />
                        
                    </div>
                    <button 
                        className={modalStyles.modal_closeButton}
                        onClick={this.props.closeModal}
                    >
                        <IoIosCloseCircleOutline size="2em" color="black"/>
                    </button>
                </div>

            </div>
        )
    }
}

export default ExpectedReturnCompareModal;
