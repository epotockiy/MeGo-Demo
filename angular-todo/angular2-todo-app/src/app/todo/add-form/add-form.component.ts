import { Component                          } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { DataService                        } from '../core/data.service';
import { StorageService                     } from '../shared/storage.service';

@Component({
  selector: 'app-add-form',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.css']
})

export class AddFormComponent {
  addForm: FormGroup;

  constructor(private _formBuilder: FormBuilder,
              private _dataService: DataService,
              private _storageService: StorageService) {
    this.addForm = this._formBuilder.group({
      'taskName': [null, Validators.required]
    });
  }

  addNewTask(form) {
    const tempTasksArray = this._dataService.tasksArray;
    tempTasksArray.unshift({
      name: form.taskName,
      done: false
    });

    this._dataService.tasksArray = tempTasksArray;

    if (this._dataService.isStorageAvailable) {
      this._storageService.saveData(this._dataService.storageName, this._dataService.tasksArray);
    }

    this.addForm.reset();
  }
}
