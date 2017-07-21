//Javascript version
;(function() {
  'use strict';

  window.onload = function() {
    getDataFromStorage();
    setAddAction();
    renderTasksList();
    bindListEvents();
  };

  var todoSection = document.querySelector('.todo');
  var addButton   = document.querySelector('.add-btn');
  var taskInput   = document.querySelector('.task-input');
  var todoList    = document.querySelector('.todo-list');
  var overlay     = document.querySelector('.overlay');
  var tasksArray;

  function saveDataToStorage(data) {
    localStorage.setItem('tasksArray', JSON.stringify(data));
  }

  function getDataFromStorage() {
    tasksArray = JSON.parse(localStorage.getItem('tasksArray')) || [];
  }

  function createElement(name, className, type, value) {
    var element = document.createElement(name);

    if(className !== undefined) {
      element.setAttribute('class', className);
    }
    if(type !== undefined) {
      element.setAttribute('type', type);
    }
    if(value !== undefined) {
      element.setAttribute('value', value);
    }

    return element;
  }

  function renderTasksList() {
    todoList.innerHTML = '';

    for(var i = 0; i < tasksArray.length; i++) {
      addItemToDOM(tasksArray[i], i);
    }
  }

  function addItemToDOM(task, index) {
    var taskBlock      = createElement('div', 'task');
    var doneButton     = createElement('input', 'done-btn', 'button', 'Done');
    var editButton     = createElement('input', 'edit-btn', 'button', 'Edit');
    var removeButton   = createElement('input', 'remove-btn', 'button', 'X');
    var taskText       = createElement('span');
    taskText.innerHTML = task;

    if(index !== undefined) {
      taskBlock.setAttribute('data-index', index);
    } else {
      for(var i = 0; i < todoList.childNodes.length; i++) {
        todoList.childNodes[i].setAttribute('data-index', i);
      }
      taskBlock.setAttribute('data-index', tasksArray.length - 1);
    }

    taskBlock.appendChild(taskText);
    taskBlock.appendChild(removeButton);
    taskBlock.appendChild(editButton);
    taskBlock.appendChild(doneButton);

    todoList.appendChild(taskBlock);
  }

  function bindListEvents() {
    todoList.addEventListener('click', function(event) {
      if(event.target && event.target.matches('input.remove-btn')) {
        removeItem(event.target.parentNode.getAttribute('data-index'));
      }

      if(event.target && event.target.matches('input.edit-btn')) {
        editItem(event.target.parentNode.getAttribute('data-index'));
      }

      if(event.target && event.target.matches('input.done-btn')) {
        event.target.parentNode.firstChild.style.textDecoration = event.target.parentNode.firstChild.style.textDecoration === 'line-through' ? 'none' : 'line-through';
      }
    });
  }

  function removeItem(index) {
    if(tasksArray.length === 1) {
      tasksArray = [];
      saveDataToStorage(tasksArray);
      todoList.removeChild(todoList.firstChild);
    } else {
      tasksArray.splice(index, 1);
      saveDataToStorage(tasksArray);

      todoList.childNodes[index].parentNode.removeChild(todoList.childNodes[index]);
      for(var i = 0; i < todoList.childNodes.length; i++) {
        todoList.childNodes[i].setAttribute('data-index', i);
      }
    }
  }

  function editItem(index) {
    var editBlock   = createElement('div', 'edit');
    var editInput   = createElement('input', 'edit-input', 'text', tasksArray[index]);
    var saveButton  = createElement('input', 'save-btn', 'button', 'Save');
    var closeButton = createElement('input', 'close-btn', 'button', 'X');

    editBlock.appendChild(editInput);
    editBlock.appendChild(saveButton);
    editBlock.appendChild(closeButton);

    todoSection.appendChild(editBlock);
    overlay.style.display = 'block';

    bindCloseAction(closeButton, editBlock);
    updateItem(saveButton, editInput, index, editBlock);
  }

  function bindCloseAction(closeButton, editBlock) {
    closeButton.addEventListener('click', function() {
      todoSection.removeChild(todoSection.lastChild);
      overlay.style.display = 'none';
    });
  }

  function updateItem(saveButton, editInput, index, editBlock) {
    saveButton.addEventListener('click', function() {
      tasksArray[index] = editInput.value;
      saveDataToStorage(tasksArray);
      renderTasksList();
      editBlock.parentNode.removeChild(editBlock);
      overlay.style.display = 'none';
    });
  }

  function setAddAction() {
    addButton.addEventListener('click', function() {
      tasksArray.push(taskInput.value);
      saveDataToStorage(tasksArray);
      addItemToDOM(taskInput.value);
      taskInput.value = '';
    });
  }
})();
