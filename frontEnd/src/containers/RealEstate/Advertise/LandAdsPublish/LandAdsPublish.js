import React, { Component } from 'react';
import axios from 'axios';
import JwtDecode from 'jwt-decode';
import styles from '../../../../assets/css/RealEstate/Advertise/HomeAdsPublish/HomeAdsPublish.css';
import ResultsModal from '../ResultsModal/ResultsModal';

class LandAdsPublish extends Component {
    state = {
        landType: null,
        location: null,
        price: null,
        areaOfLand: null,
        propertyDetails: null,
        selectedImages: null,
        isOpenResultsModal: false,
        modalMessage: null,
        longitude: null,
        latitude: null
    }

    handleInputChange = (event) => {
        this.setState({
            [event.target.name]:event.target.value
        });
    }

    handleImagesInputOnChnage = (event) => {
        this.setState({
            selectedImages: event.target.files
        });
    }

    handleOnSubmit = () => {
        this.setState({ isOpenResultsModal: true });
        const formData = new FormData();

        const token = localStorage.getItem('token');
        const decodedToken = JwtDecode(token);
        const userId = decodedToken.userId;

        formData.append('userId', userId);
        formData.append('landType', this.state.landType);
        formData.append('location', this.state.location);
        formData.append('price', this.state.price);
        formData.append('areaOfLand', this.state.areaOfLand);
        formData.append('propertyDetails', this.state.propertyDetails);
        formData.append('longitude', this.state.longitude);
        formData.append('latitude', this.state.latitude);

        let landImages = this.state.selectedImages;
        for(let i=0; i<landImages.length; i++){
            formData.append('adsImages', landImages[i]);
        }

        axios.post('http://localhost:5000/landAdPublish?pathName=homeImages', formData)
            .then(res => {
                console.log(res.data);
                this.setState({
                    modalMessage: res.data.message
                })
            })
            .catch(error => {
                console.log(error);
            })

    }

    handleOpenResultsModal = () => {
        this.setState({ isOpenResultsModal: true });
    }

    handleCloseResultsModal = () => {
        this.setState({ isOpenResultsModal: false });
    }

    render() {
        return (
            <div className={styles.container}>
                <div className={styles.input_container}>
                    <div className={styles.label_name}>
                        <span>Land Type</span>
                        <span>:</span>
                    </div> 
                    <select className={styles.input} name="landType" onChange={this.handleInputChange}>
                        <option>-type-</option>
                        <option value="Bare Land">Bare Land</option>
                        <option value="Beachfront Land">Beachfront Land</option>
                        <option value="Land with House">Land with House</option>
                        <option value="Cultivated / Agriculture">Cultivated / Agriculture</option>
                        <option value="Tea Estate Land">Tea Estate Land</option>
                        <option value="Cocunut Estate Land">Cocunut Estate Land</option>
                        <option value="Rubber Estate Land">Rubber Estate Land</option>
                    </select> 
                </div>
                <div className={styles.input_container}>
                    <div className={styles.label_name}>
                        <span>Address</span>
                        <span>:</span>
                    </div>
                    <input type="text" name="location" className={styles.input} onChange={this.handleInputChange}/>
                </div>
                <div className={styles.input_container}>
                    <div className={styles.label_name}>
                        <span>Longitude</span>
                        <span>:</span>
                    </div>
                    <input type="Number" name="longitude" className={styles.input} onChange={this.handleInputChange}/>
                </div>
                <div className={styles.input_container}>
                    <div className={styles.label_name}>
                        <span>Latitude</span>
                        <span>:</span>
                    </div>
                    <input type="Number" name="latitude" className={styles.input} onChange={this.handleInputChange}/>
                </div>
                <div className={styles.input_container}>
                    <div className={styles.label_name}>
                        <span>Price(Per Perch)</span>
                        <span>:</span>
                    </div>
                    <input type="number" name="price" className={styles.input} onChange={this.handleInputChange}/>
                </div> 
                <div className={styles.input_container}>
                    <div className={styles.label_name}>
                        <span>Area of land (Perch)</span>
                        <span>:</span>
                    </div>
                    <input type="number" name="areaOfLand" className={styles.input} onChange={this.handleInputChange}/>
                </div> 
                <h3>Property Details</h3>
                    <textarea className={styles.textarea} name="propertyDetails" onChange={this.handleInputChange}/>
                <h3>Property images</h3> 
                    <input type="file" className={styles.image_upload} multiple={true} onChange={this.handleImagesInputOnChnage}/> 
                
                <div className={styles.button_container}>
                    <button 
                        className={styles.button_home}
                        onClick={this.handleOnSubmit}
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
                {this.state.isOpenResultsModal 
                    && <ResultsModal closeModal={this.handleCloseResultsModal} message={this.state.modalMessage}/>} 
            </div>
        )
    }
}

export default LandAdsPublish;