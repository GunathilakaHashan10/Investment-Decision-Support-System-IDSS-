import React, { Component } from 'react';
import ReactLoading from 'react-loading';
import lodingStyles from '../../../../../assets/css/ReactLoading/ReactLoading.css';
import GoogleMap from '../../../GoogleMap/GoogleMap';
import HomeCardContainer from '../HomeCardContainer/HomeCardContainer';

class HomeAdsContainer extends Component {
    state = {
        loading: true,
        longitude: 79.908937,
        latitude: 6.863285
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({ loading: false })
        },1000);
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
                            <GoogleMap mapCoordinates={this.state} />
                            <HomeCardContainer getCo={this.getCoordinates} />
                        </div>
                }
                
            </div>
            
        );
    }
}

export default HomeAdsContainer;