import {
  SET_CURRENT_ADDRESS
} from '../constants/actionTypes';

export function setCurrentPoint(currentPoint) {
  return {
    type: SET_CURRENT_ADDRESS,
    payload: currentPoint
  };
}
