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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJtYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiAoKSB7XHJcbiAgXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG4gIGZ1bmN0aW9uIHRvZG9MaXN0KGxpc3QsIGkpIHtcclxuICAgIHZhciB0b0RvQ29udGFpbmVyID0gbGlzdDtcclxuICAgIHZhciB0YXNrTGlzdDtcclxuICAgIGlmKHN0b3JhZ2UoKS5kaXNhYmxlKCkpIHtcclxuICAgICAgdmFyIHRhc2tzU3RvcmFnZSA9IHN0b3JhZ2UoJ3Rhc2tzTGlzdCcgKyBpKTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICBhbGVydChcIkxvY2FsU3RvcmFnZSDQvdC1INC/0L7QtNC00LXRgNC20LjQstCw0LXRgtGB0Y8g0LjQu9C4INC+0YLQutC70Y7Rh9C10L0g0LIg0LLQsNGI0LXQvCDQsdGA0LDRg9C30LXRgNC1IVwiKVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGluaXQoKSB7XHJcbiAgICAgXHJcbiAgICAgIHZhciBpbml0aWFsTGlzdHNJdGVtcyA9IHRhc2tzU3RvcmFnZS5nZXQoKTtcclxuICAgICAgdGFza0xpc3QgPSByZW5kZXJUYXNrTGlzdHMoaW5pdGlhbExpc3RzSXRlbXMpO1xyXG4gICAgICB3YXRjaFRhc2tDaGFuZ2VzKCk7XHJcblxyXG4gICAgICByZXR1cm4gdGFza0xpc3Q7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gd2F0Y2hUYXNrQ2hhbmdlcygpIHtcclxuXHJcbiAgICAgIHZhciBhZGRUYXNrSW5wdXQgPSB0b0RvQ29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJy5uZXctdGFzaycpLFxyXG4gICAgICBhZGRUYXNrU3VibWl0QnRuID0gdG9Eb0NvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCcuYWRkJyksXHJcbiAgICAgIGZpbHRlckJ0biA9IHRvRG9Db250YWluZXIucXVlcnlTZWxlY3RvcihcIi5maWx0ZXJcIik7XHJcbiAgICAgIFxyXG4gICAgICBhZGRUYXNrU3VibWl0QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBpdGVtID0ge1xyXG4gICAgICAgICAgaWQ6IE1hdGgucmFuZG9tKCkudG9TdHJpbmcoMzYpLnN1YnN0cigyLCA5KSwgLy8g0LPQtdC90LXRgNCw0YbQuNGPINGD0L3QuNC60LDQu9GM0L3QvtCz0L4gaWRcclxuICAgICAgICAgIHZhbHVlOiBhZGRUYXNrSW5wdXQudmFsdWUsXHJcbiAgICAgICAgICBjb21wbGV0ZWQ6IGZhbHNlXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgaWYoYWRkVGFza0lucHV0LnZhbHVlID09IFwiXCIpe1xyXG4gICAgICAgICAgYWxlcnQoXCLQl9Cw0L/QvtC70L3QuNGC0LUg0L/Rg9GB0YLQvtC1INC/0L7Qu9C1IVwiKTtcclxuICAgICAgICB9IFxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICBhZGRUYXNrSW5wdXQudmFsdWUgPSBcIlwiO1xyXG4gICAgICAgICAgdGFza0xpc3QuaW5zZXJ0QmVmb3JlKHJlbmRlckxpc3RJdGVtKGl0ZW0pLCB0YXNrTGlzdC5maXJzdENoaWxkKVxyXG4gICAgICAgICAgdGFza3NTdG9yYWdlLnNldEl0ZW0oaXRlbSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgICAgXHJcbiAgICAgIGZpbHRlckJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICAgICAgdmFyIGVsZW1lbnRzID0gdGFza0xpc3QucXVlcnlTZWxlY3RvckFsbChcImxpXCIpO1xyXG5cclxuICAgICAgICBpZihldmVudC50YXJnZXQudGV4dENvbnRlbnQgPT0gXCJBbGxcIil7XHJcblxyXG4gICAgICAgICAgZWxlbWVudHMuZm9yRWFjaChmdW5jdGlvbihpdGVtKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBpdGVtLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZihldmVudC50YXJnZXQudGV4dENvbnRlbnQgPT0gXCJJbmNvbXBsZXRlZFwiKXtcclxuICAgICAgICAgIGVsZW1lbnRzLmZvckVhY2goZnVuY3Rpb24oaXRlbSkge1xyXG4gICAgICAgICAgICBpZiAoaXRlbS5jbGFzc0xpc3QuY29udGFpbnMoJ2NvbXBsZXRlZCcpKSB7XHJcbiAgICAgICAgICAgICAgcmV0dXJuIGl0ZW0uY2xhc3NMaXN0LmFkZCgnaGlkZGVuJyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBpdGVtLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZihldmVudC50YXJnZXQudGV4dENvbnRlbnQgPT0gXCJDb21wbGV0ZWRcIil7XHJcbiAgICAgICAgICBlbGVtZW50cy5mb3JFYWNoKGZ1bmN0aW9uKGl0ZW0pIHtcclxuICAgICAgICAgICAgaWYgKGl0ZW0uY2xhc3NMaXN0LmNvbnRhaW5zKCdpbmNvbXBsZXRlZCcpKSB7XHJcbiAgICAgICAgICAgICAgcmV0dXJuIGl0ZW0uY2xhc3NMaXN0LmFkZCgnaGlkZGVuJyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBpdGVtLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIHRhc2tMaXN0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZXZlbnQpe1xyXG4gICAgICAgIGlmIChldmVudC50YXJnZXQuZ2V0QXR0cmlidXRlKFwidHlwZVwiKSA9PSBcImNoZWNrYm94XCIpIHtcclxuICAgICAgICAgIHJldHVybiBtb3ZlSXRlbShldmVudC50YXJnZXQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGV2ZW50LnRhcmdldC5jbGFzc05hbWUgPT0gXCJlZGl0XCIgfHwgZXZlbnQudGFyZ2V0LmNsYXNzTmFtZSA9PSBcInNhdmVcIikge1xyXG4gICAgICAgICAgcmV0dXJuIGVkaXRJdGVtKGV2ZW50LnRhcmdldCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoZXZlbnQudGFyZ2V0LmNsYXNzTmFtZSA9PSBcImRlbGV0ZVwiKSB7XHJcbiAgICAgICAgICAgcmV0dXJuIGRlbGV0ZUl0ZW0oZXZlbnQudGFyZ2V0KTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHJlbmRlclRhc2tMaXN0cyhpbml0aWFsTGlzdHNJdGVtcykge1xyXG5cclxuICAgICAgdmFyIHRhc2tMaXN0ID0gdG9Eb0NvbnRhaW5lci5xdWVyeVNlbGVjdG9yKFwiLnRhc2tzXCIpLFxyXG4gICAgICB0YXNrTGlzdENvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcclxuICAgICAgXHJcbiAgICAgIGluaXRpYWxMaXN0c0l0ZW1zLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHtcclxuICAgICAgICB0YXNrTGlzdENvbnRhaW5lci5hcHBlbmRDaGlsZChcclxuICAgICAgICAgIHJlbmRlckxpc3RJdGVtKGl0ZW0pXHJcbiAgICAgICAgICApO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIHRhc2tMaXN0LmFwcGVuZENoaWxkKHRhc2tMaXN0Q29udGFpbmVyKTtcclxuXHJcbiAgICAgIHJldHVybiB0YXNrTGlzdDtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiByZW5kZXJMaXN0SXRlbShpdGVtKSB7XHJcbiAgICAgIGlmKGl0ZW0uY29tcGxldGVkKSB7XHJcbiAgICAgICAgdmFyIHRhc2tJdGVtID0gY3JlYXRlRWxlbWVudHMoJ2xpJywgXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgJ2RhdGEtaWQnOiBpdGVtLmlkLFxyXG4gICAgICAgICAgY2xhc3M6ICdjb21wbGV0ZWQnXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgICAgZWxzZSB7XHJcbiAgICAgICAgdmFyIHRhc2tJdGVtID0gY3JlYXRlRWxlbWVudHMoJ2xpJywgXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgJ2RhdGEtaWQnOiBpdGVtLmlkLFxyXG4gICAgICAgICAgY2xhc3M6ICdpbmNvbXBsZXRlZCdcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgICB2YXIgdGFza1RleHQgPSBjcmVhdGVFbGVtZW50cygnbGFiZWwnLCB7XHJcblxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIGlmKGl0ZW0uY29tcGxldGVkKSB7XHJcbiAgICAgICAgdmFyIHRhc2tDaGVja2JveCA9IGNyZWF0ZUVsZW1lbnRzKCdpbnB1dCcsIFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIHR5cGU6ICdjaGVja2JveCcsXHJcbiAgICAgICAgICB2YWx1ZTogaXRlbS5pZCxcclxuICAgICAgICAgIGNoZWNrZWQ6ICcnXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0gXHJcbiAgICAgIGVsc2UgeyBcclxuICAgICAgICB2YXIgdGFza0NoZWNrYm94ID0gY3JlYXRlRWxlbWVudHMoJ2lucHV0JywgXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgdHlwZTogJ2NoZWNrYm94JyxcclxuICAgICAgICAgIHZhbHVlOiBpdGVtLmlkICAgICAgICAgICAgXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHZhciB0YXNrSW5wdXQgPSBjcmVhdGVFbGVtZW50cygnaW5wdXQnLCBcclxuICAgICAge1xyXG4gICAgICAgIHR5cGU6ICd0ZXh0JyxcclxuICAgICAgICB2YWx1ZTogaXRlbS52YWx1ZVxyXG4gICAgICB9KTtcclxuICAgICAgdmFyIHRhc2tFZGl0QnRuID0gY3JlYXRlRWxlbWVudHMoJ2J1dHRvbicsIFxyXG4gICAgICB7XHJcbiAgICAgICAgY2xhc3M6ICdlZGl0J1xyXG4gICAgICB9KTtcclxuICAgICAgdmFyIHRhc2tTYXZlQnRuID0gY3JlYXRlRWxlbWVudHMoJ2J1dHRvbicsIFxyXG4gICAgICB7XHJcbiAgICAgICAgY2xhc3M6ICdzYXZlJ1xyXG4gICAgICB9KTtcclxuICAgICAgdmFyIHRhc2tEZWxldGVCdG4gPSBjcmVhdGVFbGVtZW50cygnYnV0dG9uJywgXHJcbiAgICAgIHtcclxuICAgICAgICBjbGFzczogJ2RlbGV0ZSdcclxuICAgICAgfSk7XHJcblxyXG4gICAgICB0YXNrVGV4dC5pbm5lclRleHQgPSBpdGVtLnZhbHVlO1xyXG4gICAgICB0YXNrRWRpdEJ0bi5pbm5lclRleHQgPSBcIkVkaXRcIjtcclxuICAgICAgdGFza1NhdmVCdG4uaW5uZXJUZXh0ID0gXCJTYXZlXCI7XHJcbiAgICAgIHRhc2tEZWxldGVCdG4uaW5uZXJUZXh0ID0gXCJEZWxldGVcIjtcclxuXHJcbiAgICAgIHRhc2tJdGVtLmFwcGVuZENoaWxkKHRhc2tDaGVja2JveCk7XHJcbiAgICAgIHRhc2tJdGVtLmFwcGVuZENoaWxkKHRhc2tUZXh0KTtcclxuICAgICAgdGFza0l0ZW0uYXBwZW5kQ2hpbGQodGFza0lucHV0KTtcclxuICAgICAgdGFza0l0ZW0uYXBwZW5kQ2hpbGQodGFza0VkaXRCdG4pO1xyXG4gICAgICB0YXNrSXRlbS5hcHBlbmRDaGlsZCh0YXNrU2F2ZUJ0bik7XHJcbiAgICAgIHRhc2tJdGVtLmFwcGVuZENoaWxkKHRhc2tEZWxldGVCdG4pO1xyXG5cclxuICAgICAgcmV0dXJuIHRhc2tJdGVtO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGNyZWF0ZUVsZW1lbnRzKGVsZW1lbnQsIG9iaikge1xyXG4gICAgICB2YXIgaXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoZWxlbWVudCk7XHJcbiAgICAgIFxyXG4gICAgICBmb3IodmFyIHByb3AgaW4gb2JqKSB7XHJcbiAgICAgICAgaXRlbS5zZXRBdHRyaWJ1dGUocHJvcCwgb2JqW3Byb3BdKTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gaXRlbTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBkZWxldGVJdGVtKGl0ZW0pIHtcclxuICAgICAgdmFyIGlkID0gaXRlbS5wYXJlbnROb2RlLmdldEF0dHJpYnV0ZShcImRhdGEtaWRcIiksXHJcbiAgICAgIGl0ZW1QYXJlbnQgPSBpdGVtLnBhcmVudE5vZGU7XHJcblxyXG4gICAgICB0YXNrTGlzdC5yZW1vdmVDaGlsZChpdGVtUGFyZW50KTtcclxuICAgICAgdGFza3NTdG9yYWdlLnJlbW92ZUl0ZW0oaWQpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGVkaXRJdGVtKGl0ZW0pIHtcclxuICAgICAgdmFyIGlkID0gaXRlbS5wYXJlbnROb2RlLmdldEF0dHJpYnV0ZSgnZGF0YS1pZCcpLFxyXG4gICAgICBpdGVtUGFyZW50ID0gaXRlbS5wYXJlbnROb2RlLFxyXG4gICAgICBlZGl0TW9kZUNsYXNzID0gJ2VkaXRNb2RlJztcclxuICAgICAgXHJcbiAgICAgIGlmIChpdGVtUGFyZW50LmNsYXNzTGlzdC5jb250YWlucyhlZGl0TW9kZUNsYXNzKSkge1xyXG4gICAgICAgIHZhciBuZXdWYWx1ZSA9IGl0ZW1QYXJlbnQucXVlcnlTZWxlY3RvcignaW5wdXRbdHlwZT1cInRleHRcIl0nKS52YWx1ZTtcclxuICAgICAgICBcclxuICAgICAgICBpdGVtUGFyZW50LnF1ZXJ5U2VsZWN0b3IoJ2xhYmVsJykudGV4dENvbnRlbnQgPSBuZXdWYWx1ZTtcclxuICAgICAgICB0YXNrc1N0b3JhZ2Uuc2V0SXRlbVZhbHVlKGlkLCAndmFsdWUnLCBuZXdWYWx1ZSk7XHJcbiAgICAgICAgaXRlbS5pbm5lclRleHQgPSBcIkVkaXRcIjtcclxuICAgICAgfVxyXG5cclxuICAgICBpdGVtLnBhcmVudE5vZGUuY2xhc3NMaXN0LnRvZ2dsZShlZGl0TW9kZUNsYXNzKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBtb3ZlSXRlbShpdGVtKSB7XHJcbiAgICAgIHZhciBpZCA9IGl0ZW0udmFsdWUsXHJcbiAgICAgIGl0ZW1QYXJlbnQgPSBpdGVtLnBhcmVudE5vZGUsXHJcbiAgICAgIGNvbXBsZXRlZCA9IGl0ZW0uY2hlY2tlZDtcclxuXHJcbiAgICAgIGlmIChjb21wbGV0ZWQpIHtcclxuICAgICAgICBpdGVtUGFyZW50LmNsYXNzTGlzdC5yZW1vdmUoXCJpbmNvbXBsZXRlZFwiKTtcclxuICAgICAgICBpdGVtUGFyZW50LmNsYXNzTGlzdC5hZGQoXCJjb21wbGV0ZWRcIik7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaXRlbVBhcmVudC5jbGFzc0xpc3QucmVtb3ZlKFwiY29tcGxldGVkXCIpO1xyXG4gICAgICAgIGl0ZW1QYXJlbnQuY2xhc3NMaXN0LmFkZChcImluY29tcGxldGVkXCIpO1xyXG4gICAgICB9XHJcbiAgICAgIHRhc2tzU3RvcmFnZS5zZXRJdGVtVmFsdWUoaWQsICdjb21wbGV0ZWQnLCBjb21wbGV0ZWQpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHN0b3JhZ2UocGF0aCl7XHJcblxyXG4gICAgICBmdW5jdGlvbiBzZXRJdGVtVmFsdWUoaWQsIGZpZWxkLCB2YWx1ZSkge1xyXG4gICAgICAgIHZhciBjdXJyZW50SXRlbXMgPSByZWFkRGF0YUZyb21TdG9yYWdlKCk7XHJcblxyXG4gICAgICAgIGN1cnJlbnRJdGVtcy5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgICAgICAgICBpZiAoaXRlbS5pZCA9PT0gaWQpIHtcclxuICAgICAgICAgICAgaXRlbVtmaWVsZF0gPSB2YWx1ZVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBzYXZlQXJyYXkoY3VycmVudEl0ZW1zKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgZnVuY3Rpb24gc2F2ZUFycmF5KGFycmF5KSB7XHJcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0ocGF0aCwgSlNPTi5zdHJpbmdpZnkoYXJyYXkpKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgZnVuY3Rpb24gc2F2ZUl0ZW0oaXRlbSkge1xyXG4gICAgICAgIHZhciBjdXJyZW50SXRlbXMgPSByZWFkRGF0YUZyb21TdG9yYWdlKCk7XHJcbiAgICAgICAgY3VycmVudEl0ZW1zLnVuc2hpZnQoaXRlbSk7XHJcbiAgICAgICAgc2F2ZUFycmF5KGN1cnJlbnRJdGVtcylcclxuICAgICAgfVxyXG5cclxuICAgICAgZnVuY3Rpb24gcmVtb3ZlSXRlbShpZCkge1xyXG4gICAgICAgIHZhciBjdXJyZW50SXRlbXMgPSByZWFkRGF0YUZyb21TdG9yYWdlKCk7XHJcbiAgICAgICAgc2F2ZUFycmF5KFxyXG4gICAgICAgICAgY3VycmVudEl0ZW1zLmZpbHRlcihmdW5jdGlvbiAoaXRlbSkge1xyXG4gICAgICAgICAgICByZXR1cm4gaXRlbS5pZCAhPT0gaWQ7XHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgICk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGZ1bmN0aW9uIHJlYWREYXRhRnJvbVN0b3JhZ2UoKSB7XHJcbiAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0ocGF0aCkpIHx8IFtdO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBmdW5jdGlvbiBzdG9yYWdlQ2hlY2soaSkge1xyXG4gICAgICAgIHZhciBsb2NTdG9yTGVuZ3RoID0gbG9jYWxTdG9yYWdlLmxlbmd0aDtcclxuXHJcbiAgICAgICAgZm9yICh2YXIgaiA9IDAsIGNvdW50ID0gMDsgaiA8IGxvY1N0b3JMZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgaWYgKGNvdW50IDwgaSkge1xyXG4gICAgICAgICAgICAgIGNvdW50Kys7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShsb2NhbFN0b3JhZ2Uua2V5KGNvdW50KSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSAgICAgICAgXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGZ1bmN0aW9uIGNoZWNrRGlzYWJsZSgpe1xyXG4gICAgICAgIHZhciB0ZXN0ID0gJ3Rlc3QnO1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSh0ZXN0LCB0ZXN0KTtcclxuICAgICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKHRlc3QpO1xyXG4gICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfSBcclxuICAgICAgICBjYXRjaChlKSB7XHJcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIHNldEl0ZW06IHNhdmVJdGVtLFxyXG4gICAgICAgIHNldEl0ZW1WYWx1ZTogc2V0SXRlbVZhbHVlLFxyXG4gICAgICAgIHNldEFycmF5OiBzYXZlQXJyYXksXHJcbiAgICAgICAgcmVtb3ZlSXRlbTogcmVtb3ZlSXRlbSxcclxuICAgICAgICBnZXQ6IHJlYWREYXRhRnJvbVN0b3JhZ2UsXHJcbiAgICAgICAgY2hlY2s6IHN0b3JhZ2VDaGVjayxcclxuICAgICAgICBkaXNhYmxlOiBjaGVja0Rpc2FibGVcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBpbml0OiBpbml0LFxyXG4gICAgICBzdG9yYWdlOiBzdG9yYWdlXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCBmdW5jdGlvbigpIHtcclxuICAgIHZhciB0YXNrTGlzdHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCd0by1kby1saXN0JylcclxuICAgIFxyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0YXNrTGlzdHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgdGFza0xpc3RzW2ldID0gdG9kb0xpc3QodGFza0xpc3RzW2ldLCBpKS5pbml0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgdG9kb0xpc3QoKS5zdG9yYWdlKCkuY2hlY2soaSk7XHJcbiAgfSk7XHJcbn0pKCk7Il0sImZpbGUiOiJtYWluLmpzIn0=
