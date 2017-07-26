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
        btn.classList.toggle("active");
        list.classList.toggle("hidden-list");
      }
      else {
        activeBtn.classList.toggle("active");
        activeList[0].classList.toggle("hidden-list");

        btn.classList.toggle("active");
        list.classList.toggle("hidden-list");
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
        liSearchString = 'li[data-id=' +'"' + id + '"' + ']',
        id = item.parentNode.getAttribute("data-id");

        if (completed) {
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJtYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xyXG5cclxuZnVuY3Rpb24gdG9kb0xpc3QobGlzdCwgaSkge1xyXG4gIHZhciB0b0RvQ29udGFpbmVyID0gbGlzdDtcclxuICB2YXIgdGFza0xpc3RzID0ge307XHJcbiAgdmFyIHRhc2tzU3RvcmFnZSA9IHN0b3JhZ2UoJ3Rhc2tzTGlzdCcgKyBpKTtcclxuXHJcbiAgZnVuY3Rpb24gaW5pdCgpIHtcclxuICAgIHRhc2tzU3RvcmFnZS5jaGVjayhpKTtcclxuICAgIHZhciBpbml0aWFsTGlzdHNJdGVtcyA9IHRhc2tzU3RvcmFnZS5nZXQoKTtcclxuICAgIHRhc2tMaXN0cyA9IHJlbmRlclRhc2tMaXN0cyhpbml0aWFsTGlzdHNJdGVtcyk7XHJcbiAgICB3YXRjaFRhc2tDaGFuZ2VzKCk7XHJcblxyXG4gICAgcmV0dXJuIHRhc2tMaXN0cztcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIHdhdGNoVGFza0NoYW5nZXMoKSB7XHJcblxyXG4gICAgdmFyIGFkZFRhc2tJbnB1dCA9IHRvRG9Db250YWluZXIucXVlcnlTZWxlY3RvcignLm5ldy10YXNrJyksXHJcbiAgICBhZGRUYXNrU3VibWl0QnRuID0gdG9Eb0NvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCcuYWRkJyksXHJcbiAgICBmaWx0ZXJCdG4gPSB0b0RvQ29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoXCIuZmlsdGVyXCIpO1xyXG5cclxuICAgIGZpbHRlckJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICAgIGlmKGV2ZW50LnRhcmdldC50ZXh0Q29udGVudCA9PSBcIkFsbFwiKXtcclxuICAgICAgICByZXR1cm4gYWN0aXZhdGVGaWx0ZXIoZXZlbnQudGFyZ2V0LCB0YXNrTGlzdHMsIHRhc2tMaXN0cy5hbGwpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZihldmVudC50YXJnZXQudGV4dENvbnRlbnQgPT0gXCJJbmNvbXBsZXRlZFwiKXtcclxuICAgICAgICByZXR1cm4gYWN0aXZhdGVGaWx0ZXIoZXZlbnQudGFyZ2V0LCB0YXNrTGlzdHMsIHRhc2tMaXN0cy5pbmNvbXBsZXRlZCk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmKGV2ZW50LnRhcmdldC50ZXh0Q29udGVudCA9PSBcIkNvbXBsZXRlZFwiKXtcclxuICAgICAgICByZXR1cm4gYWN0aXZhdGVGaWx0ZXIoZXZlbnQudGFyZ2V0LCB0YXNrTGlzdHMsIHRhc2tMaXN0cy5jb21wbGV0ZWQpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICBmdW5jdGlvbiBhY3RpdmF0ZUZpbHRlcihidG4sIGFsbExpc3QsIGxpc3Qpe1xyXG4gICAgICB2YXIgYnRuUGFyZW50ID0gYnRuLnBhcmVudE5vZGU7XHJcbiAgICAgIHZhciBhY3RpdmVCdG4gPSBidG5QYXJlbnQucXVlcnlTZWxlY3RvcihcIi5hY3RpdmVcIik7XHJcbiAgICAgIHZhciBhY3RpdmVMaXN0ID0gT2JqZWN0LnZhbHVlcyhhbGxMaXN0KS5maWx0ZXIoZnVuY3Rpb24oaXRlbSkge1xyXG4gICAgICAgIHJldHVybiAhaXRlbS5jbGFzc0xpc3QuY29udGFpbnMoXCJoaWRkZW4tbGlzdFwiKVxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIGlmKGFjdGl2ZUJ0biA9PSB1bmRlZmluZWQgfHwgYWN0aXZlQnRuID09IGJ0bikge1xyXG4gICAgICAgIGJ0bi5jbGFzc0xpc3QudG9nZ2xlKFwiYWN0aXZlXCIpO1xyXG4gICAgICAgIGxpc3QuY2xhc3NMaXN0LnRvZ2dsZShcImhpZGRlbi1saXN0XCIpO1xyXG4gICAgICB9XHJcbiAgICAgIGVsc2Uge1xyXG4gICAgICAgIGFjdGl2ZUJ0bi5jbGFzc0xpc3QudG9nZ2xlKFwiYWN0aXZlXCIpO1xyXG4gICAgICAgIGFjdGl2ZUxpc3RbMF0uY2xhc3NMaXN0LnRvZ2dsZShcImhpZGRlbi1saXN0XCIpO1xyXG5cclxuICAgICAgICBidG4uY2xhc3NMaXN0LnRvZ2dsZShcImFjdGl2ZVwiKTtcclxuICAgICAgICBsaXN0LmNsYXNzTGlzdC50b2dnbGUoXCJoaWRkZW4tbGlzdFwiKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGFkZFRhc2tTdWJtaXRCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIHZhciBpdGVtID0ge1xyXG4gICAgICAgIGlkOiBNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKDM2KS5zdWJzdHIoMiwgOSksIC8vINCz0LXQvdC10YDQsNGG0LjRjyDRg9C90LjQutCw0LvRjNC90L7Qs9C+IGlkXHJcbiAgICAgICAgdmFsdWU6IGFkZFRhc2tJbnB1dC52YWx1ZSxcclxuICAgICAgICBjb21wbGV0ZWQ6IGZhbHNlXHJcbiAgICAgIH07XHJcblxyXG4gICAgICBpZihhZGRUYXNrSW5wdXQudmFsdWUgPT0gXCJcIil7XHJcbiAgICAgICAgYWxlcnQoXCLQl9Cw0L/QvtC70L3QuNGC0LUg0L/Rg9GB0YLQvtC1INC/0L7Qu9C1IVwiKTtcclxuICAgICAgfSBcclxuICAgICAgZWxzZXtcclxuICAgICAgICBhZGRUYXNrSW5wdXQudmFsdWUgPSBcIlwiO1xyXG4gICAgICAgIGFkZEl0ZW1Ub0xpc3QoaXRlbSk7XHJcbiAgICAgICAgdGFza3NTdG9yYWdlLnNldEl0ZW0oaXRlbSk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIGZ1bmN0aW9uIGFkZEl0ZW1Ub0xpc3QoaXRlbSkge1xyXG4gICAgICB0YXNrTGlzdHMuaW5jb21wbGV0ZWQuaW5zZXJ0QmVmb3JlKFxyXG4gICAgICAgIHJlbmRlckxpc3RJdGVtKGl0ZW0pLFxyXG4gICAgICAgIHRhc2tMaXN0cy5pbmNvbXBsZXRlZC5maXJzdENoaWxkXHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgIHRhc2tMaXN0cy5hbGwuaW5zZXJ0QmVmb3JlKFxyXG4gICAgICAgIHJlbmRlckxpc3RJdGVtKGl0ZW0pLFxyXG4gICAgICAgIHRhc2tMaXN0cy5hbGwuZmlyc3RDaGlsZFxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gY2hhbmdlc0xpc3RlbnRlcihsaXN0KSB7XHJcbiAgICAgIGxpc3QuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihldmVudCl7XHJcbiAgICAgICAgaWYgKGV2ZW50LnRhcmdldC5nZXRBdHRyaWJ1dGUoXCJ0eXBlXCIpID09IFwiY2hlY2tib3hcIikge1xyXG4gICAgICAgICAgcmV0dXJuIG1vdmVJdGVtKGV2ZW50LnRhcmdldCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoZXZlbnQudGFyZ2V0LmNsYXNzTmFtZSA9PSBcImVkaXRcIikge1xyXG4gICAgICAgICAgcmV0dXJuIGVkaXRJdGVtKGV2ZW50LnRhcmdldCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoZXZlbnQudGFyZ2V0LmNsYXNzTmFtZSA9PSBcImRlbGV0ZVwiKSB7XHJcbiAgICAgICAgICAgcmV0dXJuIGRlbGV0ZUl0ZW0oZXZlbnQudGFyZ2V0KTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgZnVuY3Rpb24gZGVsZXRlSXRlbShpdGVtKSB7XHJcbiAgICAgICAgdmFyIGNvbXBsZXRlZCA9IGl0ZW0ucGFyZW50Tm9kZS5xdWVyeVNlbGVjdG9yKCdpbnB1dFt0eXBlPVwiY2hlY2tib3hcIl0nKS5jaGVja2VkLFxyXG4gICAgICAgIGxpU2VhcmNoU3RyaW5nID0gJ2xpW2RhdGEtaWQ9JyArJ1wiJyArIGlkICsgJ1wiJyArICddJyxcclxuICAgICAgICBpZCA9IGl0ZW0ucGFyZW50Tm9kZS5nZXRBdHRyaWJ1dGUoXCJkYXRhLWlkXCIpO1xyXG5cclxuICAgICAgICBpZiAoY29tcGxldGVkKSB7XHJcbiAgICAgICAgICB0YXNrTGlzdHMuYWxsLnJlbW92ZUNoaWxkKHRhc2tMaXN0cy5hbGwucXVlcnlTZWxlY3RvcihsaVNlYXJjaFN0cmluZykpO1xyXG4gICAgICAgICAgdGFza0xpc3RzLmNvbXBsZXRlZC5yZW1vdmVDaGlsZCh0YXNrTGlzdHMuY29tcGxldGVkLnF1ZXJ5U2VsZWN0b3IobGlTZWFyY2hTdHJpbmcpKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGFza0xpc3RzLmFsbC5yZW1vdmVDaGlsZCh0YXNrTGlzdHMuYWxsLnF1ZXJ5U2VsZWN0b3IobGlTZWFyY2hTdHJpbmcpKTtcclxuICAgICAgICAgIHRhc2tMaXN0cy5pbmNvbXBsZXRlZC5yZW1vdmVDaGlsZCh0YXNrTGlzdHMuaW5jb21wbGV0ZWQucXVlcnlTZWxlY3RvcihsaVNlYXJjaFN0cmluZykpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGFza3NTdG9yYWdlLnJlbW92ZUl0ZW0oaWQpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBmdW5jdGlvbiBlZGl0SXRlbShpdGVtKSB7XHJcbiAgICAgICAgdmFyIGlkID0gaXRlbS5wYXJlbnROb2RlLmdldEF0dHJpYnV0ZSgnZGF0YS1pZCcpLFxyXG4gICAgICAgIGNoZWNrYm94ID0gaXRlbS5wYXJlbnROb2RlLnF1ZXJ5U2VsZWN0b3IoJ2lucHV0W3R5cGU9XCJjaGVja2JveFwiXScpLmNoZWNrZWQsXHJcbiAgICAgICAgbGlTZWFyY2hTdHJpbmcgPSAnbGlbZGF0YS1pZD0nICsnXCInICsgaWQgKyAnXCInICsgJ10nLFxyXG4gICAgICAgIGVkaXRNb2RlQ2xhc3MgPSAnZWRpdE1vZGUnO1xyXG5cclxuICAgICAgICBpZihpdGVtLnBhcmVudE5vZGUuY2xhc3NMaXN0LmNvbnRhaW5zKGVkaXRNb2RlQ2xhc3MpKSB7XHJcbiAgICAgICAgICB2YXIgbmV3VmFsdWUgPSBpdGVtLnBhcmVudE5vZGUucXVlcnlTZWxlY3RvcignaW5wdXRbdHlwZT1cInRleHRcIl0nKS52YWx1ZTtcclxuICAgICAgICAgIFxyXG4gICAgICAgICAgaWYoY2hlY2tib3gpIHtcclxuICAgICAgICAgICAgdGFza0xpc3RzLmNvbXBsZXRlZC5xdWVyeVNlbGVjdG9yKGxpU2VhcmNoU3RyaW5nICsgXCIgXCIgKyAnbGFiZWwnKS50ZXh0Q29udGVudCA9IG5ld1ZhbHVlO1xyXG4gICAgICAgICAgICB0YXNrTGlzdHMuY29tcGxldGVkLnF1ZXJ5U2VsZWN0b3IobGlTZWFyY2hTdHJpbmcgKyBcIiBcIiArICdpbnB1dFt0eXBlPVwidGV4dFwiXScpLnZhbHVlID0gbmV3VmFsdWU7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGFza0xpc3RzLmluY29tcGxldGVkLnF1ZXJ5U2VsZWN0b3IobGlTZWFyY2hTdHJpbmcgKyBcIiBcIiArICdsYWJlbCcpLnRleHRDb250ZW50ID0gbmV3VmFsdWU7XHJcbiAgICAgICAgICAgIHRhc2tMaXN0cy5pbmNvbXBsZXRlZC5xdWVyeVNlbGVjdG9yKGxpU2VhcmNoU3RyaW5nICsgXCIgXCIgKyAnaW5wdXRbdHlwZT1cInRleHRcIl0nKS52YWx1ZSA9IG5ld1ZhbHVlO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGl0ZW0ucGFyZW50Tm9kZS5xdWVyeVNlbGVjdG9yKCdsYWJlbCcpLnRleHRDb250ZW50ID0gbmV3VmFsdWU7XHJcbiAgICAgICAgICB0YXNrTGlzdHMuYWxsLnF1ZXJ5U2VsZWN0b3IobGlTZWFyY2hTdHJpbmcgKyBcIiBcIiArICdsYWJlbCcpLnRleHRDb250ZW50ID0gbmV3VmFsdWU7XHJcbiAgICAgICAgICB0YXNrTGlzdHMuYWxsLnF1ZXJ5U2VsZWN0b3IobGlTZWFyY2hTdHJpbmcgKyBcIiBcIiArICdpbnB1dFt0eXBlPVwidGV4dFwiXScpLnZhbHVlID0gbmV3VmFsdWU7XHJcbiAgICAgICAgICB0YXNrc1N0b3JhZ2Uuc2V0SXRlbVZhbHVlKGlkLCAndmFsdWUnLCBuZXdWYWx1ZSk7XHJcbiAgICAgICAgICBpdGVtLmlubmVyVGV4dCA9IFwiRWRpdFwiO1xyXG4gICAgICAgIH0gXHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICBpdGVtLmlubmVyVGV4dCA9IFwiU2F2ZVwiO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICBpdGVtLnBhcmVudE5vZGUuY2xhc3NMaXN0LnRvZ2dsZShlZGl0TW9kZUNsYXNzKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgZnVuY3Rpb24gbW92ZUl0ZW0oaXRlbSkge1xyXG4gICAgICAgIHZhciBpZCA9IGl0ZW0udmFsdWUsXHJcbiAgICAgICAgbGlTZWFyY2hTdHJpbmcgPSAnbGlbZGF0YS1pZD0nICsnXCInICsgaWQgKyAnXCInICsgJ10nLFxyXG4gICAgICAgIGNvbXBsZXRlZCA9IGl0ZW0uY2hlY2tlZDtcclxuXHJcbiAgICAgICAgaWYgKGNvbXBsZXRlZCkge1xyXG4gICAgICAgICAgdGFza0xpc3RzLmNvbXBsZXRlZC5pbnNlcnRCZWZvcmUodGFza0xpc3RzLmluY29tcGxldGVkLnF1ZXJ5U2VsZWN0b3IobGlTZWFyY2hTdHJpbmcpLCB0YXNrTGlzdHMuY29tcGxldGVkLmZpcnN0Q2hpbGQpO1xyXG4gICAgICAgICAgdGFza0xpc3RzLmNvbXBsZXRlZC5xdWVyeVNlbGVjdG9yKGxpU2VhcmNoU3RyaW5nICsgXCIgXCIgKyAnaW5wdXRbdHlwZT1cImNoZWNrYm94XCJdJykuc2V0QXR0cmlidXRlKFwiY2hlY2tlZFwiLCB0cnVlKTtcclxuICAgICAgICAgIHRhc2tMaXN0cy5hbGwucXVlcnlTZWxlY3RvcihsaVNlYXJjaFN0cmluZyArIFwiIFwiICsgJ2lucHV0W3R5cGU9XCJjaGVja2JveFwiXScpLnNldEF0dHJpYnV0ZShcImNoZWNrZWRcIiwgdHJ1ZSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRhc2tMaXN0cy5pbmNvbXBsZXRlZC5hcHBlbmRDaGlsZCh0YXNrTGlzdHMuY29tcGxldGVkLnF1ZXJ5U2VsZWN0b3IobGlTZWFyY2hTdHJpbmcpKTtcclxuICAgICAgICAgIHRhc2tMaXN0cy5pbmNvbXBsZXRlZC5xdWVyeVNlbGVjdG9yKGxpU2VhcmNoU3RyaW5nICsgXCIgXCIgKyAnaW5wdXRbdHlwZT1cImNoZWNrYm94XCJdJykuc2V0QXR0cmlidXRlKFwiY2hlY2tlZFwiLCBmYWxzZSk7XHJcbiAgICAgICAgICB0YXNrTGlzdHMuYWxsLnF1ZXJ5U2VsZWN0b3IobGlTZWFyY2hTdHJpbmcgKyBcIiBcIiArICdpbnB1dFt0eXBlPVwiY2hlY2tib3hcIl0nKS5zZXRBdHRyaWJ1dGUoXCJjaGVja2VkXCIsIGZhbHNlKTtcclxuICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgICAgICB0YXNrc1N0b3JhZ2Uuc2V0SXRlbVZhbHVlKGlkLCAnY29tcGxldGVkJywgY29tcGxldGVkKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNoYW5nZXNMaXN0ZW50ZXIodGFza0xpc3RzLmluY29tcGxldGVkKTtcclxuICAgIGNoYW5nZXNMaXN0ZW50ZXIodGFza0xpc3RzLmNvbXBsZXRlZCk7XHJcbiAgICBjaGFuZ2VzTGlzdGVudGVyKHRhc2tMaXN0cy5hbGwpO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gcmVuZGVyVGFza0xpc3RzKGluaXRpYWxMaXN0c0l0ZW1zKSB7XHJcblxyXG4gICAgdmFyIGNvbXBsZXRlZExpc3QgPSB0b0RvQ29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoXCIuY29tcGxldGVkLXRhc2tzXCIpLFxyXG4gICAgaW5jb21wbGV0ZWRMaXN0ID0gdG9Eb0NvbnRhaW5lci5xdWVyeVNlbGVjdG9yKFwiLmluY29tcGxldGUtdGFza3NcIiksXHJcbiAgICBhbGxMaXN0ID0gdG9Eb0NvbnRhaW5lci5xdWVyeVNlbGVjdG9yKFwiLmFsbC10YXNrc1wiKTtcclxuXHJcbiAgICB2YXIgY29tcGxldGVkTGlzdENvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKSxcclxuICAgIGluY29tcGxldGVkTGlzdENvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKSxcclxuICAgIGFsbExpc3RDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XHJcbiAgICBcclxuICAgIGluaXRpYWxMaXN0c0l0ZW1zLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHtcclxuICAgICAgaWYgKGl0ZW0uY29tcGxldGVkKSB7XHJcbiAgICAgICAgY29tcGxldGVkTGlzdENvbnRhaW5lci5hcHBlbmRDaGlsZChcclxuICAgICAgICAgIHJlbmRlckxpc3RJdGVtKGl0ZW0pXHJcbiAgICAgICAgKTtcclxuICAgICAgfSBcclxuICAgICAgZWxzZSB7XHJcbiAgICAgICAgaW5jb21wbGV0ZWRMaXN0Q29udGFpbmVyLmFwcGVuZENoaWxkKFxyXG4gICAgICAgICAgcmVuZGVyTGlzdEl0ZW0oaXRlbSlcclxuICAgICAgICApO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBhbGxMaXN0Q29udGFpbmVyLmFwcGVuZENoaWxkKFxyXG4gICAgICAgIHJlbmRlckxpc3RJdGVtKGl0ZW0pXHJcbiAgICAgICAgKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGNvbXBsZXRlZExpc3QuYXBwZW5kQ2hpbGQoY29tcGxldGVkTGlzdENvbnRhaW5lcik7XHJcbiAgICBpbmNvbXBsZXRlZExpc3QuYXBwZW5kQ2hpbGQoaW5jb21wbGV0ZWRMaXN0Q29udGFpbmVyKTtcclxuICAgIGFsbExpc3QuYXBwZW5kQ2hpbGQoYWxsTGlzdENvbnRhaW5lcik7XHJcblxyXG4gICAgY29tcGxldGVkTGlzdC5jbGFzc0xpc3QudG9nZ2xlKFwiaGlkZGVuLWxpc3RcIik7XHJcbiAgICBpbmNvbXBsZXRlZExpc3QuY2xhc3NMaXN0LnRvZ2dsZShcImhpZGRlbi1saXN0XCIpO1xyXG4gICAgYWxsTGlzdC5jbGFzc0xpc3QudG9nZ2xlKFwiaGlkZGVuLWxpc3RcIik7XHJcbiAgICBcclxuICAgIHJldHVybiB7XHJcbiAgICAgIGluY29tcGxldGVkOiBpbmNvbXBsZXRlZExpc3QsXHJcbiAgICAgIGNvbXBsZXRlZDogY29tcGxldGVkTGlzdCxcclxuICAgICAgYWxsOiBhbGxMaXN0XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiByZW5kZXJMaXN0SXRlbShpdGVtKSB7XHJcblxyXG4gICAgZnVuY3Rpb24gY3JlYXRlRWxlbWVudHMoZWxlbWVudCwgYXR0cnMpIHtcclxuICAgICAgdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGVsZW1lbnQpO1xyXG4gICAgICByZXR1cm4gc2V0QXR0cmlidXRlcyhlbGVtZW50LCBhdHRycyk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gc2V0QXR0cmlidXRlcyhlbGVtZW50LCBhdHRycykge1xyXG4gICAgICBPYmplY3Qua2V5cyhhdHRycykuZm9yRWFjaChmdW5jdGlvbihrZXkpe1xyXG4gICAgICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKGtleSwgYXR0cnNba2V5XSk7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgcmV0dXJuIGVsZW1lbnQ7XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIHRhc2tJdGVtID0gY3JlYXRlRWxlbWVudHMoJ2xpJywgXHJcbiAgICB7XHJcbiAgICAgICdkYXRhLWlkJzogaXRlbS5pZFxyXG4gICAgfSksXHJcbiAgICB0YXNrVGV4dCA9IGNyZWF0ZUVsZW1lbnRzKCdsYWJlbCcsIHtcclxuXHJcbiAgICB9KTtcclxuXHJcbiAgICBpZihpdGVtLmNvbXBsZXRlZCkge1xyXG4gICAgICB2YXIgdGFza0NoZWNrYm94ID0gY3JlYXRlRWxlbWVudHMoJ2lucHV0JywgXHJcbiAgICAgIHtcclxuICAgICAgICB0eXBlOiAnY2hlY2tib3gnLFxyXG4gICAgICAgIHZhbHVlOiBpdGVtLmlkLFxyXG4gICAgICAgIGNoZWNrZWQ6ICcnXHJcbiAgICAgIH0pO1xyXG4gICAgfSBcclxuICAgIGVsc2UgeyBcclxuICAgICAgdmFyIHRhc2tDaGVja2JveCA9IGNyZWF0ZUVsZW1lbnRzKCdpbnB1dCcsIFxyXG4gICAgICB7XHJcbiAgICAgICAgdHlwZTogJ2NoZWNrYm94JyxcclxuICAgICAgICB2YWx1ZTogaXRlbS5pZCAgICAgICAgICAgIFxyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgdGFza0lucHV0ID0gY3JlYXRlRWxlbWVudHMoJ2lucHV0JywgXHJcbiAgICB7XHJcbiAgICAgIHR5cGU6ICd0ZXh0JyxcclxuICAgICAgdmFsdWU6IGl0ZW0udmFsdWVcclxuICAgIH0pLFxyXG4gICAgdGFza0VkaXRCdG4gPSBjcmVhdGVFbGVtZW50cygnYnV0dG9uJywgXHJcbiAgICB7XHJcbiAgICAgIGNsYXNzOiAnZWRpdCdcclxuICAgIH0pLFxyXG4gICAgdGFza0RlbGV0ZUJ0biA9IGNyZWF0ZUVsZW1lbnRzKCdidXR0b24nLCBcclxuICAgIHtcclxuICAgICAgY2xhc3M6ICdkZWxldGUnXHJcbiAgICB9KTtcclxuXHJcbiAgICB0YXNrVGV4dC5pbm5lclRleHQgPSBpdGVtLnZhbHVlO1xyXG4gICAgdGFza0VkaXRCdG4uaW5uZXJUZXh0ID0gXCJFZGl0XCI7XHJcbiAgICB0YXNrRGVsZXRlQnRuLmlubmVyVGV4dCA9IFwiRGVsZXRlXCI7XHJcblxyXG4gICAgZnVuY3Rpb24gYXBwZW5kQ2hpbGRyZW5BcnJheShwYXJlbnQsIGNoaWxkcmVuKSB7XHJcbiAgICAgIGNoaWxkcmVuLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHtcclxuICAgICAgICBwYXJlbnQuYXBwZW5kQ2hpbGQoaXRlbSk7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgcmV0dXJuIHBhcmVudDtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gYXBwZW5kQ2hpbGRyZW5BcnJheSh0YXNrSXRlbSwgW3Rhc2tDaGVja2JveCwgdGFza1RleHQsIHRhc2tJbnB1dCwgdGFza0VkaXRCdG4sIHRhc2tEZWxldGVCdG5dKTtcclxuICB9XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBpbml0OiBpbml0XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBzdG9yYWdlKHBhdGgpe1xyXG4gIGZ1bmN0aW9uIHNldEl0ZW1WYWx1ZShpZCwgZmllbGQsIHZhbHVlKSB7XHJcbiAgICB2YXIgY3VycmVudEl0ZW1zID0gcmVhZERhdGFGcm9tU3RvcmFnZSgpO1xyXG5cclxuICAgIGN1cnJlbnRJdGVtcy5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgICAgIGlmIChpdGVtLmlkID09PSBpZCkge1xyXG4gICAgICAgIGl0ZW1bZmllbGRdID0gdmFsdWVcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgc2F2ZUFycmF5KGN1cnJlbnRJdGVtcyk7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBzYXZlQXJyYXkoYXJyYXkpIHtcclxuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKHBhdGgsIEpTT04uc3RyaW5naWZ5KGFycmF5KSk7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBzYXZlSXRlbShpdGVtKSB7XHJcbiAgICB2YXIgY3VycmVudEl0ZW1zID0gcmVhZERhdGFGcm9tU3RvcmFnZSgpO1xyXG4gICAgY3VycmVudEl0ZW1zLnVuc2hpZnQoaXRlbSk7XHJcbiAgICBzYXZlQXJyYXkoY3VycmVudEl0ZW1zKVxyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gcmVtb3ZlSXRlbShpZCkge1xyXG4gICAgdmFyIGN1cnJlbnRJdGVtcyA9IHJlYWREYXRhRnJvbVN0b3JhZ2UoKTtcclxuICAgIHNhdmVBcnJheShcclxuICAgICAgY3VycmVudEl0ZW1zLmZpbHRlcihmdW5jdGlvbiAoaXRlbSkge1xyXG4gICAgICAgIHJldHVybiBpdGVtLmlkICE9PSBpZDtcclxuICAgICAgfSlcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBzdG9yYWdlQ2hlY2soaSkge1xyXG4gICAgZm9yICh2YXIgaiA9IDAsIGNvdW50ID0gMDsgaiA8IGxvY2FsU3RvcmFnZS5sZW5ndGg7IGorKykge1xyXG4gICAgICBpZiAobG9jYWxTdG9yYWdlLmtleShqKSA9PSAoJ3Rhc2tzTGlzdCcgKyBjb3VudCkpIHtcclxuICAgICAgICBpZiAoY291bnQgPD0gaSkge1xyXG4gICAgICAgICAgY291bnQrKztcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShsb2NhbFN0b3JhZ2Uua2V5KGopKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0obG9jYWxTdG9yYWdlLmtleShqKSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gcmVhZERhdGFGcm9tU3RvcmFnZSgpIHtcclxuICAgIHJldHVybiBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKHBhdGgpKSB8fCBbXTtcclxuICB9XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBzZXRJdGVtOiBzYXZlSXRlbSxcclxuICAgIHNldEl0ZW1WYWx1ZTogc2V0SXRlbVZhbHVlLFxyXG4gICAgc2V0QXJyYXk6IHNhdmVBcnJheSxcclxuICAgIHJlbW92ZUl0ZW06IHJlbW92ZUl0ZW0sXHJcbiAgICBjaGVjazogc3RvcmFnZUNoZWNrLFxyXG4gICAgZ2V0OiByZWFkRGF0YUZyb21TdG9yYWdlXHJcbiAgfVxyXG59XHJcblxyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCBmdW5jdGlvbigpIHtcclxuICB2YXIgdGFza0xpc3RzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgndG8tZG8tbGlzdCcpXHJcbiAgXHJcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCB0YXNrTGlzdHMubGVuZ3RoOyBpKyspIHtcclxuICAgIHRhc2tMaXN0c1tpXSA9IHRvZG9MaXN0KHRhc2tMaXN0c1tpXSwgaSkuaW5pdCgpO1xyXG4gIH1cclxufSk7Il0sImZpbGUiOiJtYWluLmpzIn0=
