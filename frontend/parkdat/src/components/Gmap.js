import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

export class MapContainer extends Component {
render() {
    return (
      <Map
        initialCenter={{
            lat: 42.9995,
            lng: -81.2763
          }}
        // initialCenter={{
        //     lat: this.props.coordinates[1],
        //     lng: this.props.coordinates[2]
        //   }}
          google={this.props.google}
          zoom={14}>

       <Marker onClick={this.onMarkerClick}
                name={'Current location'} />

       <InfoWindow onClose={this.onInfoWindowClose}>
            <div>
              {/* <h1>{this.state.selectedPlace.name}</h1> */}
            </div>
        </InfoWindow>
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyAyesbQMyKVVbBgKVi2g6VX7mop2z96jBo'
})(MapContainer)
