import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {Todo} from '../models/todo'
//import {LocalStorageService} from "../local-storage.service";
@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {
  @Input() todo: Todo;
  @Output()
  remove: EventEmitter<Todo> = new EventEmitter();
  @Output()
  toggleStatus: EventEmitter<Todo> = new EventEmitter();
  @Output()
  edit: EventEmitter<Todo> = new EventEmitter();
  constructor() {
  }
  switchStatusTodo(todo: Todo, e) {
    let checkboxElement = e.target;
    console.log(checkboxElement);
    if (checkboxElement.checked) {
      checkboxElement.parentNode.classList.add('completed-task');
      todo.checked = true;
      this.toggleStatus.emit(todo);
      // this.localStorageService.editStatusTodo(checkboxElement.parentNode.id, true);
    }
    else {
      checkboxElement.parentNode.classList.remove('completed-task');
      todo.checked = false;
      this.toggleStatus.emit(todo);
      // this.localStorageService.editStatusTodo(checkboxElement.parentNode.id, false);
    }
  }

//e=== eventObject
  editTodo(todo: Todo, e) {
    let listElement = e.target.parentNode;
    let editInput = listElement.querySelector('input[type=text]');
    let label = listElement.querySelector("label");
    let temp = '';
    if (todo.checked !== true) {
      temp = editInput.value;
      if (listElement.classList.contains("edit-mode")) {
        if (label.innerText !== temp) {
          if (this.validateTextInput(temp)) {
            label.innerText = temp;
            todo.text = temp;
            this.edit.emit(todo);
          }
          else {
            return;
          }
        }
      }
      else {
        editInput.value = label.innerText;
      }
      listElement.classList.toggle("edit-mode");
    }
  }

  validateTextInput(inputText) {
    if (inputText === '') {
      alert('enter some text');
      return false;
    }
    return true;
  }

  removeTodo(todo: Todo, e) {
    let listElement = e.target.parentNode;
    listElement.remove();
    // console.log(e.taret.parentNode);
    this.remove.emit(todo);
  }

  cancelEditing(todo: Todo, e) {
    let listElement = e.target.parentNode;
    listElement.classList.remove("edit-mode");
  }

  ngOnInit() {

  }
}
