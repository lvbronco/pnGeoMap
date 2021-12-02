import React from 'react';
import MapContainer from "./MapContainer";
import PropTypes from 'prop-types';

class GeoMap extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            latLng: this.props.initialCenter
        }
    }

    handleMessage = (event) => {
        const coord = event.message;
        this.setState({latLng: coord});
        this.props.handleUpdateLocation(coord);
    };

    componentDidMount() {
        this.props.pubnub.addListener({ message: this.handleMessage });
        this.props.pubnub.subscribe({ channels: this.props.channels });
    }

    render() {
        return (
            <MapContainer apiKey={this.props.apiKey} initialCenter={this.state.latLng}/>
        );
    }
}

GeoMap.propTypes = {
    initialCenter: PropTypes.object,
    apiKey: PropTypes.string,
    publishKey: PropTypes.string,
    subscribeKey: PropTypes.string,
    uuid: PropTypes.string
}

export default GeoMap;