import { Component } from '@angular/core';

import { DataService } from '../core/data.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})

export class TaskListComponent {
  constructor(public _dataService: DataService) { }
}
