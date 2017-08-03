import { Injectable } from '@angular/core';

@Injectable()
export class StorageService {
  getData(name) {
    return JSON.parse(localStorage.getItem(name)) || [];
  }

  saveData(name, data) {
    localStorage.setItem(name, JSON.stringify(data));
  }
}
