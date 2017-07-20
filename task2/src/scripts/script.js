'use strict';

(function($, undefined) {
  var $todoSection   = $('.todo');
  var $addBtn        = $('.add-btn');
  var $taskInput     = $('.task-input');
  var $todoList      = $('.todo-list');
  var tasksArray;

  function saveDataToStorage(data) {
    localStorage.setItem('tasksArray', JSON.stringify(data));
  }

  function readDataFromStorage() {
    tasksArray = JSON.parse(localStorage.getItem('tasksArray'));
    console.log(tasksArray);
  }

  function renderTasksList() {
    $todoList.empty();

    for(var i = 0; i < tasksArray.length; i++) {
      var taskBlock = $('<div />', {
        class: 'task'
      });
      var editBtn = $('<input />', {
        type: 'button',
        value: 'Edit',
        class: 'edit-btn'
      });
      var removeBtn = $('<input />', {
        type: 'button',
        value: 'X',
        class: 'remove-btn'
      });
      var taskText = $('<span />', {
        text: tasksArray[i]
      });

      setRemoveAction(removeBtn, i);
      setEditAction(editBtn, i);

      taskBlock.append(taskText)
          .append(removeBtn)
          .append(editBtn);
      $todoList.append(taskBlock);
    }
  }

  function onAddBtnClick() {
    tasksArray.push($taskInput.val());
    saveDataToStorage(tasksArray);
    $taskInput.val('');
    renderTasksList();
  }

  function setRemoveAction(removeButton, index) {
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
        type: 'text',
        value: tasksArray[index],
        class: 'edit-input'
      });
      var saveButton = $('<input />', {
        type: 'button',
        value: 'Save',
        class: 'save-btn'
      });
      editBlock.append(editInput)
          .append(saveButton);

      $todoSection.append(editBlock);

      setSaveAction(saveButton, editInput, index, editBlock);
    });
  }

  function setSaveAction(saveButton, editInput, index, editBlock) {
    saveButton.on('click', function() {
      tasksArray[index] = editInput.val();
      saveDataToStorage(tasksArray);
      renderTasksList();
      editBlock.remove();
    })
  }

  $(function() {
    readDataFromStorage();
    $addBtn.on('click', onAddBtnClick);
    renderTasksList();
});
})(jQuery);
