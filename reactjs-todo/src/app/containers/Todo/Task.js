import React     from 'react';
import PropTypes from 'prop-types';
import './Task.scss';

export const Task = (props) => {
  return (
    <li className={'task clearfix ' + ((props.task.done) ? 'done' : '')}>
      <i className='material-icons task-done-icon'
         onClick={props.onDoneClick}>
        done
      </i>
      <p>{props.task.name}</p>
      <i className='material-icons task-close-icon' onClick={props.onRemoveTask}>
        close
      </i>
      <button className='task-edit-btn'
              disabled={props.task.done}
              onClick={props.handleEditClick}>
        Edit
      </button>
    </li>
  );
};

Task.propTypes = {
  task: PropTypes.object,
  onDoneClick: PropTypes.func,
  onRemoveTask: PropTypes.func,
  handleEditClick: PropTypes.func
};
