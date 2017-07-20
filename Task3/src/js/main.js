$(document).ready(function(){
	//ADD ITEM
	$('button#add').on('click',function(){
		//get input's value
		var $newTask = $('#new-task').val();
		//check for empty value
		if($newTask==='') {
			//show alert message
			$('.warning').html('No task added').show();
			//hide success message
			$('.success').hide();
		}else {
			//show success message
			$('.success').html('Task added to list').fadeIn('slow').delay(500).fadeOut();
			//hide warning
			$('.warning').hide();
			//generate and add new list item
			var newListItem = '<li>';
			newListItem+='<input type="checkbox">';
			newListItem+='<label>'+$newTask+'</label>';
			newListItem+='<input type="text" class="inputTask">';
			newListItem+='<button class="edit">Edit</button>';
			newListItem+='<button class="delete">Delete</button>';
			newListItem+='</li>';
      		//apend to list
			$('ul#incomplete-tasks').append(newListItem);
      		$('.inputTask').val($newTask);
			//empty input value
			$('#new-task').val('');
		};//end else statement
		countTask();
	});//end button click function

	//EDIT TASK
	//user clicks on edit button
	$('ul').on('click','.edit',function(){
		//get parent
		var parent = $(this).parent();
		//check parent class
		if (!parent.hasClass('editMode')) {
			parent.addClass('editMode');
		}else if (parent.hasClass('editMode')) {	
			//grab value entered in input and set as label
			var editTask = $(this).prev('input[type="text"]').val();
			var editLabel = parent.find('label');
			editLabel.html(editTask);
			//remove edit class
			parent.removeClass('editMode');
		};
	});

	//COMPLETE TASK
	$('ul').on('change','input[type="checkbox"]', function(){
		//get grand parent
		var grandpa = $(this).parent().parent();
		//get parent
		var parent = $(this).parent();
		//check which ul the li is under
		if (grandpa.is('#incomplete-tasks')) {
			parent.remove();
			$('#completed-tasks').append(parent);	
		}else if(grandpa.is('#completed-tasks')){
			parent.remove();
			$('#incomplete-tasks').append(parent);
		}
		countTask();
	});
	
	//DELETE TASK
	$('ul').on('click','.delete',function(){
		$(this).parent().remove();
		countTask();
	});//end delete function

	//TASK COUNTER
	function countTask(){
		var remainTask = $('#incomplete-tasks li').length;
		$('#counter').hide().fadeIn(300).html(remainTask);
	};
	countTask();

});