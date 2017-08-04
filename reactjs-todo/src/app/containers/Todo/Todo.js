import React from 'react';
import { connect  } from 'react-redux';
import { TaskList } from '../../components/TaskList/TaskList';
import { EditForm } from '../../components/EditForm/EditForm';
import { AddForm  } from '../../components/AddForm/AddForm';
import './Todo.scss';

import * as dataActions from '../../actions/dataActions';

class Todo extends React.Component {
  taskToEditIndex = 0;
  addFormInput = '';
  editFormInput = '';

  constructor(props) {
    super();

    console.log(props);
    console.log(this.props);
    this.getTasksFromStorage();
  }

  getTasksFromStorage() {
    if (typeof localStorage !== 'undefined') {
      this.props.data.setTasksArray(JSON.parse(localStorage.getItem(this.props.data.storageName)) || []);
      this.props.data.setIsStorageAvailable(true);
    } else {
      this.props.data.setTasksArray([]);
      this.props.data.setIsStorageAvailable(false);
    }
  }

  saveListToStorage() {
    localStorage.setItem(this.state.data.storageName, JSON.stringify(this.props.data.tasksArray));
  }

  addNewTask(event) {
    event.preventDefault();

    let tempArray = this.props.data.tasksArray;
    tempArray.unshift({
      name: this.addFormInput.value,
      done: false,
      id: Math.random().toString(32).substr(2, 8)
    });

    this.props.data.setTasksArray(tempArray);

    this.addFormInput.value = '';

    if(this.props.data.isStorageAvailable) {
      this.saveListToStorage();
    }
  }

  setCurrentFilter(filter) {
    this.props.date.setCurrentFilter(filter);
  }

  updateTaskList(newTasksArray) {
    this.props.data.setTasksArray(newTasksArray);

    if(this.props.data.isStorageAvailable) {
      this.saveListToStorage();
    }
  }

  handleEditClick(index, openBlock) {
    this.taskToEditIndex = index;
    this.openEditBlock = openBlock;
  }

  onSaveClick(event) {
    event.preventDefault();

    let tempArray = this.props.data.tasksArray;
    tempArray[this.props.data.currentTask].name = this.editFormInput;
    this.editFormInput = '';

    this.props.data.setTasksArray(tempArray);

    if(this.props.data.isStorageAvailable) {
      this.saveListToStorage();
    }
  }

  render() {
    return (
        <div className="todo">
          <AddForm
            inputForm={this.addFormInput}
            addNewTask={this.addNewTask.bind(this)}
          />

          <TaskList
              tasksArray={this.props.data.tasksArray}
              currentFilter={this.props.data.currentFilter}
              updateTaskList={this.updateTaskList.bind(this)}
              handleEditClick={this.handleEditClick.bind(this)}
          />

          <EditForm
              tasksArray={this.props.data.tasksArray}
              taskToEditIndex={this.props.data.currentTask}
              opentEditBlock={this.props.data.openEditBlock}
              onSaveClick={this.onSaveClick.bind(this)}
              editInput={this.props.data.tasksArray[this.props.data.currentTask].name}
              inputName={this.editFormInput}
          />
        </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(state);
  return {
    data: state.dataReducer
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    setTasksArray: (tasksArray) => {
      dispatch(dataActions.setTasksArray(tasksArray));
    }/*,
    setCurrentFilter: (currentFilter) => {
      dispatch(dataActions.setCurrentFilter(currentFilter));
    },
    setCurrentTask: (currentTask) => {
      dispatch(dataActions.setCurrentTask(currentTask));
    },
    setIsStorageAvailable: (isStorageAvailable) => {
      dispatch(dataActions.setIsStorageAvailable(isStorageAvailable));
    },
    setOpenEditBlock: (openEditBlock) => {
      dispatch(dataActions.setOpenEditBlock(openEditBlock));
    },
    setStorageName: (storageName) => {
      dispatch(dataActions.setStorageName(storageName));
    }*/
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Todo);
