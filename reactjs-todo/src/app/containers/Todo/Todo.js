import React        from 'react';
import { connect  } from 'react-redux';
import PropTypes    from 'prop-types';
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

    this.addNewTask          = this.addNewTask.bind(this);
    this.handleAddFormInput  = this.handleAddFormInput.bind(this);
    this.handleEditFormInput = this.handleEditFormInput.bind(this);
    this.saveTask            = this.saveTask.bind(this);
    this.closeEditBlock      = this.closeEditBlock.bind(this);
  }

  componentWillMount() {
    this.getTasksFromStorage();
  }

  getTasksFromStorage() {
    if (typeof localStorage !== 'undefined') {
      this.props.setTasksArray(JSON.parse(localStorage.getItem(this.props.storageName)) || []);
    } else {
      this.props.setTasksArray([]);
    }
  }

  addNewTask(event) {
    event.preventDefault();

    if (!this.state.addFormInput.length) {
      return;
    }

    const tempTasksArray = this.props.tasksArray;
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
        ...this.props.tasksArray.slice(0, this.props.currentTask),
        {
          id: this.props.tasksArray[this.props.currentTask].id,
          name: this.state.editFormInput,
          done: this.props.tasksArray[this.props.currentTask].done
        },
        ...this.props.tasksArray.slice(this.props.currentTask + 1)
    ]);
    this.props.setOpenEditBlock(!this.props.openEditBlock);
  }

  closeEditBlock() {
    this.props.setOpenEditBlock(false);
  };

  onDoneClick(index) {
    this.props.setTasksArray([
      ...this.props.tasksArray.slice(0, index),
      {
        id: this.props.tasksArray[index].id,
        name: this.props.tasksArray[index].name,
        done: !this.props.tasksArray[index].done
      },
      ...this.props.tasksArray.slice(index + 1)
    ]);
  }

  onRemoveTask(index) {
    this.props.setTasksArray([
      ...this.props.tasksArray.slice(0, index),
      ...this.props.tasksArray.slice(index + 1)
    ]);
  }

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
          openEditBlock={this.props.openEditBlock}
          currentFilter={this.props.currentFilter}
          tasksArray={this.props.tasksArray}
          filterActions={this.getFilterActions()}
          taskActions={this.getTaskActions()}
        />

        <EditForm
            inputName={this.state.editFormInput}
            currentTaskName={this.props.tasksArray.length ? this.props.tasksArray[this.props.currentTask].name : ''}
            handleInputChange={this.handleEditFormInput}
            onSaveClick={this.saveTask}
            onCloseClick={this.closeEditBlock}
            isOpenBlock={this.props.openEditBlock}
        />
      </div>
    );
  }
}

Todo.propTypes = {
  store: PropTypes.object
};

const mapStateToProps = (state) => {
  return {
    openEditBlock: state.openEditBlock,
    tasksArray: state.tasksArray,
    currentTask: state.currentTask,
    currentFilter: state.currentFilter,
    storageName: state.storageName
  };
};

const mapDispatchToProps = {
    setTasksArray:    dataActions.setTasksArray,
    setCurrentFilter: dataActions.setCurrentFilter,
    setCurrentTask:   dataActions.setCurrentTask,
    setOpenEditBlock: dataActions.setOpenEditBlock
};

export default connect(mapStateToProps, mapDispatchToProps)(Todo);
