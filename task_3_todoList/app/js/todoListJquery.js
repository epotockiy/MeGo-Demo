;(function ($) {
    $.fn.TodoList = function () {
        return this.each(function (i, element) {

            new TodoList(element, i);
        });
    };
    // Array.prototype.forEach.call(pluginsCollection, function(element,i) {
    //     new TodoList(element,i);
    // });
    var TodoList = (function () {
        function TodoList(baseHtmlElement, pluginNumber) {
            this.allTodosHtmlElement = $('.todos-list');
            // console.log( this.allTodosHtmlElement);
            // console.log(this.allTodosHtmlElement)
            this.taskInputHtmlElement = $('.task-input');
            this.allTaskButton = $('.all-tasks-btn');
            this.completedTaskButton = $('.completed-tasks-btn');
            this.unCompletedTaskButton = $('.uncompleted-tasks-btn');
            this.todoManagerHtmlElement = $('.todo-manager');
            this.allTodos = $('.todo-manager');
            this.localStorageService = new LocalStorageService(pluginNumber);
            this.targetElement = null;
            this.action = null;
            //eventinitializers
            this.buildTodosList();
            this.initializeTodoManagerEvents();
            this.initializeTodosListEvents();
        }

        TodoList.prototype.initializeTodosListEvents = function () {
            var self = this;
            this.allTodosHtmlElement.click(function (event) {
                self.targetElement = event.target;
                // switch (JSON.stringify(self.targetElement.getAttribute('type'))) {
                //     case 'checkbox':
                //         self.switchStatusTodo(self.targetElement);
                //         break;
                //     case 'edit':
                //         self.editTodo(self.targetElement);
                //         break;
                //     case 'delete':
                //         self.removeTodo(self.targetElement);
                //         break;
                //     case 'cancel':
                //         self.cancelEditing(self.targetElement);
                //         break;
                // }
                if (self.targetElement.getAttribute('type') === 'checkbox') {
                    self.switchStatusTodo(self.targetElement);
                }
                else if (self.targetElement.getAttribute('class') === 'edit') {
                    self.editTodo(self.targetElement);
                }
                else if (self.targetElement.getAttribute('class') === 'delete') {
                    self.removeTodo(self.targetElement);
                }
                else if (self.targetElement.getAttribute('class') === 'cancel') {
                    self.cancelEditing(self.targetElement);
                }
            })
        };
        TodoList.prototype.cancelEditing = function (htmlElement) {
            var listItem = htmlElement.parentNode;
            listItem.classList.remove("edit-mode");
        };
        TodoList.prototype.removeTodo = function (htmlElement) {
            var id = htmlElement.parentNode.getAttribute('id');
            this.localStorageService.removeById(id);
            htmlElement.parentNode.remove();
        };
        TodoList.prototype.editTodo = function (editedHtmlElement) {
            var listItem = editedHtmlElement.parentNode;
            var editInput = listItem.querySelector("input[type=text]");
            var checkbox = listItem.querySelector("input[type=checkbox]");
            var label = listItem.querySelector("label");
            var containsClass = listItem.classList.contains("edit-mode");
            var temp = '';
            if (checkbox.checked !== true) {
                temp = editInput.value;
                if (containsClass) {
                    if (label.innerText !== temp) {
                        if (validateTextInput(temp)) {
                            label.innerText = temp;
                            this.localStorageService.editTextTodo(temp, listItem.id);
                        }
                        else {
                            return;
                        }
                    }
                }
                else {
                    editInput.value = label.innerText;
                }
                listItem.classList.toggle("edit-mode");
            }
        };
        TodoList.prototype.switchStatusTodo = function (htmlElement) {
            if (htmlElement.checked) {
                // htmlElement.nextSibling.style.textDecoration = 'line-through';//change this with css
                console.log(htmlElement.parentNode);

                htmlElement.parentNode.classList.add('completed-task');
                this.localStorageService.editStatusTodo(htmlElement.parentNode.id, true);
            }
            else {
                htmlElement.parentNode.classList.remove('completed-task');
                // htmlElement.nextSibling.style.textDecoration = 'none';
                this.localStorageService.editStatusTodo(htmlElement.parentNode.id, false);
            }
        };
        TodoList.prototype.initializeTodoManagerEvents = function () {
            var self = this;

            this.todoManagerHtmlElement.click(function (event) {
                self.targetElement = event.target;
                self.action = self.targetElement.getAttribute('data-action');
                if (self.action) {
                    self[self.action]();
                    //call definite function for definet button in manager component
                }
            })
        };

        TodoList.prototype.addNewTodo = function () {
            var todoText = this.taskInputHtmlElement.val();
            var newId = getNewId();
            this.taskInputHtmlElement.value = '';
            if (validateTextInput(todoText)) {
                this.localStorageService.addNewTodo({
                    todoText: todoText,
                    checked: false,
                    id: newId
                });
                this.allTodosHtmlElement.append(this.listItemGenerator(todoText, false, newId));
            }
        };
        function validateTextInput(inputText) {
            if (inputText === '') {
                alert('enter some text');
                return false;
            }
            return true;
        };
        TodoList.prototype.applyUncompletedTaskFilter = function () {
            switchActiveFilterClass(this.unCompletedTaskButton,[this.completedTaskButton, this.allTaskButton]);
            removeEditModeClass(this.allTodosHtmlElement.children());
            this.hideCompletedTodos();
        };
        TodoList.prototype.applyCompletedTaskFilter = function () {
            switchActiveFilterClass(this.completedTaskButton,[this.unCompletedTaskButton, this.allTaskButton]);
            this.allTodosHtmlElement.removeClass('uncompleted-tasks');
            this.allTodosHtmlElement.addClass('completed-tasks');

            // hideListItems(allTodos, false);
        };
        TodoList.prototype.hideCompletedTodos = function () {
            this.allTodosHtmlElement.removeClass('completed-tasks');
            this.allTodosHtmlElement.addClass('uncompleted-tasks');
            // hideListItems(allTodos, true);
        };
        TodoList.prototype.showTodosList = function () {
            switchActiveFilterClass(this.allTaskButton,[this.unCompletedTaskButton,this.completedTaskButton]);
            this.allTodos = this.localStorageService.getAllTodos();
            this.allTodosHtmlElement.removeClass('uncompleted-tasks');
            this.allTodosHtmlElement.removeClass('completed-tasks');
            // console.log(this.allTodosHtmlElement);
            removeEditModeClass(this.allTodosHtmlElement.children());

            // this.buildTodosList(this.allTodos);
        };
        TodoList.prototype.buildTodosList = function () {

            this.allTodos = this.localStorageService.getAllTodos();
            // this.allTodosHtmlElement.innerHTML = '';
            // console.log(this.allTodos);
            var DOMFragment = document.createDocumentFragment();
            for (let key in this.allTodos) {
                // x = key;
                DOMFragment.append(this.listItemGenerator(this.allTodos[key].todoText, this.allTodos[key].checked, this.allTodos[key].id));
            }

            this.allTodosHtmlElement.append(DOMFragment);
        };
        TodoList.prototype.listItemGenerator = function (todoText, todoChecked, newId) {
            var listItem, checkBox, label, editInput, editButton, deleteButton, cancelButton;
            listItem = document.createElement("li");
            checkBox = document.createElement("input");
            //label
            label = document.createElement("label");
            //input (text)
            editInput = document.createElement("input");
            //button.edit
            editButton = document.createElement("button");
            cancelButton = document.createElement("button");
            //button.delete
            deleteButton = document.createElement("button");
            checkBox.type = "checkbox";
            editInput.type = "text";
            editButton.innerText = "Edit";
            editButton.className = "edit";
            deleteButton.innerText = "Delete";
            deleteButton.className = "delete";
            cancelButton.innerText = "Cancel";
            cancelButton.className = "cancel";
            label.innerText = todoText;
            listItem.id = newId;
            listItem.append(checkBox);
            listItem.append(label);
            listItem.append(editInput);
            listItem.append(editButton);
            listItem.append(cancelButton);
            listItem.append(deleteButton);

            if (todoChecked === true) {
                listItem.classList.add('completed-task');
                checkBox.checked = true;
            }
            else {
                checkBox.checked = false;
            }
            return listItem;
        };
        function removeEditModeClass(allTodosChildNodes) {

            // allTodosChildNodes.each(function () {
            //
            //         if (this.attr('class') === 'edit-mode') {
            //             this.removeClass('edit-mode')
            //         }
            // })

            for (var i = 0; i < allTodosChildNodes.length; i++) {
                if (allTodosChildNodes[i].className === 'edit-mode') {
                    allTodosChildNodes[i].removeClass('edit-mode')
                }
            }
        }

        function getNewId() {

            return '_' + Math.random().toString(36).substr(2, 9);
        };
        function switchActiveFilterClass(activeElement, notActiveElements){
            activeElement.addClass('active-filter');
            notActiveElements.forEach(function(element){
                element.removeClass('active-filter')
            })
        }
        return TodoList;

    })();
    //////////////////////////////////////////////////////

    var LocalStorageService = (function () {

        function LocalStorageService(pluginNumber) {
            this.allTodos = [];
            this.pluginNumber = pluginNumber;
            this.dataBaseName = 'allTodos' + pluginNumber;

        }

        LocalStorageService.prototype.writeDataToLocalStorage = function (newTodoList) {

            localStorage.setItem(this.dataBaseName, JSON.stringify(newTodoList));
        };
        LocalStorageService.prototype.getAllTodos = function () {
            var allTodosStringFormat = localStorage.getItem(this.dataBaseName);
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
                    // console.log(obj.checked);
                    return;
                }
            });
            // };
            // this.executeFunction();
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

}(jQuery));
// console.log($('.todo-plugin').TodoList());
