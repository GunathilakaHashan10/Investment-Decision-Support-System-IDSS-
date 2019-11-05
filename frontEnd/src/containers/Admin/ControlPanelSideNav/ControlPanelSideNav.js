import React, { Component } from 'react';
import { IoMdArrowDropright, IoMdArrowDropleft} from 'react-icons/io';
import styles from '../../../assets/css/Admin/ControlPanelSideNav/ControlPanelSideNav.css';
import AddNewShareModal from '../AdminStocks/AdminStocksModals/AddNewShareModal/AddNewShareModal';
import AddNewBankModal from '../AdminBank/AdminBankModals/AddNewBankModal/AddNewBankModal';

class ControlPanelSideNav extends Component {
    state = {
        isOpenStocks: false,
        isOpenRealEstate: false,
        isOpenBank: false,
        isOpenUsers: false,
        isOpenMessages: false,
        isOpenAddNewShareModal: false,
        isOpenAddNewBankModal: false
    }

    


    handleOpenStocks = () => {
        this.setState({ isOpenStocks: !this.state.isOpenStocks});
    }

    handleOpenRealEstate = () => {
        this.setState({ isOpenRealEstate: !this.state.isOpenRealEstate});
    }

    handleOpenBank = () => {
        this.setState({ isOpenBank: !this.state.isOpenBank});
    }

    handleOpenUsers = () => {
        this.setState({ isOpenUsers: !this.state.isOpenUsers});
    }

    handleOpenMessages = () => {
        this.setState({ isOpenMessages: !this.state.isOpenMessages});
    }

    handleOpenAddNewShareModal = () =>{
        this.setState({
            isOpenAddNewShareModal: true,
            isOpenStocks: false,
        });
        this.handleCloseAllDropUp();
        this.props.history.push(`${this.props.match.url}/stock-control`);
    }

    handleOpenAddNewBankModal = () => {
        this.setState({
            isOpenAddNewBankModal: true,
            isOpenStocks: false,
            isOpenAddNewShareModal: false
        })
        this.handleCloseAllDropUp();
        this.props.history.push(`${this.props.match.url}/bank-control`);
    }

    handleCloseAddNewBankModal = () => {
        this.setState({
            isOpenAddNewBankModal: false
        })
    }

    handleCloseAddNewShareModal = () => {
        this.setState({isOpenAddNewShareModal: false});
    }

    componentWillMount() {
        document.addEventListener('mousedown', this.handleClick, false);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClick, false);
    }

    handleCloseAllDropUp = () => {
      
            this.setState({
                isOpenStocks: false,
                isOpenRealEstate: false,
                isOpenBank: false,
                isOpenUsers: false,
                isOpenMessages: false,
            });
        
    }

    handleClick = (e) => {  
        if(this.node.contains(e.target)) {
            return;
        }

        this.handleCloseAllDropUp();
    }

    handleNavigation = (event) => {
        this.props.history.push(`${this.props.match.url}/${event.currentTarget.id}`);
        this.setState({
            isOpenStocks: false,
            isOpenRealEstate: false,
            isOpenBank: false,
            isOpenUsers: false,
            isOpenMessages: false,
        });
    }

     render() {
        const {isOpenAddNewShareModal, isOpenAddNewBankModal} = this.state;
        let path = window.location.pathname.split('/');
        let extractedPath = path[path.length - 1];
        
        return (
            <div className={styles.sideNav_container} ref={node => this.node = node}>
                <div className={styles.button_container}>
                    <button 
                        className={extractedPath === "stock-control" ? styles.sideNav_button_active : styles.sideNav_button}
                        onClick={this.handleOpenStocks}
                    >
                    <span>Stocks</span>
                    <div>{this.state.isOpenStocks ? <IoMdArrowDropleft size="1.7em" /> :<IoMdArrowDropright size="1.7em" />}</div>
                    </button>
                    <div className={this.state.isOpenStocks ? styles.dropSide_container : styles.dropSide_container_hide}>
                        <button 
                            className={styles.dropSide_button}
                            id="stock-control"
                            onClick={this.handleNavigation}
                        >
                        Shares
                        </button>
                        <button 
                            className={styles.dropSide_button}
                            onClick={this.handleOpenAddNewShareModal}
                        >
                        Add new share
                        </button>

                    </div>
                </div>


                <div className={styles.button_container}>
                    <button 
                        className={extractedPath === "realEsate-control" ? styles.sideNav_button_active : styles.sideNav_button}
                        onClick={this.handleOpenRealEstate}
                    >
                    <span>Real Estate</span>
                    <div>{this.state.isOpenRealEstate ? <IoMdArrowDropleft size="1.7em" /> :<IoMdArrowDropright size="1.7em" />}</div>
                    </button>
                    <div className={this.state.isOpenRealEstate ? styles.dropSide_container : styles.dropSide_container_hide}>
                        <button 
                            className={styles.dropSide_button}
                            id="realEsate-control"
                            onClick={this.handleNavigation}
                        >
                        Advertisers
                        </button>
                    </div>
                </div>

                <div className={styles.button_container}>
                    <button 
                    className={extractedPath === "bank-control" ? styles.sideNav_button_active : styles.sideNav_button}
                        onClick={this.handleOpenBank}
                    >
                    <span>Bank</span>
                    <div>{this.state.isOpenBank ? <IoMdArrowDropleft size="1.7em" /> :<IoMdArrowDropright size="1.7em" />}</div>
                    </button>
                    <div className={this.state.isOpenBank ? styles.dropSide_container : styles.dropSide_container_hide}>
                        <button 
                            className={styles.dropSide_button}
                            id="bank-control"
                            onClick={this.handleNavigation}
                        >
                        Bank
                        </button>
                        <button 
                            className={styles.dropSide_button}
                            onClick={this.handleOpenAddNewBankModal}
                        >
                        Add New Bank
                        </button>
                        
                    </div>
                </div>

                <div className={styles.button_container}>
                    <button 
                    className={extractedPath === "user-control" ? styles.sideNav_button_active : styles.sideNav_button}
                        onClick={this.handleOpenUsers}
                    >
                    <span>Users</span>
                    <div>{this.state.isOpenUsers ? <IoMdArrowDropleft size="1.7em" /> :<IoMdArrowDropright size="1.7em" />}</div>
                    </button>
                    <div className={this.state.isOpenUsers ? styles.dropSide_container : styles.dropSide_container_hide}>
                        <button 
                            className={styles.dropSide_button}
                            id="user-control"
                            onClick={this.handleNavigation}
                        >
                            Users
                        </button>
                        <button className={styles.dropSide_button}>Block Users</button>
                        <button className={styles.dropSide_button}>Remover Users</button>
                    </div>
                </div>

                <div className={styles.button_container}>
                    <button 
                        className={styles.sideNav_button}
                        onClick={this.handleOpenMessages}
                    >
                    <span>Messages</span>
                    <div>{this.state.isOpenMessages ? <IoMdArrowDropleft size="1.7em" /> :<IoMdArrowDropright size="1.7em" />}</div>
                    </button>
                    <div className={this.state.isOpenMessages ? styles.dropSide_container : styles.dropSide_container_hide}>
                        <button className={styles.dropSide_button}>New Messages</button>
                    </div>
                </div>
                {isOpenAddNewShareModal && 
                    <AddNewShareModal 
                        closeModal={this.handleCloseAddNewShareModal}
                    />
                }
                {isOpenAddNewBankModal && 
                    <AddNewBankModal 
                        closeModal={this.handleCloseAddNewBankModal}
                    />
                }
            </div>
        );
    }
}

export default ControlPanelSideNav;