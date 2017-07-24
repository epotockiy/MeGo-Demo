//JQuery version
;(function($, undefined) {
  'use strict';

  $(function() {
    getDataFromStorage();
    setAddAction();
    renderTasksList();
    bindListEvents();
    bindCloseEditBlock();
  });

  var $todoSection = $('.todo');
  var $addButton   = $('.add-btn');
  var $taskInput   = $('.task-input');
  var $todoList    = $('.todo-list');
  var $editBlock   = $('.edit');
  var $editInput   = $('.edit .edit-input');
  var $saveButton  = $('.edit .save-btn');
  var $closeButton = $('.edit .close-btn');
  var $overlay     = $('.overlay');
  var tasksArray;

  function saveDataToStorage(data) {
    localStorage.setItem('tasksArray', JSON.stringify(data));
  }

  function getDataFromStorage() {
    tasksArray = JSON.parse(localStorage.getItem('tasksArray')) || [];
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

    for(var i = 0; i < tasksArray.length; i++) {
      addItemToDOM(tasksArray[i]);
    }
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

    $todoList.append(taskBlock);
  }

  function bindListEvents() {
    $todoList.on('click', 'input.remove-btn', function(event) {
      removeItem(event.target.parentNode.getAttribute('data-id'));
    });

    $todoList.on('click', 'input.edit-btn', function(event) {
      editItem(event.target.parentNode.getAttribute('data-id'));
    });

    $todoList.on('click', 'input.done-btn', function() {
      var taskText = $(this).parent().children().first();
      taskText.css('text-decoration', taskText.css('text-decoration').match('line-through') ? 'none' : 'line-through');
    });
  }

  function bindCloseEditBlock() {
    $closeButton.on('click', function() {
      $editBlock.removeClass('active');
      $overlay  .removeClass('active');
    });
  }

  function findIndex(id) {
    for(var i = 0; i < tasksArray.length; ++i) {
      if(tasksArray[i].id === parseInt(id)) {
        return i;
      }
    }
  }

  function removeItem(id) {
    var index = findIndex(id);

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
    var index = findIndex(id);

    $editInput.val(tasksArray[index].name);
    $editBlock.addClass('active');
    $overlay  .addClass('active');

    updateItem(index);
  }

  function updateItem(index) {
    $saveButton.unbind();
    $saveButton.on('click', function() {
      var inputValue = $editInput.val()
          .replace(/<(\w+)>/gi, '')
          .replace(/<(\/\w+)>/gi, '');

      if(!inputValue) {
        alertError("Enter new task name", $editInput);
      } else {
        tasksArray[index].name = inputValue;
        saveDataToStorage(tasksArray);
        $todoList.find('.task').eq(index).children('span').text(inputValue);

        $editBlock.removeClass('active');
        $overlay  .removeClass('active');
      }
    });
  }

  function alertError(message, toFocus) {
    alert(message);
    toFocus.focus();
  }

  function setAddAction() {
    $addButton.on('click', function() {
      var inputValue = $taskInput.val()
          .replace(/<(\w+)>/gi, '')
          .replace(/<(\/\w+)>/gi, '');
      if(!inputValue) {
        alertError("Enter task name", $taskInput);
      } else {
        tasksArray.push(
          {
            name: inputValue,
            id: Math.floor(Math.random() * 1000000)
          }
        );
        saveDataToStorage(tasksArray);
        addItemToDOM(tasksArray[tasksArray.length - 1]);
        $taskInput.val('');
      }
    });
  }
})(jQuery);
