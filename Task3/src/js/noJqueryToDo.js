"use strict";

function todoList(list, i) {
  var toDoContainer = list;
  var taskLists = {};
  var tasksStorage = storage('tasksList' + i);

  function init() {
    tasksStorage.check(i);
    var initialListsItems = tasksStorage.get();
    taskLists = renderTaskLists(initialListsItems);
    watchTaskChanges();

    return taskLists;
  }

  function watchTaskChanges() {

    function addListener(){
      var addTaskInput = toDoContainer.querySelector('.new-task'),
      addTaskSubmitBtn = toDoContainer.querySelector('.add');

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
        var renderListObj = renderListItem(item);

        taskLists.incompleted.insertBefore(
          renderListObj.taskItem,
          taskLists.incompleted.firstChild
        );
        taskLists.buttons.push(renderListObj);
      }
    }

    function changesListenter(list) {
      list.addEventListener('click', function(event){
        taskLists.buttons.forEach(function(item){
          if (event.target == item.checkbox) {
            moveItem(item);
          }

          if (event.target == item.edit) {
            editItem(item);
          }

          if (event.target == item.delete) {
            deleteItem(item);
          }
        });  
      })

      function deleteItem(item) {
        var completed = item.checkbox.checked,
        id = item.checkbox.value;

        if (completed) {
          taskLists.completed.removeChild(taskLists.completed.querySelector("li[data-id=" +'"' + id + '"' + "]"));
        } else {
          taskLists.incompleted.removeChild(taskLists.incompleted.querySelector("li[data-id=" +'"' + id + '"' + "]"));
        }

        taskLists.buttons = taskLists.buttons.filter(function(elem){
          return elem.checkbox.value != id;
        });

        tasksStorage.removeItem(id);
      }

      function editItem(item) {
        var id = item.taskItem.getAttribute('data-id'),
        editModeClass = 'editMode';

        if (item.taskItem.classList.contains(editModeClass)) {
          var newValue = item.input.value;
          
          item.text.textContent = newValue;
          tasksStorage.setItemValue(id, 'value', newValue);
          item.edit.innerText = "Edit";
        } else {
         item.edit.innerText = "Save";
       }

       item.taskItem.classList.toggle(editModeClass);
      }

      function moveItem(item) {
        var id = item.checkbox.value,
        completed = item.checkbox.checked;
        if (completed) {
          taskLists.completed.insertBefore(taskLists.incompleted.querySelector("li[data-id=" +'"' + id + '"' + "]"), taskLists.completed.firstChild);
        } else {
          taskLists.incompleted.appendChild(taskLists.completed.querySelector("li[data-id=" +'"' + id + '"' + "]"));
        }
        tasksStorage.setItemValue(id, 'completed', completed);
      }
    }

    addListener();
    changesListenter(taskLists.incompleted);
    changesListenter(taskLists.completed);  
  }

function renderTaskLists(initialListsItems) {
  var completedList = toDoContainer.querySelector(".completed-tasks"),
  incompletedList = toDoContainer.querySelector(".incomplete-tasks"),
  completedListContainer = document.createDocumentFragment(),
  incompletedListContainer = document.createDocumentFragment(),
  updateButtons = [];
  
  initialListsItems.forEach(function (item) {
    var renderListObj = renderListItem(item);

    if (item.completed) {
      return appendElements(completedListContainer, updateButtons, renderListObj)
    }

    return appendElements(incompletedListContainer, updateButtons, renderListObj)
  });

  completedList.appendChild(completedListContainer);
  incompletedList.appendChild(incompletedListContainer);
  
  function appendElements(container, elements, item) {
    container.appendChild(
      item.taskItem
    );

    elements.push(item);
  };

  return {
   incompleted: incompletedList,
   completed: completedList,
   buttons: updateButtons
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

  var taskItem = createElements('li', 
  {
    'data-id': item.id
  }),
  taskText = createElements('label', {

  });
  if(item.completed) {
    var taskCheckbox = createElements('input', 
    {
      type: 'checkbox',
      value: item.id,
      checked: ''

    });
  } else { 
    var taskCheckbox = createElements('input', 
    {
      type: 'checkbox',
      value: item.id            
    });
  }
  var taskInput = createElements('input', 
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

  taskText.innerText = item.value;
  taskEditBtn.innerText = "Edit";
  taskDeleteBtn.innerText = "Delete";

  return {
    taskItem: appendChildrenArray(taskItem, [taskCheckbox, taskText, taskInput, taskEditBtn, taskDeleteBtn]),
    checkbox: taskCheckbox,
    text: taskText,
    input: taskInput,
    edit: taskEditBtn,
    delete: taskDeleteBtn
  }
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
    currentItems.unshift(item);
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

  function storageCheck(i) {
    for (var j = 0, count = 0; j < localStorage.length; j++) {
      if (localStorage.key(j) == ('tasksList' + count)) {
        if (count <= i) {
          count++;
          console.log(localStorage.length +" "+ i);
        }
        else {
          localStorage.removeItem(localStorage.key(j));
        }
      } else {
        localStorage.removeItem(localStorage.key(j));
      }
    }
    
  }

  function readDataFromStorage() {
    return JSON.parse(localStorage.getItem(path)) || [];
  }

  return {
    setItem: saveItem,
    setItemValue: setItemValue,
    setArray: saveArray,
    removeItem: removeItem,
    check: storageCheck,
    get: readDataFromStorage
  }
}

function appendChildrenArray(parent, children) {
  children.forEach(function (item) {
    parent.appendChild(item);
  });

  return parent;
}

document.addEventListener("DOMContentLoaded", function() {
  var taskLists = document.getElementsByClassName('to-do-list')
  
  for (var i = 0; i < taskLists.length; i++) {
    taskLists[i] = todoList(taskLists[i], i).init();
  }
});
