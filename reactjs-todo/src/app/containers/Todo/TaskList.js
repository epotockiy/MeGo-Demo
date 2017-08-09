import React from 'react';
import { Task } from './Task';
import './TaskList.scss';

export const TaskList = (props) => {
  return (
    <div className='todo-list'>
      <div className={'overlay ' + (props.openEditBlock ? 'active' : '')}></div>

      <div className="filter-btns">
        <button className={'all-filter ' + (props.currentFilter === 'all' ? 'active' : '')}
                onClick={props.filterActions.setFilterToAll}>
          All
        </button>
        <button className={'progress-filter ' + (props.currentFilter === 'progress' ? 'active' : '')}
                onClick={props.filterActions.setFilterToProgress}>
          Progress
        </button>
        <button className={'done-filter ' + (props.currentFilter === 'done' ? 'active' : '')}
                onClick={props.filterActions.setFilterToDone}>
          Done
        </button>
      </div>

      <ul className={props.currentFilter}>
        {props.tasksArray.map((task, index) => {
          return (
              <Task
                  key={task.id}
                  actions={props.taskActions}
                  task={task}
                  index={index}
              />
          );
        })}
      </ul>
    </div>
  );
};
