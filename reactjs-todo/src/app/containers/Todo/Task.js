import React from 'react';
import './Task.scss';

export const Task = (props) => {
  return (
    <li className={'task clearfix ' + ((props.task.done) ? 'done' : '')}>
      <i className={'material-icons task-done-icon ' + ((props.task.done) ? 'active' : '')}
         onClick={(() => {props.actions.onDoneClick(props.index)})}>
        done
      </i>
      <p>{props.task.name}</p>
      <i className='material-icons task-close-icon' onClick={(() => {props.actions.onRemoveTask(props.index)})}>
        close
      </i>
      <button className='task-edit-btn'
              disabled={props.task.done}
              onClick={(() => {props.actions.handleEditClick(props.index)})}>
        Edit
      </button>
    </li>
  );
};
