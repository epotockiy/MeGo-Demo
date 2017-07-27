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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJtYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xyXG5cclxuZnVuY3Rpb24gdG9kb0xpc3QobGlzdCwgaSkge1xyXG4gIHZhciB0b0RvQ29udGFpbmVyID0gbGlzdDtcclxuICB2YXIgdGFza0xpc3RzID0ge307XHJcbiAgdmFyIHRhc2tzU3RvcmFnZSA9IHN0b3JhZ2UoJ3Rhc2tzTGlzdCcgKyBpKTtcclxuXHJcbiAgZnVuY3Rpb24gaW5pdCgpIHtcclxuICAgIHRhc2tzU3RvcmFnZS5jaGVjayhpKTtcclxuICAgIHZhciBpbml0aWFsTGlzdHNJdGVtcyA9IHRhc2tzU3RvcmFnZS5nZXQoKTtcclxuICAgIHRhc2tMaXN0cyA9IHJlbmRlclRhc2tMaXN0cyhpbml0aWFsTGlzdHNJdGVtcyk7XHJcbiAgICB3YXRjaFRhc2tDaGFuZ2VzKCk7XHJcblxyXG4gICAgcmV0dXJuIHRhc2tMaXN0cztcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIHdhdGNoVGFza0NoYW5nZXMoKSB7XHJcblxyXG4gICAgdmFyIGFkZFRhc2tJbnB1dCA9IHRvRG9Db250YWluZXIucXVlcnlTZWxlY3RvcignLm5ldy10YXNrJyksXHJcbiAgICBhZGRUYXNrU3VibWl0QnRuID0gdG9Eb0NvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCcuYWRkJyksXHJcbiAgICBmaWx0ZXJCdG4gPSB0b0RvQ29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoXCIuZmlsdGVyXCIpO1xyXG5cclxuICAgIGZpbHRlckJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICAgIGlmKGV2ZW50LnRhcmdldC50ZXh0Q29udGVudCA9PSBcIkFsbFwiKXtcclxuICAgICAgICByZXR1cm4gYWN0aXZhdGVGaWx0ZXIoZXZlbnQudGFyZ2V0LCB0YXNrTGlzdHMsIHRhc2tMaXN0cy5hbGwpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZihldmVudC50YXJnZXQudGV4dENvbnRlbnQgPT0gXCJJbmNvbXBsZXRlZFwiKXtcclxuICAgICAgICByZXR1cm4gYWN0aXZhdGVGaWx0ZXIoZXZlbnQudGFyZ2V0LCB0YXNrTGlzdHMsIHRhc2tMaXN0cy5pbmNvbXBsZXRlZCk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmKGV2ZW50LnRhcmdldC50ZXh0Q29udGVudCA9PSBcIkNvbXBsZXRlZFwiKXtcclxuICAgICAgICByZXR1cm4gYWN0aXZhdGVGaWx0ZXIoZXZlbnQudGFyZ2V0LCB0YXNrTGlzdHMsIHRhc2tMaXN0cy5jb21wbGV0ZWQpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICBmdW5jdGlvbiBhY3RpdmF0ZUZpbHRlcihidG4sIGFsbExpc3QsIGxpc3Qpe1xyXG4gICAgICB2YXIgYnRuUGFyZW50ID0gYnRuLnBhcmVudE5vZGU7XHJcbiAgICAgIHZhciBhY3RpdmVCdG4gPSBidG5QYXJlbnQucXVlcnlTZWxlY3RvcihcIi5hY3RpdmVcIik7XHJcbiAgICAgIHZhciBhY3RpdmVMaXN0ID0gT2JqZWN0LnZhbHVlcyhhbGxMaXN0KS5maWx0ZXIoZnVuY3Rpb24oaXRlbSkge1xyXG4gICAgICAgIHJldHVybiAhaXRlbS5jbGFzc0xpc3QuY29udGFpbnMoXCJoaWRkZW4tbGlzdFwiKVxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIGlmKGFjdGl2ZUJ0biA9PSB1bmRlZmluZWQgfHwgYWN0aXZlQnRuID09IGJ0bikge1xyXG4gICAgICAgIGJ0bi5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xyXG4gICAgICAgIGxpc3QuY2xhc3NMaXN0LnJlbW92ZShcImhpZGRlbi1saXN0XCIpO1xyXG4gICAgICB9XHJcbiAgICAgIGVsc2Uge1xyXG4gICAgICAgIGFjdGl2ZUJ0bi5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG4gICAgICAgIGFjdGl2ZUxpc3RbMF0uY2xhc3NMaXN0LmFkZChcImhpZGRlbi1saXN0XCIpO1xyXG5cclxuICAgICAgICBidG4uY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcclxuICAgICAgICBsaXN0LmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRkZW4tbGlzdFwiKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGFkZFRhc2tTdWJtaXRCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIHZhciBpdGVtID0ge1xyXG4gICAgICAgIGlkOiBNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKDM2KS5zdWJzdHIoMiwgOSksIC8vINCz0LXQvdC10YDQsNGG0LjRjyDRg9C90LjQutCw0LvRjNC90L7Qs9C+IGlkXHJcbiAgICAgICAgdmFsdWU6IGFkZFRhc2tJbnB1dC52YWx1ZSxcclxuICAgICAgICBjb21wbGV0ZWQ6IGZhbHNlXHJcbiAgICAgIH07XHJcblxyXG4gICAgICBpZihhZGRUYXNrSW5wdXQudmFsdWUgPT0gXCJcIil7XHJcbiAgICAgICAgYWxlcnQoXCLQl9Cw0L/QvtC70L3QuNGC0LUg0L/Rg9GB0YLQvtC1INC/0L7Qu9C1IVwiKTtcclxuICAgICAgfSBcclxuICAgICAgZWxzZXtcclxuICAgICAgICBhZGRUYXNrSW5wdXQudmFsdWUgPSBcIlwiO1xyXG4gICAgICAgIGFkZEl0ZW1Ub0xpc3QoaXRlbSk7XHJcbiAgICAgICAgdGFza3NTdG9yYWdlLnNldEl0ZW0oaXRlbSk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIGZ1bmN0aW9uIGFkZEl0ZW1Ub0xpc3QoaXRlbSkge1xyXG4gICAgICB0YXNrTGlzdHMuaW5jb21wbGV0ZWQuaW5zZXJ0QmVmb3JlKFxyXG4gICAgICAgIHJlbmRlckxpc3RJdGVtKGl0ZW0pLFxyXG4gICAgICAgIHRhc2tMaXN0cy5pbmNvbXBsZXRlZC5maXJzdENoaWxkXHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgIHRhc2tMaXN0cy5hbGwuaW5zZXJ0QmVmb3JlKFxyXG4gICAgICAgIHJlbmRlckxpc3RJdGVtKGl0ZW0pLFxyXG4gICAgICAgIHRhc2tMaXN0cy5hbGwuZmlyc3RDaGlsZFxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gY2hhbmdlc0xpc3RlbnRlcihsaXN0KSB7XHJcbiAgICAgIGxpc3QuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihldmVudCl7XHJcbiAgICAgICAgaWYgKGV2ZW50LnRhcmdldC5nZXRBdHRyaWJ1dGUoXCJ0eXBlXCIpID09IFwiY2hlY2tib3hcIikge1xyXG4gICAgICAgICAgcmV0dXJuIG1vdmVJdGVtKGV2ZW50LnRhcmdldCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoZXZlbnQudGFyZ2V0LmNsYXNzTmFtZSA9PSBcImVkaXRcIikge1xyXG4gICAgICAgICAgcmV0dXJuIGVkaXRJdGVtKGV2ZW50LnRhcmdldCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoZXZlbnQudGFyZ2V0LmNsYXNzTmFtZSA9PSBcImRlbGV0ZVwiKSB7XHJcbiAgICAgICAgICAgcmV0dXJuIGRlbGV0ZUl0ZW0oZXZlbnQudGFyZ2V0KTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgZnVuY3Rpb24gZGVsZXRlSXRlbShpdGVtKSB7XHJcbiAgICAgICAgdmFyIGNvbXBsZXRlZCA9IGl0ZW0ucGFyZW50Tm9kZS5xdWVyeVNlbGVjdG9yKCdpbnB1dFt0eXBlPVwiY2hlY2tib3hcIl0nKS5jaGVja2VkLFxyXG4gICAgICAgIGlkID0gaXRlbS5wYXJlbnROb2RlLmdldEF0dHJpYnV0ZShcImRhdGEtaWRcIiksXHJcbiAgICAgICAgbGlTZWFyY2hTdHJpbmcgPSAnbGlbZGF0YS1pZD0nICsnXCInICsgaWQgKyAnXCInICsgJ10nO1xyXG5cclxuICAgICAgICBpZiAoY29tcGxldGVkKSB7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhsaVNlYXJjaFN0cmluZylcclxuICAgICAgICAgIHRhc2tMaXN0cy5hbGwucmVtb3ZlQ2hpbGQodGFza0xpc3RzLmFsbC5xdWVyeVNlbGVjdG9yKGxpU2VhcmNoU3RyaW5nKSk7XHJcbiAgICAgICAgICB0YXNrTGlzdHMuY29tcGxldGVkLnJlbW92ZUNoaWxkKHRhc2tMaXN0cy5jb21wbGV0ZWQucXVlcnlTZWxlY3RvcihsaVNlYXJjaFN0cmluZykpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0YXNrTGlzdHMuYWxsLnJlbW92ZUNoaWxkKHRhc2tMaXN0cy5hbGwucXVlcnlTZWxlY3RvcihsaVNlYXJjaFN0cmluZykpO1xyXG4gICAgICAgICAgdGFza0xpc3RzLmluY29tcGxldGVkLnJlbW92ZUNoaWxkKHRhc2tMaXN0cy5pbmNvbXBsZXRlZC5xdWVyeVNlbGVjdG9yKGxpU2VhcmNoU3RyaW5nKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0YXNrc1N0b3JhZ2UucmVtb3ZlSXRlbShpZCk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGZ1bmN0aW9uIGVkaXRJdGVtKGl0ZW0pIHtcclxuICAgICAgICB2YXIgaWQgPSBpdGVtLnBhcmVudE5vZGUuZ2V0QXR0cmlidXRlKCdkYXRhLWlkJyksXHJcbiAgICAgICAgY2hlY2tib3ggPSBpdGVtLnBhcmVudE5vZGUucXVlcnlTZWxlY3RvcignaW5wdXRbdHlwZT1cImNoZWNrYm94XCJdJykuY2hlY2tlZCxcclxuICAgICAgICBsaVNlYXJjaFN0cmluZyA9ICdsaVtkYXRhLWlkPScgKydcIicgKyBpZCArICdcIicgKyAnXScsXHJcbiAgICAgICAgZWRpdE1vZGVDbGFzcyA9ICdlZGl0TW9kZSc7XHJcblxyXG4gICAgICAgIGlmKGl0ZW0ucGFyZW50Tm9kZS5jbGFzc0xpc3QuY29udGFpbnMoZWRpdE1vZGVDbGFzcykpIHtcclxuICAgICAgICAgIHZhciBuZXdWYWx1ZSA9IGl0ZW0ucGFyZW50Tm9kZS5xdWVyeVNlbGVjdG9yKCdpbnB1dFt0eXBlPVwidGV4dFwiXScpLnZhbHVlO1xyXG4gICAgICAgICAgXHJcbiAgICAgICAgICBpZihjaGVja2JveCkge1xyXG4gICAgICAgICAgICB0YXNrTGlzdHMuY29tcGxldGVkLnF1ZXJ5U2VsZWN0b3IobGlTZWFyY2hTdHJpbmcgKyBcIiBcIiArICdsYWJlbCcpLnRleHRDb250ZW50ID0gbmV3VmFsdWU7XHJcbiAgICAgICAgICAgIHRhc2tMaXN0cy5jb21wbGV0ZWQucXVlcnlTZWxlY3RvcihsaVNlYXJjaFN0cmluZyArIFwiIFwiICsgJ2lucHV0W3R5cGU9XCJ0ZXh0XCJdJykudmFsdWUgPSBuZXdWYWx1ZTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0YXNrTGlzdHMuaW5jb21wbGV0ZWQucXVlcnlTZWxlY3RvcihsaVNlYXJjaFN0cmluZyArIFwiIFwiICsgJ2xhYmVsJykudGV4dENvbnRlbnQgPSBuZXdWYWx1ZTtcclxuICAgICAgICAgICAgdGFza0xpc3RzLmluY29tcGxldGVkLnF1ZXJ5U2VsZWN0b3IobGlTZWFyY2hTdHJpbmcgKyBcIiBcIiArICdpbnB1dFt0eXBlPVwidGV4dFwiXScpLnZhbHVlID0gbmV3VmFsdWU7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgaXRlbS5wYXJlbnROb2RlLnF1ZXJ5U2VsZWN0b3IoJ2xhYmVsJykudGV4dENvbnRlbnQgPSBuZXdWYWx1ZTtcclxuICAgICAgICAgIHRhc2tMaXN0cy5hbGwucXVlcnlTZWxlY3RvcihsaVNlYXJjaFN0cmluZyArIFwiIFwiICsgJ2xhYmVsJykudGV4dENvbnRlbnQgPSBuZXdWYWx1ZTtcclxuICAgICAgICAgIHRhc2tMaXN0cy5hbGwucXVlcnlTZWxlY3RvcihsaVNlYXJjaFN0cmluZyArIFwiIFwiICsgJ2lucHV0W3R5cGU9XCJ0ZXh0XCJdJykudmFsdWUgPSBuZXdWYWx1ZTtcclxuICAgICAgICAgIHRhc2tzU3RvcmFnZS5zZXRJdGVtVmFsdWUoaWQsICd2YWx1ZScsIG5ld1ZhbHVlKTtcclxuICAgICAgICAgIGl0ZW0uaW5uZXJUZXh0ID0gXCJFZGl0XCI7XHJcbiAgICAgICAgfSBcclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgIGl0ZW0uaW5uZXJUZXh0ID0gXCJTYXZlXCI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgIGl0ZW0ucGFyZW50Tm9kZS5jbGFzc0xpc3QudG9nZ2xlKGVkaXRNb2RlQ2xhc3MpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBmdW5jdGlvbiBtb3ZlSXRlbShpdGVtKSB7XHJcbiAgICAgICAgdmFyIGlkID0gaXRlbS52YWx1ZSxcclxuICAgICAgICBsaVNlYXJjaFN0cmluZyA9ICdsaVtkYXRhLWlkPScgKydcIicgKyBpZCArICdcIicgKyAnXScsXHJcbiAgICAgICAgY29tcGxldGVkID0gaXRlbS5jaGVja2VkO1xyXG5cclxuICAgICAgICBpZiAoY29tcGxldGVkKSB7XHJcbiAgICAgICAgICB0YXNrTGlzdHMuY29tcGxldGVkLmluc2VydEJlZm9yZSh0YXNrTGlzdHMuaW5jb21wbGV0ZWQucXVlcnlTZWxlY3RvcihsaVNlYXJjaFN0cmluZyksIHRhc2tMaXN0cy5jb21wbGV0ZWQuZmlyc3RDaGlsZCk7XHJcbiAgICAgICAgICB0YXNrTGlzdHMuY29tcGxldGVkLnF1ZXJ5U2VsZWN0b3IobGlTZWFyY2hTdHJpbmcgKyBcIiBcIiArICdpbnB1dFt0eXBlPVwiY2hlY2tib3hcIl0nKS5zZXRBdHRyaWJ1dGUoXCJjaGVja2VkXCIsIHRydWUpO1xyXG4gICAgICAgICAgdGFza0xpc3RzLmFsbC5xdWVyeVNlbGVjdG9yKGxpU2VhcmNoU3RyaW5nICsgXCIgXCIgKyAnaW5wdXRbdHlwZT1cImNoZWNrYm94XCJdJykuc2V0QXR0cmlidXRlKFwiY2hlY2tlZFwiLCB0cnVlKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGFza0xpc3RzLmluY29tcGxldGVkLmFwcGVuZENoaWxkKHRhc2tMaXN0cy5jb21wbGV0ZWQucXVlcnlTZWxlY3RvcihsaVNlYXJjaFN0cmluZykpO1xyXG4gICAgICAgICAgdGFza0xpc3RzLmluY29tcGxldGVkLnF1ZXJ5U2VsZWN0b3IobGlTZWFyY2hTdHJpbmcgKyBcIiBcIiArICdpbnB1dFt0eXBlPVwiY2hlY2tib3hcIl0nKS5zZXRBdHRyaWJ1dGUoXCJjaGVja2VkXCIsIGZhbHNlKTtcclxuICAgICAgICAgIHRhc2tMaXN0cy5hbGwucXVlcnlTZWxlY3RvcihsaVNlYXJjaFN0cmluZyArIFwiIFwiICsgJ2lucHV0W3R5cGU9XCJjaGVja2JveFwiXScpLnNldEF0dHJpYnV0ZShcImNoZWNrZWRcIiwgZmFsc2UpO1xyXG4gICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRhc2tzU3RvcmFnZS5zZXRJdGVtVmFsdWUoaWQsICdjb21wbGV0ZWQnLCBjb21wbGV0ZWQpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY2hhbmdlc0xpc3RlbnRlcih0YXNrTGlzdHMuaW5jb21wbGV0ZWQpO1xyXG4gICAgY2hhbmdlc0xpc3RlbnRlcih0YXNrTGlzdHMuY29tcGxldGVkKTtcclxuICAgIGNoYW5nZXNMaXN0ZW50ZXIodGFza0xpc3RzLmFsbCk7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiByZW5kZXJUYXNrTGlzdHMoaW5pdGlhbExpc3RzSXRlbXMpIHtcclxuXHJcbiAgICB2YXIgY29tcGxldGVkTGlzdCA9IHRvRG9Db250YWluZXIucXVlcnlTZWxlY3RvcihcIi5jb21wbGV0ZWQtdGFza3NcIiksXHJcbiAgICBpbmNvbXBsZXRlZExpc3QgPSB0b0RvQ29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoXCIuaW5jb21wbGV0ZS10YXNrc1wiKSxcclxuICAgIGFsbExpc3QgPSB0b0RvQ29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoXCIuYWxsLXRhc2tzXCIpO1xyXG5cclxuICAgIHZhciBjb21wbGV0ZWRMaXN0Q29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpLFxyXG4gICAgaW5jb21wbGV0ZWRMaXN0Q29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpLFxyXG4gICAgYWxsTGlzdENvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcclxuICAgIFxyXG4gICAgaW5pdGlhbExpc3RzSXRlbXMuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkge1xyXG4gICAgICBpZiAoaXRlbS5jb21wbGV0ZWQpIHtcclxuICAgICAgICBjb21wbGV0ZWRMaXN0Q29udGFpbmVyLmFwcGVuZENoaWxkKFxyXG4gICAgICAgICAgcmVuZGVyTGlzdEl0ZW0oaXRlbSlcclxuICAgICAgICApO1xyXG4gICAgICB9IFxyXG4gICAgICBlbHNlIHtcclxuICAgICAgICBpbmNvbXBsZXRlZExpc3RDb250YWluZXIuYXBwZW5kQ2hpbGQoXHJcbiAgICAgICAgICByZW5kZXJMaXN0SXRlbShpdGVtKVxyXG4gICAgICAgICk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGFsbExpc3RDb250YWluZXIuYXBwZW5kQ2hpbGQoXHJcbiAgICAgICAgcmVuZGVyTGlzdEl0ZW0oaXRlbSlcclxuICAgICAgICApO1xyXG4gICAgfSk7XHJcblxyXG4gICAgY29tcGxldGVkTGlzdC5hcHBlbmRDaGlsZChjb21wbGV0ZWRMaXN0Q29udGFpbmVyKTtcclxuICAgIGluY29tcGxldGVkTGlzdC5hcHBlbmRDaGlsZChpbmNvbXBsZXRlZExpc3RDb250YWluZXIpO1xyXG4gICAgYWxsTGlzdC5hcHBlbmRDaGlsZChhbGxMaXN0Q29udGFpbmVyKTtcclxuXHJcbiAgICBjb21wbGV0ZWRMaXN0LmNsYXNzTGlzdC50b2dnbGUoXCJoaWRkZW4tbGlzdFwiKTtcclxuICAgIGluY29tcGxldGVkTGlzdC5jbGFzc0xpc3QudG9nZ2xlKFwiaGlkZGVuLWxpc3RcIik7XHJcbiAgICBhbGxMaXN0LmNsYXNzTGlzdC50b2dnbGUoXCJoaWRkZW4tbGlzdFwiKTtcclxuICAgIFxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgaW5jb21wbGV0ZWQ6IGluY29tcGxldGVkTGlzdCxcclxuICAgICAgY29tcGxldGVkOiBjb21wbGV0ZWRMaXN0LFxyXG4gICAgICBhbGw6IGFsbExpc3RcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIHJlbmRlckxpc3RJdGVtKGl0ZW0pIHtcclxuXHJcbiAgICBmdW5jdGlvbiBjcmVhdGVFbGVtZW50cyhlbGVtZW50LCBhdHRycykge1xyXG4gICAgICB2YXIgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoZWxlbWVudCk7XHJcbiAgICAgIHJldHVybiBzZXRBdHRyaWJ1dGVzKGVsZW1lbnQsIGF0dHJzKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBzZXRBdHRyaWJ1dGVzKGVsZW1lbnQsIGF0dHJzKSB7XHJcbiAgICAgIE9iamVjdC5rZXlzKGF0dHJzKS5mb3JFYWNoKGZ1bmN0aW9uKGtleSl7XHJcbiAgICAgICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoa2V5LCBhdHRyc1trZXldKTtcclxuICAgICAgfSk7XHJcblxyXG4gICAgICByZXR1cm4gZWxlbWVudDtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgdGFza0l0ZW0gPSBjcmVhdGVFbGVtZW50cygnbGknLCBcclxuICAgIHtcclxuICAgICAgJ2RhdGEtaWQnOiBpdGVtLmlkXHJcbiAgICB9KSxcclxuICAgIHRhc2tUZXh0ID0gY3JlYXRlRWxlbWVudHMoJ2xhYmVsJywge1xyXG5cclxuICAgIH0pO1xyXG5cclxuICAgIGlmKGl0ZW0uY29tcGxldGVkKSB7XHJcbiAgICAgIHZhciB0YXNrQ2hlY2tib3ggPSBjcmVhdGVFbGVtZW50cygnaW5wdXQnLCBcclxuICAgICAge1xyXG4gICAgICAgIHR5cGU6ICdjaGVja2JveCcsXHJcbiAgICAgICAgdmFsdWU6IGl0ZW0uaWQsXHJcbiAgICAgICAgY2hlY2tlZDogJydcclxuICAgICAgfSk7XHJcbiAgICB9IFxyXG4gICAgZWxzZSB7IFxyXG4gICAgICB2YXIgdGFza0NoZWNrYm94ID0gY3JlYXRlRWxlbWVudHMoJ2lucHV0JywgXHJcbiAgICAgIHtcclxuICAgICAgICB0eXBlOiAnY2hlY2tib3gnLFxyXG4gICAgICAgIHZhbHVlOiBpdGVtLmlkICAgICAgICAgICAgXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciB0YXNrSW5wdXQgPSBjcmVhdGVFbGVtZW50cygnaW5wdXQnLCBcclxuICAgIHtcclxuICAgICAgdHlwZTogJ3RleHQnLFxyXG4gICAgICB2YWx1ZTogaXRlbS52YWx1ZVxyXG4gICAgfSksXHJcbiAgICB0YXNrRWRpdEJ0biA9IGNyZWF0ZUVsZW1lbnRzKCdidXR0b24nLCBcclxuICAgIHtcclxuICAgICAgY2xhc3M6ICdlZGl0J1xyXG4gICAgfSksXHJcbiAgICB0YXNrRGVsZXRlQnRuID0gY3JlYXRlRWxlbWVudHMoJ2J1dHRvbicsIFxyXG4gICAge1xyXG4gICAgICBjbGFzczogJ2RlbGV0ZSdcclxuICAgIH0pO1xyXG5cclxuICAgIHRhc2tUZXh0LmlubmVyVGV4dCA9IGl0ZW0udmFsdWU7XHJcbiAgICB0YXNrRWRpdEJ0bi5pbm5lclRleHQgPSBcIkVkaXRcIjtcclxuICAgIHRhc2tEZWxldGVCdG4uaW5uZXJUZXh0ID0gXCJEZWxldGVcIjtcclxuXHJcbiAgICBmdW5jdGlvbiBhcHBlbmRDaGlsZHJlbkFycmF5KHBhcmVudCwgY2hpbGRyZW4pIHtcclxuICAgICAgY2hpbGRyZW4uZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkge1xyXG4gICAgICAgIHBhcmVudC5hcHBlbmRDaGlsZChpdGVtKTtcclxuICAgICAgfSk7XHJcblxyXG4gICAgICByZXR1cm4gcGFyZW50O1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBhcHBlbmRDaGlsZHJlbkFycmF5KHRhc2tJdGVtLCBbdGFza0NoZWNrYm94LCB0YXNrVGV4dCwgdGFza0lucHV0LCB0YXNrRWRpdEJ0biwgdGFza0RlbGV0ZUJ0bl0pO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIGluaXQ6IGluaXRcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHN0b3JhZ2UocGF0aCl7XHJcbiAgZnVuY3Rpb24gc2V0SXRlbVZhbHVlKGlkLCBmaWVsZCwgdmFsdWUpIHtcclxuICAgIHZhciBjdXJyZW50SXRlbXMgPSByZWFkRGF0YUZyb21TdG9yYWdlKCk7XHJcblxyXG4gICAgY3VycmVudEl0ZW1zLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHtcclxuICAgICAgaWYgKGl0ZW0uaWQgPT09IGlkKSB7XHJcbiAgICAgICAgaXRlbVtmaWVsZF0gPSB2YWx1ZVxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICBzYXZlQXJyYXkoY3VycmVudEl0ZW1zKTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIHNhdmVBcnJheShhcnJheSkge1xyXG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0ocGF0aCwgSlNPTi5zdHJpbmdpZnkoYXJyYXkpKTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIHNhdmVJdGVtKGl0ZW0pIHtcclxuICAgIHZhciBjdXJyZW50SXRlbXMgPSByZWFkRGF0YUZyb21TdG9yYWdlKCk7XHJcbiAgICBjdXJyZW50SXRlbXMudW5zaGlmdChpdGVtKTtcclxuICAgIHNhdmVBcnJheShjdXJyZW50SXRlbXMpXHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiByZW1vdmVJdGVtKGlkKSB7XHJcbiAgICB2YXIgY3VycmVudEl0ZW1zID0gcmVhZERhdGFGcm9tU3RvcmFnZSgpO1xyXG4gICAgc2F2ZUFycmF5KFxyXG4gICAgICBjdXJyZW50SXRlbXMuZmlsdGVyKGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgICAgICAgcmV0dXJuIGl0ZW0uaWQgIT09IGlkO1xyXG4gICAgICB9KVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIHN0b3JhZ2VDaGVjayhpKSB7XHJcbiAgICBmb3IgKHZhciBqID0gMCwgY291bnQgPSAwOyBqIDwgbG9jYWxTdG9yYWdlLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgIGlmIChsb2NhbFN0b3JhZ2Uua2V5KGopID09ICgndGFza3NMaXN0JyArIGNvdW50KSkge1xyXG4gICAgICAgIGlmIChjb3VudCA8PSBpKSB7XHJcbiAgICAgICAgICBjb3VudCsrO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKGxvY2FsU3RvcmFnZS5rZXkoaikpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShsb2NhbFN0b3JhZ2Uua2V5KGopKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiByZWFkRGF0YUZyb21TdG9yYWdlKCkge1xyXG4gICAgcmV0dXJuIEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0ocGF0aCkpIHx8IFtdO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIHNldEl0ZW06IHNhdmVJdGVtLFxyXG4gICAgc2V0SXRlbVZhbHVlOiBzZXRJdGVtVmFsdWUsXHJcbiAgICBzZXRBcnJheTogc2F2ZUFycmF5LFxyXG4gICAgcmVtb3ZlSXRlbTogcmVtb3ZlSXRlbSxcclxuICAgIGNoZWNrOiBzdG9yYWdlQ2hlY2ssXHJcbiAgICBnZXQ6IHJlYWREYXRhRnJvbVN0b3JhZ2VcclxuICB9XHJcbn1cclxuXHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsIGZ1bmN0aW9uKCkge1xyXG4gIHZhciB0YXNrTGlzdHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCd0by1kby1saXN0JylcclxuICBcclxuICBmb3IgKHZhciBpID0gMDsgaSA8IHRhc2tMaXN0cy5sZW5ndGg7IGkrKykge1xyXG4gICAgdGFza0xpc3RzW2ldID0gdG9kb0xpc3QodGFza0xpc3RzW2ldLCBpKS5pbml0KCk7XHJcbiAgfVxyXG59KTsiXSwiZmlsZSI6Im1haW4uanMifQ==
