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

  render() {
    return (
      <Map
        style={{width: '100%', height: '100%'}}
        zoom={13}
        center={[
          parseFloat(this.props.addresses[this.props.currentAddress].lat),
          parseFloat(this.props.addresses[this.props.currentAddress].lon)
        ]}
      >
        <TileLayer
          url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
          attribution='&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors'
        />

        <Marker position={[
          parseFloat(this.props.addresses[this.props.currentAddress].lat),
          parseFloat(this.props.addresses[this.props.currentAddress].lon)
        ]}/>
      </Map>
    );
  }
}

AddressMap.propTypes = {
  addresses:      PropTypes.array,
  currentAddress: PropTypes.number
};

AddressMap.defaultProps = {
  addresses: [],
  currentAddress: 0
};

const mapStateToProps = (state) => {
  return {
    addresses:      state.Reducer.addresses,
    currentAddress: state.Reducer.currentAddress
  };
};

const mapDispatchToProps = {
};

export default connect(mapStateToProps)(AddressMap);
