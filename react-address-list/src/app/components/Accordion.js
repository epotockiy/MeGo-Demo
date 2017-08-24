import React               from 'react';
import PropTypes           from 'prop-types';
import Address             from './Address';
import { connect         } from 'react-redux';
import * as reducerActions from './../actions/reducerActions';
import {
  Button,
  Collapse
} from 'reactstrap';

const Accordion = (props) => {
  return (
    <div className='container'>
      {props.addresses.map((address, index) => {
        return (
          <div key={index} className='mt-3 mb-2'>
            <Button block color="info" onClick={() => {
              props.setIsAddressOpen(props.currentAddress, false);
              props.setIsAddressOpen(index, !props.isAddressOpen[index]);
              props.setCurrentAddress(index);
            }}>
              {address.address.city ? address.address.city + ', ' : null}
              {address.address.state ? address.address.state + ', ' : null}
              {address.address.country ? address.address.country : null}
            </Button>
            <Collapse
              isOpen={props.isAddressOpen[index]}
              onOpened={() => props.setIsAddressOpen(index, true)}
              onClosed={() => props.setIsAddressOpen(index, false)}
            >
              <Address index={index} />
            </Collapse>
          </div>
        );
      })}
    </div>
  );
};

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
