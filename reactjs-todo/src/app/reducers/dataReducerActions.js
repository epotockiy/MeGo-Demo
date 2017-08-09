export function setTasksArray(state, action) {
  return {
    ...state,
    tasksArray: action
  };
}

export function setCurrentTask(state, action) {
  return {
    ...state,
    currentTask: action
  };
}

export function setCurrentFilter(state, action) {
  return {
    ...state,
    currentFilter: action
  };
}

export function setOpenEditBlock(state, action) {
  return {
    ...state,
    openEditBlock: action
  };
}

export function setStorageName(state, action) {
  return {
    ...state,
    storageName: action
  };
}
