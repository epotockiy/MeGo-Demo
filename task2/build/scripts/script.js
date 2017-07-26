//JQuery version
;(function($, undefined) {
  'use strict';

  $(function() {
    var todoList = new TodoList('todo');
    todoList.init();
  });

  function TodoList(container) {
    this.$todoContainer = $('.' + container);
    this.$addButton     = this.$todoContainer.find('.add-btn');
    this.$taskInput     = this.$todoContainer.find('.task-input');
    this.$todoList      = this.$todoContainer.find('.todo-list');
    this.$editBlock     = this.$todoContainer.find('.edit');
    this.$editInput     = this.$todoContainer.find('.edit .edit-input');
    this.$saveButton    = this.$todoContainer.find('.edit .save-btn');
    this.$closeButton   = this.$todoContainer.find('.edit .close-btn');
    this.$overlay       = this.$todoContainer.find('.overlay');
    this.$filterBlock   = this.$todoContainer.find('.filter-btns');
    this.$filterButtons = this.$filterBlock  .find('button');
    this.tasksArray     = [];
    this.currentIndex   = 0;
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

    this.$filterBlock.on('click', '#all', function() {
      $.each(self.$filterButtons, function(index, element) {
        element.className = '';
      });

      $(this).addClass('active');
      self.renderTasksList();
    });

    this.$filterBlock.on('click', '#progress', function() {
      $.each(self.$filterButtons, function(index, element) {
        element.className = '';
      });

      $(this).addClass('active');
      self.renderTasksList('progress');
    });

    this.$filterBlock.on('click', '#done', function() {
      $.each(self.$filterButtons, function(index, element) {
        element.className = '';
      });

      $(this).addClass('active');
      self.renderTasksList('done');
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

  TodoList.prototype.createElement = function(name, className, type, value) {////////useless
    var element = $(
        '<' + name +
        (className ? ' class="' + className + '"' : "") +
        (type      ? ' type="'  + type      + '"' : "") +
        (value     ? ' value="' + value     + '"' : "") +
        '>');

    return element;
  };

  TodoList.prototype.renderTasksList = function(type) {
    this.$todoList.empty();

    var newTodoList = document.createDocumentFragment(), i;

    switch(type) {
      case 'progress':
        for(i = 0; i < this.tasksArray.length; i++) {
          if(!this.tasksArray[i].done) {
            newTodoList.append(this.addItemToDOM(this.tasksArray[i]));
          }
        }
        break;

      case 'done':
        for(i = 0; i < this.tasksArray.length; i++) {
          if(this.tasksArray[i].done) {
            newTodoList.append(this.addItemToDOM(this.tasksArray[i]));
          }
        }
        break;

      default:
        for(i = 0; i < this.tasksArray.length; i++) {
          newTodoList.append(this.addItemToDOM(this.tasksArray[i]));
        }
        break;
    }

    this.$todoList.append(newTodoList);
  };

  TodoList.prototype.addItemToDOM = function(task) {
    var taskBlock    = this.createElement('div',   'task');
    var doneIcon     = this.createElement('div',   'done-icon');
    var editButton   = this.createElement('input', 'edit-btn',   'button', 'Edit');
    var removeButton = this.createElement('input', 'remove-btn', 'button', 'X');
    var taskText     = this.createElement('p');

    taskText.text(task.name);
    if(task.done) {
      doneIcon  .addClass('activated');
      taskText  .addClass('done');
      editButton.addClass('disabled');
      editButton.attr('disabled', 'true');
    } else {
      doneIcon.addClass('faded');
    }

    taskBlock.attr('data-id', task.id);

    taskBlock.append(doneIcon, taskText, editButton, removeButton);

    return taskBlock[0];
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

    this.$todoList.on('click', 'input.remove-btn', function() {
      self.removeItem($(this).parent().data('id'));
    });

    this.$todoList.on('click', 'input.edit-btn', function() {
      self.editItem($(this).parent().data('id'));
    });

    this.$todoList.on('click', 'input.done-icon', function() {
      var listItem  = $(this),
          index = self.tasksArray.findIndex(function(element) {
            return element.id === parseInt(item.parent().data('id'));
          });

      if(!item.siblings().find('p').hasClass('done')) {
        self.tasksArray[index].done = true;
        listItem.class('done-icon activated');
        listItem.siblings().find('p').addClass('done');
        listItem.siblings().find('.edit-btn').addClass('disabled');
        listItem.siblings().find('.edit-btn').attr('disabled', 'true');
      } else {
        self.tasksArray[index].done = false;
        listItem.class('done-icon faded');
        listItem.siblings().find('p').removeClass('done');
        listItem.siblings().find('.edit-btn').removeClass('disabled');
        listItem.siblings().find('.edit-btn').removeAttr('disabled');
      }

      self.saveDataToStorage(self.tasksArray);
    });
  };

  TodoList.prototype.removeItem = function(id)  {
    var itemToRemoveArrayIndex = this.findCurrentIndex(this.tasksArray, parseInt(id))

    var itemToRemoveIndex;

    for(var j = 0; j < this.$todoList.children().length; ++j) {
      if(parseInt(this.$todoList.children().eq(j).data('id')) === parseInt(id)) {
        itemToRemoveIndex = j;
        break;
      }
    }

    if(this.tasksArray.length === 1) {
      this.tasksArray = [];
      this.saveDataToStorage(this.tasksArray);
      this.$todoList.children()
          .first()
          .remove();
    } else {
      this.tasksArray.splice(itemToRemoveArrayIndex, 1);
      this.saveDataToStorage(this.tasksArray);
      this.$todoList.children()
          .eq(itemToRemoveIndex)
          .remove();
    }
  };

  TodoList.prototype.bindUpdateItem = function() {
    var self = this;

    this.$saveButton.on('click', function() {
      var inputValue = self.$editInput.val();

      if(!inputValue) {
        self.alertError("Enter new task name", self.$editInput);
      } else {
        if(this.parents().children('.error-message')) {
          this.parents().children('.error-message').remove();
        }

        self.tasksArray[self.currentIndex].name = inputValue;
        self.saveDataToStorage(self.tasksArray);
        self.$todoList.find('.task').eq(self.currentIndex).children('p').text(inputValue);

        self.$editBlock.removeClass('active');
        self.$overlay  .removeClass('active');
      }
    });
  };

  TodoList.prototype.bindCloseEditBlock = function() {
    var self = this;

    this.$closeButton.on('click', function() {
      self.$editBlock.removeClass('active');
      self.$overlay  .removeClass('active');

      if(this.parents().children('.error-message')) {
        this.parents().children('.error-message').remove();
      }
    });
  };

  TodoList.prototype.editItem = function(id) {
    var arrayIndex = this.findCurrentIndex(this.tasksArray, parseInt(id));

    for(var j = 0; j < this.$todoList.children().length; ++j) {
      if(parseInt(this.$todoList.children().eq(j).data('id')) === parseInt(id)) {
        this.currentIndex = j;
        break;
      }
    }

    this.$editInput.val(this.$todoList.children().eq(this.currentIndex).find('p').text());

    this.$editBlock.addClass('active');
    this.$overlay  .addClass('active');
  };

  TodoList.prototype.showError = function(message, sibling) {
    if(!sibling.parents().children('.error-message')) {
      var error = $('<h5 class="error-message">' + message + '</h5>');
      sibling.parents().append(error);
    }
  };

  TodoList.prototype.bindAddAction = function() {
    var self = this;

    this.$addButton.on('click', function() {
      var inputValue = self.$taskInput.val();

      if(!inputValue) {
        self.showError("Enter task name", self.$taskInput);
      } else {
        if(self.$addButton.parents().first().children('.error-message')) {
          self.$addButton.parents().first().children('.error-message').remove();
        }

        self.tasksArray.unshift(
            {
              name: inputValue,
              id: Math.floor(Math.random() * 1000000),
              done: false
            }
        );
        self.saveDataToStorage(self.tasksArray);
        self.$todoList.prepend(self.addItemToDOM(self.tasksArray[0]));
        self.$taskInput.val('');
      }
    });
  };
})(jQuery);
