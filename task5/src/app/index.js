import React      from 'react';
import { render } from 'react-dom';
import { Todo   } from './components/Todo'

class App extends React.Component {
  render() {
    return (
        <div className="container">
          <div className="row">
            <div className="col-xs-10 col-xs-offset-1">
              <Todo id={1}/>
            </div>
          </div>
        </div>
    );
  }
}

render(<App/>, document.getElementById('app'));
