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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJtYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xyXG5cclxuZnVuY3Rpb24gdG9kb0xpc3QoKSB7XHJcbiAgdmFyIHRvRG9Db250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndG8tZG8tbGlzdCcpO1xyXG4gIHZhciB0YXNrTGlzdHMgPSB7fTtcclxuICB2YXIgdGFza3NTdG9yYWdlID0gc3RvcmFnZSgndGFza3NMaXN0Jyk7XHJcblxyXG4gIGZ1bmN0aW9uIGluaXQoKSB7XHJcbiAgICB2YXIgaW5pdGlhbExpc3RzSXRlbXMgPSB0YXNrc1N0b3JhZ2UuZ2V0KCk7XHJcbiAgICB0YXNrTGlzdHMgPSByZW5kZXJUYXNrTGlzdHMoaW5pdGlhbExpc3RzSXRlbXMpO1xyXG4gICAgd2F0Y2hBZGRUYXNrRm9ybSgpO1xyXG5cclxuICAgIHJldHVybiB0YXNrTGlzdHM7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiB3YXRjaEFkZFRhc2tGb3JtKCkge1xyXG4gICB2YXIgYWRkVGFza0lucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ25ldy10YXNrJyksXHJcbiAgIGFkZFRhc2tTdWJtaXRCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWRkJyk7XHJcblxyXG4gICBhZGRUYXNrU3VibWl0QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgIHZhciBpdGVtID0ge1xyXG5cdFx0XHRcdGlkOiBNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKDM2KS5zdWJzdHIoMiwgOSksIC8vINCz0LXQvdC10YDQsNGG0LjRjyDRg9C90LjQutCw0LvRjNC90L7Qs9C+IGlkXHJcbiAgICAgICAgdmFsdWU6IGFkZFRhc2tJbnB1dC52YWx1ZSxcclxuICAgICAgICBjb21wbGV0ZWQ6IGZhbHNlXHJcbiAgICAgIH07XHJcblxyXG4gICAgICBhZGRJdGVtVG9MaXN0KGl0ZW0pO1xyXG4gICAgICB0YXNrc1N0b3JhZ2Uuc2V0SXRlbShpdGVtKTtcclxuICAgIH0pO1xyXG5cclxuICAgZnVuY3Rpb24gYWRkSXRlbVRvTGlzdChpdGVtKSB7XHJcbiAgICB0YXNrTGlzdHMuaW5jb21wbGV0ZWQuYXBwZW5kQ2hpbGQoXHJcbiAgICAgIHJlbmRlckxpc3RJdGVtKGl0ZW0pXHJcbiAgICAgIClcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJlbmRlclRhc2tMaXN0cyhpbml0aWFsTGlzdHNJdGVtcykge1xyXG4gIHZhciBjb21wbGV0ZWRMaXN0ID0gdG9Eb0NvbnRhaW5lci5xdWVyeVNlbGVjdG9yKFwiLmNvbXBsZXRlZC10YXNrc1wiKSxcclxuICBpbmNvbXBsZXRlZExpc3QgPSB0b0RvQ29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoXCIuaW5jb21wbGV0ZS10YXNrc1wiKSxcclxuICBjb21wbGV0ZWRMaXN0Q29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpLFxyXG4gIGluY29tcGxldGVkTGlzdENvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcclxuICBcclxuICBpbml0aWFsTGlzdHNJdGVtcy5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgIGlmIChpdGVtLmNvbXBsZXRlZCkge1xyXG4gICAgcmV0dXJuIGNvbXBsZXRlZExpc3RDb250YWluZXIuYXBwZW5kQ2hpbGQoXHJcbiAgICAgIHJlbmRlckxpc3RJdGVtKGl0ZW0pXHJcbiAgICAgICk7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gaW5jb21wbGV0ZWRMaXN0Q29udGFpbmVyLmFwcGVuZENoaWxkKFxyXG4gICAgcmVuZGVyTGlzdEl0ZW0oaXRlbSlcclxuICAgICk7XHJcbiAgfSk7XHJcblxyXG4gIGNvbXBsZXRlZExpc3QuYXBwZW5kQ2hpbGQoY29tcGxldGVkTGlzdENvbnRhaW5lcik7XHJcbiAgaW5jb21wbGV0ZWRMaXN0LmFwcGVuZENoaWxkKGluY29tcGxldGVkTGlzdENvbnRhaW5lcik7XHJcbiAgXHJcbiAgcmV0dXJuIHtcclxuICAgaW5jb21wbGV0ZWQ6IGluY29tcGxldGVkTGlzdCxcclxuICAgY29tcGxldGVkOiBjb21wbGV0ZWRMaXN0XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiByZW5kZXJMaXN0SXRlbShpdGVtKSB7XHJcblxyXG4gIGZ1bmN0aW9uIGNyZWF0ZUVsZW1lbnRzKGVsZW1lbnQsIGF0dHJzKSB7XHJcbiAgICB2YXIgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoZWxlbWVudCk7XHJcbiAgICByZXR1cm4gc2V0QXR0cmlidXRlcyhlbGVtZW50LCBhdHRycyk7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBzZXRBdHRyaWJ1dGVzKGVsZW1lbnQsIGF0dHJzKSB7XHJcbiAgICBPYmplY3Qua2V5cyhhdHRycykuZm9yRWFjaChmdW5jdGlvbihrZXkpe1xyXG4gICAgICBlbGVtZW50LnNldEF0dHJpYnV0ZShrZXksIGF0dHJzW2tleV0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIGVsZW1lbnQ7XHJcbiAgfVxyXG5cclxuICBpZihpdGVtLmNvbXBsZXRlZCkge1xyXG4gICAgdmFyIHRhc2tJdGVtID0gY3JlYXRlRWxlbWVudHMoJ2xpJywgXHJcbiAgICB7XHJcbiAgICAgICdkYXRhLWlkJzogaXRlbS5pZFxyXG4gICAgfSksXHJcbiAgICB0YXNrVGV4dCA9IGNyZWF0ZUVsZW1lbnRzKCdsYWJlbCcsIHtcclxuXHJcbiAgICB9KSxcclxuICAgIHRhc2tDaGVja2JveCA9IGNyZWF0ZUVsZW1lbnRzKCdpbnB1dCcsIFxyXG4gICAge1xyXG4gICAgICB0eXBlOiAnY2hlY2tib3gnLFxyXG4gICAgICB2YWx1ZTogaXRlbS5pZCxcclxuICAgICAgY2hlY2tlZDogJydcclxuXHJcbiAgICB9KSwgXHJcbiAgICB0YXNrSW5wdXQgPSBjcmVhdGVFbGVtZW50cygnaW5wdXQnLCBcclxuICAgIHtcclxuICAgICAgdHlwZTogJ3RleHQnLFxyXG4gICAgICB2YWx1ZTogaXRlbS52YWx1ZVxyXG4gICAgfSksXHJcbiAgICB0YXNrRWRpdEJ0biA9IGNyZWF0ZUVsZW1lbnRzKCdidXR0b24nLCBcclxuICAgIHtcclxuICAgICAgY2xhc3M6ICdlZGl0J1xyXG4gICAgfSksXHJcbiAgICB0YXNrRGVsZXRlQnRuID0gY3JlYXRlRWxlbWVudHMoJ2J1dHRvbicsIFxyXG4gICAge1xyXG4gICAgICBjbGFzczogJ2RlbGV0ZSdcclxuICAgIH0pO1xyXG4gIH0gXHJcblxyXG4gIGVsc2Uge1xyXG4gICAgdmFyIHRhc2tJdGVtID0gY3JlYXRlRWxlbWVudHMoJ2xpJywgXHJcbiAgICB7XHJcbiAgICAgICdkYXRhLWlkJzogaXRlbS5pZFxyXG4gICAgfSksXHJcbiAgICB0YXNrVGV4dCA9IGNyZWF0ZUVsZW1lbnRzKCdsYWJlbCcsIHtcclxuXHJcbiAgICB9KSxcclxuICAgIHRhc2tDaGVja2JveCA9IGNyZWF0ZUVsZW1lbnRzKCdpbnB1dCcsIFxyXG4gICAge1xyXG4gICAgICB0eXBlOiAnY2hlY2tib3gnLFxyXG4gICAgICB2YWx1ZTogaXRlbS5pZCAgICAgICAgICAgIFxyXG4gICAgfSksIFxyXG4gICAgdGFza0lucHV0ID0gY3JlYXRlRWxlbWVudHMoJ2lucHV0JywgXHJcbiAgICB7XHJcbiAgICAgIHR5cGU6ICd0ZXh0JyxcclxuICAgICAgdmFsdWU6IGl0ZW0udmFsdWVcclxuICAgIH0pLFxyXG4gICAgdGFza0VkaXRCdG4gPSBjcmVhdGVFbGVtZW50cygnYnV0dG9uJywgXHJcbiAgICB7XHJcbiAgICAgIGNsYXNzOiAnZWRpdCdcclxuICAgIH0pLFxyXG4gICAgdGFza0RlbGV0ZUJ0biA9IGNyZWF0ZUVsZW1lbnRzKCdidXR0b24nLCBcclxuICAgIHtcclxuICAgICAgY2xhc3M6ICdkZWxldGUnXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHRhc2tUZXh0LmlubmVyVGV4dCA9IGl0ZW0udmFsdWU7XHJcbiAgdGFza0VkaXRCdG4uaW5uZXJUZXh0ID0gXCJFZGl0XCI7XHJcbiAgdGFza0RlbGV0ZUJ0bi5pbm5lclRleHQgPSBcIkRlbGV0ZVwiO1xyXG5cclxuICBcclxuICAvKmlmICh0YXNrTGlzdHMuaW5jb21wbGV0ZWQgIT0gdW5kZWZpbmVkIHx8IHRhc2tMaXN0cy5jb21wbGV0ZWQgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICBjb25zb2xlLmxvZyh0YXNrTGlzdHMuaW5jb21wbGV0ZWQpXHJcbiAgICB0YXNrTGlzdHMuaW5jb21wbGV0ZWQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihldmVudCl7XHJcbiAgICAgIGlmIChldmVudC50YXJnZXQgPT0gdGFza0VkaXRCdG4pIHtcclxuICAgICAgICBlZGl0SXRlbSgpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoZXZlbnQudGFyZ2V0ID09IHRhc2tEZWxldGVCdG4pIHtcclxuICAgICAgICBkZWxldGVJdGVtKCk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChldmVudC50YXJnZXQgPT0gdGFza0NoZWNrYm94KSB7XHJcbiAgICAgICAgbW92ZUl0ZW0oKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfSovXHJcbiAgLyp0YXNrQ2hlY2tib3guYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgbW92ZUl0ZW0pO1xyXG4gIHRhc2tFZGl0QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZWRpdEl0ZW0pO1xyXG4gIHRhc2tEZWxldGVCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBkZWxldGVJdGVtKTsqL1xyXG5cclxuICBmdW5jdGlvbiBkZWxldGVJdGVtKCkge1xyXG4gICAgdmFyIGNvbXBsZXRlZCA9IHRhc2tDaGVja2JveC5jaGVja2VkLFxyXG4gICAgaWQgPSB0YXNrQ2hlY2tib3gudmFsdWU7XHJcblxyXG4gICAgaWYgKGNvbXBsZXRlZCkge1xyXG4gICAgICB0YXNrTGlzdHMuY29tcGxldGVkLnJlbW92ZUNoaWxkKHRhc2tMaXN0cy5jb21wbGV0ZWQucXVlcnlTZWxlY3RvcihcImxpW2RhdGEtaWQ9XCIgKydcIicgKyBpZCArICdcIicgKyBcIl1cIikpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGFza0xpc3RzLmluY29tcGxldGVkLnJlbW92ZUNoaWxkKHRhc2tMaXN0cy5pbmNvbXBsZXRlZC5xdWVyeVNlbGVjdG9yKFwibGlbZGF0YS1pZD1cIiArJ1wiJyArIGlkICsgJ1wiJyArIFwiXVwiKSk7XHJcbiAgICB9XHJcblxyXG4gICAgdGFza3NTdG9yYWdlLnJlbW92ZUl0ZW0oaWQpO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gZWRpdEl0ZW0oKSB7XHJcbiAgICB2YXIgaWQgPSB0YXNrSXRlbS5nZXRBdHRyaWJ1dGUoJ2RhdGEtaWQnKSxcclxuICAgIGVkaXRNb2RlQ2xhc3MgPSAnZWRpdE1vZGUnO1xyXG5cclxuICAgIGlmICh0YXNrSXRlbS5jbGFzc0xpc3QuY29udGFpbnMoZWRpdE1vZGVDbGFzcykpIHtcclxuICAgICAgdmFyIG5ld1ZhbHVlID0gdGFza0lucHV0LnZhbHVlO1xyXG4gICAgICB0YXNrVGV4dC50ZXh0Q29udGVudCA9IG5ld1ZhbHVlO1xyXG4gICAgICB0YXNrc1N0b3JhZ2Uuc2V0SXRlbVZhbHVlKGlkLCAndmFsdWUnLCBuZXdWYWx1ZSk7XHJcbiAgICAgIHRhc2tFZGl0QnRuLmlubmVyVGV4dCA9IFwiRWRpdFwiO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICB0YXNrRWRpdEJ0bi5pbm5lclRleHQgPSBcIlNhdmVcIjtcclxuICAgfVxyXG5cclxuICAgdGFza0l0ZW0uY2xhc3NMaXN0LnRvZ2dsZShlZGl0TW9kZUNsYXNzKTtcclxuIH1cclxuXHJcbiAgIGZ1bmN0aW9uIG1vdmVJdGVtKCkge1xyXG4gICAgdmFyIGlkID0gdGFza0NoZWNrYm94LnZhbHVlLFxyXG4gICAgY29tcGxldGVkID0gdGFza0NoZWNrYm94LmNoZWNrZWQ7XHJcbiAgICBpZiAoY29tcGxldGVkKSB7XHJcbiAgICAgIHRhc2tMaXN0cy5jb21wbGV0ZWQuYXBwZW5kQ2hpbGQodGFza0xpc3RzLmluY29tcGxldGVkLnF1ZXJ5U2VsZWN0b3IoXCJsaVtkYXRhLWlkPVwiICsnXCInICsgaWQgKyAnXCInICsgXCJdXCIpKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRhc2tMaXN0cy5pbmNvbXBsZXRlZC5hcHBlbmRDaGlsZCh0YXNrTGlzdHMuY29tcGxldGVkLnF1ZXJ5U2VsZWN0b3IoXCJsaVtkYXRhLWlkPVwiICsnXCInICsgaWQgKyAnXCInICsgXCJdXCIpKTtcclxuICAgIH1cclxuICAgIHRhc2tzU3RvcmFnZS5zZXRJdGVtVmFsdWUoaWQsICdjb21wbGV0ZWQnLCBjb21wbGV0ZWQpO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIGFwcGVuZENoaWxkcmVuQXJyYXkodGFza0l0ZW0sIFtcclxuICAgIHRhc2tDaGVja2JveCxcclxuICAgIHRhc2tUZXh0LFxyXG4gICAgdGFza0lucHV0LFxyXG4gICAgdGFza0VkaXRCdG4sXHJcbiAgICB0YXNrRGVsZXRlQnRuXHJcbiAgICBdKVxyXG59XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBpbml0OiBpbml0XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBzdG9yYWdlKHBhdGgpe1xyXG4gIGZ1bmN0aW9uIHNldEl0ZW1WYWx1ZShpZCwgZmllbGQsIHZhbHVlKSB7XHJcbiAgICB2YXIgY3VycmVudEl0ZW1zID0gcmVhZERhdGFGcm9tU3RvcmFnZSgpO1xyXG5cclxuICAgIGN1cnJlbnRJdGVtcy5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgICAgIGlmIChpdGVtLmlkID09PSBpZCkge1xyXG4gICAgICAgIGl0ZW1bZmllbGRdID0gdmFsdWVcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgc2F2ZUFycmF5KGN1cnJlbnRJdGVtcyk7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBzYXZlQXJyYXkoYXJyYXkpIHtcclxuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKHBhdGgsIEpTT04uc3RyaW5naWZ5KGFycmF5KSk7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBzYXZlSXRlbShpdGVtKSB7XHJcbiAgICB2YXIgY3VycmVudEl0ZW1zID0gcmVhZERhdGFGcm9tU3RvcmFnZSgpO1xyXG4gICAgY3VycmVudEl0ZW1zLnB1c2goaXRlbSk7XHJcbiAgICBzYXZlQXJyYXkoY3VycmVudEl0ZW1zKVxyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gcmVtb3ZlSXRlbShpZCkge1xyXG4gICAgdmFyIGN1cnJlbnRJdGVtcyA9IHJlYWREYXRhRnJvbVN0b3JhZ2UoKTtcclxuICAgIHNhdmVBcnJheShcclxuICAgICAgY3VycmVudEl0ZW1zLmZpbHRlcihmdW5jdGlvbiAoaXRlbSkge1xyXG4gICAgICAgIHJldHVybiBpdGVtLmlkICE9PSBpZDtcclxuICAgICAgfSlcclxuICAgICAgKTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIHJlYWREYXRhRnJvbVN0b3JhZ2UoKSB7XHJcbiAgICByZXR1cm4gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbShwYXRoKSkgfHwgW107XHJcbiAgfVxyXG5cclxuICByZXR1cm4ge1xyXG4gICAgc2V0SXRlbTogc2F2ZUl0ZW0sXHJcbiAgICBzZXRJdGVtVmFsdWU6IHNldEl0ZW1WYWx1ZSxcclxuICAgIHNldEFycmF5OiBzYXZlQXJyYXksXHJcbiAgICByZW1vdmVJdGVtOiByZW1vdmVJdGVtLFxyXG4gICAgZ2V0OiByZWFkRGF0YUZyb21TdG9yYWdlXHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBhcHBlbmRDaGlsZHJlbkFycmF5KHBhcmVudCwgY2hpbGRyZW4pIHtcclxuICBjaGlsZHJlbi5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgICBwYXJlbnQuYXBwZW5kQ2hpbGQoaXRlbSk7XHJcbiAgfSk7XHJcblxyXG4gIHJldHVybiBwYXJlbnQ7XHJcbn1cclxuXHJcbndpbmRvdy5vbmxvYWQgPSBmdW5jdGlvbigpIHtcclxuICB2YXIgdGFza0xpc3RzID0gdG9kb0xpc3QoKS5pbml0KCk7XHJcbn07Il0sImZpbGUiOiJtYWluLmpzIn0=
