import {
  SET_CURRENT_POINT
} from '../constants/actionTypes';

export function setCurrentPoint(currentPoint) {
  return {
    type: SET_CURRENT_POINT,
    payload: currentPoint
  };
}
