import React from 'react';
import './AddForm.scss';

export const AddForm = (props) => {
  return (
    <form onSubmit={props.addNewTask}>
      <input type="text"
             className="task-input"
             placeholder="Enter task name..."
             value={props.inputName}
             onChange={props.handleInputChange}/>
      <button disabled={!props.inputName.length} type="submit" className="add-task-btn">
        Add
      </button>
    </form>
  );
};
