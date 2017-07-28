//Javascript TodoList plugin

;(function() {

  window.TodoList = function (containers) {
    for(var i = 0; i < containers.length; ++i) {
      containers[i].dataset.todoList = new TodoListModule(containers[i], i);
    }
  };

  var TodoListModule = function(container, index) {
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
    this.isStorageAvailable = true;
    this.localStorageName   = 'tasksArray' + index;
    this.tasksArray         = [];
    this.currentItem        = {};

    this.init();
  };

  TodoListModule.prototype.init = function() {
    this.getDataFromStorage();
    this.renderTasksList();
    this.bindEvents();
  };

  TodoListModule.prototype.bindEvents = function() {
    this.todoList   .addEventListener('click', this.listEventsHandler    .bind(this));
    this.addButton  .addEventListener('click', this.addItemHandler       .bind(this));
    this.saveButton .addEventListener('click', this.updateItemHandler    .bind(this));
    this.closeButton.addEventListener('click', this.closeEditBlockHandler.bind(this));
    this.filterBlock.addEventListener('click', this.filterButtonsHandler .bind(this));
  };

  TodoListModule.prototype.filterButtonsHandler = function() {
    for(var i = 0; i < this.filterButtons.length; ++i) {
      this.filterButtons[i].classList.remove('active');
    }

    var filterButton = event.target;

    if(filterButton) {
      switch(filterButton.className) {
        case 'all-filter':
          filterButton.classList.add('active');
          this.todoList.classList.remove('progress');
          this.todoList.classList.remove('done');
          this.todoList.classList.add('all');
          break;

        case 'progress-filter':
          filterButton.classList.add('active');
          this.todoList.classList.remove('all');
          this.todoList.classList.remove('done');
          this.todoList.classList.add('progress');
          break;

        case 'done-filter':
          filterButton.classList.add('active');
          this.todoList.classList.remove('all');
          this.todoList.classList.remove('progress');
          this.todoList.classList.add('done');
          break;

        default:
          console.log('No such option for filter buttons ( TodoListModule.prototype.filterButtonsHandler() ).');
          break;
      }
    }
  };

  TodoListModule.prototype.saveDataToStorage = function(data) {
    if(typeof localStorage !== 'undefined') {
      this.isStorageAvailable = true;

      localStorage.setItem(this.localStorageName, JSON.stringify(data));
    } else {
      this.isStorageAvailable = false;
      console.log('Local storage is not available in your browser.');
    }
  };

  TodoListModule.prototype.getDataFromStorage = function() {
    if(typeof localStorage !== 'undefined') {
      this.isStorageAvailable = true;

      this.tasksArray = JSON.parse(localStorage.getItem(this.localStorageName)) || [];
    } else {
      this.tasksArray = [];

      this.isStorageAvailable = false;
      console.log('Local storage is not available in your browser.');
    }
  };

  TodoListModule.prototype.createElement = function(name, className, type, value) {
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

  TodoListModule.prototype.renderTasksList = function() {
    this.todoList.innerHTML = '';

    var newTodoListModule = document.createDocumentFragment(), i;
    for(i = 0; i < this.tasksArray.length; i++) {
      newTodoListModule.appendChild(this.addItemToDOM(this.tasksArray[i]));
    }

    this.todoList.appendChild(newTodoListModule);
  };

  TodoListModule.prototype.addItemToDOM = function(task) {
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

  TodoListModule.prototype.findCurrentIndex = function(array, id) {
    for(var i = 0; i < array.length; ++i) {
      if(array[i].id === id) {
        return i;
      }
    }
  };

  TodoListModule.prototype.listEventsHandler= function() {
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

            listItem.parentNode.classList.remove('progress-task');
            listItem.parentNode.classList.add('done-task');
            listItem.parentNode.querySelector('.edit-btn').setAttribute('disabled', 'true');
          } else {
            this.tasksArray[doneItemIndex].done = false;

            listItem.parentNode.classList.remove('done-task');
            listItem.parentNode.classList.add('progress-task');
            listItem.parentNode.querySelector('.edit-btn').removeAttribute('disabled');
          }

          if(this.isStorageAvailable) {
            this.saveDataToStorage(this.tasksArray);
          }

          break;

        default:
          console.log("No such event for task item ( TodoListModule.prototype.listEventsHandler() ).");
          break;
      }
    }
  };

  TodoListModule.prototype.removeItem = function(id) {
    var itemToRemoveIndex = this.findCurrentIndex(this.tasksArray, id);

    if(this.tasksArray.length === 1) {
      this.tasksArray = [];

      if(this.isStorageAvailable) {
        this.saveDataToStorage(this.tasksArray);
      }

      this.todoList.removeChild(this.todoList.firstChild);
    } else {
      this.tasksArray.splice(itemToRemoveIndex, 1);

      if(this.isStorageAvailable) {
        this.saveDataToStorage(this.tasksArray);
      }

      this.todoList.removeChild(this.todoList.querySelector('[data-id="' + id + '"]'));
    }
  };

  TodoListModule.prototype.updateItemHandler = function() {
    var inputValue = this.editInput.value;

    if(!inputValue) {
      this.editErrorMessage.style.display = 'block';
    } else {
      this.editErrorMessage.style.display = 'none';

      this.currentItem.name = inputValue;

      if (this.isStorageAvailable) {
        this.saveDataToStorage(this.tasksArray);
      }

      this.currentItem.querySelector('p').textContent = inputValue;

      this.editBlock.classList.remove('active');
      this.overlay.classList.remove('active');
    }
  };

  TodoListModule.prototype.closeEditBlockHandler = function() {
    this.editBlock.classList.remove('active');
    this.overlay  .classList.remove('active');

    this.editErrorMessage.style.display = 'none';
  };

  TodoListModule.prototype.editItem = function(id) {
    var arrayIndex = this.findCurrentIndex(this.tasksArray, id);
    this.currentItem = this.todoList.querySelector('[data-id="' + id + '"]');

    this.editInput.value = this.currentItem.querySelector('p').innerText;

    this.editBlock.classList.add('active');
    this.overlay  .classList.add('active');
  };

  TodoListModule.prototype.addItemHandler = function() {
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
