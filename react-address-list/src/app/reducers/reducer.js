import {
  SET_CURRENT_POINT
} from '../constants/actionTypes';

const Reducer = (
  state = {
    currentPoint: {}
  },
  action) => {
  switch(action.type) {
    case SET_CURRENT_POINT:
      return {
        ...state,
        currentPoint: action.payload
      };

    default:
      return state;
  }
};

export default Reducer;
