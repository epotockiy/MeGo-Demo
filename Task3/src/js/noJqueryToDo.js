(function () {
  "use strict";

  function todoList(list, i) {
    var toDoContainer = list;
    var taskList;
    if(storage().disable()) {
      var tasksStorage = storage('tasksList' + i);
    }
    else {
      alert("LocalStorage не поддерживается или отключен в вашем браузере!")
    }

    function init() {
     
      var initialListsItems = tasksStorage.get();
      taskList = renderTaskLists(initialListsItems);
      watchTaskChanges();

      return taskList;
    }

    function watchTaskChanges() {

      var addTaskInput = toDoContainer.querySelector('.new-task'),
      addTaskSubmitBtn = toDoContainer.querySelector('.add'),
      filterBtn = toDoContainer.querySelector(".filter");
          
      filterBtn.addEventListener('click', function(event) {
        var elements = taskList.querySelectorAll("li");

        if(event.target.textContent == "All"){

          elements.forEach(function(item) {
            return item.classList.remove('hidden');
          });
        }

        if(event.target.textContent == "Incompleted"){
          elements.forEach(function(item) {
            if (item.classList.contains('completed')) {
              return item.classList.add('hidden');
            }

            return item.classList.remove('hidden');
          });
        }

        if(event.target.textContent == "Completed"){
          elements.forEach(function(item) {
            if (item.classList.contains('incompleted')) {
              return item.classList.add('hidden');
            }

            return item.classList.remove('hidden');
          });
        }
      });

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
          taskList.insertBefore(renderListItem(item), taskList.firstChild)
          tasksStorage.setItem(item);
        }
      });

      taskList.addEventListener('click', function(event){
        if (event.target.getAttribute("type") == "checkbox") {
          return moveItem(event.target);
        }

        if (event.target.className == "edit" || event.target.className == "save") {
          return editItem(event.target);
        }

        if (event.target.className == "delete") {
           return deleteItem(event.target);
        }
      });

      function deleteItem(item) {
        var id = item.parentNode.getAttribute("data-id"),
        itemParent = item.parentNode;

        taskList.removeChild(itemParent);
        tasksStorage.removeItem(id);
      }

      function editItem(item) {
        var id = item.parentNode.getAttribute('data-id'),
        itemParent = item.parentNode,
        editModeClass = 'editMode';
        
        if (itemParent.classList.contains(editModeClass)) {
          var newValue = itemParent.querySelector('input[type="text"]').value;
          
          itemParent.querySelector('label').textContent = newValue;
          tasksStorage.setItemValue(id, 'value', newValue);
          item.innerText = "Edit";
        }

       item.parentNode.classList.toggle(editModeClass);
      }

      function moveItem(item) {
        var id = item.value,
        itemParent = item.parentNode,
        completed = item.checked;

        if (completed) {
          itemParent.classList.remove("incompleted");
          itemParent.classList.add("completed");
        } else {
          itemParent.classList.remove("completed");
          itemParent.classList.add("incompleted");
        }
        tasksStorage.setItemValue(id, 'completed', completed);
      }
    }

    function renderTaskLists(initialListsItems) {

      var taskList = toDoContainer.querySelector(".tasks"),
      taskListContainer = document.createDocumentFragment();
      
      initialListsItems.forEach(function (item) {
        taskListContainer.appendChild(
          renderListItem(item)
          );
      });

      taskList.appendChild(taskListContainer);

      return taskList;
    }

    function renderListItem(item) {
      if(item.completed) {
        var taskItem = createElements('li', 
        {
          'data-id': item.id,
          class: 'completed'
        });
      }
      else {
        var taskItem = createElements('li', 
        {
          'data-id': item.id,
          class: 'incompleted'
        });
      }
      var taskText = createElements('label', {

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
      });
      var taskEditBtn = createElements('button', 
      {
        class: 'edit'
      });
      var taskSaveBtn = createElements('button', 
      {
        class: 'save'
      });
      var taskDeleteBtn = createElements('button', 
      {
        class: 'delete'
      });

      taskText.innerText = item.value;
      taskEditBtn.innerText = "Edit";
      taskSaveBtn.innerText = "Save";
      taskDeleteBtn.innerText = "Delete";

      taskItem.appendChild(taskCheckbox);
      taskItem.appendChild(taskText);
      taskItem.appendChild(taskInput);
      taskItem.appendChild(taskEditBtn);
      taskItem.appendChild(taskSaveBtn);
      taskItem.appendChild(taskDeleteBtn);

      return taskItem;
    }

    function createElements(element, obj) {
      var item = document.createElement(element);
      
      for(var prop in obj) {
        item.setAttribute(prop, obj[prop]);
      }
      return item;
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

      function readDataFromStorage() {
        return JSON.parse(localStorage.getItem(path)) || [];
      }

      function storageCheck(i) {
        var locStorLength = localStorage.length;

        for (var j = 0, count = 0; j < locStorLength; j++) {
          if (count < i) {
              count++;
            }
          else {
            localStorage.removeItem(localStorage.key(count));
          }
        }        
      }

      function checkDisable(){
        var test = 'test';
        try {
          localStorage.setItem(test, test);
          localStorage.removeItem(test);
          return true;
        } 
        catch(e) {
          return false;
        }
      }

      return {
        setItem: saveItem,
        setItemValue: setItemValue,
        setArray: saveArray,
        removeItem: removeItem,
        get: readDataFromStorage,
        check: storageCheck,
        disable: checkDisable
      }
    }
    
    return {
      init: init,
      storage: storage
    }
  }

  document.addEventListener("DOMContentLoaded", function() {
    var taskLists = document.getElementsByClassName('to-do-list')
    
    for (var i = 0; i < taskLists.length; i++) {
      taskLists[i] = todoList(taskLists[i], i).init();
    }

    todoList().storage().check(i);
  });
})();
