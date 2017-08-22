function TodoList() {
    var self = this;
    var allTodos=[];
    var allTodosHtmlElement = document.getElementsByClassName('todos-list')[0];
    var allTodosLength = 0;
    this.addNewTodo = function () {
        var todoText = document.getElementsByClassName('task-input')[0].value;
        document.getElementsByClassName('task-input')[0].value = '';
        var localStorage = new LocalstorageService();
        if (validateTextInput(todoText)) {
            localStorage.addNewTodo({
                todoText: todoText,
                checked: false
            });
            allTodosLength++;
            allTodosHtmlElement.appendChild(listItemGenerator(todoText, false));
        }
    };
    this.showTodosList = function () {
        var localStorage = new LocalstorageService();
        allTodos = localStorage.getAllTodos();
        allTodosHtmlElement.classList.remove('uncompleted-tasks');
        allTodosHtmlElement.classList.remove('completed-tasks');
        buildTodosList(allTodos);
    };
    this.hideUncompletedTodos = function () {

        allTodosHtmlElement.classList.remove('uncompleted-tasks');
        allTodosHtmlElement.classList.add('completed-tasks');
        // hideListItems(allTodos, false);
    };
    this.hideCompletedTodosList = function () {

        allTodosHtmlElement.classList.remove('completed-tasks');
        allTodosHtmlElement.classList.add('uncompleted-tasks');
        // hideListItems(allTodos, true);
    };
    function buildTodosList(allTodos) {
        var localStorage = new LocalstorageService();
        allTodos = localStorage.getAllTodos();

        allTodosHtmlElement.innerHTML = '';
        var DOMFragment = document.createDocumentFragment();
        // var listItem, checkBox, label, editInput, editButton, deleteButton;
        for (let key in allTodos) {
            allTodosLength = key;
            DOMFragment.appendChild(listItemGenerator(allTodos[allTodosLength].todoText, allTodos[allTodosLength].checked));
        }

        allTodosHtmlElement.appendChild(DOMFragment);
    }

    function removeTodo() {
        var id = this.parentNode.getAttribute('id');
        var localStorage = new LocalstorageService();
        localStorage.removeById(id);
        self.showTodosList();
    }

    function editTodo() {
        var localStorage = new LocalstorageService();
        var listItem = this.parentNode;
        var editInput = listItem.querySelector("input[type=text]");
        var checkbox = listItem.querySelector("input[type=checkbox]");
        var label = listItem.querySelector("label");
        var containsClass = listItem.classList.contains("editMode");
        if (checkbox.checked !== true) {
            if (containsClass) {
                label.innerText = editInput.value;

                if (validateTextInput(label.innerText)) {
                    checkbox.disabled = false;
                    localStorage.editTextTodo(editInput.value, this.parentNode.id);
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
    }

    function statusTodo() {
        var localStorage = new LocalstorageService();
        if (this.checked) {
            this.nextSibling.style.textDecoration = 'line-through';
            this.parentNode.classList.add('completed-task');

            localStorage.editStatusTodo(this.parentNode.id, true);
        }
        else {
            this.parentNode.classList.remove('completed-task');
            this.nextSibling.style.textDecoration = 'none';
            localStorage.editStatusTodo(this.parentNode.id, false);
        }

    }

    function listItemGenerator(todoText, todoChecked) {
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
        listItem.id = allTodosLength;
        editButton.addEventListener('click', editTodo);
        deleteButton.addEventListener('click', removeTodo);
        checkBox.addEventListener('change', statusTodo);
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
    }
    function validateTextInput(inputText) {
        if (inputText === '') {
            alert('enter some text');
            return false;
        }
        return true;
    }
}