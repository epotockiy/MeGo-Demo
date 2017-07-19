'use strict';

(function($, undefined) {
	var $addBtn        = $('.add-btn');
	var $taskInput     = $('.task-input'); 
	var $todoList      = $('.todo-list');
	var tasksArray     = ['first'];

	function renderTasksList() {
		$todoList.empty();

		for(var i = 0; i < tasksArray.length; i++) {
			var taskBlock = $('<div />', {
				class: 'task'	
			});
			var editBtn = $('<input />', {
				type: 'button',
				value: 'Edit',
				class: 'edit-btn'
			});
			var removeBtn = $('<input />', {
				type: 'button',
				value: 'X',
				class: 'remove-btn'
			});
			var taskText = $('<span />', {
				text: tasksArray[i]
			});

			setRemoveAction(removeBtn, i);
			setEditAction(editBtn, i);

			taskBlock.append(taskText);
			taskBlock.append(editBtn);
			taskBlock.append(removeBtn);
			$todoList.append(taskBlock);
		}
	}

	function onAddBtnClick() {
		tasksArray.push($taskInput.val());
		$taskInput.val('');
		renderTasksList();
	}

	function setRemoveAction(removeButton, index) {
		removeButton.on('click', function() {
			tasksArray.splice(index, 1);
			renderTasksList();
		});
	}

	function setEditAction(editButton, index) {
		var editBlock = $('<div />', {
			class: 'edit'
		});
		var editInput = $('<input />', {
			type: 'text',
			value: tasksArray[index],
			class: 'edit-input'
		});
		var saveButton = $('<input />', {
			type: 'button',
			value: 'Save',
			class: 'edit-btn'
		});
		editBlock.append(editInput);
		editBlock.append(saveButton);

		editButton.on('click', setOpenEditDialogAction(editBlock));
	}

	function setOpenEditDialogAction(block) {
		console.log("Here");
		console.log(block);
		// block.style.display = 'block';
	}

	$(function() {
		$addBtn.on('click', onAddBtnClick);
		renderTasksList();
	});
})(jQuery);
