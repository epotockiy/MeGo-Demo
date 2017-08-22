function LocalstorageService() {
    var self = this;
    var allTodos = [];
    this.getAllTodos = function () {
        var allTodosStringFormat = localStorage.getItem('allTodos');
        if (allTodosStringFormat !== null) {
            allTodos = JSON.parse(allTodosStringFormat);
        }
        return allTodos;
    };
    this.getAllCompletedTodos = function () {
        allTodos = this.getAllTodos();
        allTodos = allTodos.filter(function (element) {
            return element.checked === true;
        });
        return allTodos;
    };
    this.getAllUncompletedTodos = function () {
        allTodos = this.getAllTodos();
        allTodos = allTodos.filter(function (element) {
            return element.checked === false;
        });
        return allTodos;
    };
    this.addNewTodo = function (newTodo) {
        allTodos = this.getAllTodos();
        allTodos.push(newTodo);
        writeDataToLocalStorage(allTodos);
    };
    this.removeById = function (id) {
        allTodos = this.getAllTodos();
        allTodos.splice(id, 1);
        writeDataToLocalStorage(allTodos)

    };
    this.editTextTodo = function (editedTodoText, i) {

        allTodos = this.getAllTodos();
        allTodos[i].todoText = editedTodoText;
        writeDataToLocalStorage(allTodos);
    };
    this.editStatusTodo = function (i, status) {
        allTodos = this.getAllTodos();
        if (status) {
            allTodos[i].checked = true;
        }
        else {
            allTodos[i].checked = false;
        }
        writeDataToLocalStorage(allTodos);
    };

    function writeDataToLocalStorage(newTodoList) {
        localStorage.setItem('allTodos', JSON.stringify(newTodoList));
    }
}
