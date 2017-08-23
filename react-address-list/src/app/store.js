import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware                                   from 'redux-thunk';
import Reducer                                           from './reducers/reducer';

export default createStore(
  combineReducers({
    Reducer
  }),
  applyMiddleware(thunkMiddleware)
);
