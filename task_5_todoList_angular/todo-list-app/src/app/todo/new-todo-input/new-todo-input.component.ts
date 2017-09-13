import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {Todo} from '../models/todo';
import {ModalWindowComponent} from '../modal-window/modal-window.component';

@Component({
  selector: 'app-new-todo-input',
  templateUrl: './new-todo-input.component.html',
  styleUrls: ['./new-todo-input.component.scss']
})
export class NewTodoInputComponent implements OnInit {
  newTodo: Todo;
  @Input() modal: ModalWindowComponent;
  @Output()
  add: EventEmitter<Todo> = new EventEmitter();

  constructor() {
    this.newTodo = new Todo();
  }
  addTodo() {
    if (this.validateTextInput(this.newTodo.text)) {
      this.newTodo.id = this.getNewId();
      this.add.emit(this.newTodo);
      this.newTodo = new Todo();
    }
  }

  validateTextInput(inputText) {
    if (inputText === '') {
    this.modal.openModalWindow();
      return false;
    }
    return true;
  }

  getNewId() {

    return '_' + Math.random().toString(36).substr(2, 9);
  }

  ngOnInit() {

  }

}
