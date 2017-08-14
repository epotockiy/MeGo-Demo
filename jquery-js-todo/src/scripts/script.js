//JQuery TodoList plugin

;(function($, undefined) {
  $.fn.TodoList = function() {
    return this.each(function(index, container) {
      $(container).data('todo-list', new TodoList(container, index));
    });
  };

  var TodoList = function(container, index) {
    this.$todoContainer     = $(container);//inside .each() container is a DOM element, not jQuery!!!!!!!!
    this.$formBlock         = this.$todoContainer.find('form');
    this.$formErrorMessage  = this.$formBlock    .find('.error-message');
    this.$addButton         = this.$todoContainer.find('.add-btn');
    this.$taskInput         = this.$todoContainer.find('.task-input');
    this.$todoList          = this.$todoContainer.find('.todo-list');
    this.$editBlock         = this.$todoContainer.find('.edit');
    this.$editErrorMessage  = this.$editBlock    .find('.error-message');
    this.$editInput         = this.$todoContainer.find('.edit .edit-input');
    this.$saveButton        = this.$todoContainer.find('.edit .save-btn');
    this.$closeButton       = this.$todoContainer.find('.edit .close-btn');
    this.$overlay           = this.$todoContainer.find('.overlay');
    this.$filterBlock       = this.$todoContainer.find('.filter-btns');
    this.$filterButtons     = this.$filterBlock  .find('button');
    this.isStorageAvailable = true;
    this.localStorageName   = 'tasksArray' + index;
    this.tasksArray         = [];
    this.currentItem        = {};

    this.init();
  };

  TodoList.prototype.init = function() {
    var self = this;

    this.getDataFromServer()
      .done(function(res) {
        if(res.todos) {
          for(var i = 0; i < res.todos.length; ++i) {
            if (res.todos[i].done === 'true') {
              res.todos[i].done = true;
            }

            if (res.todos[i].done === 'false') {
              res.todos[i].done = false;
            }
          }

          self.tasksArray = res.todos || [];
        } else {
          self.tasksArray = [];
        }

        self.renderTasksList();
        self.bindEvents();
      });
  };

  TodoList.prototype.getDataFromServer = function() {
    return $.ajax({
      url: '/todos'
    });
  };

  TodoList.prototype.bindEvents = function() {
    this.bindListEvents();
    this.bindFilterButtons();
    this.$addButton  .on('click', this.addItemHandler       .bind(this));
    this.$saveButton .on('click', this.updateItemHandler    .bind(this));
    this.$closeButton.on('click', this.closeEditBlockHandler.bind(this));
  };

  TodoList.prototype.bindFilterButtons = function() {
    var self = this,
        $todoListBlock = this.$todoList.first();

    this.$filterBlock.on('click', '.all-filter', function() {
      $.each(self.$filterButtons, function(index, element) {
        element.classList.remove('active');
      });

      $todoListBlock.removeClass('progress');
      $todoListBlock.removeClass('done');
      $todoListBlock.addClass('all');
      $(this).addClass('active');
    });

    this.$filterBlock.on('click', '.progress-filter', function() {
      $.each(self.$filterButtons, function(index, element) {
        element.classList.remove('active');
      });

      $todoListBlock.removeClass('all');
      $todoListBlock.removeClass('done');
      $todoListBlock.addClass('progress');
      $(this).addClass('active');
    });

    this.$filterBlock.on('click', '.done-filter', function() {
      $.each(self.$filterButtons, function(index, element) {
        element.classList.remove('active');
      });

      $todoListBlock.removeClass('all');
      $todoListBlock.removeClass('progress');
      $todoListBlock.addClass('done');
      $(this).addClass('active');
    });
  };

  TodoList.prototype.postDataToServer = function(data) {
    $.ajax({
      url: '/todos',
      method: 'POST',
      data: { todos: data }
    }).done(function() {
      console.log('Data was saved to file!');
    });
  };

  TodoList.prototype.renderTasksList = function() {
    this.$todoList.empty();

    var newTodoList = document.createDocumentFragment(), i;
    for(i = 0; i < this.tasksArray.length; i++) {
      newTodoList.append(this.addItemToDOM(this.tasksArray[i]));
    }

    this.$todoList.append(newTodoList);
  };

  TodoList.prototype.addItemToDOM = function(task) {
    var taskBlock    = $('<div class="task"></div>');
    var doneIcon     = $('<div class="done-icon"></div>');
    var editButton   = $('<input class="edit-btn" type="button" value="Edit">');
    var removeButton = $('<input class="remove-btn" type="button" value="X">');
    var taskText     = $('<p></p>');

    taskText.text(task.name);

    if(task.done) {
      taskBlock.addClass('done-task');
      editButton.disabled = true;
    } else {
      taskBlock.addClass('progress-task');
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

    this.$todoList.on('click', 'div.done-icon', function() {
      var listItem  = $(this),
          listItemParent = listItem.parent(),
          doneItemIndex = self.findCurrentIndex(self.tasksArray, listItemParent.data('id'));

      if(!self.tasksArray[doneItemIndex].done) {
        self.tasksArray[doneItemIndex].done = true;

        listItemParent[0].className = 'task done-task';
        listItemParent.find('.edit-btn')[0].disabled = true;
      } else {
        self.tasksArray[doneItemIndex].done = false;

        listItemParent[0].className = 'task progress-task';
        listItemParent.find('.edit-btn').removeAttr('disabled');
      }

      self.postDataToServer(self.tasksArray);
    });
  };

  TodoList.prototype.removeItem = function(id)  {
    var itemToRemoveIndex = this.findCurrentIndex(this.tasksArray, id),
        self = this;

    if(this.tasksArray.length === 1) {
      this.tasksArray = [];
      this.postDataToServer(this.tasksArray);
      this.$todoList.children()
          .first()
          .remove();
    } else {
      this.tasksArray.splice(itemToRemoveIndex, 1);
      this.postDataToServer(this.tasksArray);
      self.$todoList.find('[data-id="' + id + '"]').remove();
    }
  };

  TodoList.prototype.updateItemHandler = function() {
    var inputValue = this.$editInput.val(),
        self = this;

    if(!inputValue) {
      this.$editErrorMessage.css('display', 'block');
    } else {
      this.$editErrorMessage.css('display', 'none');

      this.currentItem.name = inputValue;
      this.tasksArray[this.findCurrentIndex(this.tasksArray, this.currentItem.data('id'))].name = inputValue;

      this.postDataToServer(this.tasksArray);

      this.currentItem.children('p').text(inputValue);

      this.$editBlock.removeClass('active');
      this.$overlay  .removeClass('active');
    }
  };

  TodoList.prototype.closeEditBlockHandler = function() {
    this.$editBlock.removeClass('active');
    this.$overlay  .removeClass('active');

    this.$editErrorMessage.css('display', 'none');
  };

  TodoList.prototype.editItem = function(id) {
    var arrayIndex = this.findCurrentIndex(this.tasksArray, id);
    this.currentItem = this.$todoList.find('[data-id="' + id + '"]');

    this.$editInput.val(this.currentItem.find('p').text());

    this.$editBlock.addClass('active');
    this.$overlay  .addClass('active');
  };

  TodoList.prototype.addItemHandler = function() {
    var inputValue = this.$taskInput.val(),
        self = this;

    if(!inputValue) {
      this.$formErrorMessage.css('display', 'block');
    } else {
      this.$formErrorMessage.css('display', 'none');

      this.tasksArray.unshift(
        {
          name: inputValue,
          id: Math.random().toString(36).substr(2, 10),
          done: false
        }
      );

      this.postDataToServer(this.tasksArray);

      self.$todoList.prepend(self.addItemToDOM(self.tasksArray[0]));
      self.$taskInput.val('');
    }
  };
})(jQuery);
