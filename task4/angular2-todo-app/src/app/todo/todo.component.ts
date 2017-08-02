import { Component, OnInit                  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TodoService                        } from './todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
  providers: [TodoService]
})

export class TodoComponent implements OnInit {
  todoForm: FormGroup;
  editForm: FormGroup;
  openEditBlock: false;
  currentTask: number;x
  tasksArray = [];
  isStorageAvailable = false;
  currentFilter = 'all';

  constructor(private _formBuilder: FormBuilder,
              private _todoService: TodoService) {
    this.todoForm = this._formBuilder.group({
      'taskName': [null, Validators.required]
    });

    this.editForm = this._formBuilder.group({
      'newTaskName': [null, Validators.required]
    });
  }

  ngOnInit() {
    this.checkStorage();

    if (this.isStorageAvailable) {
      this._todoService.getDataFromStorage('tasksArray');
      this.tasksArray = this._todoService.getDataFromStorage('tasksArray');
    }
  }

  checkStorage() {
    if (typeof localStorage !== 'undefined') {
      this.isStorageAvailable = true;
    } else {
      this.isStorageAvailable = false;
    }
  }

  addNewTask(form) {
    this.tasksArray.unshift({
      name: form.taskName,
      done: false
    });

    if (this.isStorageAvailable) {
      this._todoService.saveDataToStorage('tasksArray', this.tasksArray);
    }

    this.todoForm.reset();
  }

  onDoneClick(index: number) {
    this.tasksArray[index].done = !this.tasksArray[index].done;

    if (this.isStorageAvailable) {
      this._todoService.saveDataToStorage('tasksArray', this.tasksArray);
    }
  }

  onRemoveTask(index: number) {
    this.tasksArray.splice(index, 1);

    if (this.isStorageAvailable) {
      this._todoService.saveDataToStorage('tasksArray', this.tasksArray);
    }
  }

  onSaveClick(event) {
    event.preventDefault();

    this.tasksArray[this.currentTask].name = this.editForm.controls['newTaskName'].value;
    this.openEditBlock = false;

    if (this.isStorageAvailable) {
      this._todoService.saveDataToStorage('tasksArray', this.tasksArray);
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
