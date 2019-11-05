import React, { Component } from 'react';
import ReactLoading from 'react-loading';
import lodingStyles from '../../../../../assets/css/ReactLoading/ReactLoading.css'
import GoogleMap from '../../../GoogleMap/GoogleMap';
import HomeRentCardContainer from '../HomeRentCardContainer/HomeRentCardContainer';

class HomeRentAdsContainer extends Component {
    state = {
        loading: true,
        longitude: 79.908937,
        latitude: 6.863285
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({ loading: false })
        },1500);
    }

    getCoordinates = (state) => {
        this.setState({
            longitude: state.longitude,
            latitude: state.latitude
        })
        
    }


    render(){
        return(
            <div>
                {
                    this.state.loading 
                    ?   <div className={lodingStyles.react_loading_container_fixed}>
                             <ReactLoading type={'spinningBubbles'} color={'#006AFF'} height={'4%'} width={'4%'} />
                        </div>
                    :
                        <div>
                            <GoogleMap mapCoordinates={this.state}/>
                            <HomeRentCardContainer getCo={this.getCoordinates} />
                        </div>
                }
                
            </div>
        );
    }
}

export default HomeRentAdsContainer;