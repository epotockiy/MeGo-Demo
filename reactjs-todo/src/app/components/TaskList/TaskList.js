import React from 'react';
import './TaskList.css';

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

  createTaskItems(task, index) {
    const itemClassname = "task clearfix "
            + (this.checkFilter(task) ? ' active' : '')
            + (this.checkTaskForDone(task) ? ' done' : ''),
        doneIconClassname = "material-icons task-done-icon"
            + (task.done ? ' active' : '');

    return (
      <Task
        itemClassName={itemClassname}
        taskId={task.id}
        doneIconClassname={doneIconClassname}
        taskName={task.name}
        taskDone={task.done}
        onDoneClick={this.onDoneClick.bind(this, index)}
        onRemoveTask={this.onRemoveTask.bind(this, index)}
        handleEditClick={this.handleEditClick.bind(this, index)}
      />
    );
  }

  render() {
    this.listItems = this.tasksArray.map(this.createTaskItems.bind(this));

    return (
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

        <ul className={this.currentFilter}>
          {this.listItems}
        </ul>
      </div>
    );
  }
}

TaskList.propTypes = {
  tasksArray:      React.PropTypes.array,
  currentFilter:   React.PropTypes.string,
  updateTaskList:  React.PropTypes.func,
  handleEditClick: React.PropTypes.func
};