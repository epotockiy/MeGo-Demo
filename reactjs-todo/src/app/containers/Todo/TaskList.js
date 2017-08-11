import React     from 'react';
import PropTypes from 'prop-types';
import './TaskList.scss';

export const TaskList = (props) => {
  return (
    <div className='todo-list'>
      <div className={'overlay ' + (props.openEditBlock ? 'active' : '')} />

      <div className="filter-btns">
        <button className={'all-filter ' + (props.currentFilter === 'all' ? 'active' : '')}
                onClick={() => props.updateFilter('currentFilter', 'all')}>
          All
        </button>
        <button className={'progress-filter ' + (props.currentFilter === 'progress' ? 'active' : '')}
                onClick={() => props.updateFilter('currentFilter', 'progress')}>
          Progress
        </button>
        <button className={'done-filter ' + (props.currentFilter === 'done' ? 'active' : '')}
                onClick={() => props.updateFilter('currentFilter', 'done')}>
          Done
        </button>
      </div>

      {props.children}
    </div>
  );
};

TaskList.propTypes = {
  openEditBlock: PropTypes.bool,
  currentFilter: PropTypes.string,
  updateFilter: PropTypes.func
};
