import React        from 'react';
import { Provider } from 'react-redux';
import { render   } from 'react-dom';
import { Root     } from './Root';
import store        from './store';

render(
  <Provider store={store}>
    <Root />
  </Provider>,
  document.getElementById('app')
);
