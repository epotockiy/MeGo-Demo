import { Component, OnInit                  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})

export class TodoComponent implements OnInit {
  todoForm: FormGroup;
  editForm: FormGroup;
  tasksArray = [];
  isStorageAvailable = false;
  openEditBlock: false;
  currentTask: number;
  currentFilter = 'all';

  constructor(private _formBuilder: FormBuilder) {
    this.todoForm = this._formBuilder.group({
      'taskName': [null, Validators.required]
    });

    this.editForm = this._formBuilder.group({
      'newTaskName': [null, Validators.required]
    });
  }

  ngOnInit() {
    this.getListFromStorage();
  }

  getListFromStorage() {
    if (typeof localStorage !== 'undefined') {
      this.tasksArray = JSON.parse(localStorage.getItem('tasksArray')) || [];
      this.isStorageAvailable = true;
    } else {
      console.log('Local storage is not available.');
      this.isStorageAvailable = false;
    }
  }

  saveListToStorage() {
    localStorage.setItem('tasksArray', JSON.stringify(this.tasksArray));
  }

  addNewTask(form) {
    this.tasksArray.unshift({
      name: form.taskName,
      done: false
    });

    if (this.isStorageAvailable) {
      this.saveListToStorage();
    }

    this.todoForm.reset();
  }

  onDoneClick(index: number) {
    this.tasksArray[index].done = !this.tasksArray[index].done;

    if (this.isStorageAvailable) {
      this.saveListToStorage();
    }
  }

  onRemoveTask(index: number) {
    this.tasksArray.splice(index, 1);

    if (this.isStorageAvailable) {
      this.saveListToStorage();
    }
  }

  onSaveClick(event) {
    event.preventDefault();

    this.tasksArray[this.currentTask].name = this.editForm.controls['newTaskName'].value;
    this.openEditBlock = false;

    if (this.isStorageAvailable) {
      this.saveListToStorage();
    }
  }

  checkFilter(task) {
    if (task.done) {
      if (this.currentFilter === 'all' || this.currentFilter === 'done') {
        return true;
      } else {
        return false;
      }
    } else {
      if (this.currentFilter === 'all' || this.currentFilter === 'progress') {
        return true;
      } else {
        return false;
      }
    }
  }

  checkTaskForDone(task) {
    return !!task.done;
  }
}
