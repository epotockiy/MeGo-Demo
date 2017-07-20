;(function() {
  'use strict';

  var todoSection = document.querySelector('.todo');
  var addButton   = document.querySelector('.add-btn');
  var taskInput   = document.querySelector('.task-input');
  var todoList    = document.querySelector('.todo-list');
  var tasksArray;

  function saveDataToStorage(data) {
    localStorage.setItem('tasksArray', JSON.stringify(data));
  }

  function getDataFromStorage() {
    tasksArray = JSON.parse(localStorage.getItem('tasksArray'));
  }

  function renderTasksList() {
    todoList.innerHTML = '';

    for(var i = 0; i < tasksArray.length; i++) {
      var taskBlock = document.createElement('div');
      taskBlock.setAttribute('class', 'task');

      var editButton = document.createElement('input');
      editButton.setAttribute('class', 'edit-btn');
      editButton.setAttribute('type', 'button');
      editButton.setAttribute('value', 'Edit');

      var removeButton = document.createElement('input');
      removeButton.setAttribute('class', 'remove-btn');
      removeButton.setAttribute('type', 'button');
      removeButton.setAttribute('value', 'X');

      var taskText = document.createElement('span');
      taskText.innerHTML = tasksArray[i];

      setEditAction (editButton, i);
      removeItem    (removeButton, i);

      taskBlock.appendChild(taskText);
      taskBlock.appendChild(removeButton);
      taskBlock.appendChild(editButton);

      todoList.appendChild(taskBlock);
    }
  }

  function addItem() {
    tasksArray.push(taskInput.value);
    saveDataToStorage(tasksArray);
    taskInput.value = '';
    renderTasksList();
  }

  function removeItem(removeButton, index) {
    removeButton.addEventListener('click', function() {
      tasksArray.splice(index, 1);
      saveDataToStorage(tasksArray);
      renderTasksList();
    });
  }

  function setEditAction(editButton, index) {
    editButton.addEventListener('click', function() {
      var editBlock = document.createElement('div');
      editBlock.setAttribute('class', 'edit');

      var editInput = document.createElement('input');
      editInput.setAttribute('class', 'edit-input');
      editInput.setAttribute('type', 'text');
      editInput.setAttribute('value', tasksArray[index]);

      var saveButton = document.createElement('input');
      saveButton.setAttribute('class', 'save-btn');
      saveButton.setAttribute('type', 'button');
      saveButton.setAttribute('value', 'Save');

      editBlock.appendChild(editInput);
      editBlock.append(saveButton);

      todoSection.appendChild(editBlock);

      saveItem(saveButton, editInput, index, editBlock);
    });
  }

  function saveItem(saveButton, editInput, index, editBlock) {
    saveButton.addEventListener('click', function() {
      tasksArray[index] = editInput.value;
      saveDataToStorage(tasksArray);
      renderTasksList();
      editBlock.parentNode.removeChild(editBlock);
    });
  }

  window.onload = function() {
    getDataFromStorage();
    addButton.addEventListener('click', addItem);
    renderTasksList();
  }
})();
