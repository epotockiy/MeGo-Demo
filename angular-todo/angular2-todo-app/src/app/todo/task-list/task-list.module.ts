import { NgModule          } from '@angular/core';
import { CommonModule      } from '@angular/common';

import { TaskListComponent } from './task-list.component';
import { TaskComponent     } from './task/task.component';

@NgModule({
  imports: [CommonModule],
  exports: [
    TaskListComponent,
    TaskComponent
  ],
  declarations: [
    TaskListComponent,
    TaskComponent
  ],
  providers: []
})

export class TaskListModule { }
