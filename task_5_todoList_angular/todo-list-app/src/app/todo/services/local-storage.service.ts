import { Injectable } from '@angular/core';
import {Todo} from '../models/todo'
@Injectable()
export class LocalStorageService {
  allTodos:Todo[];
  dataBaseName:string;

  constructor() {
    this.allTodos = [];
    this.dataBaseName = 'allTodos';
  }
   writeDataToLocalStorage(newTodoList):void{
     localStorage.setItem(this.dataBaseName, JSON.stringify(newTodoList));
   }
   getTodos():Todo[]{
     var allTodosStringFormat = localStorage.getItem(this.dataBaseName);
     if (allTodosStringFormat !== null) {
       this.allTodos = JSON.parse(allTodosStringFormat);
     }
     return this.allTodos;
   }
  //  getCompletedTodos():Todo[]{
  //    this.allTodos = this.getTodos();
  //    this.allTodos = this.allTodos.filter(function (element) {
  //      return element['checked'] === true;
  //    });
  //    return this.allTodos;
  //  }
  // getUncompletedTodos():Todo[]{
  //   this.allTodos = this.getTodos();
  //   this.allTodos = this.allTodos.filter(function (element:object) {
  //     return element['checked'] === false;
  //   });
  //   return this.allTodos;
  // }
  addTodo(newTodo):void{
    this.allTodos = this.getTodos();
    this.allTodos.push(newTodo);
    this.writeDataToLocalStorage(this.allTodos);
  }
  removeTodo(id){
    this.allTodos = this.getTodos();
    this.allTodos = this.allTodos.filter(function (obj) {
      return obj['id'] !== id;
    });
    this.writeDataToLocalStorage(this.allTodos)
  }
  editTextTodo(editedTodoText, id){
    this.allTodos = this.getTodos();
    this.allTodos.forEach(function (obj) {
      if (obj['id'] === id) {
        obj['text'] = editedTodoText;
        return;
      }
    });

    this.writeDataToLocalStorage(this.allTodos);
  }
  editStatusTodo(id,status){
    this.allTodos = this.getTodos();
    this.allTodos.forEach(function (obj) {
      if (obj['id'] === id) {
        obj['checked'] = status;
        return;
      }
    });
    this.writeDataToLocalStorage(this.allTodos);
  }

  isLocalStorageAvailable(){
    var test = 'test';
    try {
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
    } catch (e) {
     new Error('local storage is not availbale');
    }
  }
}
