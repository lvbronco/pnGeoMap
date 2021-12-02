import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react-17';

const containerStyle = {
  position: 'relative',  
  width: '30em',
  height: '30em'
}

export class MapContainer extends Component {
  state = {
    activeMarker: {},
    selectedPlace: {},
    showingInfoWindow: false
  };

  onMarkerClick = (props, marker) =>
    this.setState({
      activeMarker: marker,
      selectedPlace: props,
      showingInfoWindow: true
    });

  onInfoWindowClose = () =>
    this.setState({
      activeMarker: null,
      showingInfoWindow: false
    });

  onMapClicked = () => {
    if (this.state.showingInfoWindow)
      this.setState({
        activeMarker: null,
        showingInfoWindow: false
      });
  };

  render() {
    if (!this.props.loaded) return <div>Loading...</div>;
    return (
      <Map
        className="map"
        google={this.props.google}
        onClick={this.onMapClicked}
        containerStyle={containerStyle}
        center={this.props.initialCenter}
        initialCenter={this.props.initialCenter}
        zoom={14}>

        <InfoWindow
          marker={this.state.activeMarker}
          onClose={this.onInfoWindowClose}
          visible={this.state.showingInfoWindow}>
          <div>
            <h1>{this.state.selectedPlace.name}</h1>
          </div>
        </InfoWindow>

        <Marker name="Current location" onClick={this.onMarkerClick} position={this.props.initialCenter} />

      </Map>
    );
  }
}

MapContainer.propTypes = {
  google: PropTypes.object,
  zoom: PropTypes.number,
  centerAroundCurrentLocation: PropTypes.bool,
  center: PropTypes.object,
  initialCenter: PropTypes.object,
  className: PropTypes.string,
  style: PropTypes.object,
  containerStyle: PropTypes.object,
  visible: PropTypes.bool,
  mapType: PropTypes.string,
  maxZoom: PropTypes.number,
  minZoom: PropTypes.number,
  clickableIcons: PropTypes.bool,
  disableDefaultUI: PropTypes.bool,
  zoomControl: PropTypes.bool,
  zoomControlOptions: PropTypes.object,
  mapTypeControl: PropTypes.bool,
  mapTypeControlOptions: PropTypes.bool,
  scaleControl: PropTypes.bool,
  streetViewControl: PropTypes.bool,
  streetViewControlOptions: PropTypes.object,
  panControl: PropTypes.bool,
  rotateControl: PropTypes.bool,
  fullscreenControl: PropTypes.bool,
  scrollwheel: PropTypes.bool,
  draggable: PropTypes.bool,
  draggableCursor: PropTypes.string,
  keyboardShortcuts: PropTypes.bool,
  disableDoubleClickZoom: PropTypes.bool,
  noClear: PropTypes.bool,
  styles: PropTypes.array,
  gestureHandling: PropTypes.string,
  bounds: PropTypes.object,
  apiKey: PropTypes.string,
  language: PropTypes.string
};

MapContainer.defaultProps = {
  zoom: 14,
  initialCenter: {
    lat: 37.774929,
    lng: -122.419416
  },
  center: {},
  centerAroundCurrentLocation: false,
  style: {},
  containerStyle: {},
  visible: true,
  language: "en"
};


export default GoogleApiWrapper(
  (props) => ({
    apiKey: props.apiKey,
    language: props.language,
  }
))(MapContainer)

/*
        <InfoWindow
          marker={this.state.activeMarker}
          onClose={this.onInfoWindowClose}
          visible={this.state.showingInfoWindow}>
          <div>
            <h1>{this.state.selectedPlace.name}</h1>
          </div>
        </InfoWindow>

        <InfoWindow position={{ lat: 30.220720, lng: -97.733230 }} visible>
          <small>
            Click on any of the markers to display an additional info.
          </small>
        </InfoWindow>
        */
