import React from 'react';
import './EditForm.scss';

export const EditForm = (props) => {
  return (
    <form className={'edit ' + (props.isOpenBlock ? 'active' : '')} onSubmit={props.onSaveClick}>
      <h4>Edit task</h4>
      <input className="edit-input"
             type="text"
             value={props.inputName || props.currentTaskName}
             onChange={props.handleInputChange}/>
      <button type="submit" className="save-btn">
        Save
      </button>
      <i className="material-icons edit-close-icon" onClick={props.onCloseClick}>close</i>
    </form>
  );
};
