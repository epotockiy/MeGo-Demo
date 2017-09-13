import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Todo} from'../models/todo';
import {FilterService} from '../services/filter.service';
import {ModalWindowComponent} from '../modal-window/modal-window.component';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

  @Input() modal: ModalWindowComponent;
  @Input() todos: Todo[];
  kek: any;

  constructor(private filterService: FilterService) {

  }

  ngOnInit() {
    this.filterService.insertData(document.getElementsByClassName('todos-list')[0]);
    this.kek = document.getElementsByClassName('todos-list')[0];
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

  onOpenModalWindow() {
    this.modal.openModalWindow();
  }

  onRemoveTodo(todo: Todo) {
    this.remove.emit(todo);
  }

  onEditTodo(todo: Todo) {
    this.edit.emit(todo);

  }


}
