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
      this.props.setTasksArray(JSON.parse(localStorage.getItem(this.props.data.storageName)) || []);
    } else {
      this.props.setTasksArray([]);
    }
  }

  render() {
    return (
      <div className="todo">
        <AddForm data={this.props} />

        <TaskList data={this.props} />

        {this.props.data.openEditBlock ? (<EditForm data={this.props} />) : ''}
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
    setOpenEditBlock: (openEditBlock) => {
      dispatch(dataActions.setOpenEditBlock(openEditBlock));
    },
    setStorageName: (storageName) => {
      dispatch(dataActions.setStorageName(storageName));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Todo);
