import React from 'react';
import './AddForm.scss';

export const AddForm = (props) => {
  props = props.data;

  let inputName = '';

  let addNewTask  = function(event) {
    event.preventDefault();

    if (!inputName.value.length) {
      return;
    }

    const tempTasksArray = props.data.tasksArray;
    tempTasksArray.unshift({
      name: inputName.value,
      done: false,
      id: Math.random().toString(32).substr(2, 8)
    });

    inputName.value = '';

    props.setTasksArray(tempTasksArray);
  };

  return (
    <form onSubmit={addNewTask}>
      <input type="text"
             className="task-input"
             placeholder="Enter task name..."
             ref={(name) => inputName = name}/>
      <button type="submit" className="add-task-btn">
        Add
      </button>
    </form>
  );
};
