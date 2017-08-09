import {
  setTasksArray,
  setStorageName,
  setOpenEditBlock,
  setCurrentTask,
  setCurrentFilter
} from './dataReducerActions';

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
      case 'SET_TASKS_ARRAY':
        return setTasksArray(state, action.payload);

      case 'SET_CURRENT_TASK':
        return setCurrentTask(state, action.payload);

      case 'SET_CURRENT_FILTER':
        return setCurrentFilter(state, action.payload);

      case 'SET_OPEN_EDIT_BLOCK':
        return setOpenEditBlock(state, action.payload);

      case 'SET_STORAGE_NAME':
        return setStorageName(state, action.payload);

      default:
        return state;
    }
  };

export default dataReducer;
