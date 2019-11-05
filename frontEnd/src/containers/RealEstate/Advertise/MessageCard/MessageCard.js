import React, { Component } from 'react';
import styles from '../../../../assets/css/RealEstate/Advertise/MessageCard/MessageCard.css';

class MessageCard extends Component {
    state = {
        isViewed: this.props.isViewed,
        handleViewed: () => {
            this.setState({isViewed: true })
        }
    }

    render() {
        console.log(this.state.isViewed)
        const { isViewed } = this.state;
        const {senderName, message,  id } = this.props;
        return(
            <div className={isViewed ? styles.message_container : styles.message_container_newMessage} onClick={(e, state) => this.props.handleSwapMessage(e,this.state)} id={id}>
                {!isViewed && <span id={styles.new_message_header}>New message</span>}
                <span id={styles.sender_name}>{senderName}</span>
                <span id={styles.message_brief}>{message}</span>
            </div>
        )
    }
}

export default MessageCard;