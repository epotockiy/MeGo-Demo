import React from 'react';
import { Task } from '../Task/Task';
import './TaskList.scss';

export const TaskList = (props) => {
  props = props.data;

  let createTaskItem = function(task, index) {
    return (
      <Task
        key={task.id}
        data={props}
        index={index}
      />
    );
  };

  let updateTaskList = function(newTasksArray) {
    props.data.setTasksArray(newTasksArray);
  };

  return (
    <div className="todo-list">
      <div className="overlay"></div>

      <div className="filter-btns">
        <button className={"all-filter " + (props.data.currentFilter === 'all' ? 'active' : '')}
                onClick={props.setCurrentFilter.bind(null, 'all')}>
          All
        </button>
        <button className={"progress-filter " + (props.data.currentFilter === 'progress' ? 'active' : '')}
                onClick={props.setCurrentFilter.bind(null, 'progress')}>
          Progress
        </button>
        <button className={"done-filter " + (props.data.currentFilter === 'done' ? 'active' : '')}
                onClick={props.setCurrentFilter.bind(null, 'done')}>
          Done
        </button>
      </div>

      <ul className={props.data.currentFilter}>
        {props.data.tasksArray.map(createTaskItem)}
      </ul>
    </div>
  );
};
