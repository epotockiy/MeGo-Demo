//Javascript version
;(function() {
  'use strict';

  document.addEventListener('DOMContentLoaded', function() {
    var todoList = new TodoList(document.querySelector('.todo'));
    todoList.init();
  });


  function TodoList(container) {
    this.todoContainer      = container;
    this.formBlock          = this.todoContainer.querySelector('form');
    this.formErrorMessage   = this.formBlock    .querySelector('.error-message');
    this.addButton          = this.todoContainer.querySelector('.add-btn');
    this.taskInput          = this.todoContainer.querySelector('.task-input');
    this.todoList           = this.todoContainer.querySelector('.todo-list');
    this.editBlock          = this.todoContainer.querySelector('.edit');
    this.editErrorMessage   = this.editBlock    .querySelector('.error-message');
    this.editInput          = this.todoContainer.querySelector('.edit .edit-input');
    this.saveButton         = this.todoContainer.querySelector('.edit .save-btn');
    this.closeButton        = this.todoContainer.querySelector('.edit .close-btn');
    this.overlay            = this.todoContainer.querySelector('.overlay');
    this.filterBlock        = this.todoContainer.querySelector('.filter-btns');
    this.filterButtons      = this.filterBlock  .querySelectorAll('button');
    this.tasksArray         = [];
    this.currentIndex       = 0;
    this.isStorageAvailable = true;
  }

  TodoList.prototype.init = function() {
    this.getDataFromStorage();
    this.renderTasksList();
    this.bindEvents();
  };

  TodoList.prototype.bindEvents = function() {
    this.todoList   .addEventListener('click', this.bindListEvents       .bind(this));
    this.addButton  .addEventListener('click', this.addItemHandler       .bind(this));
    this.saveButton .addEventListener('click', this.updateItemHandler    .bind(this));
    this.closeButton.addEventListener('click', this.closeEditBlockHandler.bind(this));
    this.filterBlock.addEventListener('click', this.filterButtonsHandler .bind(this));
  };

  TodoList.prototype.filterButtonsHandler = function() {
    for(var i = 0; i < this.filterButtons.length; ++i) {
      this.filterButtons[i].classList.remove('active');
    }

    var filterButton = event.target;

    if(filterButton) {
      switch(filterButton.id) {
        case 'all':
          filterButton.classList.add('active');
          this.todoList.className = 'todo-list all';
          break;

        case 'progress':
          filterButton.classList.add('active');
          this.todoList.className = 'todo-list progress';
          break;

        case 'done':
          filterButton.classList.add('active');
          this.todoList.className = 'todo-list done';
          break;

        default:
          console.log('No such option for filter buttons ( TodoList.prototype.filterButtonsHandler() ).');
          break;
      }
    }
  };

  TodoList.prototype.saveDataToStorage = function(data) {
    if(typeof localStorage !== 'undefined') {
      this.isStorageAvailable = true;

      localStorage.setItem('tasksArray', JSON.stringify(data));
    } else {
      this.isStorageAvailable = false;
      console.log('Local storage is not available in your browser.');
    }
  };

  TodoList.prototype.getDataFromStorage = function() {
    if(typeof localStorage !== 'undefined') {
      this.isStorageAvailable = true;

      this.tasksArray = JSON.parse(localStorage.getItem('tasksArray')) || [];
    } else {
      this.tasksArray = [];

      this.isStorageAvailable = false;
      console.log('Local storage is not available in your browser.');
    }
  };

  TodoList.prototype.createElement = function(name, className, type, value) {
    var element = document.createElement(name);

    if(className) {
      element.className = className;
    }

    if(type) {
      element.type = type;
    }

    if(value) {
      element.value = value;
    }

    return element;
  };

  TodoList.prototype.renderTasksList = function() {
    this.todoList.innerHTML = '';

    var newTodoList = document.createDocumentFragment(), i;
    for(i = 0; i < this.tasksArray.length; i++) {
      newTodoList.appendChild(this.addItemToDOM(this.tasksArray[i]));
    }

    this.todoList.appendChild(newTodoList);
  };

  TodoList.prototype.addItemToDOM = function(task) {
    var taskBlock    = this.createElement('div',   'task');
    var doneIcon     = this.createElement('div',   'done-icon');
    var editButton   = this.createElement('input', 'edit-btn',   'button', 'Edit');
    var removeButton = this.createElement('input', 'remove-btn', 'button', 'X');
    var taskText     = this.createElement('p');

    taskText.textContent = task.name;

    if(task.done) {
      taskBlock.classList.add('done-task');
      editButton.disabled = true;
    } else {
      taskBlock.classList.add('progress-task');
    }

    taskBlock.setAttribute('data-id', task.id);

    taskBlock.appendChild(doneIcon);
    taskBlock.appendChild(taskText);
    taskBlock.appendChild(editButton);
    taskBlock.appendChild(removeButton);

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
    var listItem = event.target;

    if(listItem) {
      switch(listItem.className) {
        case 'remove-btn':
          this.removeItem(listItem.parentNode.getAttribute('data-id'));
          break;

        case 'edit-btn':
          this.editItem(listItem.parentNode.getAttribute('data-id'));
          break;

        case 'done-icon':
          var doneItemIndex = this.findCurrentIndex(this.tasksArray, (listItem.parentNode.getAttribute('data-id')));

          if(!this.tasksArray[doneItemIndex].done) {
            this.tasksArray[doneItemIndex].done = true;

            listItem.parentNode.className = 'task done-task';
            listItem.parentNode.querySelector('.edit-btn').setAttribute('disabled', 'true');
          } else {
            this.tasksArray[doneItemIndex].done = false;

            listItem.parentNode.className = 'task progress-task';
            listItem.parentNode.querySelector('.edit-btn').removeAttribute('disabled');
          }

          if(this.isStorageAvailable) {
            this.saveDataToStorage(this.tasksArray);
          }

          break;

        default:
          console.log("No such event for task item ( TodoList.prototype.bindListEvents() ).");
          break;
      }
    }
  };

  TodoList.prototype.removeItem = function(id) {
    var itemToRemoveArrayIndex = this.findCurrentIndex(this.tasksArray, id),
        itemToRemoveIndex;

    for(var j = 0; j < this.todoList.childNodes.length; ++j) {
      if(this.todoList.childNodes[j].getAttribute('data-id') === id) {
        itemToRemoveIndex = j;
        break;
      }
    }

    if(this.tasksArray.length === 1) {
      this.tasksArray = [];

      if(this.isStorageAvailable) {
        this.saveDataToStorage(this.tasksArray);
      }

      this.todoList.removeChild(this.todoList.firstChild);
    } else {
      this.tasksArray.splice(itemToRemoveArrayIndex, 1);

      if(this.isStorageAvailable) {
        this.saveDataToStorage(this.tasksArray);
      }

      this.todoList.removeChild(this.todoList.childNodes[itemToRemoveIndex]);
    }
  };

  TodoList.prototype.updateItemHandler = function() {
    var inputValue = this.editInput.value;

    if(!inputValue) {
      this.editErrorMessage.style.display = 'block';
    } else {
      this.editErrorMessage.style.display = 'none';

      this.tasksArray[this.currentIndex].name = inputValue;

      if (this.isStorageAvailable) {
        this.saveDataToStorage(this.tasksArray);
      }

      this.todoList.childNodes[this.currentIndex].querySelector('p').textContent = inputValue;

      this.editBlock.classList.remove('active');
      this.overlay.classList.remove('active');
    }
  };

  TodoList.prototype.closeEditBlockHandler = function() {
    this.editBlock.classList.remove('active');
    this.overlay  .classList.remove('active');

    this.editErrorMessage.style.display = 'none';
  };

  TodoList.prototype.editItem = function(id) {
    var arrayIndex = this.findCurrentIndex(this.tasksArray, id);

    for(var j = 0; j < this.todoList.childNodes.length; ++j) {
      if(this.todoList.childNodes[j].getAttribute('data-id') === id) {
        this.currentIndex = j;
        break;
      }
    }

    this.editInput.value = this.todoList.childNodes[this.currentIndex].querySelector('p').innerText;

    this.editBlock.classList.add('active');
    this.overlay  .classList.add('active');
  };

  TodoList.prototype.addItemHandler = function() {
    var inputValue = this.taskInput.value;

    if(!inputValue) {
      this.formErrorMessage.style.display = 'block';
    } else {
      this.formErrorMessage.style.display = 'none';

      this.tasksArray.unshift(
          {
            name: inputValue,
            id: Math.random().toString(36).substr(2, 10),
            done: false
          }
      );

      if(this.isStorageAvailable) {
        this.saveDataToStorage(this.tasksArray);
      }
      this.todoList.insertBefore(this.addItemToDOM(this.tasksArray[0]), this.todoList.firstChild);
      this.taskInput.value = '';
    }
  };
})();
