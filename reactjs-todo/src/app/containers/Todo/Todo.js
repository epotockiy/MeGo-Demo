import React from 'react';
import { connect  } from 'react-redux';
import { TaskList } from '../../components/TaskList/TaskList';
import { EditForm } from '../../components/EditForm/EditForm';
import { AddForm  } from '../../components/AddForm/AddForm';
import './Todo.scss';

import * as dataActions from '../../actions/dataActions';

class Todo extends React.Component {
  constructor(props) {
    super(props);

    this.getTasksFromStorage();
  }

  getTasksFromStorage() {
    if (typeof localStorage !== 'undefined') {
      this.props.setTasksArray(JSON.parse(localStorage.getItem(this.props.storageName)) || []);
      this.props.setIsStorageAvailable(true);

      console.log(this.props);
    } else {
      this.props.setTasksArray([]);
      this.props.setIsStorageAvailable(false);
    }
  }
  render() {
    return (
      <div className="todo">
        <AddForm data={this.props} />

        <TaskList data={this.props} />

        <EditForm data={this.props} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    data: state
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
    setIsStorageAvailable: (isStorageAvailable) => {
      dispatch(dataActions.setIsStorageAvailable(isStorageAvailable));
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
