import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TodoItemComponent } from './todo-item/todo-item.component';
import { NewTodoInputComponent } from './new-todo-input/new-todo-input.component';
import { TodoFiltersComponent } from './todo-filters/todo-filters.component';
import {FormsModule} from "@angular/forms";
//import { TodoListItemComponent } from './todo-list-item/todo-list-item.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import {LocalStorageService} from "./local-storage.service";
import {FilterService} from "./filter-service.service";
@NgModule({
  declarations: [
    AppComponent,
    TodoItemComponent,
    NewTodoInputComponent,
    TodoFiltersComponent,
    TodoListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [LocalStorageService,FilterService],
  bootstrap: [AppComponent]
})
export class AppModule { }
