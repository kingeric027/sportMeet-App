import React, { Component } from "react";
import {InfoWindow, Map, Marker, GoogleApiWrapper} from 'google-maps-react';
import CurrentLocation from "./Map";

const mapStyles = {
  width: '100%',
  height: '100%'
}

export class MapContainer extends Component {
  //export class MapContainer extends Component {
    state = {
      markers: [
        {
          name:"Current position",
          position: {
            lat: 37.77,
            lng: -122.42
          }
        }
      ],
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlaces: {}
    }
    onMarkerClick = (props, marker, e) => {
      this.setState({
        selectedPlaces: props,
        activeMarker: marker,
        showingInfoWindow: true
      });
    }

    onClose = props => {
      if(this.state.showingInfoWindow) {
        this.setState({
          showingInfoWindow: false,
          activeMarker: null
        });
      }
    }

    onMarkerDragEnd = (coord) => {
      const { latLng } = coord;  //latLng = coord.latLng
      const lat = latLng.lat();
      const lng = latLng.lng();

      this.setState(prevState => {
        const markers = [...this.state.markers];
        markers[0] = {...markers[0], position: { lat, lng}};
        return {markers}
      })
    }
    render() {
      return (
        <CurrentLocation
        centerAroundCurrentLocation
        google={this.props.google}
        >
        <Marker 
          onClick = {this.onMarkerClick}
          name = {'Kenyatta International Convention Centre'}
          draggable={true}
          onDragend={(t, map, coord) => this.onMarkerDragEnd(coord)}
        />
        <InfoWindow
          marker = {this.state.activeMarker}
          visible = {this.state.showingInfoWindow}
          onClose = {this.onClose}
          >
          <div>
            <h4>{this.state.selectedPlaces.name}</h4>
          </div>
          </InfoWindow>
          </CurrentLocation>
        
      );
    }
}

 
export default GoogleApiWrapper({
  apiKey: ("AIzaSyCd6kEcmk3KzX4oPVFjHaa9SU1jJA36Hcg")
})(MapContainer)




