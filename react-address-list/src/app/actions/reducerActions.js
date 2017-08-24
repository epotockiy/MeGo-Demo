import {
  SET_CURRENT_ADDRESS,
  SET_ADDRESSES,
  SET_ADDRESS,
  SET_POSSIBLE_ADDRESSES,
  REQUEST_DATA, SET_IS_ADDRESS_OPEN
} from '../constants/actionTypes';

export function requestData() {
  return {
    type: REQUEST_DATA
  };
}

export function setCurrentAddress(address) {
  return {
    type: SET_CURRENT_ADDRESS,
    payload: address
  };
}

export function setAddresses(addresses) {
  return {
    type: SET_ADDRESSES,
    payload: addresses
  };
}

export function setAddress(address, index) {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      dispatch({
        type: SET_ADDRESS,
        payload: address,
        index: index
      });
      resolve();
    });
  };
}

export function setPossibleAddresses(addresses) {
  return {
    type: SET_POSSIBLE_ADDRESSES,
    payload: addresses
  };
}

export function getAddressesByName(type, query) {
  return (dispatch) => {
    dispatch(requestData());

    return fetch('http://nominatim.openstreetmap.org/search?format=json&' + type + '=' + query + '&limit=10&addressdetails=1')
      .then(result => result.json())
      .then(addresses => dispatch(setPossibleAddresses(addresses)));
  };
}

export function setIsAddressOpen(index, isOpen) {
  return {
    type: SET_IS_ADDRESS_OPEN,
    payload: isOpen,
    index: index
  };
}
