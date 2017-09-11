import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {Todo} from "../models/todo";

@Component({
  selector: 'app-new-todo-input',
  templateUrl: './new-todo-input.component.html',
  styleUrls: ['./new-todo-input.component.css']
})
export class NewTodoInputComponent implements OnInit {
  // @Input() newTodo: Todo;
  newTodo: Todo;
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
      //this.taskInputHtmlElement.value = '';
    }
  }

  validateTextInput(inputText) {
    if (inputText === '') {
      alert('enter some text');
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
