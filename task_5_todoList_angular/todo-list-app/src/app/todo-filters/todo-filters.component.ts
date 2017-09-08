import {Component, OnInit} from '@angular/core';
import {FilterService} from "../filter-service.service";
import {filterStackTrace} from "protractor/built/util";

@Component({
  selector: 'app-todo-filters',
  templateUrl: './todo-filters.component.html',
  styleUrls: ['./todo-filters.component.css']
})
export class TodoFiltersComponent implements OnInit {
  allTaskButton: any;
  completedTaskButton: any;
  unCompletedTaskButton: any;
  allTodosHtmlElement: any;

  constructor(private filterService: FilterService) {

  }

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

  ngOnInit() {
   // this.allTodosHtmlElement = this.filterService.getAllTodosHtmlElement();
    this.completedTaskButton = document.getElementsByClassName('completed-tasks-btn')[0];
    this.unCompletedTaskButton = document.getElementsByClassName('uncompleted-tasks-btn')[0];
    this.allTodosHtmlElement = document.getElementsByClassName('todos-list')[0];
    //this.allTodosHtmlElement = FilterService.alltodosHtmlElement;
    //console.log( this.allTodosHtmlElement);
  }

}
