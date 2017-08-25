import React               from 'react';
import PropTypes           from 'prop-types';
import { connect         } from 'react-redux';
import * as reducerActions from './../actions/reducerActions';
import {
  Map,
  TileLayer,
  Marker
} from 'react-leaflet';

class AddressMap extends React.Component {
  constructor(props) {
    super(props);
  }

  getNewAddress(event) {
    this.props.addresses[this.props.currentAddress].lat = event.target.getLatLng().lat;
    this.props.addresses[this.props.currentAddress].lon = event.target.getLatLng().lng;
    this.props.getAddressByCoordinates(event.target.getLatLng().lat, event.target.getLatLng().lng)
      .then(() => {
        this.props.setAddress(this.props.coordinateSearchAddress, this.props.currentAddress);
      });
  }

  render() {
    return (
      <Map
        style={{width: '100%', height: '100%'}}
        bounds={[
          [
            parseFloat(this.props.addresses[this.props.currentAddress].boundingbox[0]),
            parseFloat(this.props.addresses[this.props.currentAddress].boundingbox[2])
          ],
          [
            parseFloat(this.props.addresses[this.props.currentAddress].boundingbox[1]),
            parseFloat(this.props.addresses[this.props.currentAddress].boundingbox[3])
          ]
        ]}
      >
        <TileLayer
          url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
          attribution='&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors'
        />

        <Marker
          position={[
            parseFloat(this.props.addresses[this.props.currentAddress].lat),
            parseFloat(this.props.addresses[this.props.currentAddress].lon)
          ]}
          draggable={true}
          ondragend={(e) => this.getNewAddress(e)}
        />
      </Map>
    );
  }
}

AddressMap.propTypes = {
  addresses:               PropTypes.array,
  currentAddress:          PropTypes.number,
  coordinateSearchAddress: PropTypes.object,
  getAddressByCoordinates: PropTypes.func.isRequired,
  setAddress:              PropTypes.func.isRequired
};

AddressMap.defaultProps = {
  addresses: [],
  currentAddress: 0,
  isFetching: false
};

const mapStateToProps = (state) => {
  return {
    addresses:               state.Reducer.addresses,
    currentAddress:          state.Reducer.currentAddress,
    coordinateSearchAddress: state.Reducer.coordinateSearchAddress
  };
};

const mapDispatchToProps = {
  getAddressByCoordinates: reducerActions.getAddressByCoordinates,
  setAddress:              reducerActions.setAddress
};

export default connect(mapStateToProps, mapDispatchToProps)(AddressMap);
