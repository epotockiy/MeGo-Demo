import { BrowserModule                    } from '@angular/platform-browser';
import { NgModule                         } from '@angular/core';
import { AppComponent                     } from './app.component';
import { TodoComponent                    } from './todo/todo.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    TodoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
