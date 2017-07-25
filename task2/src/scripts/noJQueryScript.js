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

      var filterButton = event.target;

      if(filterButton) {
        switch(filterButton.id) {
          case 'all':
            filterButton.classList.add('active');
            self.renderTasksList();
            break;

          case 'progress':
            filterButton.classList.add('active');
            self.renderTasksList('progress');
            break;

          case 'done':
            filterButton.classList.add('active');
            self.renderTasksList('done');
            break;

          default:
            console.log('No such option for filter buttons(TodoList.prototype.bindFilterButtons).');
            break;
        }
      }
    });
  };

  TodoList.prototype.saveDataToStorage = function(data) {
    if(typeof localStorage !== 'undefined') {
      localStorage.setItem('tasksArray', JSON.stringify(data));
    } else {
      console.log('Local storage is not available in your browser.');
    }
  };

  TodoList.prototype.getDataFromStorage = function() {
    if(typeof localStorage !== 'undefined') {
      this.tasksArray = JSON.parse(localStorage.getItem('tasksArray')) || [];
    } else {
      this.tasksArray = [];
      console.log('Local storage is not available in your browser.');
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

    var newTodoList = document.createDocumentFragment(), i;

    switch(type) {
      case 'progress':
        for (i = 0; i < this.tasksArray.length; i++) {
          if (!this.tasksArray[i].done) {
            newTodoList.appendChild(this.addItemToDOM(this.tasksArray[i]));
          }
        }
        break;

      case 'done':
        for(i = 0; i < this.tasksArray.length; i++) {
          if(this.tasksArray[i].done) {
            newTodoList.appendChild(this.addItemToDOM(this.tasksArray[i]));
          }
        }
        break;

      default:
        for(i = 0; i < this.tasksArray.length; i++) {
          newTodoList.appendChild(this.addItemToDOM(this.tasksArray[i]));
        }
        break;
    }

    this.todoList.appendChild(newTodoList);
  };

  TodoList.prototype.addItemToDOM = function(task) {
    var taskBlock    = this.createElement('div', 'task');
    var doneButton   = this.createElement('input', 'done-btn', 'button', task.done ? 'Undone' : 'Done');
    var editButton   = this.createElement('input', 'edit-btn', 'button', 'Edit');
    var removeButton = this.createElement('input', 'remove-btn', 'button', 'X');
    var taskText     = this.createElement('span');

    taskText.textContent = task.name;
    if(task.done) {
      taskText  .classList.add('done');
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

  TodoList.prototype.findCurrentIndex = function(array, id) {
    for(var i = 0; i < array.length; ++i) {
      if(array[i].id === id) {
        return i;
      }
    }
  };

  TodoList.prototype.bindListEvents = function() {
    var self = this;

    this.todoList.addEventListener('click', function(event) {
      var listItem = event.target;

      if(listItem) {
        if(listItem.classList.contains('remove-btn')) {
          self.removeItem(listItem.parentNode.getAttribute('data-id'));
          return;
        }

        if(listItem.classList.contains('edit-btn')) {
          self.editItem(listItem.parentNode.getAttribute('data-id'));
          return;
        }

        if(listItem.classList.contains('done-btn')) {
          var doneItemIndex = self.findCurrentIndex(self.tasksArray, parseInt(listItem.parentNode.getAttribute('data-id')));

          if(!listItem.parentNode.firstChild.classList.contains('done')) {
            self.tasksArray[doneItemIndex].done = true;
            listItem.value = 'Undone';
            listItem.parentNode.querySelector('span')     .classList.add('done');
            listItem.parentNode.querySelector('.edit-btn').classList.add('disabled');
            listItem.parentNode.querySelector('.edit-btn').setAttribute('disabled', 'true');
          } else {
            self.tasksArray[doneItemIndex].done = false;
            listItem.value = 'Done';
            listItem.parentNode.querySelector('span')     .classList.remove('done');
            listItem.parentNode.querySelector('.edit-btn').classList.remove('disabled');
            listItem.parentNode.querySelector('.edit-btn').removeAttribute('disabled');
          }

          self.saveDataToStorage(self.tasksArray);
        }
      }
    });
  };

  TodoList.prototype.removeItem = function(id) {
    var itemToRemoveArrayIndex = this.findCurrentIndex(this.tasksArray, parseInt(id));

    var itemToRemoveIndex;

    for(var j = 0; j < this.todoList.childNodes.length; ++j) {
      if(parseInt(this.todoList.childNodes[j].getAttribute('data-id')) === parseInt(id)) {
        itemToRemoveIndex = j;
        break;
      }
    }

    if(this.tasksArray.length === 1) {
      this.tasksArray = [];
      this.saveDataToStorage(this.tasksArray);
      this.todoList.removeChild(this.todoList.firstChild);
    } else {
      this.tasksArray.splice(itemToRemoveArrayIndex, 1);
      this.saveDataToStorage(this.tasksArray);
      this.todoList.removeChild(this.todoList.childNodes[itemToRemoveIndex]);
    }
  };

  TodoList.prototype.bindUpdateItem = function() {
    var self = this;

    this.saveButton.addEventListener('click', function() {
      var inputValue = self.editInput.value;

      if(!inputValue) {
        self.showError("Enter new task name", self.editInput);
      } else {
        if(this.parentNode.querySelector('.error-message')) {
          this.parentNode.removeChild(this.parentNode.querySelector('.error-message'));
        }

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

      if(this.parentNode.querySelector('.error-message')) {
        this.parentNode.removeChild(this.parentNode.querySelector('.error-message'));
      }
    });
  };

  TodoList.prototype.editItem = function(id) {
    var arrayIndex = this.findCurrentIndex(this.tasksArray, parseInt(id));

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

  TodoList.prototype.showError = function(message, sibling) {
    if(!sibling.parentNode.querySelector('.error-message')) {
      var error = document.createElement('h5');
      error.className = 'error-message';
      error.innerText = message;
      sibling.parentNode.appendChild(error);
    }
  };

  TodoList.prototype.bindAddAction = function() {
    var self = this;

    this.addButton.addEventListener('click', function() {
      var inputValue = self.taskInput.value;

      if(!inputValue) {
        self.showError("Enter task name", self.taskInput);
      } else {
        if(this.parentNode.querySelector('.error-message')) {
          this.parentNode.removeChild(this.parentNode.querySelector('.error-message'));
        }

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
