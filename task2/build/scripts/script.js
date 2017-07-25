//JQuery version
;(function($, undefined) {
  'use strict';

  $(function() {
    init();
    bindEvents();
  });

  var $todoSection = $('.todo'),
      $addButton   = $('.add-btn'),
      $taskInput   = $('.task-input'),
      $todoList    = $('.todo-list'),
      $editBlock   = $('.edit'),
      $editInput   = $('.edit .edit-input'),
      $saveButton  = $('.edit .save-btn'),
      $closeButton = $('.edit .close-btn'),
      $overlay     = $('.overlay'),
      tasksArray,
      currentIndex;

  function init() {
    getDataFromStorage();
    renderTasksList();
  }

  function bindEvents() {
    bindAddAction();
    bindListEvents();
    bindUpdateItem();
    bindCloseEditBlock();
  }

  function saveDataToStorage(data) {
    if(typeof localStorage !== 'undefined') {
      localStorage.setItem('tasksArray', JSON.stringify(data));
    }
  }

  function getDataFromStorage() {
    if(typeof localStorage !== 'undefined') {
      tasksArray = JSON.parse(localStorage.getItem('tasksArray')) || [];
    } else {
      tasksArray = [];
    }
  }

  function createElement(name, className, type, value) {
    var element = $(
      '<' + name +
        (className ? ' class="' + className + '"' : "") +
        (type      ? ' type="'  + type      + '"' : "") +
        (value     ? ' value="' + value     + '"' : "") +
      '>');

    return element;
  }

  function renderTasksList() {
    $todoList.empty();
    var newTodoList = document.createDocumentFragment();

    for(var i = 0; i < tasksArray.length; i++) {
      newTodoList.append(addItemToDOM(tasksArray[i]));
    }

    $todoList.append(newTodoList);
  }

  function addItemToDOM(task) {
    var taskBlock    = createElement('div', 'task');
    var doneButton   = createElement('input', 'done-btn', 'button', 'Done');
    var editButton   = createElement('input', 'edit-btn', 'button', 'Edit');
    var removeButton = createElement('input', 'remove-btn', 'button', 'X');
    var taskText     = createElement('span');
    taskText.text(task.name);

    taskBlock.attr('data-id', task.id);

    taskBlock.append(taskText, removeButton, editButton, doneButton);

    return taskBlock[0];
  }

  function bindListEvents() {
    $todoList.on('click', 'input.remove-btn', function() {
      removeItem($(this).parent().data('id'));
      return;
    });

    $todoList.on('click', 'input.edit-btn', function() {
      editItem($(this).parent().data('id'));
      return;
    });

    $todoList.on('click', 'input.done-btn', function() {
      var taskText = $(this).parent().children().first();
      taskText.css('text-decoration', taskText.css('text-decoration').match('line-through') ? 'none' : 'line-through');
      return;
    });
  }

  function bindUpdateItem() {
    $saveButton.on('click', function() {
      if(!$editInput.val()) {
        alertError("Enter new task name", $editInput);
      } else {
        tasksArray[currentIndex].name = $editInput.val();
        saveDataToStorage(tasksArray);
        $todoList.find('.task').eq(currentIndex).children('span').text($editInput.val());

        $editBlock.removeClass('active');
        $overlay  .removeClass('active');
      }
    });
  }

  function bindCloseEditBlock() {
    $closeButton.on('click', function() {
      $editBlock.removeClass('active');
      $overlay  .removeClass('active');
    });
  }

  function removeItem(id) {
    var index = tasksArray.findIndex(function(element) {
      return element.id === parseInt(id);
    });

    if(tasksArray.length === 1) {
      tasksArray = [];
      saveDataToStorage(tasksArray);
      $todoList.children()
          .first()
          .remove();
    } else {
      tasksArray.splice(index, 1);
      saveDataToStorage(tasksArray);
      $todoList.children()
            .eq(index)
            .remove();
    }
  }

  function editItem(id) {
    currentIndex = tasksArray.findIndex(function(element) {
      return element.id === parseInt(id);
    });

    $editInput.val(tasksArray[currentIndex].name);
    $editBlock.addClass('active');
    $overlay  .addClass('active');
  }

  function alertError(message, toFocus) {
    alert(message);
    toFocus.focus();
  }

  function bindAddAction() {
    $addButton.on('click', function() {
      if(!$taskInput.val()) {
        alertError("Enter task name", $taskInput);
      } else {
        tasksArray.unshift(
          {
            name: $taskInput.val(),
            id: Math.floor(Math.random() * 1000000)
          }
        );
        saveDataToStorage(tasksArray);
        $todoList.prepend(addItemToDOM(tasksArray[0]));
        $taskInput.val('');
      }
    });
  }
})(jQuery);
