import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {Todo} from '../models/todo';
@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent implements OnInit {
  @Input() todo: Todo;
  @Output()
  remove: EventEmitter<Todo> = new EventEmitter();
  @Output()
  toggleStatus: EventEmitter<Todo> = new EventEmitter();
  @Output()
  edit: EventEmitter<Todo> = new EventEmitter();
  @Output() openModal = new EventEmitter();

  constructor() {
  }

  switchStatusTodo(todo: Todo, e) {
    let checkboxElement = e.target;
    if (checkboxElement.checked) {
      checkboxElement.parentNode.classList.add('completed-task');
      todo.checked = true;
    }
    else {
      checkboxElement.parentNode.classList.remove('completed-task');
      todo.checked = false;

    }
    this.toggleStatus.emit(todo);
  }

  editTodo(todo: Todo, e) {
    var listElement = e.target.parentNode;
    var editInput = listElement.querySelector('input[type=text]');
    var label = listElement.querySelector('label');
    var temp = '';
    if (todo.checked !== true) {
      temp = editInput.value;
      if (listElement.classList.contains('edit-mode')) {
        if (label.innerText !== temp) {
          if (this.validateTextInput(temp)) {
            label.innerText = temp;
            todo.text = temp;
            this.edit.emit(todo);
          } else {
            return;
          }
        }
      } else {
        editInput.value = label.innerText;
      }
      this.editModeToggler(e, listElement);
    }
  }

  editModeToggler(element, elementParent) {
    elementParent.classList.toggle('edit-mode');
    element.target.classList.toggle('fa-pencil');
    element.target.classList.toggle('fa-check');
  }

  validateTextInput(inputText) {
    if (inputText === '') {
      this.openModal.emit();
      return false;
    }
    return true;
  }

  removeTodo(todo: Todo, e) {
    var listElement = e.target.parentNode;
    listElement.remove();
    this.remove.emit(todo);
  }

  cancelEditing(e) {
    var listElement = e.target.parentNode;
    listElement.classList.remove('edit-mode');
  }

  ngOnInit() {

  }
}
