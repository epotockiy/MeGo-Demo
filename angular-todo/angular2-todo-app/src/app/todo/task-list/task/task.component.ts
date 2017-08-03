import { Component, Input  } from '@angular/core';

import { StorageService    } from '../../shared/storage.service';
import { DataService       } from '../../core/data.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})

export class TaskComponent {
  @Input()
  index: number;

  constructor(private _storageService: StorageService,
              public _dataService: DataService) { }

  onEditClick() {
    this._dataService.tasksArray[this.index].currentTask = this.index;
    this._dataService.tasksArray[this.index].openEditBlock = !this._dataService.tasksArray[this.index].openEditBlock;
  }

  onDoneClick() {
    this._dataService.tasksArray[this.index].done = !this._dataService.tasksArray[this.index].done;

    if (this._dataService.isStorageAvailable) {
      this._storageService.saveData(this._dataService.storageName, this._dataService.tasksArray);
    }
  }

  onRemoveTask() {
    this._dataService.tasksArray.splice(this.index, 1);

    if (this._dataService.isStorageAvailable) {
      this._storageService.saveData(this._dataService.storageName, this._dataService.tasksArray);
    }
  }

  checkFilter() {
    if (this._dataService.tasksArray[this.index].done) {
      return (this._dataService.currentFilter === 'all' || this._dataService.currentFilter === 'done');
    } else {
      return (this._dataService.currentFilter === 'all' || this._dataService.currentFilter === 'progress');
    }
  }

  checkTaskForDone() {
    return !!this._dataService.tasksArray[this.index].done;
  }
}
