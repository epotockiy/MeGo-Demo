import React        from 'react';
import { Provider } from 'react-redux';
import Todo         from './Todo'
import store        from '../../store';

export class Root extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Todo/>
      </Provider>
    );
  }
}
