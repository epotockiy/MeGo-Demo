import {
  SET_CURRENT_ADDRESS,
  SET_ADDRESS,
  SET_POSSIBLE_ADDRESSES,
  SET_COORDINATE_SEARCH_ADDRESS,
  SET_IS_ADDRESS_OPEN
} from '../constants/actionTypes';

export function setCurrentAddress(address) {
  return {
    type: SET_CURRENT_ADDRESS,
    payload: address
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
    return fetch('http://nominatim.openstreetmap.org/search?format=json&' + type + '=' + query + '&limit=10&addressdetails=1')
      .then(result => result.json())
      .then((addresses) => {
        for (let i = 0; i < addresses.length; ++i) {
          fetch('http://nominatim.openstreetmap.org/reverse?format=json&lat=' + addresses[i].lat + '&lon=' + addresses[i].lon + '&zoom=18&addressdetails=1')
            .then((result) => result.json())
            .then((newAddress) => {
              addresses = [
                ...addresses.slice(0, i),
                newAddress,
                ...addresses.slice(i, addresses.length)
              ];
              console.log(addresses);
            });
        }
        dispatch(setPossibleAddresses(addresses));
      });
  };
}

function _setCoordinateSearchAddress(address) {
  return {
    type: SET_COORDINATE_SEARCH_ADDRESS,
    payload: address
  };
}

export function getAddressByCoordinates(lat, lon) {
  return (dispatch) => {
    return fetch('http://nominatim.openstreetmap.org/reverse?format=json&lat=' + lat + '&lon=' + lon + '&zoom=18&addressdetails=1')
      .then(result => result.json())
      .then(address => dispatch(_setCoordinateSearchAddress(address)));
  };
}

export function setIsAddressOpen(index, isOpen) {
  return {
    type: SET_IS_ADDRESS_OPEN,
    payload: isOpen,
    index: index
  };
}
