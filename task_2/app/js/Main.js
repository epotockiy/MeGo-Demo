var add_button = document.getElementsByClassName('add-button')[0];
var all_button = document.getElementsByClassName('all-tasks-btn')[0];
var complete_button = document.getElementsByClassName('completed-tasks-btn')[0];
var uncomplete_button = document.getElementsByClassName('uncompleted-tasks-btn')[0];

var todoList = new TodoList();
todoList.showTodosList();

add_button.addEventListener("click", function () {
    todoList.addNewTodo();
});

all_button.addEventListener("click", function () {
    todoList.showTodosList();
});

complete_button.addEventListener("click", function () {
    todoList.hideUncompletedTodos();
});
//
uncomplete_button.addEventListener("click", function () {
    todoList.hideCompletedTodosList();
   // console.log('lol');
});

