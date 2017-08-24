import React               from 'react';
import PropTypes           from 'prop-types';
import { Map, TileLayer, Marker, Popup  } from 'react-leaflet';
import { connect         } from 'react-redux';
import * as reducerActions from './../actions/reducerActions';

class AddressMap extends React.Component {
  constructor(props) {
    super(props);

    console.log(props);
  }

  getNewAddress(event) {
    console.log(event);

    this.props.getAddressByCoordinates(event.target.options.position[0], event.target.options.position[1])
      .then(() => {
        console.log(this.props.coordinateSearchAddress);
        this.props.setAddress(this.props.coordinateSearchAddress, this.props.currentAddress);
      });
  }

  render() {
    return (
      <Map
        style={{width: '100%', height: '100%'}}
        zoom={14}
        center={[
          parseFloat(this.props.addresses[this.props.currentAddress].lat),
          parseFloat(this.props.addresses[this.props.currentAddress].lon)
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
  currentAddress: 0
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
