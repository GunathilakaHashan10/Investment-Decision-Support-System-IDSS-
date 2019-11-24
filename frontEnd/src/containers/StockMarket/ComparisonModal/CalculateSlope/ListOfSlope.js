import React, { Component } from 'react';
import ReactLoading from 'react-loading';
import styles from '../../../../assets/css/StockMarket/CalculateSlope/ListOfSlope.css';

class ListOfSlope extends Component {    
    state = {
        comapanyList: []
    }


    componentWillReceiveProps(props) {
      
        if(props.company.length === 0) {
            this.setState({comapanyList: props.slopeData})
        } else {
        const comapanyListCopy = []
            props.company.forEach((value, index) => {
                props.slopeData.forEach((company, indexCompany) => {
                    if(value === indexCompany) {
                        comapanyListCopy.push(company)
                       return
                    }
                })
            })
            
            this.setState({comapanyList: comapanyListCopy})
        }
    }

  

    render() {
        return (
            <div className={styles.container}>
                <div className={styles.main_container} >
                {
                    (this.props.isLoading === false) && 
                    this.state.comapanyList.map((value, index) => {
                        let company = null
                        if(value.slope !== null) {
                            company =  (
                                <div className={styles.share_container} key={index}>
                                    <span className={styles.share_name}>{value.shareName}</span>
                                    <span className={styles.share_slope}>{value.slope.toFixed(2)}</span>
                                </div>
                                  
                            );
                        } 
                        return company;
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

export default ListOfSlope;