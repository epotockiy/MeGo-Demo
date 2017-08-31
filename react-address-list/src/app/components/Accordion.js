import React                from 'react';
import PropTypes            from 'prop-types';
import Address              from './Address';
import { connect          } from 'react-redux';
import { Button, Collapse } from 'reactstrap';
import * as reducerActions  from './../actions/reducerActions';

const Accordion = (props) => {
  return (
    <div className='container'>
      {props.addresses.map((address, index) => {
        return (
          <div key={index} className='mt-3 mb-2 pl-4 pr-4 pb-2'>
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
              <Address address={address} index={index} />
            </Collapse>
          </div>
        );
      })}
    </div>
  );
};

Accordion.propTypes = {
  currentAddress:    PropTypes.number,/*Why eslint shows error here?*/
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
