//Javascript version
;(function() {
  'use strict';

  document.addEventListener('DOMContentLoaded', function() {
    var todoList = new TodoList();
    todoList.init();
  });

  function TodoList() {
    this.todoContainer = document.querySelector('.todo');
    this.addButton     = this.todoContainer.querySelector('.add-btn');
    this.taskInput     = this.todoContainer.querySelector('.task-input');
    this.todoList      = this.todoContainer.querySelector('.todo-list');
    this.editBlock     = this.todoContainer.querySelector('.edit');
    this.editInput     = this.todoContainer.querySelector('.edit .edit-input');
    this.saveButton    = this.todoContainer.querySelector('.edit .save-btn');
    this.closeButton   = this.todoContainer.querySelector('.edit .close-btn');
    this.overlay       = this.todoContainer.querySelector('.overlay');
    this.tasksArray    = [];
    this.currentIndex  = 0;

    this.init = function() {
      this.getDataFromStorage();
      this.renderTasksList();
      this.bindEvents();
    };

    this.bindEvents = function() {
      this.bindAddAction();
      this.bindListEvents();
      this.bindUpdateItem();
      this.bindCloseEditBlock();
    };

    this.saveDataToStorage = function(data) {
      if(typeof localStorage !== 'undefined') {
        localStorage.setItem('tasksArray', JSON.stringify(data));
      }
    };

    this.getDataFromStorage = function() {
      if(typeof localStorage !== 'undefined') {
        this.tasksArray = JSON.parse(localStorage.getItem('tasksArray')) || [];
      } else {
        this.tasksArray = [];
      }
    };

    this.createElement = function(name, className, type, value) {
      var element       = document.createElement(name);
      element.className = className ? className : '';
      element.type      = type      ? type      : '';
      element.value     = value     ? value     : '';

      return element;
    };

    this.renderTasksList = function() {
      this.todoList.innerHTML = '';
      var newTodoList = document.createDocumentFragment();

      for(var i = 0; i < this.tasksArray.length; i++) {
        newTodoList.appendChild(this.addItemToDOM(this.tasksArray[i]));
      }

      this.todoList.appendChild(newTodoList);
    };

    this.addItemToDOM = function(task) {
      var taskBlock        = this.createElement('div', 'task');
      var doneButton       = this.createElement('input', 'done-btn', 'button', 'Done');
      var editButton       = this.createElement('input', 'edit-btn', 'button', 'Edit');
      var removeButton     = this.createElement('input', 'remove-btn', 'button', 'X');
      var taskText         = this.createElement('span');
      taskText.textContent = task.name;

      taskBlock.setAttribute('data-id', task.id);

      taskBlock.appendChild(taskText);
      taskBlock.appendChild(removeButton);
      taskBlock.appendChild(editButton);
      taskBlock.appendChild(doneButton);

      return taskBlock;
    };

    this.bindListEvents = function() {
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
          event.target.parentNode.firstChild.style.textDecoration = event.target.parentNode.firstChild.style.textDecoration === 'line-through' ? 'none' : 'line-through';
        }
      });
    };

    this.removeItem = function(id) {
      var index = this.tasksArray.findIndex(function(element) {
        return element.id === parseInt(id);
      });

      if(this.tasksArray.length === 1) {
        this.tasksArray = [];
        this.saveDataToStorage(this.tasksArray);
        this.todoList.removeChild(this.todoList.firstChild);
      } else {
        this.tasksArray.splice(index, 1);
        this.saveDataToStorage(this.tasksArray);

        this.todoList.childNodes[index].parentNode.removeChild(this.todoList.childNodes[index]);
      }
    };

    this.bindUpdateItem = function() {
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

    this.bindCloseEditBlock = function() {
      var self = this;

      this.closeButton.addEventListener('click', function() {
        self.editBlock.classList.remove('active');
        self.overlay  .classList.remove('active');
      });
    };

    this.editItem = function(id) {
      this.currentIndex = this.tasksArray.findIndex(function(element) {
        return element.id === parseInt(id);
      });

      this.editInput.value = this.tasksArray[this.currentIndex].name;

      this.editBlock.classList.add('active');
      this.overlay  .classList.add('active');
    };

    this.alertError = function(message, toFocus) {
      alert(message);
      toFocus.focus();
    };

    this.bindAddAction = function() {
      var self = this;

      this.addButton.addEventListener('click', function() {
        var inputValue = self.taskInput.value;

        if(!inputValue) {
          self.alertError("Enter task name", self.taskInput);
        } else {
          self.tasksArray.unshift(
              {
                name: inputValue,
                id: Math.floor(Math.random() * 1000000)
              }
          );
          self.saveDataToStorage(self.tasksArray);
          self.todoList.insertBefore(self.addItemToDOM(self.tasksArray[0]), self.todoList.firstChild);
          self.taskInput.value = '';
        }
      });
    }
  };
})();
