import { NgModule         } from '@angular/core';
import { CommonModule     } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CoreModule       } from './core/core.module';
import { SharedModule     } from './shared/shared.module';
import { TaskListModule   } from './task-list/task-list.module';
import { TodoComponent    } from './todo.component';
import { EditComponent    } from './edit/edit.component';
import { AddFormComponent } from './add-form/add-form.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule,
    SharedModule,
    TaskListModule
  ],
  exports: [
    TodoComponent,
    AddFormComponent,
    EditComponent
  ],
  declarations: [
    TodoComponent,
    AddFormComponent,
    EditComponent
  ],
  providers: []
})

export class TodoModule { }
