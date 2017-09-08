import {Component, OnInit} from '@angular/core';
import {Todo} from "./todo";
import {LocalStorageService} from "./local-storage.service";
import {FilterService} from "./filter-service.service";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: []
})
export class AppComponent implements OnInit {
  todos: Todo[];

  constructor(private localStorageService: LocalStorageService) {
   // this.todos=this.getTodos();
    console.log(document.getElementsByClassName('todos-list')[0]);
  }

  getTodos() {
    return this.localStorageService.getTodos();
  }

  onAddTodo(todo: Todo) {
    this.localStorageService.addTodo(todo);
    this.todos=this.getTodos();
  }

  onSwitchStatusTodo(todo: Todo) {
    console.log(todo.checked);
    this.localStorageService.editStatusTodo(todo.id, todo.checked);
  }

  // rename from removeTodo
  onRemoveTodo(todo: Todo) {
    this.localStorageService.removeTodo(todo.id);
  }
  onEditTodo(todo:Todo){
  //  console.log(todo.text);
  //  this.edit.emit(todo);
    this.localStorageService.editTextTodo(todo.text,todo.id);
  }
  ngOnInit() {
    this.todos = this.getTodos();
  }

}
