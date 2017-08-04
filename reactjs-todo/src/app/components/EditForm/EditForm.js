import React from 'react';
import './EditForm.scss';

export const EditForm = (props) => {
  props = props.data;

  let inputName = '';

  let onSaveClick = function(event) {
    event.preventDefault();

    let tempArray = props.data.tasksArray;
    tempArray[props.data.currentTask].name = inputName;
    inputName = '';

    props.data.setTasksArray(tempArray);

    if(props.data.isStorageAvailable) {
      localStorage.setItem(props.data.storageName, JSON.stringify(props.data.tasksArray));
    }
  };

  let onCloseClick = function() {
    let prevOption = props.data.openEditBlock;
    props.data.setOpenEditBlock(!prevOption);

    if(props.data.isStorageAvailable) {
      localStorage.setItem(props.data.storageName, JSON.stringify(props.data.tasksArray));
    }
  };

  return (
    <form className={"edit " + (props.data.openEditBlock ? 'active' : '')} onSubmit={onSaveClick}>
      <h4>Edit task</h4>
      <input className="edit-input"
             type="text"
             value={inputName}
             ref={(name) => inputName = name}/>
      <button type="submit"
              className="save-btn"
              disabled={!inputName.length}>
        Save
      </button>
      <i className="material-icons edit-close-icon" onClick={onCloseClick}>close</i>
    </form>
  );
};
