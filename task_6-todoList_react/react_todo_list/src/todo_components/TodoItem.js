import React, {Component} from 'react'
import '../styles/TodoItem.css';
class TodoItem extends Component {
    constructor(props) {
        super(props);
        this.todo = props.todo;
        this.state = {checked: null};
        this.deleteTodo = this.deleteTodo.bind(this);
        this.switchStatusTodo = this.switchStatusTodo.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    deleteTodo(e) {
        this.props.removeTodo(this.todo.id);
        e.target.parentNode.remove();
    };

    switchStatusTodo(e) {
        let checkboxElement = e.target;
        if (checkboxElement.checked) {
            checkboxElement.parentNode.classList.add('completed-task');
            this.todo.checked = true;
        }
        else {
            checkboxElement.parentNode.classList.remove('completed-task');
            this.todo.checked = false;

        }
        this.props.toggleStatus(this.todo);
    };
    handleChange(event) {
        this.setState({checked: !this.state.checked});
    }

    render() {
        return (
            <li id={this.todo.id}>
                <input type="checkbox" checked={this.state.checked} className="statusToggler"
                       onClick={this.switchStatusTodo}
                       onChange={this.handleChange}
                />
                <label >{this.todo.text}</label>
                <input type="text"/>
                <span className="edit fa fa-pencil"/>
                <span className="cancel btn fa fa-undo"/>
                <span className="delete fa fa-trash-o" onClick={this.deleteTodo}/>
            </li>
        )
    }
}
export default TodoItem;
