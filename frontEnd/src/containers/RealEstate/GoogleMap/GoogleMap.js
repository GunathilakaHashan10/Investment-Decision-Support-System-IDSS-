import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import styles from '../../../assets/css/RealEstate/GoogleMap/GoogleMap.css';

const mapStyles = {
    width: '100%',
    height: '100%',
  };

class GoogleMap extends Component {

    render() {
        return (
            <div className={styles.map_container}>
                <Map
                    google={this.props.google}
                    zoom={9}
                    style={mapStyles}
                    initialCenter={{ lat: this.props.mapCoordinates.latitude, lng: this.props.mapCoordinates.longitude}}
                    center={{ lat: this.props.mapCoordinates.latitude, lng: this.props.mapCoordinates.longitude}}
                    
                    
                >
                <Marker position={{ lat: this.props.mapCoordinates.latitude, lng: this.props.mapCoordinates.longitude}} />
                </Map>
            </div>
        );
    }
}

export default GoogleApiWrapper({
    apiKey:'AIzaSyCqA-jkCzFK5A4W364pSZRnoS6AB2ZBxCM'
  })(GoogleMap);
