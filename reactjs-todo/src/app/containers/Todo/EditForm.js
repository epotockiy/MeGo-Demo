import React     from 'react';
import PropTypes from 'prop-types';
import './EditForm.scss';

export const EditForm = (props) => {
  return (
    <form className={'edit ' + (props.isOpenBlock ? 'active' : '')} onSubmit={props.onSaveClick}>
      <h4>Edit task</h4>
      <input className="edit-input"
             type="text"
             value={props.inputName}
             onChange={props.handleInputChange}/>
      <button disabled={!props.inputName.length} type="submit" className="save-btn">
        Save
      </button>
      <i className="material-icons edit-close-icon" onClick={props.onCloseClick}>close</i>
    </form>
  );
};

EditForm.propTypes = {
  isOpenBlock: PropTypes.bool,
  onSaveClick: PropTypes.func,
  inputName: PropTypes.string,
  handleInputChange: PropTypes.func,
  inCloseClick: PropTypes.func
};
