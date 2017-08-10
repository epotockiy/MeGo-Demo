import React        from 'react';
import { render   } from 'react-dom';
import { Todo }     from './containers/Todo/Todo';

render(
    /* If you want multiple todos, give them different id's. */
    <div>
      <Todo id={1} />
      <Todo id={2} />
    </div>,
    document.getElementById('app')
);
