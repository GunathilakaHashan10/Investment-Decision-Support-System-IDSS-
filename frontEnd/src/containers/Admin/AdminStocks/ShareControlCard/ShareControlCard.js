import React, { Component } from 'react';
import styles from '../../../../assets/css/Admin/AdminStocks/ShareControlCard/ShareControlCard.css';

class ShareControlCard extends Component {
    state = {
        shareData: this.props.shareData
    }
    render() {
        const { shareData } = this.state;
        return(
            <div className={styles.container}>
                <div className={styles.shareCard_container_box}>
                    <h2 className={styles.share_name}>{shareData.shareName}</h2>
                    <div className={styles.share_data_container}>
                        <span className={styles.label_name}>
                            <span>Data items</span>
                            <span>:</span>
                        </span>
                        <span className={styles.value}>{shareData.dataItems}</span>
                    </div>
                    <div className={styles.share_data_container}>
                        <span className={styles.label_name}>
                            <span>Start Date</span>
                            <span>:</span>
                        </span>
                        <span className={styles.value}>{shareData.startDate}</span>
                    </div>
                    <div className={styles.share_data_container}>
                        <span className={styles.label_name}>
                            <span>End Date</span>
                            <span>:</span>
                        </span>
                        <span className={styles.value}>{shareData.endDate}</span>
                    </div>
                    <div className={styles.button_container}>
                        <button
                            id={shareData.id}
                            onClick={(event,state) => this.props.handleSetShareId(event,this.state)}
                        >
                        Update share
                        </button>
                        <button
                            value={this.props.shareName}
                            id={shareData.id}
                            onClick={this.props.handleSetShareIdDelete}
                        >
                        Delete Share
                        </button>
                        <button
                            onClick={(event,state) => this.props.handleSetDeleteDataModal(event,this.state)}
                        >Delete data</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default ShareControlCard;