import React, {Component} from 'react'
import '../styles/TodoItem.css';

class TodoItem extends Component {
    constructor(props) {
        super(props);
        this.todo = props.todo;

        this.state = {
            checked: this.todo.checked,
            className: ''
        };
        this.deleteTodo = this.deleteTodo.bind(this);
        this.switchStatusTodo = this.switchStatusTodo.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.editTodo = this.editTodo.bind(this);
    }

    deleteTodo(e) {
        this.props.removeTodo(this.todo.id);
        e.target.parentNode.remove();
    };

    switchStatusTodo(e) {
        let checkboxElement = e.target;
        if (checkboxElement.checked) {
           this.todo.checked = true;
        }
        else {
           this.todo.checked = false;

        }
        this.props.toggleStatus(this.todo);
    };

    handleChange() {
        this.setState({checked: !this.state.checked});
    }

    editTodo(e) {
        var listElement = e.target.parentNode;
        var editInput = listElement.querySelector('input[type=text]');
        var label = listElement.querySelector('label');
        var temp = '';
        if (this.todo.checked !== true) {
            temp = editInput.value;
            if (listElement.classList.contains('edit-mode')) {
                if (label.innerText !== temp) {
                    if (this.validateTextInput(temp)) {
                        label.innerText = temp;
                        this.todo.text = temp;
                        this.props.editTodo(this.todo);
                    } else {
                        return;
                    }
                }
            } else {
                editInput.value = label.innerText;
            }
            this.editModeToggler(e, listElement);
        }

    }

    editModeToggler(element, elementParent) {
        elementParent.classList.toggle('edit-mode');
        element.target.classList.toggle('fa-pencil');
        element.target.classList.toggle('fa-check');
    }

    validateTextInput(inputText) {
        if (inputText === '') {
            return false;
        }
        return true;
    }

    cancelEditing(e) {
        e.target.previousElementSibling.className = e.target.previousElementSibling.className.replace('fa-check', 'fa-pencil');
        var listElement = e.target.parentNode;
        listElement.classList.remove('edit-mode');
    }

    render() {
        return (
            <li id={this.todo.id} className={this.todo.checked ? 'completed-task' : ''}>
                <input type="checkbox"
                       checked={this.state.checked}
                       onClick={this.switchStatusTodo}
                       onChange={this.handleChange}
                />
                <label >{this.todo.text}</label>
                <input type="text"/>
                <span className="edit fa fa-pencil" onClick={this.editTodo}/>
                <span className="cancel btn fa fa-undo" onClick={this.cancelEditing}/>
                <span className="delete fa fa-trash-o" onClick={this.deleteTodo}/>
            </li>
        )
    }
}
export default TodoItem;
