import {Component, OnInit} from '@angular/core';
import {Todo} from "./models/todo";
import {LocalStorageService} from "./services/local-storage.service";

// import {FilterService} from "./services/filter.service";
@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  todos: Todo[];

  constructor(private localStorageService: LocalStorageService) {
  }

  getTodos() {
    return this.localStorageService.getTodos();
  }

  onAddTodo(todo: Todo) {
    this.localStorageService.addTodo(todo);
    this.todos = this.getTodos();
  }

  onSwitchStatusTodo(todo: Todo) {
    this.localStorageService.editStatusTodo(todo.id, todo.checked);
  }

  onRemoveTodo(todo: Todo) {
    this.localStorageService.removeTodo(todo.id);
  }

  onEditTodo(todo: Todo) {
    this.localStorageService.editTextTodo(todo.text, todo.id);
  }

  ngOnInit() {

    this.todos = this.getTodos();

  }

}
