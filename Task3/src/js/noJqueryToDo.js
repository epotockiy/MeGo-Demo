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

    var addTaskInput = toDoContainer.querySelector('.new-task'),
    addTaskSubmitBtn = toDoContainer.querySelector('.add'),
    filterBtn = toDoContainer.querySelector(".filter");

    filterBtn.addEventListener('click', function(event) {
      if(event.target.textContent == "All"){
        return activateFilter(event.target, taskLists, taskLists.all);
      }

      if(event.target.textContent == "Incompleted"){
        return activateFilter(event.target, taskLists, taskLists.incompleted);
      }

      if(event.target.textContent == "Completed"){
        return activateFilter(event.target, taskLists, taskLists.completed);
      }
    });

    function activateFilter(btn, allList, list){
      var btnParent = btn.parentNode;
      var activeBtn = btnParent.querySelector(".active");
      var activeList = Object.values(allList).filter(function(item) {
        return !item.classList.contains("hidden-list")
      });

      if(activeBtn == undefined || activeBtn == btn) {
        btn.classList.add("active");
        list.classList.remove("hidden-list");
      }
      else {
        activeBtn.classList.remove("active");
        activeList[0].classList.add("hidden-list");

        btn.classList.add("active");
        list.classList.remove("hidden-list");
      }
    }

    addTaskSubmitBtn.addEventListener('click', function () {
      var item = {
        id: Math.random().toString(36).substr(2, 9), // генерация уникального id
        value: addTaskInput.value,
        completed: false
      };

      if(addTaskInput.value == ""){
        alert("Заполните пустое поле!");
      } 
      else{
        addTaskInput.value = "";
        addItemToList(item);
        tasksStorage.setItem(item);
      }
    });

    function addItemToList(item) {
      taskLists.incompleted.insertBefore(
        renderListItem(item),
        taskLists.incompleted.firstChild
        );

      taskLists.all.insertBefore(
        renderListItem(item),
        taskLists.all.firstChild
        );
    }

    function changesListenter(list) {
      list.addEventListener('click', function(event){
        if (event.target.getAttribute("type") == "checkbox") {
          return moveItem(event.target);
        }

        if (event.target.className == "edit") {
          return editItem(event.target);
        }

        if (event.target.className == "delete") {
           return deleteItem(event.target);
        }
      });

      function deleteItem(item) {
        var completed = item.parentNode.querySelector('input[type="checkbox"]').checked,
        id = item.parentNode.getAttribute("data-id"),
        liSearchString = 'li[data-id=' +'"' + id + '"' + ']';

        if (completed) {
          console.log(liSearchString)
          taskLists.all.removeChild(taskLists.all.querySelector(liSearchString));
          taskLists.completed.removeChild(taskLists.completed.querySelector(liSearchString));
        } else {
          taskLists.all.removeChild(taskLists.all.querySelector(liSearchString));
          taskLists.incompleted.removeChild(taskLists.incompleted.querySelector(liSearchString));
        }

        tasksStorage.removeItem(id);
      }

      function editItem(item) {
        var id = item.parentNode.getAttribute('data-id'),
        checkbox = item.parentNode.querySelector('input[type="checkbox"]').checked,
        liSearchString = 'li[data-id=' +'"' + id + '"' + ']',
        editModeClass = 'editMode';

        if(item.parentNode.classList.contains(editModeClass)) {
          var newValue = item.parentNode.querySelector('input[type="text"]').value;
          
          if(checkbox) {
            taskLists.completed.querySelector(liSearchString + " " + 'label').textContent = newValue;
            taskLists.completed.querySelector(liSearchString + " " + 'input[type="text"]').value = newValue;
          }
          else {
            taskLists.incompleted.querySelector(liSearchString + " " + 'label').textContent = newValue;
            taskLists.incompleted.querySelector(liSearchString + " " + 'input[type="text"]').value = newValue;
          }

          item.parentNode.querySelector('label').textContent = newValue;
          taskLists.all.querySelector(liSearchString + " " + 'label').textContent = newValue;
          taskLists.all.querySelector(liSearchString + " " + 'input[type="text"]').value = newValue;
          tasksStorage.setItemValue(id, 'value', newValue);
          item.innerText = "Edit";
        } 
        else {
          item.innerText = "Save";
        }

       item.parentNode.classList.toggle(editModeClass);
      }

      function moveItem(item) {
        var id = item.value,
        liSearchString = 'li[data-id=' +'"' + id + '"' + ']',
        completed = item.checked;

        if (completed) {
          taskLists.completed.insertBefore(taskLists.incompleted.querySelector(liSearchString), taskLists.completed.firstChild);
          taskLists.completed.querySelector(liSearchString + " " + 'input[type="checkbox"]').setAttribute("checked", true);
          taskLists.all.querySelector(liSearchString + " " + 'input[type="checkbox"]').setAttribute("checked", true);
        } else {
          taskLists.incompleted.appendChild(taskLists.completed.querySelector(liSearchString));
          taskLists.incompleted.querySelector(liSearchString + " " + 'input[type="checkbox"]').setAttribute("checked", false);
          taskLists.all.querySelector(liSearchString + " " + 'input[type="checkbox"]').setAttribute("checked", false);
          
        }
        tasksStorage.setItemValue(id, 'completed', completed);
      }
    }

    changesListenter(taskLists.incompleted);
    changesListenter(taskLists.completed);
    changesListenter(taskLists.all);
  }

  function renderTaskLists(initialListsItems) {

    var completedList = toDoContainer.querySelector(".completed-tasks"),
    incompletedList = toDoContainer.querySelector(".incomplete-tasks"),
    allList = toDoContainer.querySelector(".all-tasks");

    var completedListContainer = document.createDocumentFragment(),
    incompletedListContainer = document.createDocumentFragment(),
    allListContainer = document.createDocumentFragment();
    
    initialListsItems.forEach(function (item) {
      if (item.completed) {
        completedListContainer.appendChild(
          renderListItem(item)
        );
      } 
      else {
        incompletedListContainer.appendChild(
          renderListItem(item)
        );
      }

      allListContainer.appendChild(
        renderListItem(item)
        );
    });

    completedList.appendChild(completedListContainer);
    incompletedList.appendChild(incompletedListContainer);
    allList.appendChild(allListContainer);

    completedList.classList.toggle("hidden-list");
    incompletedList.classList.toggle("hidden-list");
    allList.classList.toggle("hidden-list");
    
    return {
      incompleted: incompletedList,
      completed: completedList,
      all: allList
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
    } 
    else { 
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

    function appendChildrenArray(parent, children) {
      children.forEach(function (item) {
        parent.appendChild(item);
      });

      return parent;
    }

    return appendChildrenArray(taskItem, [taskCheckbox, taskText, taskInput, taskEditBtn, taskDeleteBtn]);
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

document.addEventListener("DOMContentLoaded", function() {
  var taskLists = document.getElementsByClassName('to-do-list')
  
  for (var i = 0; i < taskLists.length; i++) {
    taskLists[i] = todoList(taskLists[i], i).init();
  }
});
