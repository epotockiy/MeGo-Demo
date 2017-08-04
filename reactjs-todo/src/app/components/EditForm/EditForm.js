import React from 'react';
import './EditForm.css';

export const EditForm = (props) => {
    return (
        <form class={"edit " + (props.openEditBlock ? 'active' : '')}
              onSubmit={props.onSaveClick}>
          <h4>Edit task</h4>
          <input class="edit-input"
                 type="text"
                 value={props.editInput}
                 ref={(name) => props.inputName = name}/>
          <button type="submit"
                  class="save-btn"
                  disabled={!props.inputName.value.length}>
            Save
          </button>
          <i class="material-icons edit-close-icon" onClick={props.openEditBlock = !props.openEditBlock}>close</i>
        </form>
    );
}
