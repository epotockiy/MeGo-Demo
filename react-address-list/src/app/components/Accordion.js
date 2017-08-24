import React   from 'react';
import Address from './Address';
import {
  Button,
  Collapse
} from 'reactstrap';
import * as reducerActions from './../actions/reducerActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Accordion extends React.Component {
  constructor(props) {
    super(props);
  }

  onCollapseButtonClick(index) {
    this.props.setIsAddressOpen(this.props.currentAddress, false);
    this.props.setIsAddressOpen(index, !this.props.isAddressOpen[index]);
    this.props.setCurrentAddress(index);
  }

  render() {
    return (
      <div className='container'>
        {this.props.addresses.map((address, index) => {
          return (
            <div key={index} className='mt-3 mb-2'>
              <Button block color="info" onClick={() => this.onCollapseButtonClick(index)}>
                {address.address.city ? address.address.city + ', ' : null}
                {address.address.state ? address.address.state + ', ' : null}
                {address.address.country ? address.address.country : null}
              </Button>
              <Collapse
                isOpen={this.props.isAddressOpen[index]}
                onOpened={() => this.props.setIsAddressOpen(index, true)}
                onClosed={() => this.props.setIsAddressOpen(index, false)}
              >
                <Address index={index} />
              </Collapse>
            </div>
          );
        })}
      </div>
    );
  }
}

Accordion.propTypes = {
  currentAddress:    PropTypes.number,
  addresses:         PropTypes.array,
  isAddressOpen:     PropTypes.array,
  setIsAddressOpen:  PropTypes.func.isRequired,
  setCurrentAddress: PropTypes.func.isRequired
};

Accordion.defaultProps = {
  currentAddress: 0,
  addresses: [],
  isAddressOpen: []
};

const mapStateToProps = (state) => {
  return {
    addresses:      state.Reducer.addresses,
    isAddressOpen:  state.Reducer.isAddressOpen,
    currentAddress: state.Reducer.currentAddress
  };
};

const mapDispatchToProps = {
  setIsAddressOpen:  reducerActions.setIsAddressOpen,
  setCurrentAddress: reducerActions.setCurrentAddress
};

export default connect(mapStateToProps, mapDispatchToProps)(Accordion);
