function todoList() {
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
		var completedList = document.getElementById('completed-tasks'),
      	incompletedList = document.getElementById('incomplete-tasks');

    initialListsItems.forEach(function (item) {
			if (item.completed) {
				return completedList.appendChild(
					renderListItem(item)
				)
			}

      return incompletedList.appendChild(
        renderListItem(item)
      )
    });

    return {
			incompleted: incompletedList,
      completed: completedList
		}
  	}
	
	function renderListItem(item) {

    /*var params = {
      name: {
        li: 'li',
        label: 'label',
        input: 'input',
        btn: 'button'
      },
      type: {
        text: 'text',
        checkbox: 'checkbox'
      },
      id: item.id,
      value: {
        id: item.id,
        value: item.value
      },
      checked: item.completed,
      className: {
        edit: 'edit',
        delete: 'delete'
      }
    }

*/

    function createElements(element, attrs) {
      var element = document.createElement(element);
      console.log(element);
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

		

    taskText.innerHTML = item.value;
    taskEditBtn.innerHTML = "Edit";
    taskDeleteBtn.innerHTML = "Delete";

		taskCheckbox.addEventListener('change', moveItem);

    taskEditBtn.addEventListener('click', editItem);

    taskDeleteBtn.addEventListener('click', deleteItem);


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
        taskText.innerHTML = newValue;
        tasksStorage.setItemValue(id, 'value', newValue);
      }

      taskItem.classList.toggle(editModeClass);
    }

    function moveItem() {
      var id = event.target.value,
        completed = event.target.checked;
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJtYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImZ1bmN0aW9uIHRvZG9MaXN0KCkge1xyXG4gIHZhciB0YXNrTGlzdHMgPSB7fTtcclxuICB2YXIgdGFza3NTdG9yYWdlID0gc3RvcmFnZSgndGFza3NMaXN0Jyk7XHJcblxyXG5cdGZ1bmN0aW9uIGluaXQoKSB7XHJcbiAgICB2YXIgaW5pdGlhbExpc3RzSXRlbXMgPSB0YXNrc1N0b3JhZ2UuZ2V0KCk7XHJcbiAgICB0YXNrTGlzdHMgPSByZW5kZXJUYXNrTGlzdHMoaW5pdGlhbExpc3RzSXRlbXMpO1xyXG4gICAgd2F0Y2hBZGRUYXNrRm9ybSgpO1xyXG5cclxuICAgIHJldHVybiB0YXNrTGlzdHM7XHJcblx0fVxyXG5cdFxyXG5cdGZ1bmN0aW9uIHdhdGNoQWRkVGFza0Zvcm0oKSB7XHJcbiAgICBcdHZhciBhZGRUYXNrSW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbmV3LXRhc2snKSxcclxuXHRcdCAgYWRkVGFza1N1Ym1pdEJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhZGQnKTtcclxuXHJcblx0XHQgIGFkZFRhc2tTdWJtaXRCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdHZhciBpdGVtID0ge1xyXG5cdFx0XHRcdGlkOiBNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKDM2KS5zdWJzdHIoMiwgOSksIC8vINCz0LXQvdC10YDQsNGG0LjRjyDRg9C90LjQutCw0LvRjNC90L7Qs9C+IGlkXHJcbiAgICAgICAgXHRcdHZhbHVlOiBhZGRUYXNrSW5wdXQudmFsdWUsXHJcbiAgICAgICAgXHRcdGNvbXBsZXRlZDogZmFsc2VcclxuICAgICAgXHRcdH07XHJcblxyXG4gICAgICBcdFx0YWRkSXRlbVRvTGlzdChpdGVtKTtcclxuICAgICAgXHRcdHRhc2tzU3RvcmFnZS5zZXRJdGVtKGl0ZW0pO1xyXG4gICAgXHR9KTtcclxuXHJcblx0XHRmdW5jdGlvbiBhZGRJdGVtVG9MaXN0KGl0ZW0pIHtcclxuICAgICAgXHRcdHRhc2tMaXN0cy5pbmNvbXBsZXRlZC5hcHBlbmRDaGlsZChcclxuICAgICAgICBcdFx0cmVuZGVyTGlzdEl0ZW0oaXRlbSlcclxuXHRcdFx0KVxyXG5cdFx0fVxyXG4gIH1cclxuXHJcblx0ZnVuY3Rpb24gcmVuZGVyVGFza0xpc3RzKGluaXRpYWxMaXN0c0l0ZW1zKSB7XHJcblx0XHR2YXIgY29tcGxldGVkTGlzdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb21wbGV0ZWQtdGFza3MnKSxcclxuICAgICAgXHRpbmNvbXBsZXRlZExpc3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaW5jb21wbGV0ZS10YXNrcycpO1xyXG5cclxuICAgIGluaXRpYWxMaXN0c0l0ZW1zLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHtcclxuXHRcdFx0aWYgKGl0ZW0uY29tcGxldGVkKSB7XHJcblx0XHRcdFx0cmV0dXJuIGNvbXBsZXRlZExpc3QuYXBwZW5kQ2hpbGQoXHJcblx0XHRcdFx0XHRyZW5kZXJMaXN0SXRlbShpdGVtKVxyXG5cdFx0XHRcdClcclxuXHRcdFx0fVxyXG5cclxuICAgICAgcmV0dXJuIGluY29tcGxldGVkTGlzdC5hcHBlbmRDaGlsZChcclxuICAgICAgICByZW5kZXJMaXN0SXRlbShpdGVtKVxyXG4gICAgICApXHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4ge1xyXG5cdFx0XHRpbmNvbXBsZXRlZDogaW5jb21wbGV0ZWRMaXN0LFxyXG4gICAgICBjb21wbGV0ZWQ6IGNvbXBsZXRlZExpc3RcclxuXHRcdH1cclxuICBcdH1cclxuXHRcclxuXHRmdW5jdGlvbiByZW5kZXJMaXN0SXRlbShpdGVtKSB7XHJcblxyXG4gICAgLyp2YXIgcGFyYW1zID0ge1xyXG4gICAgICBuYW1lOiB7XHJcbiAgICAgICAgbGk6ICdsaScsXHJcbiAgICAgICAgbGFiZWw6ICdsYWJlbCcsXHJcbiAgICAgICAgaW5wdXQ6ICdpbnB1dCcsXHJcbiAgICAgICAgYnRuOiAnYnV0dG9uJ1xyXG4gICAgICB9LFxyXG4gICAgICB0eXBlOiB7XHJcbiAgICAgICAgdGV4dDogJ3RleHQnLFxyXG4gICAgICAgIGNoZWNrYm94OiAnY2hlY2tib3gnXHJcbiAgICAgIH0sXHJcbiAgICAgIGlkOiBpdGVtLmlkLFxyXG4gICAgICB2YWx1ZToge1xyXG4gICAgICAgIGlkOiBpdGVtLmlkLFxyXG4gICAgICAgIHZhbHVlOiBpdGVtLnZhbHVlXHJcbiAgICAgIH0sXHJcbiAgICAgIGNoZWNrZWQ6IGl0ZW0uY29tcGxldGVkLFxyXG4gICAgICBjbGFzc05hbWU6IHtcclxuICAgICAgICBlZGl0OiAnZWRpdCcsXHJcbiAgICAgICAgZGVsZXRlOiAnZGVsZXRlJ1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4qL1xyXG5cclxuICAgIGZ1bmN0aW9uIGNyZWF0ZUVsZW1lbnRzKGVsZW1lbnQsIGF0dHJzKSB7XHJcbiAgICAgIHZhciBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChlbGVtZW50KTtcclxuICAgICAgY29uc29sZS5sb2coZWxlbWVudCk7XHJcbiAgICAgIHJldHVybiBzZXRBdHRyaWJ1dGVzKGVsZW1lbnQsIGF0dHJzKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBzZXRBdHRyaWJ1dGVzKGVsZW1lbnQsIGF0dHJzKSB7XHJcbiAgICAgIE9iamVjdC5rZXlzKGF0dHJzKS5mb3JFYWNoKGZ1bmN0aW9uKGtleSl7XHJcbiAgICAgICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoa2V5LCBhdHRyc1trZXldKTtcclxuICAgICAgfSk7XHJcblxyXG4gICAgICByZXR1cm4gZWxlbWVudDtcclxuICAgIH1cclxuXHJcbiBcclxuICAgICAgaWYoaXRlbS5jb21wbGV0ZWQpIHtcclxuICAgICAgICB2YXIgdGFza0l0ZW0gPSBjcmVhdGVFbGVtZW50cygnbGknLCBcclxuICAgICAgICB7XHJcbiAgICAgICAgICAnZGF0YS1pZCc6IGl0ZW0uaWRcclxuICAgICAgICB9KSxcclxuICAgICAgICB0YXNrVGV4dCA9IGNyZWF0ZUVsZW1lbnRzKCdsYWJlbCcsIHtcclxuXHJcbiAgICAgICAgfSksXHJcbiAgICAgICAgdGFza0NoZWNrYm94ID0gY3JlYXRlRWxlbWVudHMoJ2lucHV0JywgXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIHR5cGU6ICdjaGVja2JveCcsXHJcbiAgICAgICAgICAgIHZhbHVlOiBpdGVtLmlkLFxyXG4gICAgICAgICAgICBjaGVja2VkOiAnJ1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgIH0pLCBcclxuICAgICAgICB0YXNrSW5wdXQgPSBjcmVhdGVFbGVtZW50cygnaW5wdXQnLCBcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgdHlwZTogJ3RleHQnLFxyXG4gICAgICAgICAgICB2YWx1ZTogaXRlbS52YWx1ZVxyXG4gICAgICAgICAgfSksXHJcbiAgICAgICAgdGFza0VkaXRCdG4gPSBjcmVhdGVFbGVtZW50cygnYnV0dG9uJywgXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIGNsYXNzOiAnZWRpdCdcclxuICAgICAgICAgIH0pLFxyXG4gICAgICAgIHRhc2tEZWxldGVCdG4gPSBjcmVhdGVFbGVtZW50cygnYnV0dG9uJywgXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIGNsYXNzOiAnZGVsZXRlJ1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgIH0gXHJcblxyXG4gICAgICBlbHNlIHtcclxuICAgICAgICAgIHZhciB0YXNrSXRlbSA9IGNyZWF0ZUVsZW1lbnRzKCdsaScsIFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICAnZGF0YS1pZCc6IGl0ZW0uaWRcclxuICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgdGFza1RleHQgPSBjcmVhdGVFbGVtZW50cygnbGFiZWwnLCB7XHJcblxyXG4gICAgICAgICAgfSksXHJcbiAgICAgICAgICB0YXNrQ2hlY2tib3ggPSBjcmVhdGVFbGVtZW50cygnaW5wdXQnLCBcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgIHR5cGU6ICdjaGVja2JveCcsXHJcbiAgICAgICAgICAgICAgdmFsdWU6IGl0ZW0uaWQgICAgICAgICAgICBcclxuICAgICAgICAgICAgfSksIFxyXG4gICAgICAgICAgdGFza0lucHV0ID0gY3JlYXRlRWxlbWVudHMoJ2lucHV0JywgXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICB0eXBlOiAndGV4dCcsXHJcbiAgICAgICAgICAgICAgdmFsdWU6IGl0ZW0udmFsdWVcclxuICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICB0YXNrRWRpdEJ0biA9IGNyZWF0ZUVsZW1lbnRzKCdidXR0b24nLCBcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgIGNsYXNzOiAnZWRpdCdcclxuICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICB0YXNrRGVsZXRlQnRuID0gY3JlYXRlRWxlbWVudHMoJ2J1dHRvbicsIFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgY2xhc3M6ICdkZWxldGUnXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuXHRcdFxyXG5cclxuICAgIHRhc2tUZXh0LmlubmVySFRNTCA9IGl0ZW0udmFsdWU7XHJcbiAgICB0YXNrRWRpdEJ0bi5pbm5lckhUTUwgPSBcIkVkaXRcIjtcclxuICAgIHRhc2tEZWxldGVCdG4uaW5uZXJIVE1MID0gXCJEZWxldGVcIjtcclxuXHJcblx0XHR0YXNrQ2hlY2tib3guYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgbW92ZUl0ZW0pO1xyXG5cclxuICAgIHRhc2tFZGl0QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZWRpdEl0ZW0pO1xyXG5cclxuICAgIHRhc2tEZWxldGVCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBkZWxldGVJdGVtKTtcclxuXHJcblxyXG4gICAgZnVuY3Rpb24gZGVsZXRlSXRlbSgpIHtcclxuICAgICAgdmFyIGNvbXBsZXRlZCA9IHRhc2tDaGVja2JveC5jaGVja2VkLFxyXG5cdFx0XHRcdFx0aWQgPSB0YXNrQ2hlY2tib3gudmFsdWU7XHJcblxyXG4gICAgICBpZiAoY29tcGxldGVkKSB7XHJcbiAgICAgICAgdGFza0xpc3RzLmNvbXBsZXRlZC5yZW1vdmVDaGlsZCh0YXNrTGlzdHMuY29tcGxldGVkLnF1ZXJ5U2VsZWN0b3IoXCJsaVtkYXRhLWlkPVwiICsnXCInICsgaWQgKyAnXCInICsgXCJdXCIpKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuICAgICAgICB0YXNrTGlzdHMuaW5jb21wbGV0ZWQucmVtb3ZlQ2hpbGQodGFza0xpc3RzLmluY29tcGxldGVkLnF1ZXJ5U2VsZWN0b3IoXCJsaVtkYXRhLWlkPVwiICsnXCInICsgaWQgKyAnXCInICsgXCJdXCIpKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgdGFza3NTdG9yYWdlLnJlbW92ZUl0ZW0oaWQpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGVkaXRJdGVtKCkge1xyXG4gICAgICB2YXIgaWQgPSB0YXNrSXRlbS5nZXRBdHRyaWJ1dGUoJ2RhdGEtaWQnKSxcclxuICAgICAgICBcdGVkaXRNb2RlQ2xhc3MgPSAnZWRpdE1vZGUnO1xyXG5cclxuICAgICAgaWYgKHRhc2tJdGVtLmNsYXNzTGlzdC5jb250YWlucyhlZGl0TW9kZUNsYXNzKSkge1xyXG4gICAgICAgIHZhciBuZXdWYWx1ZSA9IHRhc2tJbnB1dC52YWx1ZTtcclxuICAgICAgICB0YXNrVGV4dC5pbm5lckhUTUwgPSBuZXdWYWx1ZTtcclxuICAgICAgICB0YXNrc1N0b3JhZ2Uuc2V0SXRlbVZhbHVlKGlkLCAndmFsdWUnLCBuZXdWYWx1ZSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHRhc2tJdGVtLmNsYXNzTGlzdC50b2dnbGUoZWRpdE1vZGVDbGFzcyk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gbW92ZUl0ZW0oKSB7XHJcbiAgICAgIHZhciBpZCA9IGV2ZW50LnRhcmdldC52YWx1ZSxcclxuICAgICAgICBjb21wbGV0ZWQgPSBldmVudC50YXJnZXQuY2hlY2tlZDtcclxuICAgICAgaWYgKGNvbXBsZXRlZCkge1xyXG4gICAgICAgIHRhc2tMaXN0cy5jb21wbGV0ZWQuYXBwZW5kQ2hpbGQodGFza0xpc3RzLmluY29tcGxldGVkLnF1ZXJ5U2VsZWN0b3IoXCJsaVtkYXRhLWlkPVwiICsnXCInICsgaWQgKyAnXCInICsgXCJdXCIpKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0YXNrTGlzdHMuaW5jb21wbGV0ZWQuYXBwZW5kQ2hpbGQodGFza0xpc3RzLmNvbXBsZXRlZC5xdWVyeVNlbGVjdG9yKFwibGlbZGF0YS1pZD1cIiArJ1wiJyArIGlkICsgJ1wiJyArIFwiXVwiKSk7XHJcbiAgICAgIH1cclxuICAgICAgdGFza3NTdG9yYWdlLnNldEl0ZW1WYWx1ZShpZCwgJ2NvbXBsZXRlZCcsIGNvbXBsZXRlZCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGFwcGVuZENoaWxkcmVuQXJyYXkodGFza0l0ZW0sIFtcclxuICAgICAgdGFza0NoZWNrYm94LFxyXG4gICAgICB0YXNrVGV4dCxcclxuICAgICAgdGFza0lucHV0LFxyXG4gICAgICB0YXNrRWRpdEJ0bixcclxuXHRcdFx0dGFza0RlbGV0ZUJ0blxyXG5cdFx0XSlcclxuICB9XHJcblxyXG5cdHJldHVybiB7XHJcblx0XHRpbml0OiBpbml0XHJcblx0fVxyXG59XHJcblxyXG5mdW5jdGlvbiBzdG9yYWdlKHBhdGgpe1xyXG4gIGZ1bmN0aW9uIHNldEl0ZW1WYWx1ZShpZCwgZmllbGQsIHZhbHVlKSB7XHJcbiAgICB2YXIgY3VycmVudEl0ZW1zID0gcmVhZERhdGFGcm9tU3RvcmFnZSgpO1xyXG5cclxuICAgIGN1cnJlbnRJdGVtcy5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgICAgIGlmIChpdGVtLmlkID09PSBpZCkge1xyXG4gICAgICAgIGl0ZW1bZmllbGRdID0gdmFsdWVcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgc2F2ZUFycmF5KGN1cnJlbnRJdGVtcyk7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBzYXZlQXJyYXkoYXJyYXkpIHtcclxuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKHBhdGgsIEpTT04uc3RyaW5naWZ5KGFycmF5KSk7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBzYXZlSXRlbShpdGVtKSB7XHJcbiAgICB2YXIgY3VycmVudEl0ZW1zID0gcmVhZERhdGFGcm9tU3RvcmFnZSgpO1xyXG4gICAgY3VycmVudEl0ZW1zLnB1c2goaXRlbSk7XHJcbiAgICBzYXZlQXJyYXkoY3VycmVudEl0ZW1zKVxyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gcmVtb3ZlSXRlbShpZCkge1xyXG4gICAgdmFyIGN1cnJlbnRJdGVtcyA9IHJlYWREYXRhRnJvbVN0b3JhZ2UoKTtcclxuICAgIHNhdmVBcnJheShcclxuICAgICAgY3VycmVudEl0ZW1zLmZpbHRlcihmdW5jdGlvbiAoaXRlbSkge1xyXG4gICAgICAgIHJldHVybiBpdGVtLmlkICE9PSBpZDtcclxuICAgICAgfSlcclxuXHRcdCk7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiByZWFkRGF0YUZyb21TdG9yYWdlKCkge1xyXG4gICAgcmV0dXJuIEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0ocGF0aCkpIHx8IFtdO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIHNldEl0ZW06IHNhdmVJdGVtLFxyXG4gICAgc2V0SXRlbVZhbHVlOiBzZXRJdGVtVmFsdWUsXHJcbiAgICBzZXRBcnJheTogc2F2ZUFycmF5LFxyXG4gICAgcmVtb3ZlSXRlbTogcmVtb3ZlSXRlbSxcclxuICAgIGdldDogcmVhZERhdGFGcm9tU3RvcmFnZVxyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gYXBwZW5kQ2hpbGRyZW5BcnJheShwYXJlbnQsIGNoaWxkcmVuKSB7XHJcbiAgY2hpbGRyZW4uZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkge1xyXG4gICAgcGFyZW50LmFwcGVuZENoaWxkKGl0ZW0pO1xyXG4gIH0pO1xyXG5cclxuICByZXR1cm4gcGFyZW50O1xyXG59XHJcblxyXG4gd2luZG93Lm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xyXG4gIHZhciB0YXNrTGlzdHMgPSB0b2RvTGlzdCgpLmluaXQoKTtcclxufTsiXSwiZmlsZSI6Im1haW4uanMifQ==
