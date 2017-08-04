import React from 'react';

export const Task = (props) => {
  return (
      <li className={props.itemClassname} key={props.taskId}>
        <i className={props.doneIconClassname}
           onClick={props.onDoneClick}>
          done
        </i>
        <p>{props.taskName}</p>
        <i className="material-icons task-close-icon" onClick={props.onRemoveTask}>
          close
        </i>
        <button className="task-edit-btn"
                disabled={props.taskDone}
                onClick={props.handleEditClick}>
          Edit
        </button>
      </li>
  );
};
