import React, { Component } from "react";
import UserService from "../services/user.service";
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

const mapStyles = {
  width: '100%',
  height: '100%',
};

export class MapContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      stores: [{ lat: 31.6670935,lon: 34.5689177},
              {latitude: 31.6958812, longitude: 34.5790072},
              {latitude: 31.7000706, longitude: 34.6088181},
              {latitude: 31.7000706, longitude: 34.5790072},
              {latitude: 31.7977314, longitude: 34.6529922},
              {latitude: 34.634187, longitude: 34.634187}]
    }
  }
  
  componentDidMount() {
    UserService.getPublicContent().then(
      response => {
        this.setState({
          content: response.data
        });
      },
      error => {
        this.setState({
          content:
            (error.response && error.response.data) ||
            error.message ||
            error.toString()
        });
      }
    );
  }

  displayMarkers = () => {
    return this.state.stores.map((store, index) => {
      return <Marker key={index} id={index} position={{
       lat: store.latitude,
       lng: store.longitude
     }}
     onClick={() => console.log("You clicked me!")} />
    })
  }

  render() {
    return (
        <Map
          google={this.props.google}
          zoom={10}
          style={mapStyles}
          initialCenter={{ lat: 31.6670935, lng: 34.5689177}}
        >
          {this.displayMarkers()}
        </Map>
    );
  }
}
export default GoogleApiWrapper({
  apiKey: 'AIzaSyD46U2buN-sB8zqN9ipvxzD5ZKB1enx5Cg'
})(MapContainer);
