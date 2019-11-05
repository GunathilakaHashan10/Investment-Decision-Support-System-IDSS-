import React, { Component } from 'react';
import ReactLoading from 'react-loading';
import modalStyles from '../../../../assets/css/RealEstate/Advertise/ResultsModal/ResultsModal.css';

class ResultsModal extends Component {
    state = {
        loading: true,
        message: null
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({
                loading: false,
                message: this.props.message
            }) 
        }, 10000)
        
    }

    componentWillReceiveProps() {
        setTimeout(() => {
            this.setState({
                loading: false,
                message: this.props.message
            }) 
        }, 10000)
    }
    render() {
        return(
            <div className={modalStyles.modal}>
                <div className={modalStyles.modal_container}>
                
                

                { this.state.loading 
                    ? <div className={modalStyles.react_loading_container}>
                        <ReactLoading type={'spin'} color={'#006AFF'} height={'10%'} width={'10%'} />
                    </div>
                    : <h3>{this.state.message}</h3>
                }
                { !this.state.loading &&
                    <button 
                    className={modalStyles.modal_closeButton}
                    onClick={this.props.closeModal}
                >
                ok
                </button>}
                </div>
            </div>
        )
    }
}

export default ResultsModal;