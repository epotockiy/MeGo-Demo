
class LocalStorageService {


    constructor() {
        this.allTodos = [];
        this.dataBaseName = 'allTodos1';
    }

   writeDataToLocalStorage(newTodoList) {
        localStorage.setItem(this.dataBaseName, JSON.stringify(newTodoList));
    }

    getTodos() {
        var allTodosStringFormat = localStorage.getItem(this.dataBaseName);
        if (allTodosStringFormat !== null) {
            this.allTodos = JSON.parse(allTodosStringFormat);
        }
        return this.allTodos;
    }

    addTodo(newTodo) {
        this.allTodos = this.getTodos();
        this.allTodos.push(newTodo);
        this.writeDataToLocalStorage(this.allTodos);
    }

    deleteTodo(id) {
        this.allTodos = this.getTodos();
        this.allTodos = this.allTodos.filter(function (obj) {
            return obj['id'] !== id;
        });

        this.writeDataToLocalStorage(this.allTodos);
    }

    editTextTodo(editedTodoText, id) {
        this.allTodos = this.getTodos();
        this.allTodos.forEach(function (obj) {
            if (obj['id'] === id) {
                obj['text'] = editedTodoText;
                return;
            }
        });

        this.writeDataToLocalStorage(this.allTodos);
    }

    editStatusOfTodo(id, status) {
        this.allTodos = this.getTodos();
        this.allTodos.forEach(function (obj) {
            if (obj['id'] === id) {
                obj['checked'] = status;
                return;
            }
        });
        console.log(123);
        this.writeDataToLocalStorage(this.allTodos);
    }

    isLocalStorageAvailable() {
        var test = 'test';
        try {
            localStorage.setItem(test, test);
            localStorage.removeItem(test);
        } catch (e) {
            new Error('local storage is not availbale');
        }
    }
}
export default LocalStorageService;