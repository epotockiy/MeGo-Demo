import { createStore }    from 'redux';
import dataReducer        from './reducers/dataReducer';
import throttle           from 'lodash/throttle';

let store = createStore(dataReducer);

store.subscribe(throttle(() => {
  try {
    localStorage.setItem('tasksArray', JSON.stringify(store.getState().tasksArray));
  } catch(err) {
    console.log(err);
  }
}, 1000));

export default store;
