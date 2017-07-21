//JQuery version
;(function($, undefined) {
  'use strict';

  $(function() {
    getDataFromStorage();
    setAddAction();
    renderTasksList();
    bindListEvents();
  });

  var $todoSection = $('.todo');
  var $addButton   = $('.add-btn');
  var $taskInput   = $('.task-input');
  var $todoList    = $('.todo-list');
  var overlay      = $('.overlay');
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
      addItemToDOM(tasksArray[i], i);
    }
  }

  function addItemToDOM(task, index) {
    var taskBlock    = createElement('div', 'task');
    var doneButton     = createElement('input', 'done-btn', 'button', 'Done');
    var editButton   = createElement('input', 'edit-btn', 'button', 'Edit');
    var removeButton = createElement('input', 'remove-btn', 'button', 'X');
    var taskText     = createElement('span');
    taskText.text(task);

    if(index !== undefined) {
      taskBlock.attr('data-index', index);
    } else {
      for(var i = 0; i < $todoList.children().length; i++) {
        $todoList
            .children()
              .eq(i)
              .attr('data-index', i);
      }
      taskBlock.attr('data-index', tasksArray.length - 1);
    }

    taskBlock.append(taskText, removeButton, editButton, doneButton);

    $todoList.append(taskBlock);
  }

  function bindListEvents() {
    $todoList.on('click', 'input.remove-btn', function() {
      removeItem(event.target.parentNode.getAttribute('data-index'));
    });

    $todoList.on('click', 'input.edit-btn', function(event) {
      editItem(event.target.parentNode.getAttribute('data-index'));
    });

    $todoList.on('click', 'input.done-btn', function(event) {
      var taskText = $(this).parent().children().first();
      taskText.css('text-decoration', taskText.css('text-decoration').match('line-through') ? 'none' : 'line-through');
    });
  }

  function updateIndexes() {
    for(var i = 0; i < $todoList.children().length; i++) {
      $todoList
          .children()
          .eq(i)
          .attr('data-index', i);
    }
  }

  function removeItem(index) {
    if(tasksArray.length === 1) {
      tasksArray = [];
      saveDataToStorage(tasksArray);
      $todoList.children().first().remove();
    } else {
      tasksArray.splice(index, 1);
      saveDataToStorage(tasksArray);
      $todoList
          .children()
            .eq(index)
            .remove();
      updateIndexes();
    }
  }

  function editItem(index) {
    var editBlock   = createElement('div', 'edit');
    var editInput   = createElement('input', 'edit-input', 'text', tasksArray[index]);
    var saveButton  = createElement('input', 'save-btn', 'button', 'Save');
    var closeButton = createElement('input', 'close-btn', 'button', 'X');

    bindCloseAction(closeButton);

    editBlock.append(editInput, saveButton, closeButton);

    $todoSection.append(editBlock);
    overlay.css('display', 'block');

    updateItem(saveButton, editInput, index, editBlock);
  }

  function bindCloseAction(closeButton) {
    closeButton.on('click', function() {
      $(this).parent().remove();
      overlay.css('display', 'none');
    });
  }

  function updateItem(saveButton, editInput, index, editBlock) {
    saveButton.on('click', function() {
      tasksArray[index] = editInput.val();
      saveDataToStorage(tasksArray);
      renderTasksList();
      editBlock.remove();
      overlay.css('display', 'none');
    });
  }

  function setAddAction() {
    $addButton.on('click', function() {
      tasksArray.push($taskInput.val());
      saveDataToStorage(tasksArray);
      addItemToDOM($taskInput.val());
      $taskInput.val('');
    });
  }
})(jQuery);
