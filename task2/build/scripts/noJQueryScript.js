//Javascript version
;(function() {
  'use strict';

  document.addEventListener('DOMContentLoaded', function() {
    init();
    bindEvents();
  });

  var todoSection = document.querySelector('.todo'),
      addButton   = document.querySelector('.add-btn'),
      taskInput   = document.querySelector('.task-input'),
      todoList    = document.querySelector('.todo-list'),
      editBlock   = document.querySelector('.edit'),
      editInput   = document.querySelector('.edit .edit-input'),
      saveButton  = document.querySelector('.edit .save-btn'),
      closeButton = document.querySelector('.edit .close-btn'),
      overlay     = document.querySelector('.overlay'),
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
    var element       = document.createElement(name);
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
    taskText.textContent = task.name;

    taskBlock.setAttribute('data-id', task.id);

    taskBlock.appendChild(taskText);
    taskBlock.appendChild(removeButton);
    taskBlock.appendChild(editButton);
    taskBlock.appendChild(doneButton);

    return taskBlock;
  }

  function bindListEvents() {
    todoList.addEventListener('click', function(event) {
      if(event.target &&
          event.target.classList.value.indexOf('remove-btn') !== -1) {
        removeItem(event.target.parentNode.getAttribute('data-id'));
        return;
      }

      if(event.target &&
          event.target.classList.value.indexOf('edit-btn') !== -1) {
        editItem(event.target.parentNode.getAttribute('data-id'));
        return;
      }

      if(event.target &&
          event.target.classList.value.indexOf('done-btn') !== -1) {
        event.target.parentNode.firstChild.style.textDecoration = event.target.parentNode.firstChild.style.textDecoration === 'line-through' ? 'none' : 'line-through';
        return;
      }
    });
  }

  function removeItem(id) {
    var index = tasksArray.findIndex(function(element) {
      return element.id === parseInt(id);
    });

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

  function bindUpdateItem() {
    saveButton.addEventListener('click', function() {
      var inputValue = editInput.value;

      if(!inputValue) {
        alertError("Enter new task name", editInput);
      } else {
        tasksArray[currentIndex].name = inputValue;
        saveDataToStorage(tasksArray);
        todoList.childNodes[currentIndex].firstChild.textContent = inputValue;

        editBlock.classList.remove('active');
        overlay  .classList.remove('active');
      }
    });
  }

  function bindCloseEditBlock() {
    closeButton.addEventListener('click', function() {
      editBlock.classList.remove('active');
      overlay  .classList.remove('active');
    });
  }

  function editItem(id) {
    currentIndex = tasksArray.findIndex(function(element) {
      return element.id === parseInt(id);
    });

    editInput.value = tasksArray[currentIndex].name;

    editBlock.classList.add('active');
    overlay  .classList.add('active');
  }

  function alertError(message, toFocus) {
    alert(message);
    toFocus.focus();
  }

  function bindAddAction() {
    addButton.addEventListener('click', function() {
      var inputValue = taskInput.value;

      if(!inputValue) {
        alertError("Enter task name", taskInput);
      } else {
        tasksArray.unshift(
            {
              name: inputValue,
              id: Math.floor(Math.random() * 1000000)
            }
        );
        saveDataToStorage(tasksArray);
        todoList.insertBefore(addItemToDOM(tasksArray[0]), todoList.firstChild);
        taskInput.value = '';
      }
    });
  }
})();
