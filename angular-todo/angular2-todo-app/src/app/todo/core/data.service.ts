import { Injectable } from '@angular/core';

@Injectable()
export class DataService {
  private _tasksArray         = [];
  private _currentTask        = 0;
  private _openEditBlock      = false;
  private _isStorageAvailable = false;
  private _currentFilter      = 'all';
  private _storageName        = 'tasksArray';

  constructor() {
    this.checkStorage();
  }

  checkStorage() {
    this._isStorageAvailable = (typeof localStorage !== 'undefined');
  }

  get tasksArray () {
    return this._tasksArray;
  }

  set tasksArray (value) {
    this._tasksArray = value;
  }

  get currentTask (): number {
    return this._currentTask;
  }

  set currentTask (value: number) {
    this._currentTask = value;
  }

  get openEditBlock (): boolean {
    return this._openEditBlock;
  }

  set openEditBlock (value: boolean) {
    this._openEditBlock = value;
  }

  get isStorageAvailable (): boolean {
    return this._isStorageAvailable;
  }

  set isStorageAvailable (value: boolean) {
    this._isStorageAvailable = value;
  }

  get currentFilter (): string {
    return this._currentFilter;
  }

  set currentFilter (value: string) {
    this._currentFilter = value;
  }

  get storageName (): string {
    return this._storageName;
  }

  set storageName (value: string) {
    this._storageName = value;
  }
}
