import React from 'react';
import PropTypes from 'prop-types';
import PubNub from 'pubnub';
import { PubNubProvider } from 'pubnub-react';
import * as geohash from 'ngeohash';
import GeoMap from './GeoMap';
import GeoChat from './GeoChat';

class PNGeoMap extends React.Component { 
    constructor(props) {
        super(props);
        this.listeners = {};
        
        this.state = {
          currentLocation: {
            lat: this.props.initialCenter.lat,
            lng: this.props.initialCenter.lng
          },
          channels: ["geo-test-channel"]
        };
    }

    handleUpdateLocation = (location) => {
        this.setState({currentLocation: location})
    }

    geoRoomNumber = (location) => {
        return geohash.encode(location.lat, location.lng);
    }

    render() {
        const pubnub = new PubNub({
            publishKey: this.props.publishKey,
            subscribeKey: this.props.subscribeKey,
            uuid: this.props.uuid
        });

        return (
            <PubNubProvider client={pubnub}>
                <GeoMap 
                    pubnub={pubnub} 
                    handleUpdateLocation={this.handleUpdateLocation}
                    channels={this.state.channels}
                    {...this.props} 
                />
                {/* <GeoChat geoRoomNumber={this.geoRoomNumber(this.state.currentLocation)}/> */}
            </PubNubProvider>  
        );
    }
}

PNGeoMap.propTypes = {
    initialCenter: PropTypes.object,
    apiKey: PropTypes.string,
    publishKey: PropTypes.string,
    subscribeKey: PropTypes.string,
    uuid: PropTypes.string
}

export default PNGeoMap;