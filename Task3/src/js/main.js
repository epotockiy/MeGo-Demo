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
    	var addTaskInput = $('#new-task'),
		addTaskSubmitBtn = $('#add');

		addTaskSubmitBtn.on('click', function () {
			var item = {
				id: Math.random().toString(36).substr(2, 9), // генерация уникального id
        		value: addTaskInput.val(),
        		completed: false
      		};

      		addItemToList(item);
      		tasksStorage.setItem(item);
    	});

		function addItemToList(item) {
      		taskLists.incompleted.append(
        		renderListItem(item)
			)
		}
  }

	function renderTaskLists(initialListsItems) {
		var completedList = $('#completed-tasks'),
      	incompletedList = $('#incomplete-tasks');

    initialListsItems.forEach(function (item) {
			if (item.completed) {
				return completedList.append(
					renderListItem(item)
				)
			}

      return incompletedList.append(
        renderListItem(item)
      )
    });

    return {
			incompleted: incompletedList,
      completed: completedList
		}
  	}
	
	function renderListItem(item) {
		var taskItem = $('<li/>', {
					'data-id': item.id
				}),
				taskText = $('<label/>', {
					text: item.value
				}),
				taskCheckbox = $('<input/>', {
					type: 'checkbox',
					value: item.id,
					checked: item.completed
				}),
				taskInput = $('<input/>', {
					type: 'text',
					value: item.value
				}),
				taskEditBtn = $('<button/>', {
					text: 'Edit',
					class: 'edit'
				}),
				taskDeleteBtn = $('<button/>', {
					text: 'Delete',
					class: 'delete'
				});

		taskCheckbox.on('change', moveItem);

    taskEditBtn.on('click', editItem);

    taskDeleteBtn.on('click', deleteItem);

    function deleteItem() {
      var completed = taskCheckbox.prop('checked'),
					id = taskCheckbox.val();

      if (completed) {
        taskLists.completed.find(taskItem).remove();
			} else {
        taskLists.incompleted.find(taskItem).remove();
      }

      tasksStorage.removeItem(id);
    }

    function editItem() {
      var id = taskItem.attr('id'),
        	editModeClass = 'editMode';

      if (taskItem.hasClass(editModeClass)) {
        var newValue = taskInput.val();
        taskText.text(newValue);
        tasksStorage.setItemValue(id, 'value', newValue);
      }

      taskItem.toggleClass(editModeClass);
    }

    function moveItem() {
      var id = $(this).val(),
        completed = $(this).prop('checked');

      if (completed) {
        taskLists.incompleted.find('[data-id=' + id + ']').appendTo(taskLists.completed);
      } else {
        taskLists.completed.find('[data-id=' + id + ']').appendTo(taskLists.incompleted);
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
    setItem: function (item) { saveItem(item); },
    setItemValue: setItemValue,
    setArray: saveArray,
    removeItem: removeItem,
    get: readDataFromStorage
  }
}

function appendChildrenArray(parent, children) {
  children.forEach(function (item) {
    parent.append(item);
  });

  return parent;
}

$(document).ready(function(){

  var taskLists = todoList().init();

});