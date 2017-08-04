const dataReducer = (state = {
  tasksArray: [],
  currentTask: 0,
  currentFilter: 'all',
  openEditBlock: false,
  isStorageAvailable: false,
  storageName: 'tasksArray'
}, action) => {
  switch (action.type) {
    case 'SET_TASKS_ARRAY':
      state = {
          ...state,
          tasksArray: state.tasksArray
      };
      break;

    case 'SET_CURRENT_TASK':
      state = {
        ...state,
        currentTask: state.currentTask
      };
      break;

    case 'SET_CURRENT_FILTER':
      state = {
        ...state,
        currentFilter: state.currentFilter
      };
      break;

    case 'SET_OPEN_EDIT_BLOCK':
      state = {
        ...state,
        openEditBlock: state.openEditBlock
      };
      break;

    case 'SET_IS_STORAGE_AVAILABLE':
      state = {
        ...state,
        isStorageAvailable: state.isStorageAvailable
      };
      break;

    case 'SET_STORAGE_NAME':
      state = {
        ...state,
        storageName: state.storageName
      };
      break;

    default:
      console.log('Wrong action type in dataReducer!');
      break;
  }

  return state;
};

export default dataReducer;
