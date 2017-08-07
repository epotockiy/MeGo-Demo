import React from 'react';
import './Task.scss';

export const Task = (props) => {
  const currentIndex = props.index;
  props = props.data;

  let checkFilter = function (task) {
    if (task.done) {
      return (props.data.currentFilter === 'all' || props.data.currentFilter === 'done');
    } else {
      return (props.data.currentFilter === 'all' || props.data.currentFilter === 'progress');
    }
  };

  let onDoneClick = function() {
    const tempTasksArray = props.data.tasksArray;
    tempTasksArray[currentIndex].done = !tempTasksArray[currentIndex].done;

    // console.log(props);
    props.setTasksArray(tempTasksArray);

    if(props.data.isStorageAvailable) {
      localStorage.setItem(props.data.storageName, JSON.stringify(props.data.tasksArray));
    }
  };

  let onRemoveTask = function() {
    const tempTasksArray = props.data.tasksArray;
    tempTasksArray.splice(currentIndex, 1);

    props.setTasksArray(tempTasksArray);

    if(props.data.isStorageAvailable) {
      localStorage.setItem(props.data.storageName, JSON.stringify(props.data.tasksArray));
    }
  };

  let handleEditClick = function() {
    let prevOption = props.data.openEditBlock;
    props.setOpenEditBlock(!prevOption);
    props.setCurrentTask(currentIndex);

    if(props.data.isStorageAvailable) {
      localStorage.setItem(props.data.storageName, JSON.stringify(props.data.tasksArray));
    }
  };

  const itemClassName = "task clearfix "
      + (checkFilter(props.data.tasksArray[currentIndex]) ? 'active' : '')
      + ((!!props.data.tasksArray[currentIndex].done) ? ' done' : '');

  const doneIconClassName = "material-icons task-done-icon "
      + ((!!props.data.tasksArray[currentIndex].done) ? 'active' : '');

  return (
    <li className={itemClassName}>
      <i className={doneIconClassName}
         onClick={onDoneClick}>
        done
      </i>
      <p>{props.data.tasksArray[currentIndex].name}</p>
      <i className="material-icons task-close-icon" onClick={onRemoveTask}>
        close
      </i>
      <button className="task-edit-btn"
              disabled={props.data.tasksArray[currentIndex].done}
              onClick={handleEditClick}>
        Edit
      </button>
    </li>
  );
};
