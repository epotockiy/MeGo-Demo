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
      this.bindFilterButtons();
    };

    this.bindFilterButtons = function() {
      var self = this;

      this.$filterBlock.on('click', function() {
        console.log(self.$filterButtons);
        for(var i = 0; i < self.$filterButtons.length; ++i) {
          // console.log(self.$filterButtons[i].);
          // self.$filterButtons[i].removeClass('active');
          self.$filterButtons[i].removeClass('active');
        }

        $.each(self.$filterButtons, function(element, index) {

        });

        console.log($(this));

        /*if(event.target && event.target.getAttribute('data-type') === 'all') {
          event.target.addClass('active');
          self.renderTasksList();

          return;
        }

        if(event.target && event.target.getAttribute('data-type') === 'progress') {
          event.target.addClass('active');
          self.renderTasksList('progress');

          return;
        }

        if(event.target && event.target.getAttribute('data-type') === 'done') {
          event.target.addClass('active');
          self.renderTasksList('done');
        }*/
      });
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
      var element = $(
          '<' + name +
          (className ? ' class="' + className + '"' : "") +
          (type      ? ' type="'  + type      + '"' : "") +
          (value     ? ' value="' + value     + '"' : "") +
          '>');

      return element;
    };

    this.renderTasksList = function() {
      this.$todoList.empty();
      var newTodoList = document.createDocumentFragment();

      for(var i = 0; i < this.tasksArray.length; i++) {
        newTodoList.append(this.addItemToDOM(this.tasksArray[i]));
      }

      this.$todoList.append(newTodoList);
    };

    this.addItemToDOM = function(task) {
      var taskBlock    = this.createElement('div', 'task');
      var doneButton   = this.createElement('input', 'done-btn', 'button', 'Done');
      var editButton   = this.createElement('input', 'edit-btn', 'button', 'Edit');
      var removeButton = this.createElement('input', 'remove-btn', 'button', 'X');
      var taskText     = this.createElement('span');
      taskText.text(task.name);

      taskBlock.attr('data-id', task.id);

      taskBlock.append(taskText, removeButton, editButton, doneButton);

      return taskBlock[0];
    };

    this.bindListEvents = function() {
      var self = this;

      this.$todoList.on('click', 'input.remove-btn', function() {
        self.removeItem($(this).parent().data('id'));
      });

      this.$todoList.on('click', 'input.edit-btn', function() {
        self.editItem($(this).parent().data('id'));
      });

      this.$todoList.on('click', 'input.done-btn', function() {
        var taskText = $(this).parent().children().first();
        taskText.css('text-decoration', taskText.css('text-decoration').match('line-through') ? 'none' : 'line-through');
      });
    };

    this.bindUpdateItem = function() {
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

    this.bindCloseEditBlock = function() {
      var self = this;

      this.$closeButton.on('click', function() {
        self.$editBlock.removeClass('active');
        self.$overlay  .removeClass('active');
      });
    };

    this.removeItem = function(id) {
      var index = this.tasksArray.findIndex(function(element) {
        return element.id === parseInt(id);
      });

      if(this.tasksArray.length === 1) {
        this.tasksArray = [];
        this.saveDataToStorage(this.tasksArray);
        this.$todoList.children()
            .first()
            .remove();
      } else {
        this.tasksArray.splice(index, 1);
        this.saveDataToStorage(this.tasksArray);
        this.$todoList.children()
            .eq(index)
            .remove();
      }
    };

    this.editItem = function(id) {
      this.currentIndex = this.tasksArray.findIndex(function(element) {
        return element.id === parseInt(id);
      });

      this.$editInput.val(this.tasksArray[this.currentIndex].name);
      this.$editBlock.addClass('active');
      this.$overlay  .addClass('active');
    };

    this.alertError = function(message, toFocus) {
      alert(message);
      toFocus.focus();
    };

    this.bindAddAction = function() {
      var self = this;
      this.$addButton.on('click', function() {
        if(!self.$taskInput.val()) {
          self.alertError("Enter task name", self.$taskInput);
        } else {
          self.tasksArray.unshift(
              {
                name: self.$taskInput.val(),
                id: Math.floor(Math.random() * 1000000)
              }
          );
          self.saveDataToStorage(self.tasksArray);
          self.$todoList.prepend(self.addItemToDOM(self.tasksArray[0]));
          self.$taskInput.val('');
        }
      });
    };
  }
})(jQuery);
