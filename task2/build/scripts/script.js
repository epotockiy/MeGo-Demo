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
    this.$filterBlock   = this.$todoContainer.find('.filter-btns');
    this.$filterButtons = this.$filterBlock  .find('button');
    this.$overlay       = this.$todoContainer.find('.overlay');
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
    var newTodoList = document.createDocumentFragment();

    if(type === 'progress') {
      for(var i = 0; i < this.tasksArray.length; i++) {
        if(!this.tasksArray[i].done) {
          newTodoList.append(this.addItemToDOM(this.tasksArray[i]));
        }
      }
    } else {
      if (type === 'done') {
        for (var i = 0; i < this.tasksArray.length; i++) {
          if (this.tasksArray[i].done) {
            newTodoList.append(this.addItemToDOM(this.tasksArray[i]));
          }
        }
      } else {
        for (var i = 0; i < this.tasksArray.length; i++) {
          newTodoList.append(this.addItemToDOM(this.tasksArray[i]));
        }
      }
    }

    this.$todoList.append(newTodoList);
  };

  TodoList.prototype.addItemToDOM = function(task) {
    var taskBlock    = this.createElement('div', 'task');
    var doneButton   = this.createElement('input', 'done-btn', 'button', task.done ? 'Undone' : 'Done');
    var editButton   = this.createElement('input', 'edit-btn', 'button', 'Edit');
    var removeButton = this.createElement('input', 'remove-btn', 'button', 'X');
    var taskText     = this.createElement('span');

    taskText.text(task.name);
    if(task.done) {
      taskText.addClass('done');
      editButton.addClass('disabled');
      editButton.attr('disabled', 'true');
    }

    taskBlock.attr('data-id', task.id);

    taskBlock.append(taskText, removeButton, editButton, doneButton);

    return taskBlock[0];
  };

  TodoList.prototype.bindListEvents = function() {
    var self = this;

    this.$todoList.on('click', 'input.remove-btn', function() {
      self.removeItem($(this).parent().data('id'));
    });

    this.$todoList.on('click', 'input.edit-btn', function() {
      self.editItem($(this).parent().data('id'));
    });

    this.$todoList.on('click', 'input.done-btn', function() {
      var item  = $(this),
          index = self.tasksArray.findIndex(function(element) {
            return element.id === parseInt(item.parent().data('id'));
          });

      if(!item.siblings().first().hasClass('done')) {
        self.tasksArray[index].done = true;
        item.val('Undone');
        item.siblings().first().addClass('done');
        item.siblings().eq(2).addClass('disabled');
        item.siblings().eq(2).attr('disabled', 'true');
      } else {
        self.tasksArray[index].done = false;
        item.val('Done');
        item.siblings().first().removeClass('done');
        item.siblings().eq(2).removeClass('disabled');
        item.siblings().eq(2).removeAttr('disabled');
      }

      self.saveDataToStorage(self.tasksArray);
    });
  };

  TodoList.prototype.bindUpdateItem = function() {
    var self = this;

    this.$saveButton.on('click', function() {
      if(!self.$editInput.val()) {
        self.alertError("Enter new task name", self.$editInput);
      } else {
        self.tasksArray[self.currentIndex].name = self.$editInput.val();
        self.saveDataToStorage(self.tasksArray);
        self.$todoList.find('.task').eq(self.currentIndex).children('span').text(self.$editInput.val());

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
    });
  };

  TodoList.prototype.removeItem = function(id)  {
    var arrayIndex = this.tasksArray.findIndex(function(element) {
      return element.id === parseInt(id);
    });

    var index;

    for(var j = 0; j < this.$todoList.children().length; ++j) {
      if(parseInt(this.$todoList.children().eq(j).data('id')) === parseInt(id)) {
        index = j;
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
      this.tasksArray.splice(arrayIndex, 1);
      this.saveDataToStorage(this.tasksArray);
      this.$todoList.children()
          .eq(index)
          .remove();
    }
  };

  TodoList.prototype.editItem = function(id) {
    var arrayIndex = this.tasksArray.findIndex(function(element) {
      return element.id === parseInt(id);
    });


    for(var j = 0; j < this.$todoList.children().length; ++j) {
      if(parseInt(this.$todoList.children().eq(j).data('id')) === parseInt(id)) {
        this.currentIndex = j;
        break;
      }
    }

    this.$editInput.val(this.$todoList.children().eq(this.currentIndex).first().text());
    this.$editBlock.addClass('active');
    this.$overlay  .addClass('active');
  };

  TodoList.prototype.alertError = function(message, toFocus) {
    alert(message);
    toFocus.focus();
  };

  TodoList.prototype.bindAddAction = function() {
    var self = this;
    this.$addButton.on('click', function() {
      if(!self.$taskInput.val()) {
        self.alertError("Enter task name", self.$taskInput);
      } else {
        self.tasksArray.unshift(
            {
              name: self.$taskInput.val(),
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
