import React        from 'react';
import PropTypes    from 'prop-types';
import { TaskList } from './TaskList';
import { EditForm } from './EditForm';
import { AddForm  } from './AddForm';
import './Todo.scss';

import * as storage from './localStorageActions';

export class Todo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      addFormInput: '',
      tasksArray: [],
      editFormInput: '',
      currentTask: 0,
      currentFilter: 'all',
      openEditBlock: false,
      storageName: 'tasksArray',
      isStorageAvailable: false
    };

    this.addNewTask          = this.addNewTask.bind(this);
    this.saveTask            = this.saveTask.bind(this);
    this.handleAddFormInput  = this.handleAddFormInput.bind(this);
    this.handleEditFormInput = this.handleEditFormInput.bind(this);
    this.closeEditBlock      = this.closeEditBlock.bind(this);
  }

  componentWillMount() {
    this.setLocalState('storageName', 'tasksArray' + this.props.id);
  }

  componentDidMount() {
    if (typeof localStorage !== 'undefined') {
      this.setLocalState('tasksArray', storage.getDataFromStorage(this.state.storageName));
      this.setLocalState('isStorageAvailable', true);
    } else {
      this.setLocalState('tasksArray', []);
      this.setLocalState('isStorageAvailable', false);
    }
  }

  saveTasksToStorage() {
    if (this.state.isStorageAvailable) {
      storage.saveDataToStorage(this.state.storageName, this.state.tasksArray)
    }
  }

  setLocalState(field, value) {
    this.setState({
      [field]: value
    }, () => {
      if (field === 'tasksArray') {
        this.saveTasksToStorage();
      }
    });
  }

  addNewTask(event) {
    event.preventDefault();

    this.setLocalState('addFormInput', '');
    this.setLocalState('tasksArray', [
      {
        id: Math.random().toString(32).substr(2, 8),
        name: this.state.addFormInput,
        done: false
      },
      ...this.state.tasksArray
    ]);
  }

  handleAddFormInput(event) {
    this.setLocalState('addFormInput', event.target.value);
  }

  handleEditFormInput(event) {
    this.setLocalState('editFormInput', event.target.value);
  }

  saveTask(event) {
    event.preventDefault();

    this.setLocalState('editFormInput', '');

    this.setLocalState('tasksArray', [
      ...this.state.tasksArray.slice(0, this.state.currentTask),
      {
        id: this.state.tasksArray[this.state.currentTask].id,
        name: this.state.editFormInput,
        done: this.state.tasksArray[this.state.currentTask].done
      },
      ...this.state.tasksArray.slice(this.state.currentTask + 1)
    ]);

    this.setLocalState('openEditBlock', !this.state.openEditBlock);
  }

  closeEditBlock() {
    this.setLocalState('openEditBlock', false);
  };

  onDoneClick(index) {
    this.setLocalState('tasksArray', [
      ...this.state.tasksArray.slice(0, index),
      {
        id: this.state.tasksArray[index].id,
        name: this.state.tasksArray[index].name,
        done: !this.state.tasksArray[index].done
      },
      ...this.state.tasksArray.slice(index + 1)
    ]);
  }

  onRemoveTask(index) {
    this.setLocalState('tasksArray', [
      ...this.state.tasksArray.slice(0, index),
      ...this.state.tasksArray.slice(index + 1)
    ]);
  }

  handleEditClick(index) {
    this.setLocalState('openEditBlock', true);
    this.setLocalState('currentTask', index);
    this.setLocalState('editFormInput', this.state.tasksArray[index].name);
  }

  getFilterActions() {
    return {
      setFilterToAll:      () => { this.setLocalState('currentFilter', 'all'); },
      setFilterToProgress: () => { this.setLocalState('currentFilter', 'progress'); },
      setFilterToDone:     () => { this.setLocalState('currentFilter', 'done'); },
    }
  }

  getTaskActions() {
    return {
      onDoneClick:     (index) => { this.onDoneClick(index) },
      onRemoveTask:    (index) => { this.onRemoveTask(index) },
      handleEditClick: (index) => { this.handleEditClick(index) }
    }
  }

  render() {
    return (
      <div className="todo">
        <AddForm
            inputName={this.state.addFormInput}
            handleInputChange={this.handleAddFormInput}
            addNewTask={this.addNewTask}
        />

        <TaskList
          openEditBlock={this.state.openEditBlock}
          currentFilter={this.state.currentFilter}
          tasksArray={this.state.tasksArray}
          filterActions={this.getFilterActions()}
          taskActions={this.getTaskActions()}
        />

        <EditForm
            inputName={this.state.editFormInput}
            handleInputChange={this.handleEditFormInput}
            onSaveClick={this.saveTask}
            onCloseClick={this.closeEditBlock}
            isOpenBlock={this.state.openEditBlock}
        />
      </div>
    );
  }
}

Todo.propTypes = {
  id: PropTypes.number
};
