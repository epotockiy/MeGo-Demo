import React     from 'react';
import PropTypes from 'prop-types';
import './AddForm.scss';

export const AddForm = (props) => {
  return (
    <form onSubmit={props.addNewTask}>
      <input type="text"
             className="task-input"
             placeholder="Enter task name..."
             name="addInputName"
             value={props.inputName}
             onChange={props.handleInputChange}/>
      <button disabled={!props.inputName.length} type="submit" className="add-task-btn">
        Add
      </button>
    </form>
  );
};

AddForm.propTypes = {
  addNewTask: PropTypes.func,
  inputName: PropTypes.string,
  handleInputChange: PropTypes.func
};
