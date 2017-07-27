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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJtYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiAoKSB7XHJcbiAgXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG4gIGZ1bmN0aW9uIHRvZG9MaXN0KGxpc3QsIGkpIHtcclxuICAgIHZhciB0b0RvQ29udGFpbmVyID0gbGlzdDtcclxuICAgIHZhciB0YXNrTGlzdDtcclxuICAgIGlmKHN0b3JhZ2UoKS5kaXNhYmxlKCkpIHtcclxuICAgICAgdmFyIHRhc2tzU3RvcmFnZSA9IHN0b3JhZ2UoJ3Rhc2tzTGlzdCcgKyBpKTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICBhbGVydChcIkxvY2FsU3RvcmFnZSDQvdC1INC/0L7QtNC00LXRgNC20LjQstCw0LXRgtGB0Y8g0LjQu9C4INC+0YLQutC70Y7Rh9C10L0g0LIg0LLQsNGI0LXQvCDQsdGA0LDRg9C30LXRgNC1IVwiKVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGluaXQoKSB7XHJcbiAgICAgXHJcbiAgICAgIHZhciBpbml0aWFsTGlzdHNJdGVtcyA9IHRhc2tzU3RvcmFnZS5nZXQoKTtcclxuICAgICAgdGFza0xpc3QgPSByZW5kZXJUYXNrTGlzdHMoaW5pdGlhbExpc3RzSXRlbXMpO1xyXG4gICAgICB3YXRjaFRhc2tDaGFuZ2VzKCk7XHJcblxyXG4gICAgICByZXR1cm4gdGFza0xpc3Q7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gd2F0Y2hUYXNrQ2hhbmdlcygpIHtcclxuXHJcbiAgICAgIHZhciBhZGRUYXNrSW5wdXQgPSB0b0RvQ29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJy5uZXctdGFzaycpLFxyXG4gICAgICBhZGRUYXNrU3VibWl0QnRuID0gdG9Eb0NvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCcuYWRkJyksXHJcbiAgICAgIGZpbHRlckJ0biA9IHRvRG9Db250YWluZXIucXVlcnlTZWxlY3RvcihcIi5maWx0ZXJcIik7XHJcbiAgICAgICAgICBcclxuICAgICAgZmlsdGVyQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgICAgICB2YXIgZWxlbWVudHMgPSB0YXNrTGlzdC5xdWVyeVNlbGVjdG9yQWxsKFwibGlcIik7XHJcblxyXG4gICAgICAgIGlmKGV2ZW50LnRhcmdldC50ZXh0Q29udGVudCA9PSBcIkFsbFwiKXtcclxuXHJcbiAgICAgICAgICBlbGVtZW50cy5mb3JFYWNoKGZ1bmN0aW9uKGl0ZW0pIHtcclxuICAgICAgICAgICAgcmV0dXJuIGl0ZW0uY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJyk7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKGV2ZW50LnRhcmdldC50ZXh0Q29udGVudCA9PSBcIkluY29tcGxldGVkXCIpe1xyXG4gICAgICAgICAgZWxlbWVudHMuZm9yRWFjaChmdW5jdGlvbihpdGVtKSB7XHJcbiAgICAgICAgICAgIGlmIChpdGVtLmNsYXNzTGlzdC5jb250YWlucygnY29tcGxldGVkJykpIHtcclxuICAgICAgICAgICAgICByZXR1cm4gaXRlbS5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGl0ZW0uY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJyk7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKGV2ZW50LnRhcmdldC50ZXh0Q29udGVudCA9PSBcIkNvbXBsZXRlZFwiKXtcclxuICAgICAgICAgIGVsZW1lbnRzLmZvckVhY2goZnVuY3Rpb24oaXRlbSkge1xyXG4gICAgICAgICAgICBpZiAoaXRlbS5jbGFzc0xpc3QuY29udGFpbnMoJ2luY29tcGxldGVkJykpIHtcclxuICAgICAgICAgICAgICByZXR1cm4gaXRlbS5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGl0ZW0uY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJyk7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgYWRkVGFza1N1Ym1pdEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgaXRlbSA9IHtcclxuICAgICAgICAgIGlkOiBNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKDM2KS5zdWJzdHIoMiwgOSksIC8vINCz0LXQvdC10YDQsNGG0LjRjyDRg9C90LjQutCw0LvRjNC90L7Qs9C+IGlkXHJcbiAgICAgICAgICB2YWx1ZTogYWRkVGFza0lucHV0LnZhbHVlLFxyXG4gICAgICAgICAgY29tcGxldGVkOiBmYWxzZVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGlmKGFkZFRhc2tJbnB1dC52YWx1ZSA9PSBcIlwiKXtcclxuICAgICAgICAgIGFsZXJ0KFwi0JfQsNC/0L7Qu9C90LjRgtC1INC/0YPRgdGC0L7QtSDQv9C+0LvQtSFcIik7XHJcbiAgICAgICAgfSBcclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgYWRkVGFza0lucHV0LnZhbHVlID0gXCJcIjtcclxuICAgICAgICAgIHRhc2tMaXN0Lmluc2VydEJlZm9yZShyZW5kZXJMaXN0SXRlbShpdGVtKSwgdGFza0xpc3QuZmlyc3RDaGlsZClcclxuICAgICAgICAgIHRhc2tzU3RvcmFnZS5zZXRJdGVtKGl0ZW0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcblxyXG4gICAgICB0YXNrTGlzdC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGV2ZW50KXtcclxuICAgICAgICBpZiAoZXZlbnQudGFyZ2V0LmdldEF0dHJpYnV0ZShcInR5cGVcIikgPT0gXCJjaGVja2JveFwiKSB7XHJcbiAgICAgICAgICByZXR1cm4gbW92ZUl0ZW0oZXZlbnQudGFyZ2V0KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChldmVudC50YXJnZXQuY2xhc3NOYW1lID09IFwiZWRpdFwiIHx8IGV2ZW50LnRhcmdldC5jbGFzc05hbWUgPT0gXCJzYXZlXCIpIHtcclxuICAgICAgICAgIHJldHVybiBlZGl0SXRlbShldmVudC50YXJnZXQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGV2ZW50LnRhcmdldC5jbGFzc05hbWUgPT0gXCJkZWxldGVcIikge1xyXG4gICAgICAgICAgIHJldHVybiBkZWxldGVJdGVtKGV2ZW50LnRhcmdldCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIGZ1bmN0aW9uIGRlbGV0ZUl0ZW0oaXRlbSkge1xyXG4gICAgICAgIHZhciBpZCA9IGl0ZW0ucGFyZW50Tm9kZS5nZXRBdHRyaWJ1dGUoXCJkYXRhLWlkXCIpLFxyXG4gICAgICAgIGl0ZW1QYXJlbnQgPSBpdGVtLnBhcmVudE5vZGU7XHJcblxyXG4gICAgICAgIHRhc2tMaXN0LnJlbW92ZUNoaWxkKGl0ZW1QYXJlbnQpO1xyXG4gICAgICAgIHRhc2tzU3RvcmFnZS5yZW1vdmVJdGVtKGlkKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgZnVuY3Rpb24gZWRpdEl0ZW0oaXRlbSkge1xyXG4gICAgICAgIHZhciBpZCA9IGl0ZW0ucGFyZW50Tm9kZS5nZXRBdHRyaWJ1dGUoJ2RhdGEtaWQnKSxcclxuICAgICAgICBpdGVtUGFyZW50ID0gaXRlbS5wYXJlbnROb2RlLFxyXG4gICAgICAgIGVkaXRNb2RlQ2xhc3MgPSAnZWRpdE1vZGUnO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmIChpdGVtUGFyZW50LmNsYXNzTGlzdC5jb250YWlucyhlZGl0TW9kZUNsYXNzKSkge1xyXG4gICAgICAgICAgdmFyIG5ld1ZhbHVlID0gaXRlbVBhcmVudC5xdWVyeVNlbGVjdG9yKCdpbnB1dFt0eXBlPVwidGV4dFwiXScpLnZhbHVlO1xyXG4gICAgICAgICAgXHJcbiAgICAgICAgICBpdGVtUGFyZW50LnF1ZXJ5U2VsZWN0b3IoJ2xhYmVsJykudGV4dENvbnRlbnQgPSBuZXdWYWx1ZTtcclxuICAgICAgICAgIHRhc2tzU3RvcmFnZS5zZXRJdGVtVmFsdWUoaWQsICd2YWx1ZScsIG5ld1ZhbHVlKTtcclxuICAgICAgICAgIGl0ZW0uaW5uZXJUZXh0ID0gXCJFZGl0XCI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgIGl0ZW0ucGFyZW50Tm9kZS5jbGFzc0xpc3QudG9nZ2xlKGVkaXRNb2RlQ2xhc3MpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBmdW5jdGlvbiBtb3ZlSXRlbShpdGVtKSB7XHJcbiAgICAgICAgdmFyIGlkID0gaXRlbS52YWx1ZSxcclxuICAgICAgICBpdGVtUGFyZW50ID0gaXRlbS5wYXJlbnROb2RlLFxyXG4gICAgICAgIGNvbXBsZXRlZCA9IGl0ZW0uY2hlY2tlZDtcclxuXHJcbiAgICAgICAgaWYgKGNvbXBsZXRlZCkge1xyXG4gICAgICAgICAgaXRlbVBhcmVudC5jbGFzc0xpc3QucmVtb3ZlKFwiaW5jb21wbGV0ZWRcIik7XHJcbiAgICAgICAgICBpdGVtUGFyZW50LmNsYXNzTGlzdC5hZGQoXCJjb21wbGV0ZWRcIik7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGl0ZW1QYXJlbnQuY2xhc3NMaXN0LnJlbW92ZShcImNvbXBsZXRlZFwiKTtcclxuICAgICAgICAgIGl0ZW1QYXJlbnQuY2xhc3NMaXN0LmFkZChcImluY29tcGxldGVkXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0YXNrc1N0b3JhZ2Uuc2V0SXRlbVZhbHVlKGlkLCAnY29tcGxldGVkJywgY29tcGxldGVkKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHJlbmRlclRhc2tMaXN0cyhpbml0aWFsTGlzdHNJdGVtcykge1xyXG5cclxuICAgICAgdmFyIHRhc2tMaXN0ID0gdG9Eb0NvbnRhaW5lci5xdWVyeVNlbGVjdG9yKFwiLnRhc2tzXCIpLFxyXG4gICAgICB0YXNrTGlzdENvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcclxuICAgICAgXHJcbiAgICAgIGluaXRpYWxMaXN0c0l0ZW1zLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHtcclxuICAgICAgICB0YXNrTGlzdENvbnRhaW5lci5hcHBlbmRDaGlsZChcclxuICAgICAgICAgIHJlbmRlckxpc3RJdGVtKGl0ZW0pXHJcbiAgICAgICAgICApO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIHRhc2tMaXN0LmFwcGVuZENoaWxkKHRhc2tMaXN0Q29udGFpbmVyKTtcclxuXHJcbiAgICAgIHJldHVybiB0YXNrTGlzdDtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiByZW5kZXJMaXN0SXRlbShpdGVtKSB7XHJcbiAgICAgIGlmKGl0ZW0uY29tcGxldGVkKSB7XHJcbiAgICAgICAgdmFyIHRhc2tJdGVtID0gY3JlYXRlRWxlbWVudHMoJ2xpJywgXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgJ2RhdGEtaWQnOiBpdGVtLmlkLFxyXG4gICAgICAgICAgY2xhc3M6ICdjb21wbGV0ZWQnXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgICAgZWxzZSB7XHJcbiAgICAgICAgdmFyIHRhc2tJdGVtID0gY3JlYXRlRWxlbWVudHMoJ2xpJywgXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgJ2RhdGEtaWQnOiBpdGVtLmlkLFxyXG4gICAgICAgICAgY2xhc3M6ICdpbmNvbXBsZXRlZCdcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgICB2YXIgdGFza1RleHQgPSBjcmVhdGVFbGVtZW50cygnbGFiZWwnLCB7XHJcblxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIGlmKGl0ZW0uY29tcGxldGVkKSB7XHJcbiAgICAgICAgdmFyIHRhc2tDaGVja2JveCA9IGNyZWF0ZUVsZW1lbnRzKCdpbnB1dCcsIFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIHR5cGU6ICdjaGVja2JveCcsXHJcbiAgICAgICAgICB2YWx1ZTogaXRlbS5pZCxcclxuICAgICAgICAgIGNoZWNrZWQ6ICcnXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0gXHJcbiAgICAgIGVsc2UgeyBcclxuICAgICAgICB2YXIgdGFza0NoZWNrYm94ID0gY3JlYXRlRWxlbWVudHMoJ2lucHV0JywgXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgdHlwZTogJ2NoZWNrYm94JyxcclxuICAgICAgICAgIHZhbHVlOiBpdGVtLmlkICAgICAgICAgICAgXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHZhciB0YXNrSW5wdXQgPSBjcmVhdGVFbGVtZW50cygnaW5wdXQnLCBcclxuICAgICAge1xyXG4gICAgICAgIHR5cGU6ICd0ZXh0JyxcclxuICAgICAgICB2YWx1ZTogaXRlbS52YWx1ZVxyXG4gICAgICB9KTtcclxuICAgICAgdmFyIHRhc2tFZGl0QnRuID0gY3JlYXRlRWxlbWVudHMoJ2J1dHRvbicsIFxyXG4gICAgICB7XHJcbiAgICAgICAgY2xhc3M6ICdlZGl0J1xyXG4gICAgICB9KTtcclxuICAgICAgdmFyIHRhc2tTYXZlQnRuID0gY3JlYXRlRWxlbWVudHMoJ2J1dHRvbicsIFxyXG4gICAgICB7XHJcbiAgICAgICAgY2xhc3M6ICdzYXZlJ1xyXG4gICAgICB9KTtcclxuICAgICAgdmFyIHRhc2tEZWxldGVCdG4gPSBjcmVhdGVFbGVtZW50cygnYnV0dG9uJywgXHJcbiAgICAgIHtcclxuICAgICAgICBjbGFzczogJ2RlbGV0ZSdcclxuICAgICAgfSk7XHJcblxyXG4gICAgICB0YXNrVGV4dC5pbm5lclRleHQgPSBpdGVtLnZhbHVlO1xyXG4gICAgICB0YXNrRWRpdEJ0bi5pbm5lclRleHQgPSBcIkVkaXRcIjtcclxuICAgICAgdGFza1NhdmVCdG4uaW5uZXJUZXh0ID0gXCJTYXZlXCI7XHJcbiAgICAgIHRhc2tEZWxldGVCdG4uaW5uZXJUZXh0ID0gXCJEZWxldGVcIjtcclxuXHJcbiAgICAgIHRhc2tJdGVtLmFwcGVuZENoaWxkKHRhc2tDaGVja2JveCk7XHJcbiAgICAgIHRhc2tJdGVtLmFwcGVuZENoaWxkKHRhc2tUZXh0KTtcclxuICAgICAgdGFza0l0ZW0uYXBwZW5kQ2hpbGQodGFza0lucHV0KTtcclxuICAgICAgdGFza0l0ZW0uYXBwZW5kQ2hpbGQodGFza0VkaXRCdG4pO1xyXG4gICAgICB0YXNrSXRlbS5hcHBlbmRDaGlsZCh0YXNrU2F2ZUJ0bik7XHJcbiAgICAgIHRhc2tJdGVtLmFwcGVuZENoaWxkKHRhc2tEZWxldGVCdG4pO1xyXG5cclxuICAgICAgcmV0dXJuIHRhc2tJdGVtO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGNyZWF0ZUVsZW1lbnRzKGVsZW1lbnQsIG9iaikge1xyXG4gICAgICB2YXIgaXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoZWxlbWVudCk7XHJcbiAgICAgIFxyXG4gICAgICBmb3IodmFyIHByb3AgaW4gb2JqKSB7XHJcbiAgICAgICAgaXRlbS5zZXRBdHRyaWJ1dGUocHJvcCwgb2JqW3Byb3BdKTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gaXRlbTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBzdG9yYWdlKHBhdGgpe1xyXG5cclxuICAgICAgZnVuY3Rpb24gc2V0SXRlbVZhbHVlKGlkLCBmaWVsZCwgdmFsdWUpIHtcclxuICAgICAgICB2YXIgY3VycmVudEl0ZW1zID0gcmVhZERhdGFGcm9tU3RvcmFnZSgpO1xyXG5cclxuICAgICAgICBjdXJyZW50SXRlbXMuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkge1xyXG4gICAgICAgICAgaWYgKGl0ZW0uaWQgPT09IGlkKSB7XHJcbiAgICAgICAgICAgIGl0ZW1bZmllbGRdID0gdmFsdWVcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgc2F2ZUFycmF5KGN1cnJlbnRJdGVtcyk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGZ1bmN0aW9uIHNhdmVBcnJheShhcnJheSkge1xyXG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKHBhdGgsIEpTT04uc3RyaW5naWZ5KGFycmF5KSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGZ1bmN0aW9uIHNhdmVJdGVtKGl0ZW0pIHtcclxuICAgICAgICB2YXIgY3VycmVudEl0ZW1zID0gcmVhZERhdGFGcm9tU3RvcmFnZSgpO1xyXG4gICAgICAgIGN1cnJlbnRJdGVtcy51bnNoaWZ0KGl0ZW0pO1xyXG4gICAgICAgIHNhdmVBcnJheShjdXJyZW50SXRlbXMpXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGZ1bmN0aW9uIHJlbW92ZUl0ZW0oaWQpIHtcclxuICAgICAgICB2YXIgY3VycmVudEl0ZW1zID0gcmVhZERhdGFGcm9tU3RvcmFnZSgpO1xyXG4gICAgICAgIHNhdmVBcnJheShcclxuICAgICAgICAgIGN1cnJlbnRJdGVtcy5maWx0ZXIoZnVuY3Rpb24gKGl0ZW0pIHtcclxuICAgICAgICAgICAgcmV0dXJuIGl0ZW0uaWQgIT09IGlkO1xyXG4gICAgICAgICAgfSlcclxuICAgICAgICApO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBmdW5jdGlvbiByZWFkRGF0YUZyb21TdG9yYWdlKCkge1xyXG4gICAgICAgIHJldHVybiBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKHBhdGgpKSB8fCBbXTtcclxuICAgICAgfVxyXG5cclxuICAgICAgZnVuY3Rpb24gc3RvcmFnZUNoZWNrKGkpIHtcclxuICAgICAgICB2YXIgbG9jU3Rvckxlbmd0aCA9IGxvY2FsU3RvcmFnZS5sZW5ndGg7XHJcblxyXG4gICAgICAgIGZvciAodmFyIGogPSAwLCBjb3VudCA9IDA7IGogPCBsb2NTdG9yTGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgIGlmIChjb3VudCA8IGkpIHtcclxuICAgICAgICAgICAgICBjb3VudCsrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0obG9jYWxTdG9yYWdlLmtleShjb3VudCkpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gICAgICAgIFxyXG4gICAgICB9XHJcblxyXG4gICAgICBmdW5jdGlvbiBjaGVja0Rpc2FibGUoKXtcclxuICAgICAgICB2YXIgdGVzdCA9ICd0ZXN0JztcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0odGVzdCwgdGVzdCk7XHJcbiAgICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSh0ZXN0KTtcclxuICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH0gXHJcbiAgICAgICAgY2F0Y2goZSkge1xyXG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICBzZXRJdGVtOiBzYXZlSXRlbSxcclxuICAgICAgICBzZXRJdGVtVmFsdWU6IHNldEl0ZW1WYWx1ZSxcclxuICAgICAgICBzZXRBcnJheTogc2F2ZUFycmF5LFxyXG4gICAgICAgIHJlbW92ZUl0ZW06IHJlbW92ZUl0ZW0sXHJcbiAgICAgICAgZ2V0OiByZWFkRGF0YUZyb21TdG9yYWdlLFxyXG4gICAgICAgIGNoZWNrOiBzdG9yYWdlQ2hlY2ssXHJcbiAgICAgICAgZGlzYWJsZTogY2hlY2tEaXNhYmxlXHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgaW5pdDogaW5pdCxcclxuICAgICAgc3RvcmFnZTogc3RvcmFnZVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgZnVuY3Rpb24oKSB7XHJcbiAgICB2YXIgdGFza0xpc3RzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgndG8tZG8tbGlzdCcpXHJcbiAgICBcclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGFza0xpc3RzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIHRhc2tMaXN0c1tpXSA9IHRvZG9MaXN0KHRhc2tMaXN0c1tpXSwgaSkuaW5pdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHRvZG9MaXN0KCkuc3RvcmFnZSgpLmNoZWNrKGkpO1xyXG4gIH0pO1xyXG59KSgpOyJdLCJmaWxlIjoibWFpbi5qcyJ9
