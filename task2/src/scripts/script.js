//JQuery version
'use strict';

(function($, undefined) {
  var $todoSection = $('.todo');
  var $addButton   = $('.add-btn');
  var $taskInput   = $('.task-input');
  var $todoList    = $('.todo-list');
  var tasksArray;

  function saveDataToStorage(data) {
    localStorage.setItem('tasksArray', JSON.stringify(data));
  }

  function readDataFromStorage() {
    tasksArray = JSON.parse(localStorage.getItem('tasksArray')) || [];
  }

  function renderTasksList() {
    $todoList.empty();

    for(var i = 0; i < tasksArray.length; i++) {
      var taskBlock = $('<div />', {
        class: 'task'
      });
      var editButton = $('<input />', {
        type:  'button',
        value: 'Edit',
        class: 'edit-btn'
      });
      var removeButton = $('<input />', {
        type:  'button',
        value: 'X',
        class: 'remove-btn'
      });
      var taskText = $('<span />', {
        text: tasksArray[i]
      });

      setEditAction (editButton, i);
      removeItem    (removeButton, i);

      taskBlock.append(taskText)
          .append(removeButton)
          .append(editButton);

      $todoList.append(taskBlock);
    }
  }

  function addItem() {
    tasksArray.push($taskInput.val());
    saveDataToStorage(tasksArray);
    $taskInput.val('');
    renderTasksList();
  }

  function removeItem(removeButton, index) {
    removeButton.on('click', function() {
      tasksArray.splice(index, 1);
      saveDataToStorage(tasksArray);
      renderTasksList();
    });
  }

  function setEditAction(editButton, index) {
    editButton.on('click', function() {
      var editBlock = $('<div />', {
        class: 'edit'
      });
      var editInput = $('<input />', {
        type:  'text',
        value: tasksArray[index],
        class: 'edit-input'
      });
      var saveButton = $('<input />', {
        type:  'button',
        value: 'Save',
        class: 'save-btn'
      });

      editBlock.append(editInput)
          .append(saveButton);

      $todoSection.append(editBlock);

      saveItem(saveButton, editInput, index, editBlock);
    });
  }

  function saveItem(saveButton, editInput, index, editBlock) {
    saveButton.on('click', function() {
      tasksArray[index] = editInput.val();
      saveDataToStorage(tasksArray);
      renderTasksList();
      editBlock.remove();
    })
  }

  $(function() {
    readDataFromStorage();
    $addButton.on('click', addItem);
    renderTasksList();
  });
})(jQuery);
