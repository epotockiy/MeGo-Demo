import { Component, OnInit } from '@angular/core';

import { DataService       } from './core/data.service';
import { StorageService    } from './shared/storage.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
  providers: []
})

export class TodoComponent implements OnInit {
  constructor(private _dataService: DataService,
              private _storageService: StorageService) { }

  ngOnInit() {
    if (this._dataService.isStorageAvailable) {
      this._dataService.tasksArray = this._storageService.getData(this._dataService.storageName);
    }
  }
}
