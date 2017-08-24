;(function () {


    var TodoList = (function () {

        function TodoList() {
            this.allTodosHtmlElement = document.getElementsByClassName('todos-list')[0];
            this.taskInputHtmlElement = document.getElementsByClassName('task-input')[0];
            this.addButton = document.getElementsByClassName('add-button')[0];
            this.allButton = document.getElementsByClassName('all-tasks-btn')[0];
            this.completeButton = document.getElementsByClassName('completed-tasks-btn')[0];
            this.uncompleteButton = document.getElementsByClassName('uncompleted-tasks-btn')[0];
            this.todoManagerHtmlElement = document.getElementsByClassName('todo-manager')[0];
            this.allTodos = document.getElementsByClassName('todo-manager')[0];
            this.allTodosLength = 0;
            this.initelizeManagerComponentEvents(this.todoManagerHtmlElement);
            this.initelizeTodosListEvents(this.allTodosHtmlElement);
            //////////
            this.targetElement;
            this.action;
        }
        return TodoList;
    })();

    TodoList.prototype.initelizeTodosListEvents = function (Htmlelement) {
        var self = this;

        Htmlelement.addEventListener('click', function (event) {
            self.targetElement = event.target;

            if (self.targetElement.getAttribute('type')==='checkbox') {
                self.changeStatusTodo.bind(this);
            }
            else if (self.targetElement.getAttribute('class')==='edit') {
                self.editTodo.bind(this);
            }
            else if (self.targetElement.getAttribute('class')==='delete') {
                self.removeTodo.bind(this);
            }


        })
    };
    TodoList.prototype.initelizeManagerComponentEvents = function (Htmlelement) {
        var self = this;
        Htmlelement.addEventListener('click', function (event) {
            self.targetElement = event.target;
            self.action = self.targetElement.getAttribute('data-action');
            if (self.action) {
                self[self.action]();//call definite function for definet button in manager component
            }

        })
    };
    TodoList.prototype.addNewTodo = function () {
        var localStorageService = new LocalStorageService();
        var todoText = this.taskInputHtmlElement.value;
        this.taskInputHtmlElement.value = '';
        if (this.validateTextInput(todoText)) {
            localStorageService.addNewTodo({
                todoText: todoText,
                checked: false
            });
            this.allTodosLength++;
            this.allTodosHtmlElement.appendChild(this.listItemGenerator(todoText, false));
        }
    };
    TodoList.prototype.validateTextInput = function (inputText) {
        if (inputText === '') {
            alert('enter some text');
            return false;
        }
        return true;
    };

    TodoList.prototype.hideUncompletedTodos = function () {

        this.allTodosHtmlElement.classList.remove('uncompleted-tasks');
        this.allTodosHtmlElement.classList.add('completed-tasks');
        // hideListItems(allTodos, false);
    };
    TodoList.prototype.hideCompletedTodos = function () {
        this.allTodosHtmlElement.classList.remove('completed-tasks');
        this.allTodosHtmlElement.classList.add('uncompleted-tasks');
        // hideListItems(allTodos, true);
    };
    TodoList.prototype.showTodosList = function () {
        var localStorageService = new LocalStorageService();
        this.allTodos = localStorageService.getAllTodos();
        this.allTodosHtmlElement.classList.remove('uncompleted-tasks');
        this.allTodosHtmlElement.classList.remove('completed-tasks');
        this.buildTodosList(this.allTodos);
    };
    TodoList.prototype.buildTodosList = function (allTodos) {
        var localStorageService = new LocalStorageService();
        this.allTodos = localStorageService.getAllTodos();
        this.allTodosHtmlElement.innerHTML = '';
        var DOMFragment = document.createDocumentFragment();
        for (let key in this.allTodos) {
            this.allTodosLength = key;
            DOMFragment.appendChild(this.listItemGenerator(allTodos[this.allTodosLength].todoText, allTodos[this.allTodosLength].checked));
        }
        this.allTodosHtmlElement.appendChild(DOMFragment);
    };

    TodoList.prototype.listItemGenerator = function (todoText, todoChecked) {
        var listItem, checkBox, label, editInput, editButton, deleteButton;
        listItem = document.createElement("li");
        checkBox = document.createElement("input");
        //label
        label = document.createElement("label");
        //input (text)
        editInput = document.createElement("input");
        //button.edit
        editButton = document.createElement("button");
        //button.delete
        deleteButton = document.createElement("button");
        checkBox.type = "checkbox";
        editInput.type = "text";
        editButton.innerText = "Edit";
        editButton.className = "edit";
        deleteButton.innerText = "Delete";
        deleteButton.className = "delete";
        label.innerText = todoText;
        listItem.id = this.allTodosLength;
        // editButton.addEventListener('click', this.editTodo);
        // eleteButton.addEventListener('click', this.removeTodo);
        // checkBox.addEventListener('change', this.statusTodo);
        listItem.appendChild(checkBox);
        listItem.appendChild(label);
        listItem.appendChild(editInput);
        listItem.appendChild(editButton);
        listItem.appendChild(deleteButton);
        if (todoChecked === true) {
            listItem.classList.add('completed-task');
            checkBox.checked = true;
            // checkBox.nextSibling.style.textDecoration = 'line-through';
        }
        else {
            checkBox.checked = false;
            // checkBox.nextSibling.style.textDecoration = 'none';
        }
        return listItem;
    };

    TodoList.prototype.removeTodo = function () {
        console.log('kek');
        var localStorageService = new LocalStorageService();
        var id = this.parentNode.getAttribute('id');
        localStorageService.removeById(id);
        this.showTodosList();

    };


    TodoList.prototype.editTodo = function () {

        var listItem = this.parentNode;
        var editInput = listItem.querySelector("input[type=text]");
        var localStorageService = new LocalStorageService();
        var checkbox = listItem.querySelector("input[type=checkbox]");
        var label = listItem.querySelector("label");
        var containsClass = listItem.classList.contains("editMode");

        if (checkbox.checked !== true) {
            if (containsClass) {
                label.innerText = editInput.value;
                if (this.validateTextInput(label.innerText)) {
                    checkbox.disabled = false;
                    localStorageService.editTextTodo(editInput.value, this.parentNode.id);
                }
                else {
                    return;
                }
            } else {
                //Switch to .editMode
                checkbox.disabled = true;
                editInput.value = label.innerText;

            }

            listItem.classList.toggle("editMode");

        }
    };

    TodoList.prototype.changeStatusTodo = function () {

        var localStorageService = new LocalStorageService();
        if (this.checked) {
            this.nextSibling.style.textDecoration = 'line-through';
            this.parentNode.classList.add('completed-task');

            localStorageService.editStatusTodo(this.parentNode.id, true);
        }
        else {
            this.parentNode.classList.remove('completed-task');
            this.nextSibling.style.textDecoration = 'none';
            localStorageService.editStatusTodo(this.parentNode.id, false);
        }

    };


    // TodoList.prototype.getLocalSorage = function () {
    //     var test = 'test';
    //     try {
    //         localStorage.setItem(test, test);
    //         localStorage.removeItem(test);
    //         return
    //     } catch (e) {
    //         return false;
    //     }
    // };
    //
    // TodoList.prototype.checkLocalStorage = function () {
    //     var test = 'test';
    //     try {
    //         localStorage.setItem(test, test);
    //         localStorage.removeItem(test);
    //         localStorage = new LocalStorageService();
    //         console.log();
    //     } catch (e) {
    //         new Error('localStorage is not defined pn page');
    //     }
    // };


    //////////////////////////////////////////////////////

    var LocalStorageService = (function () {


        function LocalStorageService() {
            this.allTodos = [];
        }


        return LocalStorageService;
    })();
    LocalStorageService.prototype.writeDataToLocalStorage = function (newTodoList) {
        localStorage.setItem('allTodos', JSON.stringify(newTodoList));
    }
    LocalStorageService.prototype.getAllTodos = function () {
        var allTodosStringFormat = localStorage.getItem('allTodos');
        if (allTodosStringFormat !== null) {
            this.allTodos = JSON.parse(allTodosStringFormat);
        }
        return this.allTodos;
    };
    LocalStorageService.prototype.getAllCompletedTodos = function () {
        this.allTodos = this.getAllTodos();
        this.allTodos = this.allTodos.filter(function (element) {
            return element.checked === true;
        });
        return this.allTodos;
    };
    LocalStorageService.prototype.getAllUncompletedTodos = function () {
        this.allTodos = this.getAllTodos();
        this.allTodos = this.allTodos.filter(function (element) {
            return element.checked === false;
        });
        return this.allTodos;
    };
    LocalStorageService.prototype.addNewTodo = function (newTodo) {
        this.allTodos = this.getAllTodos();
        this.allTodos.push(newTodo);
        this.writeDataToLocalStorage(this.allTodos);
    };
    LocalStorageService.prototype.removeById = function (id) {
        this.allTodos = this.getAllTodos();
        this.allTodos.splice(id, 1);
        this.writeDataToLocalStorage(this.allTodos)

    };
    LocalStorageService.prototype.editTextTodo = function (editedTodoText, i) {

        this.allTodos = this.getAllTodos();
        this.allTodos[i].todoText = editedTodoText;
        this.writeDataToLocalStorage(this.allTodos);
    };
    LocalStorageService.prototype.editStatusTodo = function (i, status) {
        this.allTodos = this.getAllTodos();
        if (status) {
            this.allTodos[i].checked = true;
        }
        else {
            this.allTodos[i].checked = false;
        }
        this.writeDataToLocalStorage(this.allTodos);
    };

    var todoList = new TodoList();

    todoList.showTodosList();
})();