export function getDataFromStorage(storageName) {
  return JSON.parse(localStorage.getItem(storageName)) || [];
}

export function saveDataToStorage(storageName, data) {
  localStorage.setItem(storageName, JSON.stringify(data));
}
