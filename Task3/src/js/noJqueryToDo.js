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