import React        from 'react';
import PropTypes    from 'prop-types';
import { TaskList } from './TaskList';
import { Task     } from './Task';
import { EditForm } from './EditForm';
import { AddForm  } from './AddForm';
import './Todo.scss';

import * as storage from './localStorageActions';

export class Todo extends React.Component {
  isStoreAvailable = false;
  currentTask      = 0;

  constructor(props) {
    super(props);

    this.state = {
      addFormInput: '',
      tasksArray: [],
      editFormInput: '',
      currentFilter: 'all',
      openEditBlock: false,
      storageName: 'tasksArray'
    };

    this.addNewTask          = this.addNewTask.bind(this);
    this.saveTask            = this.saveTask.bind(this);
    this.handleAddFormInput  = this.handleAddFormInput.bind(this);
    this.handleEditFormInput = this.handleEditFormInput.bind(this);
    this.closeEditBlock      = this.closeEditBlock.bind(this);
    this.setLocalState       = this.setLocalState.bind(this);
  }

  componentWillMount() {
    this.setLocalState('storageName', 'tasksArray' + this.props.id);
  }

  componentDidMount() {
    if (typeof localStorage !== 'undefined') {
      this.setLocalState('tasksArray', storage.getDataFromStorage(this.state.storageName));
      this.isStoreAvailable = true;
    } else {
      this.setLocalState('tasksArray', []);
      this.isStoreAvailable = false;
    }
  }

  saveTasksToStorage() {
    if (this.isStoreAvailable) {
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

    this.setLocalState('tasksArray', [
      ...this.state.tasksArray.slice(0, this.currentTask),
      {
        id: this.state.tasksArray[this.currentTask].id,
        name: this.state.editFormInput,
        done: this.state.tasksArray[this.currentTask].done
      },
      ...this.state.tasksArray.slice(this.currentTask + 1)
    ]);

    this.closeEditBlock();
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
    this.currentTask = index;
    this.setLocalState('editFormInput', this.state.tasksArray[index].name);
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
          updateFilter={this.setLocalState}
        >
          <ul className={this.state.currentFilter}>
            {this.state.tasksArray.map((task, index) => {
              return (
                <Task
                  key={task.id}
                  onDoneClick={this.onDoneClick.bind(this, index)}
                  onRemoveTask={this.onRemoveTask.bind(this, index)}
                  handleEditClick={this.handleEditClick.bind(this, index)}
                  task={task}
                  index={index}
                />
              );
            })}
          </ul>
        </TaskList>

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
