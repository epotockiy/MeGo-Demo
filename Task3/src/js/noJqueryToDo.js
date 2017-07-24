"use strict";

function todoList() {
  var toDoContainer = document.getElementById('to-do-list');
  var taskLists = {};
  var tasksStorage = storage('tasksList');

  function init() {
    var initialListsItems = tasksStorage.get();
    taskLists = renderTaskLists(initialListsItems);
    watchAddTaskForm();

    return taskLists;
  }

  function watchAddTaskForm() {
   var addTaskInput = document.getElementById('new-task'),
   addTaskSubmitBtn = document.getElementById('add');

   addTaskSubmitBtn.addEventListener('click', function () {
     var item = {
				id: Math.random().toString(36).substr(2, 9), // генерация уникального id
        value: addTaskInput.value,
        completed: false
      };

      addItemToList(item);
      tasksStorage.setItem(item);
    });

   function addItemToList(item) {
    taskLists.incompleted.appendChild(
      renderListItem(item)
      )
  }
}

function renderTaskLists(initialListsItems) {
  var completedList = toDoContainer.querySelector(".completed-tasks"),
  incompletedList = toDoContainer.querySelector(".incomplete-tasks"),
  completedListContainer = document.createDocumentFragment(),
  incompletedListContainer = document.createDocumentFragment();
  
  initialListsItems.forEach(function (item) {
   if (item.completed) {
    return completedListContainer.appendChild(
      renderListItem(item)
      );
  }

  return incompletedListContainer.appendChild(
    renderListItem(item)
    );
  });

  completedList.appendChild(completedListContainer);
  incompletedList.appendChild(incompletedListContainer);
  
  return {
   incompleted: incompletedList,
   completed: completedList
  }
}

function renderListItem(item) {

  function createElements(element, attrs) {
    var element = document.createElement(element);
    return setAttributes(element, attrs);
  }

  function setAttributes(element, attrs) {
    Object.keys(attrs).forEach(function(key){
      element.setAttribute(key, attrs[key]);
    });

    return element;
  }

  if(item.completed) {
    var taskItem = createElements('li', 
    {
      'data-id': item.id
    }),
    taskText = createElements('label', {

    }),
    taskCheckbox = createElements('input', 
    {
      type: 'checkbox',
      value: item.id,
      checked: ''

    }), 
    taskInput = createElements('input', 
    {
      type: 'text',
      value: item.value
    }),
    taskEditBtn = createElements('button', 
    {
      class: 'edit'
    }),
    taskDeleteBtn = createElements('button', 
    {
      class: 'delete'
    });
  } 

  else {
    var taskItem = createElements('li', 
    {
      'data-id': item.id
    }),
    taskText = createElements('label', {

    }),
    taskCheckbox = createElements('input', 
    {
      type: 'checkbox',
      value: item.id            
    }), 
    taskInput = createElements('input', 
    {
      type: 'text',
      value: item.value
    }),
    taskEditBtn = createElements('button', 
    {
      class: 'edit'
    }),
    taskDeleteBtn = createElements('button', 
    {
      class: 'delete'
    });
  }

  taskText.innerText = item.value;
  taskEditBtn.innerText = "Edit";
  taskDeleteBtn.innerText = "Delete";

  
  /*if (taskLists.incompleted != undefined || taskLists.completed != undefined) {
    console.log(taskLists.incompleted)
    taskLists.incompleted.addEventListener('click', function(event){
      if (event.target == taskEditBtn) {
        editItem();
      }

      if (event.target == taskDeleteBtn) {
        deleteItem();
      }

      if (event.target == taskCheckbox) {
        moveItem();
      }
    });
  }*/
  /*taskCheckbox.addEventListener('change', moveItem);
  taskEditBtn.addEventListener('click', editItem);
  taskDeleteBtn.addEventListener('click', deleteItem);*/

  function deleteItem() {
    var completed = taskCheckbox.checked,
    id = taskCheckbox.value;

    if (completed) {
      taskLists.completed.removeChild(taskLists.completed.querySelector("li[data-id=" +'"' + id + '"' + "]"));
    } else {
      taskLists.incompleted.removeChild(taskLists.incompleted.querySelector("li[data-id=" +'"' + id + '"' + "]"));
    }

    tasksStorage.removeItem(id);
  }

  function editItem() {
    var id = taskItem.getAttribute('data-id'),
    editModeClass = 'editMode';

    if (taskItem.classList.contains(editModeClass)) {
      var newValue = taskInput.value;
      taskText.textContent = newValue;
      tasksStorage.setItemValue(id, 'value', newValue);
      taskEditBtn.innerText = "Edit";
    } else {
     taskEditBtn.innerText = "Save";
   }

   taskItem.classList.toggle(editModeClass);
 }

   function moveItem() {
    var id = taskCheckbox.value,
    completed = taskCheckbox.checked;
    if (completed) {
      taskLists.completed.appendChild(taskLists.incompleted.querySelector("li[data-id=" +'"' + id + '"' + "]"));
    } else {
      taskLists.incompleted.appendChild(taskLists.completed.querySelector("li[data-id=" +'"' + id + '"' + "]"));
    }
    tasksStorage.setItemValue(id, 'completed', completed);
  }

  return appendChildrenArray(taskItem, [
    taskCheckbox,
    taskText,
    taskInput,
    taskEditBtn,
    taskDeleteBtn
    ])
}

  return {
    init: init
  }
}

function storage(path){
  function setItemValue(id, field, value) {
    var currentItems = readDataFromStorage();

    currentItems.forEach(function (item) {
      if (item.id === id) {
        item[field] = value
      }
    });

    saveArray(currentItems);
  }

  function saveArray(array) {
    localStorage.setItem(path, JSON.stringify(array));
  }

  function saveItem(item) {
    var currentItems = readDataFromStorage();
    currentItems.push(item);
    saveArray(currentItems)
  }

  function removeItem(id) {
    var currentItems = readDataFromStorage();
    saveArray(
      currentItems.filter(function (item) {
        return item.id !== id;
      })
      );
  }

  function readDataFromStorage() {
    return JSON.parse(localStorage.getItem(path)) || [];
  }

  return {
    setItem: saveItem,
    setItemValue: setItemValue,
    setArray: saveArray,
    removeItem: removeItem,
    get: readDataFromStorage
  }
}

function appendChildrenArray(parent, children) {
  children.forEach(function (item) {
    parent.appendChild(item);
  });

  return parent;
}

window.onload = function() {
  var taskLists = todoList().init();
};