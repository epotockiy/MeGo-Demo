import {AfterViewInit, Component, OnInit} from '@angular/core';
import {FilterService} from "../services/filter.service";

@Component({
  selector: 'app-todo-filters',
  templateUrl: './todo-filters.component.html',
  styleUrls: ['./todo-filters.component.scss'],

})
export class TodoFiltersComponent implements OnInit,AfterViewInit {
  allTaskButton: any;
  completedTaskButton: any;
  unCompletedTaskButton: any;
  allTodosHtmlElement: any;

  constructor() {

  }

  applyUncompletedTaskFilter(e) {
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
    this.allTodosHtmlElement.classList.remove('uncompleted-tasks');
    this.allTodosHtmlElement.classList.remove('completed-tasks');
    this.removeEditModeClass(this.allTodosHtmlElement.childNodes);

  };
  ngAfterViewInit(){
    this.allTodosHtmlElement = FilterService.alltodosHtmlElement;
  }
  ngOnInit() {
    this.completedTaskButton = document.getElementsByClassName('completed-tasks-btn')[0];
    this.unCompletedTaskButton = document.getElementsByClassName('uncompleted-tasks-btn')[0];
    this.allTaskButton = document.getElementsByClassName('all-tasks-btn')[0];
  }

}
