import React, { Component } from 'react';
import JwtDecode from 'jwt-decode';
import axios from 'axios';
import styles from '../../../../assets/css/RealEstate/Advertise/HomeAdsPublish/HomeAdsPublish.css';
import ResultsModal from '../ResultsModal/ResultsModal';

class HomeAdsPublish extends Component {
    state = {
        propertyType: null,
        sellOrRent: null,
        location: null,
        price: null,
        bedRooms: null,
        bathRooms: null,
        floors: null,
        parkingSpace: null,
        landSize: null,
        AC: false,
        hotWater: false,
        mainLineWater: false,
        overHeadWater: false,
        serventRoom: false,
        serventToilet: false,
        propertyDescription: null,
        isOpenResultsModal: false,
        modalMessage: null,
        imageFiles: null,
        longitude: null,
        latitude: null
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({ isOpenResultsModal: true });
        const formData = new FormData();

        const token = localStorage.getItem('token');
        const decodedToken = JwtDecode(token);
        const userId = decodedToken.userId;
        
        formData.append('userId', userId);
        formData.append('propertyType', this.state.propertyType);
        formData.append('sellOrRent', this.state.sellOrRent);
        formData.append('location', this.state.location);
        formData.append('price', this.state.price);
        formData.append('bedRooms', this.state.bedRooms);
        formData.append('bathRooms', this.state.bathRooms);
        formData.append('floors', this.state.floors);
        formData.append('parkingSpace', this.state.parkingSpace);
        formData.append('landSize', this.state.landSize);
        formData.append('AC', this.state.AC);
        formData.append('hotWater', this.state.hotWater);
        formData.append('mainLineWater', this.state.mainLineWater);
        formData.append('overHeadWater', this.state.overHeadWater);
        formData.append('serventRoom', this.state.serventRoom);
        formData.append('serventToilet', this.state.serventToilet);
        formData.append('propertyDescription', this.state.propertyDescription);
        formData.append('longitude', this.state.longitude);
        formData.append('latitude', this.state.latitude);
        
        let imageFiles = this.state.imageFiles;

        for(let i=0; i < imageFiles.length; i++) {
            formData.append('adsImages',imageFiles[i]);
        }

        axios.post('http://localhost:5000/adPublish?pathName=homeImages', formData)
            .then(res => {
                this.setState({
                    modalMessage: res.data.message
                })
            })
            .catch(error => {
                console.log(error);
            }) 

    }

    handlePropertyTypeOnChange = (event) => {
        this.setState({
            propertyType: event.target.value
        })
    }

    handleSellOrRentOnChange = (event) => {
        this.setState({
            sellOrRent: event.target.value
        })
    }

    handleOnChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleTextAreaOnChange = (event) => {
        this.setState({
            propertyDescription: event.target.value
        })
    }

    handleOpenResultsModal = () => {
        this.setState({ isOpenResultsModal: true });
    }

    handleCloseResultsModal = () => {
        this.setState({ isOpenResultsModal: false });
    }

    handleMultipleImageOnChange = (event) => {
        this.setState({ imageFiles: event.target.files});
    }


    render() {
        return (
            <div className={styles.container}>
                <form onSubmit={this.handleSubmit}>
                <div className={styles.input_container}>
                    <div className={styles.label_name}>
                        <span>Property Type</span>
                        <span>:</span>
                    </div> 
                    <select className={styles.input} name="propertyType" onChange={this.handlePropertyTypeOnChange}>
                        <option>-type-</option>
                        <option value="Home">Home</option>
                        <option value="Apartment">Apartment</option>
                        <option value="Annex">Annex</option>
                    </select> 
                </div>
                <div className={styles.input_container}>
                    <div className={styles.label_name}>
                        <span>Sell / Rent</span>
                        <span>:</span>
                    </div> 
                    <select className={styles.input} name="sellOrRent" onChange={this.handleSellOrRentOnChange}>
                        <option>-type-</option>
                        {this.state.propertyType !== "Annex" && <option value="Sell" >Sell</option> }
                        <option value="Rent" >Rent</option>
                    </select> 
                </div>
                <div className={styles.input_container}>
                    <div className={styles.label_name}>
                        <span>Address</span>
                        <span>:</span>
                    </div>
                    <input type="text" name="location" className={styles.input} onChange={this.handleOnChange}/>
                </div>
                <div className={styles.input_container}>
                    <div className={styles.label_name}>
                        <span>Longitude</span>
                        <span>:</span>
                    </div>
                    <input type="Number" name="longitude" className={styles.input} onChange={this.handleOnChange}/>
                </div>
                <div className={styles.input_container}>
                    <div className={styles.label_name}>
                        <span>Latitude</span>
                        <span>:</span>
                    </div>
                    <input type="Number" name="latitude" className={styles.input} onChange={this.handleOnChange}/>
                </div>
                <div className={styles.input_container}>
                    <div className={styles.label_name}>
                        <span>{this.state.sellOrRent === "Rent" || this.state.propertyType === "Annex" ? "Rent(per month)": "Price"}</span>
                        <span>:</span>
                    </div>
                    <input type="number" name="price" className={styles.input} onChange={this.handleOnChange}/>
                </div> 
                <div className={styles.input_container}>
                    <div className={styles.label_name}>
                        <span>Bedrooms</span>
                        <span>:</span>
                    </div>
                    <input type="number" name="bedRooms" className={styles.input} onChange={this.handleOnChange}/>
                </div>
                <div className={styles.input_container}>
                    <div className={styles.label_name}>
                        <span>Bathrooms</span>
                        <span>:</span>
                    </div>
                    <input type="number" name="bathRooms" className={styles.input} onChange={this.handleOnChange}/>
                </div> 
                <div className={styles.input_container}>
                    <div className={styles.label_name}>
                        <span>No: of floors</span>
                        <span>:</span>
                    </div>
                    <input type="number" name="floors" className={styles.input} onChange={this.handleOnChange}/>
                </div>
                <div className={styles.input_container}>
                    <div className={styles.label_name}>
                        <span>Car parking space</span>
                        <span>:</span>
                    </div>
                    <input type="number" name="parkingSpace" className={styles.input} onChange={this.handleOnChange}/>
                </div>
                <div className={styles.input_container}>
                    <div className={styles.label_name}>
                        <span>Area of lands</span>
                        <span>:</span>
                    </div>
                    <input type="number" name="landSize" className={styles.input} onChange={this.handleOnChange}/>
                </div> 
                <h3>Property features</h3>
                <div className={styles.property_features}>
                    <div className={styles.property_features_check}>
                        <input type="checkbox" name="AC" value="true" onChange={this.handleOnChange}/>
                        <span>AC Rooms</span>
                    </div>
                    <div className={styles.property_features_check}>
                        <input type="checkbox" name="hotWater" value="true" onChange={this.handleOnChange}/>
                        <span>Hot water</span>
                    </div>
                </div>
                <div className={styles.property_features}>
                    <div className={styles.property_features_check}>
                        <input type="checkbox" name="mainLineWater" value="true" onChange={this.handleOnChange} />
                        <span>Mainline water</span>
                    </div>
                    <div className={styles.property_features_check}>
                        <input type="checkbox" name="overHeadWater" value="true" onChange={this.handleOnChange}/>
                        <span>Overhead water storage</span>
                    </div>
                </div>
                <div className={styles.property_features}>
                    <div className={styles.property_features_check}>
                        <input type="checkbox" name="serventRoom" value="true" onChange={this.handleOnChange}/>
                        <span>Servent Room</span>
                    </div>
                    <div className={styles.property_features_check}>
                        <input type="checkbox" name="serventToilet" value="true" onChange={this.handleOnChange}/>
                        <span>Servent Toilet</span>
                    </div>
                </div>
                <h3>Property Details</h3>
                    <textarea className={styles.textarea} name="propertyDescription" onChange={this.handleTextAreaOnChange}/>
                <h3>Property images</h3> 
                    <input 
                        type="file"
                        name="file" 
                        className={styles.image_upload}
                        onChange={this.handleMultipleImageOnChange}
                        multiple={true}
                    />  
                <div className={styles.button_container}>
                    <button 
                        type="submit"
                        className={styles.button_home}
                        onClick={this.handleSubmit}
                    >
                    Publish
                    </button>
                    <button 
                        className={styles.button}
                        onClick={this.handleOpenResultsModal}
                    >
                    Cancel
                    </button>
                </div> 
                </form>  
                {this.state.isOpenResultsModal 
                    && <ResultsModal closeModal={this.handleCloseResultsModal} message={this.state.modalMessage}/>} 
            </div>
        )
    }
}

export default HomeAdsPublish;