import {
  SET_CURRENT_ADDRESS,
  SET_ADDRESS,
  SET_POSSIBLE_ADDRESSES,
  SET_IS_ADDRESS_OPEN,
  SET_COORDINATE_SEARCH_ADDRESS
} from '../constants/actionTypes';
import { initialState } from '../constants/initialState';

const Reducer = (state = initialState, action) => {
  switch(action.type) {
  case SET_CURRENT_ADDRESS:
    return {
      ...state,
      currentAddress: action.payload
    };

  case SET_ADDRESS:
    return {
      ...state,
      addresses: [
        ...state.addresses.slice(0, action.index),
        action.payload,
        ...state.addresses.slice(action.index + 1, state.addresses.length)
      ]
    };

  case SET_POSSIBLE_ADDRESSES:
    return {
      ...state,
      possibleAddresses: action.payload
    };

  case SET_IS_ADDRESS_OPEN:
    return {
      ...state,
      isAddressOpen: [
        ...state.isAddressOpen.slice(0, action.index),
        action.payload,
        ...state.isAddressOpen.slice(action.index + 1, state.isAddressOpen.length)
      ]
    };

  case SET_COORDINATE_SEARCH_ADDRESS:
    return {
      ...state,
      coordinateSearchAddress: action.payload
    };

  default:
    return state;
  }
};

export default Reducer;
