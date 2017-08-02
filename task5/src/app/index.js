import React      from 'react';
import { render } from 'react-dom';
import { Todo   } from './components/Todo'

class App extends React.Component {
  render() {
    return (
        <Todo id={1}/>
    );
  }
}

render(<App/>, document.getElementById('app'));
