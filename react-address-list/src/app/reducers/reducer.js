import {
  SET_CURRENT_ADDRESS
} from '../constants/actionTypes';

const initialState = {
  currentAddress: 0,
  addresses: [
    {
      x: 53.915089,                      // lon,
      y: 27.483773,                      // lat,
      label: 'улица Матусевича 13',      // formatted address
      bounds: [
        [53, 54],             // s, w - lat, lon
        [27, 28],             // n, e - lat, lon
      ],
      raw: {}
    }
  ]
};

const Reducer = (
  state = initialState,
  action) => {
  switch(action.type) {
    case SET_CURRENT_ADDRESS:
      return {
        ...state,
        currentAddress: action.payload
      };

    default:
      return state;
  }
};

export default Reducer;
