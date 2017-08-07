import React        from 'react';
import { render   } from 'react-dom';
import { Provider } from 'react-redux';
import Todo         from './containers/Todo/Todo'
import store        from './store';
import throttle     from 'lodash/throttle';

store.subscribe(throttle(() => {
  try {
    localStorage.setItem('tasksArray', JSON.stringify(store.getState().tasksArray));
  } catch(err) {
    console.log(err);
  }
}, 1000));

render(
    <Provider store={store}>
      <Todo/>
    </Provider>,
    document.getElementById('app')
);
