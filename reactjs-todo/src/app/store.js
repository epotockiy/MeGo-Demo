import { createStore } from 'redux';
import dataReducer     from './reducers/dataReducer';

export default createStore(dataReducer)
