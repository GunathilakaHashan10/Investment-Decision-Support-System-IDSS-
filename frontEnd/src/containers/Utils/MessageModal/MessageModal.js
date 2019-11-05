import React, { Component } from 'react';
import ReactLoading from 'react-loading';
import lodingStyles from '../../../assets/css/ReactLoading/ReactLoading.css';
import modalStyles from '../../../assets/css/Utils/MessageModal/MessageModal.css';


class MessageModal extends Component {
    state = {
        isLoading: false,
        setLoading: () => {
            this.setState({isLoading: true})
        },
        disAbleLoading: () => {
            this.setState({isLoading: false})
        }
    }

   

    render(){
        const { isLoading} = this.state;
        let content = null;
        
        let reactLoading = (
            <div>
                <div>
                    <h3>Processing...</h3>
                </div>
                <div className={lodingStyles.react_loading_container_absoulte}>
                    <ReactLoading type={'spinningBubbles'} color={'#006AFF'} height={'7%'} width={'7%'} />
                </div>
            </div>
        )
        
        if(this.props.response === null) {
            content = (
                <div>
                    <h2 className={modalStyles.delete_share_head}>{this.props.message}</h2>
                    <div className={modalStyles.button_container}>
                        <button
                            onClick={state => this.props.handleOperation(this.state)}
                        >
                        {this.props.buttonName}
                        </button>
                        <button
                            onClick={this.props.handelCancel || this.props.closeModal  }
                        >
                        Cancel
                        </button>
                    </div>
                </div>
            )
        } else  {
            content = (
                <div>
                    <div>
                        <h3>{this.props.response}</h3>
                        <div className={modalStyles.button_container_response}>
                            <button
                                onClick={this.props.closeModal}
                            >
                            Ok
                            </button>
                        </div>
                    </div>
                </div>
            )
        } 
        
        
        return(
            <div className={modalStyles.modal}>
                <div className={modalStyles.modal_container}>
                   
                    {isLoading ? reactLoading : content}

                </div>
            </div>
        )
    }
}

export default MessageModal;