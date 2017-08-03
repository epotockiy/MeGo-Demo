import React from 'react';

export class TaskList extends React.Component {
  constructor(props) {
    super();

    this.tasksArray    = props.tasksArray;
    this.currentFilter = props.currentFilter;
  }

  checkFilter(task) {
    if (task.done) {
      if (this.props.currentFilter === 'all' || this.props.currentFilter === 'done') {
        return true;
      } else {
        return false;
      }
    } else {
      if (this.props.currentFilter === 'all' || this.props.currentFilter === 'progress') {
        return true;
      } else {
        return false;
      }
    }
  }

  checkTaskForDone(task) {
    return !!task.done;
  }

  onDoneClick(index) {
    this.tasksArray[index].done = !this.tasksArray[index].done;
    this.props.updateTaskList(this.tasksArray);
  }

  onRemoveTask(index) {
    this.tasksArray.splice(index, 1);
    this.props.updateTaskList(this.tasksArray);
  }

  handleEditClick(index) {
    this.props.handleEditClick(index, true);
  }

  createTaskItem(task, index) {
    const itemClassname = "task clearfix "
            + (this.checkFilter(task) ? ' active' : '')
            + (this.checkTaskForDone(task) ? ' done' : ''),
        doneIconClassname = "material-icons task-done-icon"
            + (task.done ? ' active' : '');

    return (
        <li className={itemClassname} key={task.id}>
          <i className={doneIconClassname}
            onClick={this.onDoneClick.bind(this, index)}>
            done
          </i>
          <p>{task.name}</p>
          <i className="material-icons task-close-icon" onClick={this.onRemoveTask.bind(this, index)}>
            close
          </i>
          <button className="task-edit-btn"
            disabled={task.done}
            onClick={this.handleEditClick.bind(this, index)}>
            Edit
          </button>
        </li>
    );
  }

  render() {
    this.listItems = this.tasksArray.map(this.createTaskItem.bind(this));

    return (
        <ul className={this.currentFilter}>
          {this.listItems}
        </ul>
    );
  }
}

TaskList.propTypes = {
  tasksArray:      React.PropTypes.array,
  currentFilter:   React.PropTypes.string,
  updateTaskList:  React.PropTypes.func,
  handleEditClick: React.PropTypes.func
};