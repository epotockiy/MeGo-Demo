import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Todo} from'../todo'
@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  @Input() todos: Todo[];

  constructor() {
  }

  ngOnInit() {
    // console.log(this.todos[1].text);
  }
  @Output()
  remove: EventEmitter<Todo> = new EventEmitter();

  @Output()
  toggleStatus: EventEmitter<Todo> = new EventEmitter();
  @Output()
  edit: EventEmitter<Todo> = new EventEmitter();
  onSwitchStatusTodo(todo: Todo) {

    this.toggleStatus.emit(todo);
  }

  onRemoveTodo(todo: Todo) {
    this.remove.emit(todo);
  }
  onEditTodo(todo:Todo){
    this.edit.emit(todo);

  }
}
