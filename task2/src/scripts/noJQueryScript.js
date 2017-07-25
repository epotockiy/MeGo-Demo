//Javascript version
;(function() {
  'use strict';

  document.addEventListener('DOMContentLoaded', function() {
    var todoList = new TodoList('todo');
    todoList.init();
  });

  function TodoList(container) {
    this.todoContainer = document.querySelector('.' + container);
    this.addButton     = this.todoContainer.querySelector('.add-btn');
    this.taskInput     = this.todoContainer.querySelector('.task-input');
    this.todoList      = this.todoContainer.querySelector('.todo-list');
    this.editBlock     = this.todoContainer.querySelector('.edit');
    this.editInput     = this.todoContainer.querySelector('.edit .edit-input');
    this.saveButton    = this.todoContainer.querySelector('.edit .save-btn');
    this.closeButton   = this.todoContainer.querySelector('.edit .close-btn');
    this.filterBlock   = this.todoContainer.querySelector('.filter-btns');
    this.filterButtons = this.filterBlock  .querySelectorAll('button');
    this.overlay       = this.todoContainer.querySelector('.overlay');
    this.tasksArray    = [];
    this.currentIndex  = 0;
  }

  TodoList.prototype.init = function() {
    this.getDataFromStorage();
    this.renderTasksList();
    this.bindEvents();
  };

  TodoList.prototype.bindEvents = function() {
    this.bindAddAction();
    this.bindListEvents();
    this.bindUpdateItem();
    this.bindCloseEditBlock();
    this.bindFilterButtons();
  };

  TodoList.prototype.bindFilterButtons = function() {
    var self = this;

    this.filterBlock.addEventListener('click', function(event) {
      for(var i = 0; i < self.filterButtons.length; ++i) {
        self.filterButtons[i].classList.remove('active');
      }

      if(event.target && event.target.id === 'all') {
        event.target.classList.add('active');
        self.renderTasksList();

        return;
      }

      if(event.target && event.target.id === 'progress') {
        event.target.classList.add('active');
        self.renderTasksList('progress');

        return;
      }

      if(event.target && event.target.id === 'done') {
        event.target.classList.add('active');
        self.renderTasksList('done');
      }
    });
  };

  TodoList.prototype.saveDataToStorage = function(data) {
    if(typeof localStorage !== 'undefined') {
      localStorage.setItem('tasksArray', JSON.stringify(data));
    }
  };

  TodoList.prototype.getDataFromStorage = function() {
    if(typeof localStorage !== 'undefined') {
      this.tasksArray = JSON.parse(localStorage.getItem('tasksArray')) || [];
    } else {
      this.tasksArray = [];
    }
  };

  TodoList.prototype.createElement = function(name, className, type, value) {
    var element       = document.createElement(name);
    element.className = className ? className : '';
    element.type      = type      ? type      : '';
    element.value     = value     ? value     : '';

    return element;
  };

  TodoList.prototype.renderTasksList = function(type) {
    this.todoList.innerHTML = '';

    var newTodoList = document.createDocumentFragment();

    if(type === 'progress') {
      for(var i = 0; i < this.tasksArray.length; i++) {
        if(!this.tasksArray[i].done) {
          newTodoList.appendChild(this.addItemToDOM(this.tasksArray[i]));
        }
      }
    } else {
      if(type === 'done') {
        for(var i = 0; i < this.tasksArray.length; i++) {
          if(this.tasksArray[i].done) {
            newTodoList.appendChild(this.addItemToDOM(this.tasksArray[i]));
          }
        }
      } else {
        for(var i = 0; i < this.tasksArray.length; i++) {
          newTodoList.appendChild(this.addItemToDOM(this.tasksArray[i]));
        }
      }
    }

    this.todoList.appendChild(newTodoList);
  };

  TodoList.prototype.addItemToDOM = function(task) {
    var taskBlock        = this.createElement('div', 'task');
    var doneButton       = this.createElement('input', 'done-btn', 'button', task.done ? 'Undone' : 'Done');
    var editButton       = this.createElement('input', 'edit-btn', 'button', 'Edit');
    var removeButton     = this.createElement('input', 'remove-btn', 'button', 'X');
    var taskText         = this.createElement('span');

    taskText.textContent = task.name;
    if(task.done) {
      taskText.classList.add('done');
      editButton.classList.add('disabled');
      editButton.disabled = true;
    }

    taskBlock.setAttribute('data-id', task.id);

    taskBlock.appendChild(taskText);
    taskBlock.appendChild(removeButton);
    taskBlock.appendChild(editButton);
    taskBlock.appendChild(doneButton);

    return taskBlock;
  };

  TodoList.prototype.bindListEvents = function() {
    var self = this;

    this.todoList.addEventListener('click', function(event) {
      if(event.target &&
          event.target.classList.value.indexOf('remove-btn') !== -1) {
        self.removeItem(event.target.parentNode.getAttribute('data-id'));
        return;
      }

      if(event.target &&
          event.target.classList.value.indexOf('edit-btn') !== -1) {
        self.editItem(event.target.parentNode.getAttribute('data-id'));
        return;
      }

      if(event.target &&
          event.target.classList.value.indexOf('done-btn') !== -1) {
        var item  = event.target,
            index = self.tasksArray.findIndex(function(element) {
              return element.id === parseInt(item.parentNode.getAttribute('data-id'));
            });

        if(item.parentNode.firstChild.classList.value.indexOf('done') === -1) {
          self.tasksArray[index].done = true;
          item.value = 'Undone';
          item.parentNode.firstChild.classList.add('done');
          item.parentNode.childNodes[2].classList.add('disabled');
          item.parentNode.childNodes[2].setAttribute('disabled', 'true');
        } else {
          self.tasksArray[index].done = false;
          item.value = 'Done';
          item.parentNode.firstChild.classList.remove('done');
          item.parentNode.childNodes[2].classList.remove('disabled');
          item.parentNode.childNodes[2].removeAttribute('disabled');
        }

        self.saveDataToStorage(self.tasksArray);
      }
    });
  };

  TodoList.prototype.removeItem = function(id) {
    var arrayIndex = this.tasksArray.findIndex(function(element) {
      return element.id === parseInt(id);
    });

    var index;

    for(var j = 0; j < this.todoList.childNodes.length; ++j) {
      if(parseInt(this.todoList.childNodes[j].getAttribute('data-id')) === parseInt(id)) {
        index = j;
        break;
      }
    }

    if(this.tasksArray.length === 1) {
      this.tasksArray = [];
      this.saveDataToStorage(this.tasksArray);
      this.todoList.removeChild(this.todoList.firstChild);
    } else {
      this.tasksArray.splice(arrayIndex, 1);
      this.saveDataToStorage(this.tasksArray);
      this.todoList.removeChild(this.todoList.childNodes[index]);
    }
  };

  TodoList.prototype.bindUpdateItem = function() {
    var self = this;

    this.saveButton.addEventListener('click', function() {
      var inputValue = self.editInput.value;

      if(!inputValue) {
        self.alertError("Enter new task name", self.editInput);
      } else {
        self.tasksArray[self.currentIndex].name = inputValue;
        self.saveDataToStorage(self.tasksArray);
        self.todoList.childNodes[self.currentIndex].firstChild.textContent = inputValue;

        self.editBlock.classList.remove('active');
        self.overlay  .classList.remove('active');
      }
    });
  };

  TodoList.prototype.bindCloseEditBlock = function() {
    var self = this;

    this.closeButton.addEventListener('click', function() {
      self.editBlock.classList.remove('active');
      self.overlay  .classList.remove('active');
    });
  };

  TodoList.prototype.editItem = function(id) {
    var arrayIndex = this.tasksArray.findIndex(function(element) {
      return element.id === parseInt(id);
    });


    for(var j = 0; j < this.todoList.childNodes.length; ++j) {
      if(parseInt(this.todoList.childNodes[j].getAttribute('data-id')) === parseInt(id)) {
        this.currentIndex = j;
        break;
      }
    }

    this.editInput.value = this.todoList.childNodes[this.currentIndex].firstChild.innerText;

    this.editBlock.classList.add('active');
    this.overlay  .classList.add('active');
  };

  TodoList.prototype.alertError = function(message, toFocus) {
    alert(message);
    toFocus.focus();
  };

  TodoList.prototype.bindAddAction = function() {
    var self = this;

    this.addButton.addEventListener('click', function() {
      var inputValue = self.taskInput.value;

      if(!inputValue) {
        self.alertError("Enter task name", self.taskInput);
      } else {
        self.tasksArray.unshift(
            {
              name: inputValue,
              id: Math.floor(Math.random() * 1000000),
              done: false
            }
        );
        self.saveDataToStorage(self.tasksArray);
        self.todoList.insertBefore(self.addItemToDOM(self.tasksArray[0]), self.todoList.firstChild);
        self.taskInput.value = '';
      }
    });
  };
})();
