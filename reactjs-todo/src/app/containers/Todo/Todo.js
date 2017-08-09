import React from 'react';
import { connect  } from 'react-redux';
import { TaskList } from './TaskList';
import { EditForm } from './EditForm';
import { AddForm  } from './AddForm';
import './Todo.scss';

import * as dataActions from '../../actions/dataActions';

class Todo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      addFormInput: '',
      editFormInput: ''
    };

    /* This is not working! */
    // this.addNewTask.bind(this);
    // this.handleAddFormInput.bind(this);
    this.getTasksFromStorage();//get out of here!
  }

  getTasksFromStorage() {
    if (typeof localStorage !== 'undefined') {
      this.props.setTasksArray(JSON.parse(localStorage.getItem(this.props.store.storageName)) || []);
    } else {
      this.props.setTasksArray([]);
    }
  }

  addNewTask(event) {
    event.preventDefault();

    if (!this.state.addFormInput.length) {
      return;
    }

    const tempTasksArray = this.props.store.tasksArray;
    tempTasksArray.unshift({
      name: this.state.addFormInput,
      done: false,
      id: Math.random().toString(32).substr(2, 8)
    });

    this.setState({
      addFormInput: ''
    });

    this.props.setTasksArray(tempTasksArray);
  }

  handleAddFormInput(event) {
    this.setState({
      addFormInput: event.target.value
    });
  }

  handleEditFormInput(event) {
    this.setState({
      editFormInput: event.target.value
    });
  }

  saveTask(event) {
    event.preventDefault();

    this.setState({
      editFormInput: ''
    });

    this.props.setTasksArray([
        ...this.props.store.tasksArray.slice(0, this.props.store.currentTask),
        {
          id: this.props.store.tasksArray[this.props.store.currentTask].id,
          name: this.state.editFormInput,
          done: this.props.store.tasksArray[this.props.store.currentTask].done
        },
        ...this.props.store.tasksArray.slice(this.props.store.currentTask + 1)
    ]);
    this.props.setOpenEditBlock(!this.props.store.openEditBlock);
  }

  closeEditBlock() {
    this.props.setOpenEditBlock(false);
  };

  onDoneClick(index) {
    this.props.setTasksArray([
      ...this.props.store.tasksArray.slice(0, index),
      {
        id: this.props.store.tasksArray[index].id,
        name: this.props.store.tasksArray[index].name,
        done: !this.props.store.tasksArray[index].done
      },
      ...this.props.store.tasksArray.slice(index + 1)
    ]);
  }

  onRemoveTask(index) {
    this.props.setTasksArray([
      ...this.props.store.tasksArray.slice(0, index),
      ...this.props.store.tasksArray.slice(index + 1)
    ]);
  }

  //not working
  handleEditClick(index) {
    this.props.setOpenEditBlock(true);
    this.props.setCurrentTask(index);
  }

  getFilterActions() {
    return {
      setFilterToAll:      () => { this.props.setCurrentFilter('all'); },
      setFilterToProgress: () => { this.props.setCurrentFilter('progress'); },
      setFilterToDone:     () => { this.props.setCurrentFilter('done'); },
    }
  }

  getTaskActions() {
    return {
      onDoneClick:     this.onDoneClick.bind(this),
      onRemoveTask:    this.onRemoveTask.bind(this),
      handleEditClick: this.handleEditClick.bind(this)
    }
  }

  render() {
    return (
      <div className="todo">
        <AddForm
            inputName={this.state.addFormInput}
            handleInputChange={this.handleAddFormInput.bind(this)}
            addNewTask={this.addNewTask.bind(this)}
        />

        <TaskList
          opendEditBlock={this.props.store.openEditBlock}
          currentFilter={this.props.store.currentFilter}
          tasksArray={this.props.store.tasksArray}
          filterActions={this.getFilterActions()}
          taskActions={this.getTaskActions()}
        />

        <EditForm
            inputName={this.state.editFormInput}
            currentTaskName={this.props.store.tasksArray.length ? this.props.store.tasksArray[this.props.store.currentTask].name : ''}
            handleInputChange={this.handleEditFormInput.bind(this)}
            onSaveClick={this.saveTask.bind(this)}
            onCloseClick={this.closeEditBlock.bind(this)}
            isOpenBlock={this.props.store.openEditBlock}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    store: state
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setTasksArray: (tasksArray) => {
      dispatch(dataActions.setTasksArray(tasksArray));
    },
    setCurrentFilter: (currentFilter) => {
      dispatch(dataActions.setCurrentFilter(currentFilter));
    },
    setCurrentTask: (currentTask) => {
      dispatch(dataActions.setCurrentTask(currentTask));
    },
    setOpenEditBlock: (openEditBlock) => {
      dispatch(dataActions.setOpenEditBlock(openEditBlock));
    },
    setStorageName: (storageName) => {
      dispatch(dataActions.setStorageName(storageName));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Todo);
