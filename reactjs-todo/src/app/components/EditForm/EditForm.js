import React from 'react';
import './EditForm.scss';

export class EditForm extends React.Component {
  constructor(props) {
    super(props);
    this.currProps = props.data;

    this.state = {
      inputName: this.currProps.data.tasksArray[this.currProps.data.currentTask].name
    }
  }

  onSaveClick(event) {
    event.preventDefault();

    let tempArray = this.currProps.data.tasksArray;
    tempArray[this.currProps.data.currentTask].name = this.state.inputName;

    this.setState({
      inputName: ''
    });

    this.currProps.setTasksArray(tempArray);
    this.currProps.setOpenEditBlock(!this.currProps.data.openEditBlock);

    if(this.currProps.data.isStorageAvailable) {
      localStorage.setItem(this.currProps.data.storageName, JSON.stringify(this.currProps.data.tasksArray));
    }
  };

  onCloseClick() {
    this.currProps.setOpenEditBlock(!this.currProps.data.openEditBlock);

    if(this.currProps.data.isStorageAvailable) {
      localStorage.setItem(this.currProps.data.storageName, JSON.stringify(this.currProps.data.tasksArray));
    }
  };

  handleInputChange(event) {
    this.setState({
      inputName: event.target.value
    });
  };

  render() {
    return (
        <form className="edit" onSubmit={this.onSaveClick.bind(this)}>
          <h4>Edit task</h4>
          <input className="edit-input"
                 type="text"
                 value={this.state.inputName}
                 onChange={this.handleInputChange.bind(this)}/>
          <button type="submit" className="save-btn">
            Save
          </button>
          <i className="material-icons edit-close-icon" onClick={this.onCloseClick.bind(this)}>close</i>
        </form>
    );
  }
};
