import { Component                          } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { DataService                        } from '../core/data.service';
import { StorageService                     } from 'app/todo/shared/storage.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent {
  editForm: FormGroup;
  openEditBlock: false;
  currentTask: number;
  tasksArray = [];

  constructor(public _dataService: DataService,
              private _formBuilder: FormBuilder,
              private _storageService: StorageService) {

    this.editForm = this._formBuilder.group({
      'newTaskName': [null, Validators.required]
    });
  }

  onSaveClick(event) {
    event.preventDefault();

    const tempTasksArray = this._dataService.tasksArray;
    tempTasksArray[this._dataService.currentTask].name = this.editForm.controls['newTaskName'].value;

    this._dataService.openEditBlock = false;
    this._dataService.tasksArray    = tempTasksArray;

    if (this._dataService.isStorageAvailable) {
      this._storageService.saveData(this._dataService.storageName, this._dataService.tasksArray);
    }
  }
}
