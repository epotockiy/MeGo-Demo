import React        from 'react';
import { render   } from 'react-dom';
import { Provider } from 'react-redux';
import Todo         from './containers/Todo/Todo'
import store        from './store';

render(
    <Provider store={store}>
      <Todo/>
    </Provider>,
    document.getElementById('app')
);
