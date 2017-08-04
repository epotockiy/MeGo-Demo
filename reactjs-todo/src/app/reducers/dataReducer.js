const dataReducer = (
  state = {
    tasksArray: [],
    currentTask: 0,
    currentFilter: 'all',
    openEditBlock: false,
    isStorageAvailable: false,
    storageName: 'tasksArray'
  },
  action) => {
    switch (action.type) {
      case 'SET_TASKS_ARRAY':
        state = {
            ...state,
            tasksArray: action.payload
        };
        break;

      case 'SET_CURRENT_TASK':
        state = {
          ...state,
          currentTask: action.payload
        };
        break;

      case 'SET_CURRENT_FILTER':
        state = {
          ...state,
          currentFilter: action.payload
        };
        break;

      case 'SET_OPEN_EDIT_BLOCK':
        state = {
          ...state,
          openEditBlock: action.payload
        };
        break;

      case 'SET_IS_STORAGE_AVAILABLE':
        state = {
          ...state,
          isStorageAvailable: action.payload
        };
        break;

      case 'SET_STORAGE_NAME':
        state = {
          ...state,
          storageName: action.payload
        };
        break;

      default:
        console.log('Wrong action type in dataReducer!');
        break;
    }

    console.log(state);
    return state;
  };

export default dataReducer;
