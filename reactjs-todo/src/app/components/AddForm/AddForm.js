import React from 'react';
import './AddForm.css';

export const AddForm = (props) => {
  return (
      <form onSubmit={props.addNewTask}>
        <input type="text"
               className="task-input"
               placeholder="Enter task name..."
               ref={(name) => props.inputName = name}/>
        <button type="submit" className="add-task-btn">Add</button>
      </form>
  );
};
