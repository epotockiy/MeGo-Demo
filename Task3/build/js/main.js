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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJtYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xyXG5cclxuZnVuY3Rpb24gdG9kb0xpc3QobGlzdCwgaSkge1xyXG4gIHZhciB0b0RvQ29udGFpbmVyID0gbGlzdDtcclxuICB2YXIgdGFza0xpc3RzID0ge307XHJcbiAgdmFyIHRhc2tzU3RvcmFnZSA9IHN0b3JhZ2UoJ3Rhc2tzTGlzdCcgKyBpKTtcclxuXHJcbiAgZnVuY3Rpb24gaW5pdCgpIHtcclxuICAgIHRhc2tzU3RvcmFnZS5jaGVjayhpKTtcclxuICAgIHZhciBpbml0aWFsTGlzdHNJdGVtcyA9IHRhc2tzU3RvcmFnZS5nZXQoKTtcclxuICAgIHRhc2tMaXN0cyA9IHJlbmRlclRhc2tMaXN0cyhpbml0aWFsTGlzdHNJdGVtcyk7XHJcbiAgICB3YXRjaFRhc2tDaGFuZ2VzKCk7XHJcblxyXG4gICAgcmV0dXJuIHRhc2tMaXN0cztcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIHdhdGNoVGFza0NoYW5nZXMoKSB7XHJcblxyXG4gICAgZnVuY3Rpb24gYWRkTGlzdGVuZXIoKXtcclxuICAgICAgdmFyIGFkZFRhc2tJbnB1dCA9IHRvRG9Db250YWluZXIucXVlcnlTZWxlY3RvcignLm5ldy10YXNrJyksXHJcbiAgICAgIGFkZFRhc2tTdWJtaXRCdG4gPSB0b0RvQ29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJy5hZGQnKTtcclxuXHJcbiAgICAgIGFkZFRhc2tTdWJtaXRCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIGl0ZW0gPSB7XHJcbiAgICAgICAgICBpZDogTWF0aC5yYW5kb20oKS50b1N0cmluZygzNikuc3Vic3RyKDIsIDkpLCAvLyDQs9C10L3QtdGA0LDRhtC40Y8g0YPQvdC40LrQsNC70YzQvdC+0LPQviBpZFxyXG4gICAgICAgICAgdmFsdWU6IGFkZFRhc2tJbnB1dC52YWx1ZSxcclxuICAgICAgICAgIGNvbXBsZXRlZDogZmFsc2VcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBhZGRJdGVtVG9MaXN0KGl0ZW0pO1xyXG4gICAgICAgIHRhc2tzU3RvcmFnZS5zZXRJdGVtKGl0ZW0pO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIGZ1bmN0aW9uIGFkZEl0ZW1Ub0xpc3QoaXRlbSkge1xyXG4gICAgICAgIHZhciByZW5kZXJMaXN0T2JqID0gcmVuZGVyTGlzdEl0ZW0oaXRlbSk7XHJcblxyXG4gICAgICAgIHRhc2tMaXN0cy5pbmNvbXBsZXRlZC5pbnNlcnRCZWZvcmUoXHJcbiAgICAgICAgICByZW5kZXJMaXN0T2JqLnRhc2tJdGVtLFxyXG4gICAgICAgICAgdGFza0xpc3RzLmluY29tcGxldGVkLmZpcnN0Q2hpbGRcclxuICAgICAgICApO1xyXG4gICAgICAgIHRhc2tMaXN0cy5idXR0b25zLnB1c2gocmVuZGVyTGlzdE9iaik7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBjaGFuZ2VzTGlzdGVudGVyKGxpc3QpIHtcclxuICAgICAgbGlzdC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGV2ZW50KXtcclxuICAgICAgICB0YXNrTGlzdHMuYnV0dG9ucy5mb3JFYWNoKGZ1bmN0aW9uKGl0ZW0pe1xyXG4gICAgICAgICAgaWYgKGV2ZW50LnRhcmdldCA9PSBpdGVtLmNoZWNrYm94KSB7XHJcbiAgICAgICAgICAgIG1vdmVJdGVtKGl0ZW0pO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGlmIChldmVudC50YXJnZXQgPT0gaXRlbS5lZGl0KSB7XHJcbiAgICAgICAgICAgIGVkaXRJdGVtKGl0ZW0pO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGlmIChldmVudC50YXJnZXQgPT0gaXRlbS5kZWxldGUpIHtcclxuICAgICAgICAgICAgZGVsZXRlSXRlbShpdGVtKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTsgIFxyXG4gICAgICB9KVxyXG5cclxuICAgICAgZnVuY3Rpb24gZGVsZXRlSXRlbShpdGVtKSB7XHJcbiAgICAgICAgdmFyIGNvbXBsZXRlZCA9IGl0ZW0uY2hlY2tib3guY2hlY2tlZCxcclxuICAgICAgICBpZCA9IGl0ZW0uY2hlY2tib3gudmFsdWU7XHJcblxyXG4gICAgICAgIGlmIChjb21wbGV0ZWQpIHtcclxuICAgICAgICAgIHRhc2tMaXN0cy5jb21wbGV0ZWQucmVtb3ZlQ2hpbGQodGFza0xpc3RzLmNvbXBsZXRlZC5xdWVyeVNlbGVjdG9yKFwibGlbZGF0YS1pZD1cIiArJ1wiJyArIGlkICsgJ1wiJyArIFwiXVwiKSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRhc2tMaXN0cy5pbmNvbXBsZXRlZC5yZW1vdmVDaGlsZCh0YXNrTGlzdHMuaW5jb21wbGV0ZWQucXVlcnlTZWxlY3RvcihcImxpW2RhdGEtaWQ9XCIgKydcIicgKyBpZCArICdcIicgKyBcIl1cIikpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGFza0xpc3RzLmJ1dHRvbnMgPSB0YXNrTGlzdHMuYnV0dG9ucy5maWx0ZXIoZnVuY3Rpb24oZWxlbSl7XHJcbiAgICAgICAgICByZXR1cm4gZWxlbS5jaGVja2JveC52YWx1ZSAhPSBpZDtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGFza3NTdG9yYWdlLnJlbW92ZUl0ZW0oaWQpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBmdW5jdGlvbiBlZGl0SXRlbShpdGVtKSB7XHJcbiAgICAgICAgdmFyIGlkID0gaXRlbS50YXNrSXRlbS5nZXRBdHRyaWJ1dGUoJ2RhdGEtaWQnKSxcclxuICAgICAgICBlZGl0TW9kZUNsYXNzID0gJ2VkaXRNb2RlJztcclxuXHJcbiAgICAgICAgaWYgKGl0ZW0udGFza0l0ZW0uY2xhc3NMaXN0LmNvbnRhaW5zKGVkaXRNb2RlQ2xhc3MpKSB7XHJcbiAgICAgICAgICB2YXIgbmV3VmFsdWUgPSBpdGVtLmlucHV0LnZhbHVlO1xyXG4gICAgICAgICAgXHJcbiAgICAgICAgICBpdGVtLnRleHQudGV4dENvbnRlbnQgPSBuZXdWYWx1ZTtcclxuICAgICAgICAgIHRhc2tzU3RvcmFnZS5zZXRJdGVtVmFsdWUoaWQsICd2YWx1ZScsIG5ld1ZhbHVlKTtcclxuICAgICAgICAgIGl0ZW0uZWRpdC5pbm5lclRleHQgPSBcIkVkaXRcIjtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICBpdGVtLmVkaXQuaW5uZXJUZXh0ID0gXCJTYXZlXCI7XHJcbiAgICAgICB9XHJcblxyXG4gICAgICAgaXRlbS50YXNrSXRlbS5jbGFzc0xpc3QudG9nZ2xlKGVkaXRNb2RlQ2xhc3MpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBmdW5jdGlvbiBtb3ZlSXRlbShpdGVtKSB7XHJcbiAgICAgICAgdmFyIGlkID0gaXRlbS5jaGVja2JveC52YWx1ZSxcclxuICAgICAgICBjb21wbGV0ZWQgPSBpdGVtLmNoZWNrYm94LmNoZWNrZWQ7XHJcbiAgICAgICAgaWYgKGNvbXBsZXRlZCkge1xyXG4gICAgICAgICAgdGFza0xpc3RzLmNvbXBsZXRlZC5pbnNlcnRCZWZvcmUodGFza0xpc3RzLmluY29tcGxldGVkLnF1ZXJ5U2VsZWN0b3IoXCJsaVtkYXRhLWlkPVwiICsnXCInICsgaWQgKyAnXCInICsgXCJdXCIpLCB0YXNrTGlzdHMuY29tcGxldGVkLmZpcnN0Q2hpbGQpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0YXNrTGlzdHMuaW5jb21wbGV0ZWQuYXBwZW5kQ2hpbGQodGFza0xpc3RzLmNvbXBsZXRlZC5xdWVyeVNlbGVjdG9yKFwibGlbZGF0YS1pZD1cIiArJ1wiJyArIGlkICsgJ1wiJyArIFwiXVwiKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRhc2tzU3RvcmFnZS5zZXRJdGVtVmFsdWUoaWQsICdjb21wbGV0ZWQnLCBjb21wbGV0ZWQpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgYWRkTGlzdGVuZXIoKTtcclxuICAgIGNoYW5nZXNMaXN0ZW50ZXIodGFza0xpc3RzLmluY29tcGxldGVkKTtcclxuICAgIGNoYW5nZXNMaXN0ZW50ZXIodGFza0xpc3RzLmNvbXBsZXRlZCk7ICBcclxuICB9XHJcblxyXG5mdW5jdGlvbiByZW5kZXJUYXNrTGlzdHMoaW5pdGlhbExpc3RzSXRlbXMpIHtcclxuICB2YXIgY29tcGxldGVkTGlzdCA9IHRvRG9Db250YWluZXIucXVlcnlTZWxlY3RvcihcIi5jb21wbGV0ZWQtdGFza3NcIiksXHJcbiAgaW5jb21wbGV0ZWRMaXN0ID0gdG9Eb0NvbnRhaW5lci5xdWVyeVNlbGVjdG9yKFwiLmluY29tcGxldGUtdGFza3NcIiksXHJcbiAgY29tcGxldGVkTGlzdENvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKSxcclxuICBpbmNvbXBsZXRlZExpc3RDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCksXHJcbiAgdXBkYXRlQnV0dG9ucyA9IFtdO1xyXG4gIFxyXG4gIGluaXRpYWxMaXN0c0l0ZW1zLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHtcclxuICAgIHZhciByZW5kZXJMaXN0T2JqID0gcmVuZGVyTGlzdEl0ZW0oaXRlbSk7XHJcblxyXG4gICAgaWYgKGl0ZW0uY29tcGxldGVkKSB7XHJcbiAgICAgIHJldHVybiBhcHBlbmRFbGVtZW50cyhjb21wbGV0ZWRMaXN0Q29udGFpbmVyLCB1cGRhdGVCdXR0b25zLCByZW5kZXJMaXN0T2JqKVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBhcHBlbmRFbGVtZW50cyhpbmNvbXBsZXRlZExpc3RDb250YWluZXIsIHVwZGF0ZUJ1dHRvbnMsIHJlbmRlckxpc3RPYmopXHJcbiAgfSk7XHJcblxyXG4gIGNvbXBsZXRlZExpc3QuYXBwZW5kQ2hpbGQoY29tcGxldGVkTGlzdENvbnRhaW5lcik7XHJcbiAgaW5jb21wbGV0ZWRMaXN0LmFwcGVuZENoaWxkKGluY29tcGxldGVkTGlzdENvbnRhaW5lcik7XHJcbiAgXHJcbiAgZnVuY3Rpb24gYXBwZW5kRWxlbWVudHMoY29udGFpbmVyLCBlbGVtZW50cywgaXRlbSkge1xyXG4gICAgY29udGFpbmVyLmFwcGVuZENoaWxkKFxyXG4gICAgICBpdGVtLnRhc2tJdGVtXHJcbiAgICApO1xyXG5cclxuICAgIGVsZW1lbnRzLnB1c2goaXRlbSk7XHJcbiAgfTtcclxuXHJcbiAgcmV0dXJuIHtcclxuICAgaW5jb21wbGV0ZWQ6IGluY29tcGxldGVkTGlzdCxcclxuICAgY29tcGxldGVkOiBjb21wbGV0ZWRMaXN0LFxyXG4gICBidXR0b25zOiB1cGRhdGVCdXR0b25zXHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiByZW5kZXJMaXN0SXRlbShpdGVtKSB7XHJcblxyXG4gIGZ1bmN0aW9uIGNyZWF0ZUVsZW1lbnRzKGVsZW1lbnQsIGF0dHJzKSB7XHJcbiAgICB2YXIgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoZWxlbWVudCk7XHJcbiAgICByZXR1cm4gc2V0QXR0cmlidXRlcyhlbGVtZW50LCBhdHRycyk7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBzZXRBdHRyaWJ1dGVzKGVsZW1lbnQsIGF0dHJzKSB7XHJcbiAgICBPYmplY3Qua2V5cyhhdHRycykuZm9yRWFjaChmdW5jdGlvbihrZXkpe1xyXG4gICAgICBlbGVtZW50LnNldEF0dHJpYnV0ZShrZXksIGF0dHJzW2tleV0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIGVsZW1lbnQ7XHJcbiAgfVxyXG5cclxuICB2YXIgdGFza0l0ZW0gPSBjcmVhdGVFbGVtZW50cygnbGknLCBcclxuICB7XHJcbiAgICAnZGF0YS1pZCc6IGl0ZW0uaWRcclxuICB9KSxcclxuICB0YXNrVGV4dCA9IGNyZWF0ZUVsZW1lbnRzKCdsYWJlbCcsIHtcclxuXHJcbiAgfSk7XHJcbiAgaWYoaXRlbS5jb21wbGV0ZWQpIHtcclxuICAgIHZhciB0YXNrQ2hlY2tib3ggPSBjcmVhdGVFbGVtZW50cygnaW5wdXQnLCBcclxuICAgIHtcclxuICAgICAgdHlwZTogJ2NoZWNrYm94JyxcclxuICAgICAgdmFsdWU6IGl0ZW0uaWQsXHJcbiAgICAgIGNoZWNrZWQ6ICcnXHJcblxyXG4gICAgfSk7XHJcbiAgfSBlbHNlIHsgXHJcbiAgICB2YXIgdGFza0NoZWNrYm94ID0gY3JlYXRlRWxlbWVudHMoJ2lucHV0JywgXHJcbiAgICB7XHJcbiAgICAgIHR5cGU6ICdjaGVja2JveCcsXHJcbiAgICAgIHZhbHVlOiBpdGVtLmlkICAgICAgICAgICAgXHJcbiAgICB9KTtcclxuICB9XHJcbiAgdmFyIHRhc2tJbnB1dCA9IGNyZWF0ZUVsZW1lbnRzKCdpbnB1dCcsIFxyXG4gIHtcclxuICAgIHR5cGU6ICd0ZXh0JyxcclxuICAgIHZhbHVlOiBpdGVtLnZhbHVlXHJcbiAgfSksXHJcbiAgdGFza0VkaXRCdG4gPSBjcmVhdGVFbGVtZW50cygnYnV0dG9uJywgXHJcbiAge1xyXG4gICAgY2xhc3M6ICdlZGl0J1xyXG4gIH0pLFxyXG4gIHRhc2tEZWxldGVCdG4gPSBjcmVhdGVFbGVtZW50cygnYnV0dG9uJywgXHJcbiAge1xyXG4gICAgY2xhc3M6ICdkZWxldGUnXHJcbiAgfSk7XHJcblxyXG4gIHRhc2tUZXh0LmlubmVyVGV4dCA9IGl0ZW0udmFsdWU7XHJcbiAgdGFza0VkaXRCdG4uaW5uZXJUZXh0ID0gXCJFZGl0XCI7XHJcbiAgdGFza0RlbGV0ZUJ0bi5pbm5lclRleHQgPSBcIkRlbGV0ZVwiO1xyXG5cclxuICByZXR1cm4ge1xyXG4gICAgdGFza0l0ZW06IGFwcGVuZENoaWxkcmVuQXJyYXkodGFza0l0ZW0sIFt0YXNrQ2hlY2tib3gsIHRhc2tUZXh0LCB0YXNrSW5wdXQsIHRhc2tFZGl0QnRuLCB0YXNrRGVsZXRlQnRuXSksXHJcbiAgICBjaGVja2JveDogdGFza0NoZWNrYm94LFxyXG4gICAgdGV4dDogdGFza1RleHQsXHJcbiAgICBpbnB1dDogdGFza0lucHV0LFxyXG4gICAgZWRpdDogdGFza0VkaXRCdG4sXHJcbiAgICBkZWxldGU6IHRhc2tEZWxldGVCdG5cclxuICB9XHJcbn1cclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIGluaXQ6IGluaXRcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHN0b3JhZ2UocGF0aCl7XHJcbiAgZnVuY3Rpb24gc2V0SXRlbVZhbHVlKGlkLCBmaWVsZCwgdmFsdWUpIHtcclxuICAgIHZhciBjdXJyZW50SXRlbXMgPSByZWFkRGF0YUZyb21TdG9yYWdlKCk7XHJcblxyXG4gICAgY3VycmVudEl0ZW1zLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHtcclxuICAgICAgaWYgKGl0ZW0uaWQgPT09IGlkKSB7XHJcbiAgICAgICAgaXRlbVtmaWVsZF0gPSB2YWx1ZVxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICBzYXZlQXJyYXkoY3VycmVudEl0ZW1zKTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIHNhdmVBcnJheShhcnJheSkge1xyXG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0ocGF0aCwgSlNPTi5zdHJpbmdpZnkoYXJyYXkpKTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIHNhdmVJdGVtKGl0ZW0pIHtcclxuICAgIHZhciBjdXJyZW50SXRlbXMgPSByZWFkRGF0YUZyb21TdG9yYWdlKCk7XHJcbiAgICBjdXJyZW50SXRlbXMudW5zaGlmdChpdGVtKTtcclxuICAgIHNhdmVBcnJheShjdXJyZW50SXRlbXMpXHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiByZW1vdmVJdGVtKGlkKSB7XHJcbiAgICB2YXIgY3VycmVudEl0ZW1zID0gcmVhZERhdGFGcm9tU3RvcmFnZSgpO1xyXG4gICAgc2F2ZUFycmF5KFxyXG4gICAgICBjdXJyZW50SXRlbXMuZmlsdGVyKGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgICAgICAgcmV0dXJuIGl0ZW0uaWQgIT09IGlkO1xyXG4gICAgICB9KVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIHN0b3JhZ2VDaGVjayhpKSB7XHJcbiAgICBmb3IgKHZhciBqID0gMCwgY291bnQgPSAwOyBqIDwgbG9jYWxTdG9yYWdlLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgIGlmIChsb2NhbFN0b3JhZ2Uua2V5KGopID09ICgndGFza3NMaXN0JyArIGNvdW50KSkge1xyXG4gICAgICAgIGlmIChjb3VudCA8PSBpKSB7XHJcbiAgICAgICAgICBjb3VudCsrO1xyXG4gICAgICAgICAgY29uc29sZS5sb2cobG9jYWxTdG9yYWdlLmxlbmd0aCArXCIgXCIrIGkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKGxvY2FsU3RvcmFnZS5rZXkoaikpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShsb2NhbFN0b3JhZ2Uua2V5KGopKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiByZWFkRGF0YUZyb21TdG9yYWdlKCkge1xyXG4gICAgcmV0dXJuIEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0ocGF0aCkpIHx8IFtdO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIHNldEl0ZW06IHNhdmVJdGVtLFxyXG4gICAgc2V0SXRlbVZhbHVlOiBzZXRJdGVtVmFsdWUsXHJcbiAgICBzZXRBcnJheTogc2F2ZUFycmF5LFxyXG4gICAgcmVtb3ZlSXRlbTogcmVtb3ZlSXRlbSxcclxuICAgIGNoZWNrOiBzdG9yYWdlQ2hlY2ssXHJcbiAgICBnZXQ6IHJlYWREYXRhRnJvbVN0b3JhZ2VcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFwcGVuZENoaWxkcmVuQXJyYXkocGFyZW50LCBjaGlsZHJlbikge1xyXG4gIGNoaWxkcmVuLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHtcclxuICAgIHBhcmVudC5hcHBlbmRDaGlsZChpdGVtKTtcclxuICB9KTtcclxuXHJcbiAgcmV0dXJuIHBhcmVudDtcclxufVxyXG5cclxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgZnVuY3Rpb24oKSB7XHJcbiAgdmFyIHRhc2tMaXN0cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3RvLWRvLWxpc3QnKVxyXG4gIFxyXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgdGFza0xpc3RzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICB0YXNrTGlzdHNbaV0gPSB0b2RvTGlzdCh0YXNrTGlzdHNbaV0sIGkpLmluaXQoKTtcclxuICB9XHJcbn0pOyJdLCJmaWxlIjoibWFpbi5qcyJ9
