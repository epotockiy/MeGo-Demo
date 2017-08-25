;(function () {
    var TodoList = (function () {
        function TodoList() {
            this.allTodosHtmlElement = document.getElementsByClassName('todos-list')[0];
            this.taskInputHtmlElement = document.getElementsByClassName('task-input')[0];
            this.todoManagerHtmlElement = document.getElementsByClassName('todo-manager')[0];
            this.allTodos = document.getElementsByClassName('todo-manager')[0];
            this.initelizeManagerComponentEvents(this.todoManagerHtmlElement);
            this.initelizeTodosListEvents(this.allTodosHtmlElement);
            this.localStorageService = new LocalStorageService();
            this.targetElement;
            this.action;
        }

        TodoList.prototype.initelizeTodosListEvents = function (htmlElement) {
            var self = this;

            htmlElement.addEventListener('click', function (event) {
                self.targetElement = event.target;

                if (self.targetElement.getAttribute('type') === 'checkbox') {
                    self.changeStatusTodo(self.targetElement);
                }
                else if (self.targetElement.getAttribute('class') === 'edit') {
                    self.editTodo(self.targetElement);
                }
                else if (self.targetElement.getAttribute('class') === 'delete') {
                    self.removeTodo(self.targetElement);
                }
            })
        };
        TodoList.prototype.removeTodo = function (htmlElement) {
            var id = htmlElement.parentNode.getAttribute('id');
            this.localStorageService.removeById(id);
            htmlElement.parentNode.remove();
        };
        TodoList.prototype.editTodo = function (htmlElement) {
            var listItem = htmlElement.parentNode;
            var editInput = listItem.querySelector("input[type=text]");
            var checkbox = listItem.querySelector("input[type=checkbox]");
            var label = listItem.querySelector("label");
            var editButton = listItem.querySelector('button[class=edit]');

            console.log(editButton);
            var containsClass = listItem.classList.contains("editMode");
            if (checkbox.checked !== true) {
                if (containsClass) {
                    label.innerText = editInput.value;

                    if (validateTextInput(label.innerText)) {
                        checkbox.disabled = false;
                        this.localStorageService.editTextTodo(editInput.value, listItem.id);
                    }
                    else {
                        return;
                    }
                } else {

                    checkbox.disabled = true;
                    editInput.value = label.innerText;

                }

                listItem.classList.toggle("editMode");

            }
        };
        TodoList.prototype.changeStatusTodo = function (htmlElement) {

            if (htmlElement.checked) {
                htmlElement.nextSibling.style.textDecoration = 'line-through';
                htmlElement.parentNode.classList.add('completed-task');

                this.localStorageService.editStatusTodo(htmlElement.parentNode.id, true);
            }
            else {
                htmlElement.parentNode.classList.remove('completed-task');
                htmlElement.nextSibling.style.textDecoration = 'none';
                this.localStorageService.editStatusTodo(htmlElement.parentNode.id, false);
            }

        };
        TodoList.prototype.initelizeManagerComponentEvents = function (htmlElement) {
            var self = this;
            htmlElement.addEventListener('click', function (event) {
                self.targetElement = event.target;
                self.action = self.targetElement.getAttribute('data-action');
                if (self.action) {
                    self[self.action]();//call definite function for definet button in manager component
                }
            })
        };
        TodoList.prototype.addNewTodo = function () {
            var todoText = this.taskInputHtmlElement.value;
            this.taskInputHtmlElement.value = '';
            if (validateTextInput(todoText)) {
                this.localStorageService.addNewTodo({
                    todoText: todoText,
                    checked: false,
                    id: getNewId()
                });
                this.allTodosHtmlElement.appendChild(this.listItemGenerator(todoText, false));
            }
        };
        function validateTextInput(inputText) {
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

            this.allTodos = this.localStorageService.getAllTodos();
            this.allTodosHtmlElement.classList.remove('uncompleted-tasks');
            this.allTodosHtmlElement.classList.remove('completed-tasks');
            this.buildTodosList(this.allTodos);
        };
        TodoList.prototype.buildTodosList = function (allTodos) {
            this.allTodos = this.localStorageService.getAllTodos();
            // this.allTodosHtmlElement.innerHTML = '';
            var DOMFragment = document.createDocumentFragment();
            for (let key in this.allTodos) {
                // x = key;
                DOMFragment.appendChild(this.listItemGenerator(allTodos[key].todoText, allTodos[key].checked, allTodos[key].id));
            }
            this.allTodosHtmlElement.appendChild(DOMFragment);
        };

        TodoList.prototype.listItemGenerator = function (todoText, todoChecked, newId) {
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
            listItem.id = newId;
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
        function getNewId() {

            return '_' + Math.random().toString(36).substr(2, 9);
        };
        return TodoList;
    })();
    //////////////////////////////////////////////////////

    var LocalStorageService = (function () {

        function LocalStorageService() {
            this.allTodos = [];

        }

        LocalStorageService.prototype.writeDataToLocalStorage = function (newTodoList) {
            localStorage.setItem('allTodos', JSON.stringify(newTodoList));
        };
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

            // this.allTodos.splice(id, 1);
            this.allTodos = this.allTodos.filter(function (obj) {
                return obj.id !== id;
            });
            this.writeDataToLocalStorage(this.allTodos)

        };
        LocalStorageService.prototype.editTextTodo = function (editedTodoText, id) {
            this.allTodos = this.getAllTodos();
            this.allTodos.forEach(function (obj) {
                if (obj.id === id) {
                    obj.todoText = editedTodoText;
                    return;
                }
            });

            this.writeDataToLocalStorage(this.allTodos);
        };
        LocalStorageService.prototype.editStatusTodo = function (id, status) {
            this.allTodos = this.getAllTodos();

            this.allTodos.forEach(function (obj) {
                if (obj.id === id) {
                    obj.checked = status;
                    return;
                }
            });

            this.writeDataToLocalStorage(this.allTodos);
        };
        function validateLocalStorage() {
            var test = 'test';
            try {
                localStorage.setItem(test, test);
                localStorage.removeItem(test);
                return true;
            } catch (e) {
                return false;
            }
        }

        if (validateLocalStorage()) {
            return LocalStorageService;
        }
        else {
            return new Error('localStorage is not available')
        }
    })();

    var todoList = new TodoList();

    todoList.showTodosList();
})();
