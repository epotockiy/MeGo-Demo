import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  editForm: FormGroup;
  openEditBlock: false;
  currentTask: number;
  tasksArray = [];

  constructor(private _formBuilder: FormBuilder) {

    this.editForm = this._formBuilder.group({
      'newTaskName': [null, Validators.required]
    });
  }

  onSaveClick(event) {
    // event.preventDefault();
    //
    // this.tasksArray[this.currentTask].name = this.editForm.controls['newTaskName'].value;
    // this.openEditBlock = false;
    //
    // if (this.isStorageAvailable) {
    //   this._todoService.saveDataToStorage('tasksArray', this.tasksArray);
    // }
  }

  ngOnInit() {
  }

}
