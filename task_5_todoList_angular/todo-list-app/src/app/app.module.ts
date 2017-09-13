import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {TodoModule} from './todo/todo.module';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {MdButtonModule, MdCheckboxModule} from '@angular/material';
import {MdCardModule} from '@angular2-material/card';
import {MdIconModule} from '@angular2-material/icon';
import {MaterialModule} from '@angular/material';

@NgModule({

  declarations: [
    AppComponent
  ],
  imports: [
    MaterialModule,
    BrowserModule,
    TodoModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
