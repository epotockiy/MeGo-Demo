import React from 'react';

export class EditForm extends React.Component {
  constructor(props) {
    super();

    this.tasksArray = props.tasksArray;
    this.taskToEditIndex = props.taskToEditIndex;
    this.openBlock = props.openBlock;
  }

  onSaveClick(event) {
    event.preventDefault();

    this.tasksArray[this.taskToEditIndex].name = this._inputName;
  }

  render() {
    return (
        <form class={"edit " + (this.openBlock ? 'active' : '')}
              onSubmit={this.onSaveClick.bind(this)}>
          <h4>Edit task</h4>
          <input class="edit-input"
                 type="text"
                 value={this.tasksArray[this.taskToEditIndex].name}
                 ref={(newName) => this._inputName = newName}/>
          <button type="submit"
                  class="save-btn"
                  disabled={!this._inputName.value.length}>
            Save
          </button>
          <i class="material-icons edit-close-icon" onClick={this.openBlock = !this.openBlock}>close</i>
        </form>
    );
  }
}

EditForm.propTypes = {
  tasksArray:      React.PropTypes.array,
  taskToEditIndex: React.PropTypes.number,
  openBlock:       React.PropTypes.bool
};
