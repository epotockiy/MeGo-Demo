import { NgModule } from '@angular/core';
import { TodoItemComponent } from './todo-item/todo-item.component';
import { NewTodoInputComponent } from './new-todo-input/new-todo-input.component';
import { TodoFiltersComponent } from './todo-filters/todo-filters.component';
import {FormsModule} from "@angular/forms";
import { CommonModule     } from '@angular/common';
import { TodoListComponent } from './todo-list/todo-list.component';
import {LocalStorageService} from "./services/local-storage.service";
import {FilterService} from "./services/filter.service";
import { TodoComponent } from './todo.component';
@NgModule({
  declarations: [
    TodoComponent,
    NewTodoInputComponent,
    TodoFiltersComponent,
    TodoListComponent,
    TodoItemComponent,
  ],
  exports:[
    TodoComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  providers: [LocalStorageService,FilterService]
})
export class TodoModule { }
