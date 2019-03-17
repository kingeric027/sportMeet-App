import React from 'react'
import { withGoogleMap, GoogleMap, withScriptjs, InfoWindow, Marker } from "react-google-maps";
import Autocomplete from 'react-google-autocomplete';
import Geocode from "react-geocode";
Geocode.setApiKey("AIzaSyCyfDoFnHAEssmLqnPDD_5qwrNyQk-8_nw");
Geocode.enableDebug();
class Map extends React.Component{
constructor( props ){
  super( props );
  this.state = {
   address: '',
   mapPosition: {
    lat: this.props.center.lat,
    lng: this.props.center.lng
  },
   markerPosition: {
    lat: this.props.center.lat,
    lng: this.props.center.lng
  },
  games: this.props.gamesArray,

  windowLocation: {
    lat: null,
    lng: null
  },
  markerGame: null

  }
 }
/**
  * Get the current address from the default map position and set those values in the state
  */

 componentDidMount(){
   console.log(this.props.gamesArray)
  if (navigator && navigator.geolocation){
      navigator.geolocation.getCurrentPosition(pos => {
          const coords = pos.coords;
          Geocode.fromLatLng( coords.latitude, coords.longitude).then(
              response => { 
                  const address = response.results[0].formatted_address;
                  this.setState({
                      address: ( address ) ? address : '',
                      mapPosition: {
                        lat: coords.latitude,
                        lng: coords.longitude
                      }
                  })
              }
          )
      });
  } else {
      Geocode.fromLatLng(this.props.center.lat, this.props.center.lng).then(
          response => {
              const address = response.results[0].formatted_address;
              this.setState( {
                  address: ( address ) ? address : '',
                  mapPosition: {
                    lat: this.props.center.lat,
                    lng: this.props.center.lng,
                  },
              });
          }
      )
  }
}


/**
  * Component should only update ( meaning re-render ), when the user selects the address, or drags the pin
  *
  * @param nextProps
  * @param nextState
  * @return {boolean}
  */
 shouldComponentUpdate( nextProps, nextState ){
  if (
   this.state.markerPosition.lat !== this.props.center.lat ||
   this.state.address !== nextState.address ||
   this.state.city !== nextState.city ||
   this.state.area !== nextState.area ||
   this.state.state !== nextState.state ||
   this.state.windowLocationm !== nextState.windowLocation
  ) {
   return true
  } else if ( this.props.center.lat === nextProps.center.lat ){
   return false
  }
 }
/**
  * Get the city and set the city input value to the one selected
  *
  * @param addressArray
  * @return {string}
  */
 getCity = ( addressArray ) => {
  let city = '';
  for( let i = 0; i < addressArray.length; i++ ) {
   if ( addressArray[ i ].types[0] && 'administrative_area_level_2' === addressArray[ i ].types[0] ) {
    city = addressArray[ i ].long_name;
    return city;
   }
  }
 };
/**
  * Get the area and set the area input value to the one selected
  *
  * @param addressArray
  * @return {string}
  */
 getArea = ( addressArray ) => {
  let area = '';
  for( let i = 0; i < addressArray.length; i++ ) {
   if ( addressArray[ i ].types[0]  ) {
    for ( let j = 0; j < addressArray[ i ].types.length; j++ ) {
     if ( 'sublocality_level_1' === addressArray[ i ].types[j] || 'locality' === addressArray[ i ].types[j] ) {
      area = addressArray[ i ].long_name;
      return area;
     }
    }
   }
  }
 };
/**
  * Get the address and set the address input value to the one selected
  *
  * @param addressArray
  * @return {string}
  */
 getState = ( addressArray ) => {
  let state = '';
  for( let i = 0; i < addressArray.length; i++ ) {
   for( let i = 0; i < addressArray.length; i++ ) {
    if ( addressArray[ i ].types[0] && 'administrative_area_level_1' === addressArray[ i ].types[0] ) {
     state = addressArray[ i ].long_name;
     return state;
    }
   }
  }
 };
/**
  * And function for city,state and address input
  * @param event
  */
 onChange = ( event ) => {
  this.setState({ [event.target.name]: event.target.value });
 };
/**
  * This Event triggers when the marker window is closed
  *
  * @param event
  */
 onInfoWindowClose = ( event ) => {
};
/**
  * When the user types an address in the search box
  * @param place
  */


/**
  * When the marker is dragged you get the lat and long using the functions available from event object.
  * Use geocode to get the address, city, area and state from the lat and lng positions.
  * And then set those values in the state.
  *
  * @param event
  */
 handleToggleOpen(games){
   console.log('Clicked!');
   console.log(this.state.windowLocation);
  this.setState({
    windowLocation : {
      lat : games.location.lat,
      lng : games.location.lng
    },
    markerGame: games		
  })
}

 
render(){
const AsyncMap = withScriptjs(
   withGoogleMap(
    props => (
     <GoogleMap google={this.props.google}
      defaultZoom={this.props.zoom}
      defaultCenter={{ lat: this.state.mapPosition.lat, lng: this.state.mapPosition.lng }}
     >
      {/* For Auto complete Search Box 
      <Autocomplete
       style={{
        width: '100%',
        height: '40px',
        paddingLeft: '16px',
        marginTop: '2px',
        marginBottom: '100px'
       }}
       onPlaceSelected={ this.onPlaceSelected }
       types={['geocode']}
      />  */}
{/*Marker. Need to get a marker for each game*/}
{this.props.gamesArray.map( (games, index) => (
    <Marker
    draggable = {false}
      position={{ lat: games.location.lat, lng: games.location.lng }}
      onClick={() => this.handleToggleOpen(games)}
      key={index}
      />
))}

{this.state.windowLocation.lat && 
<InfoWindow
onClose = {this.onInfoWindowClose}
position={{ lat: ( this.state.windowLocation.lat + 0.0018 ), lng: this.state.windowLocation.lng }}
>
  <div>
        <span style={{ padding: 0, margin: 0 }}>
        <p>{this.state.markerGame.sport}</p>
        <p>{this.state.markerGame.address}</p>
        </span>
    </div>
</InfoWindow>
} 

</GoogleMap>
)
   )
  );
let map;
  if( this.props.center.lat !== undefined ) {
   map = <div>
     <div>
      <div className="form-group">
       <input type="text" name="address" className="form-control" onChange={ this.onChange } readOnly="readOnly" value={ this.state.address }/>
      </div>
     </div>
     <AsyncMap
      googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCyfDoFnHAEssmLqnPDD_5qwrNyQk-8_nw&libraries=places"
      loadingElement={
       <div style={{ height: `100%` }} />
      }
      containerElement={
       <div style={{ height: this.props.height }} />
      }
      mapElement={
       <div style={{ height: `100%` }} />
      }
     />
    </div>
} else {
   map = <div style={{height: this.props.height}} />
  }
  return( map )
 }
}
export default Map