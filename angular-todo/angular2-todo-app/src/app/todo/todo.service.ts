import { Injectable } from '@angular/core';

@Injectable()
export class TodoService {
  getDataFromStorage(name) {
    return JSON.parse(localStorage.getItem(name)) || [];
  }

  saveDataToStorage(name, data) {
    localStorage.setItem(name, JSON.stringify(data));
  }
}
