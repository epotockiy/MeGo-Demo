import React from 'react';
import { TaskList } from './TaskList';
import { EditForm } from './EditForm';
import './Todo.scss';

export class Todo extends React.Component {
  isStorageAvailable = false;
  openEditBlock      = false;
  taskToEditIndex     = 0;

  constructor(props) {
    super();

    this.state = {
      taskInput: '',
      editInput: '',
      currentFilter: 'all',
      tasksArray: [],
      storageName: 'tasksArray' + props.id
    };

    this.getTasksFromStorage(props);
  }

  getTasksFromStorage(props) {
    if (typeof localStorage !== 'undefined') {
      this.state.tasksArray = JSON.parse(localStorage.getItem(this.state.storageName)) || [];
      this.isStorageAvailable = true;
    } else {
      this.tasksArray = [];
      this.isStorageAvailable = false;
    }
  }

  saveListToStorage() {
    localStorage.setItem(this.state.storageName, JSON.stringify(this.state.tasksArray));
  }

  addNewTask(event) {
    event.preventDefault();

    let tempArray = this.state.tasksArray;
    tempArray.unshift({
      name: this._inputName.value,
      done: false,
      id: Math.random().toString(32).substr(2, 8)
    });

    this.setState({
      tasksArray: tempArray
    });

    this._inputName.value = '';

    if(this.isStorageAvailable) {
      this.saveListToStorage();
    }
  }

  setCurrentFilter(filter) {
    this.setState({
      currentFilter: filter
    });
  }

  updateTaskList(newTasksArray) {
    this.setState({
      tasksArray: newTasksArray
    });

    if(this.isStorageAvailable) {
      this.saveListToStorage();
    }
  }

  handleEditClick(index, openBlock) {
    this.taskToEditIndex = index;
    this.openEditBlock = openBlock;
  }

  render() {
    return (
        <div className="todo">
          <form onSubmit={this.addNewTask.bind(this)}>
            <input type="text"
                   className="task-input"
                   placeholder="Enter task name..."
                   ref={(name) => this._inputName = name}/>
            <button type="submit" className="add-task-btn">Adds</button>
          </form>

          <div className="todo-list">
            <div className="overlay"></div>

            <div className="filter-btns">
              <button className={"all-filter " + (this.state.currentFilter === 'all' ? 'active' : '')}
                      onClick={this.setCurrentFilter.bind(this, 'all')}>
                All
              </button>
              <button className={"progress-filter " + (this.state.currentFilter === 'progress' ? 'active' : '')}
                      onClick={this.setCurrentFilter.bind(this, 'progress')}>
                Progress
              </button>
              <button className={"done-filter " + (this.state.currentFilter === 'done' ? 'active' : '')}
                      onClick={this.setCurrentFilter.bind(this, 'done')}>
                Done
              </button>
            </div>

            <TaskList tasksArray={this.state.tasksArray}
                      currentFilter={this.state.currentFilter}
                      updateTaskList={this.updateTaskList.bind(this)}
                      handleEditClick={this.handleEditClick.bind(this)}/>

            <EditForm tasksArray={this.state.tasksArray}
                      taskToEditIndex={this.taskToEditIndex}
                      opentEditBlock={this.openEditBlock}/>
          </div>
        </div>
    );
  }
}

Todo.propTypes = {
  id: React.PropTypes.number
};
