import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Todo} from'../todo'
import {FilterService} from "../filter-service.service";
@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  @Input() todos: Todo[];
  allTaskButton: any;
  completedTaskButton: any;
  unCompletedTaskButton: any;
  allTodosHtmlElement: any;

  constructor(/*private filterService: FilterService*/) {
  }

  ngOnInit() {
    //this.filterService.insertData(document.getElementsByClassName('todos-list')[0]);// console.log(this.todos[1].text);
    // console.log(this.filterService.alltodosHtmlElement);
    ///////
    this.allTaskButton = document.getElementsByClassName('all-tasks-btn')[0];
    this.completedTaskButton = document.getElementsByClassName('completed-tasks-btn')[0];
    this.unCompletedTaskButton = document.getElementsByClassName('uncompleted-tasks-btn')[0];
    this.allTodosHtmlElement = document.getElementsByClassName('todos-list')[0];
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

  onEditTodo(todo: Todo) {
    this.edit.emit(todo);

  }

////////////////
  applyUncompletedTaskFilter(e) {
    //let unCompletedTaskButton=e.target;
    this.switchActiveFilterClass(this.unCompletedTaskButton, [this.completedTaskButton, this.allTaskButton]);
    this.removeEditModeClass(this.allTodosHtmlElement.childNodes);
    this.hideCompletedTodos();
  }

  applyCompletedTaskFilter() {
    this.switchActiveFilterClass(this.completedTaskButton, [this.unCompletedTaskButton, this.allTaskButton]);
    this.allTodosHtmlElement.classList.remove('uncompleted-tasks');
    this.allTodosHtmlElement.classList.add('completed-tasks');
  };

  hideCompletedTodos() {
    this.allTodosHtmlElement.classList.remove('completed-tasks');
    this.allTodosHtmlElement.classList.add('uncompleted-tasks');
    // hideListItems(allTodos, true);
  };

  switchActiveFilterClass(activeElement, notActiveElements) {
    activeElement.classList.add('active-filter');
    notActiveElements.forEach(function (element) {
      element.classList.remove('active-filter')
    })
  }

  removeEditModeClass(allTodosChildNodes) {
    for (var i = 0; i < allTodosChildNodes.length; i++) {
      if (allTodosChildNodes[i].className === 'edit-mode') {
        allTodosChildNodes[i].classList.remove('edit-mode')
      }
    }
  }

  showTodosList() {
    this.switchActiveFilterClass(this.allTaskButton, [this.unCompletedTaskButton, this.completedTaskButton]);
    // this.allTodos = this.localStorageService.getAllTodos();
    this.allTodosHtmlElement.classList.remove('uncompleted-tasks');
    this.allTodosHtmlElement.classList.remove('completed-tasks');
    this.removeEditModeClass(this.allTodosHtmlElement.childNodes);
    // this.buildTodosList(this.allTodos);
  };
}
