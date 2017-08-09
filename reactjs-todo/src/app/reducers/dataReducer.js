import {
  setTasksArray,
  setOpenEditBlock,
  setCurrentTask,
  setCurrentFilter
} from './dataReducerActions';

import {
  SET_TASKS_ARRAY,
  SET_CURRENT_TASK,
  SET_CURRENT_FILTER,
  SET_OPEN_EDIT_BLOCK
} from '../actions/actionTypes';

const dataReducer = (
  state = {
    tasksArray: [],
    currentTask: 0,
    currentFilter: 'all',
    openEditBlock: false,
    storageName: 'tasksArray'
  },
  action) => {
    switch (action.type) {
      case SET_TASKS_ARRAY:
        return setTasksArray(state, action.payload);

      case SET_CURRENT_TASK:
        return setCurrentTask(state, action.payload);

      case SET_CURRENT_FILTER:
        return setCurrentFilter(state, action.payload);

      case SET_OPEN_EDIT_BLOCK:
        return setOpenEditBlock(state, action.payload);

      default:
        return state;
    }
  };

export default dataReducer;
