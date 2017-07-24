//Javascript version
;(function() {
  'use strict';

  window.onload = function() {
    getDataFromStorage();
    setAddAction();
    renderTasksList();
    bindListEvents();
    bindCloseEditBlock();
  };

  var todoSection = document.querySelector('.todo');
  var addButton   = document.querySelector('.add-btn');
  var taskInput   = document.querySelector('.task-input');
  var todoList    = document.querySelector('.todo-list');
  var editBlock   = document.querySelector('.edit');
  var editInput   = document.querySelector('.edit .edit-input');
  var saveButton  = document.querySelector('.edit .save-btn');
  var closeButton = document.querySelector('.edit .close-btn');
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
    element.className = className ? className : '';
    element.type      = type      ? type      : '';
    element.value     = value     ? value     : '';

    return element;
  }

  function renderTasksList() {
    todoList.innerHTML = '';
    var newTodoList = document.createDocumentFragment();

    for(var i = 0; i < tasksArray.length; i++) {
      newTodoList.appendChild(addItemToDOM(tasksArray[i]));
    }

    todoList.appendChild(newTodoList);
  }

  function addItemToDOM(task) {
    var taskBlock      = createElement('div', 'task');
    var doneButton     = createElement('input', 'done-btn', 'button', 'Done');
    var editButton     = createElement('input', 'edit-btn', 'button', 'Edit');
    var removeButton   = createElement('input', 'remove-btn', 'button', 'X');
    var taskText       = createElement('span');
    taskText.innerHTML = task.name;

    taskBlock.setAttribute('data-id', task.id);

    taskBlock.appendChild(taskText);
    taskBlock.appendChild(removeButton);
    taskBlock.appendChild(editButton);
    taskBlock.appendChild(doneButton);

    return taskBlock;
    // todoList.appendChild(taskBlock);
  }

  function bindListEvents() {
    todoList.addEventListener('click', function(event) {
      if(event.target && event.target.matches('input.remove-btn')) {
        removeItem(event.target.parentNode.getAttribute('data-id'));
      }

      if(event.target && event.target.matches('input.edit-btn')) {
        updateItem(event.target.parentNode.getAttribute('data-id'));
      }

      if(event.target && event.target.matches('input.done-btn')) {
        event.target.parentNode.firstChild.style.textDecoration = event.target.parentNode.firstChild.style.textDecoration === 'line-through' ? 'none' : 'line-through';
      }
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
      todoList.removeChild(todoList.firstChild);
    } else {
      tasksArray.splice(index, 1);
      saveDataToStorage(tasksArray);

      todoList.childNodes[index].parentNode.removeChild(todoList.childNodes[index]);
    }
  }

  function bindCloseEditBlock() {
    closeButton.addEventListener('click', function() {
      editBlock.classList.remove('active');
      overlay  .classList.remove('active');
    });
  }

  function updateItem(id) {
    var index = findIndex(id);

    editInput.value = tasksArray[index].name;
    editBlock.classList.add('active');
    overlay  .classList.add('active');

    saveButton.addEventListener('click', function() {
      var inputValue = editInput.value
          .replace(/<(\w+)>/gi, '')
          .replace(/<(\/\w+)>/gi, '');

      if(!inputValue) {
        alertError("Enter new task name", editInput);
      } else {
        tasksArray[index].name = inputValue;
        saveDataToStorage(tasksArray);
        todoList.childNodes[index].firstChild.innerHTML = inputValue;

        editBlock.classList.remove('active');
        overlay  .classList.remove('active');
      }
    });
  }

  function alertError(message, toFocus) {
    alert(message);
    toFocus.focus();
  }

  function setAddAction() {
    addButton.addEventListener('click', function() {
      var inputValue = taskInput.value
          .replace(/<(\w+)>/gi, '')
          .replace(/<(\/\w+)>/gi, '');

      if(!inputValue) {
        alertError("Enter task name", taskInput);
      } else {
        tasksArray.push(
            {
              name: inputValue,
              id: Math.floor(Math.random() * 1000000)
            }
        );
        saveDataToStorage(tasksArray);
        todoList.appendChild(addItemToDOM(tasksArray[tasksArray.length - 1]));
        taskInput.value = '';
      }
    });
  }
})();
