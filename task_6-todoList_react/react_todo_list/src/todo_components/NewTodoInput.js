import React, {Component} from 'react';
import '../styles/NewTodoInput.css';
import TodoModel from "./TodoModel";
class NewTodoInput extends Component {
    constructor(props) {
        super(props);
        this.state = {inputText: 'enter new todo'};
        this.newTodo = new TodoModel();
        this.handleChange = this.handleChange.bind(this);
        this.addTodo = this.addTodo.bind(this);
    }

    handleChange(event) {
        this.setState({inputText: event.target.value});
    }

    addTodo(event) {

        if (this.validateTextInput(this.state.inputText)) {
            this.newTodo.text = this.state.inputText;
            this.newTodo.id = this.getNewId();
            this.props.onAddNewTodo(this.newTodo);
            this.newTodo=new TodoModel();
            event.preventDefault();
        }
    }

    validateTextInput(inputText) {
        if (inputText === '') {
            // this.modal.openModalWindow();
            alert('enter something');
            return false;
        }
        return true;
    }

    getNewId() {

        return '_' + Math.random().toString(36).substr(2, 9);
    }

    render() {
        return (
            <form className="form-inline">
                <input className="task-input form-control mr-sm-2 mb-2 mb-sm-0" type="text" name="task"
                       placeholder="New task"  onChange={this.handleChange}/>
                <button className="add-button btn" onClick={this.addTodo}>Add</button>
            </form>
        )
    }
}

export default NewTodoInput;

// export default function NewTodoInput(props) {
//     const NewTodoText = '';
//     // handleChange = (event) => {
//     //     this.setState({inputText: event.target.value});
//     // };
//     addTodo = (event) => {
//         this.props.onAddNewTodo();
//         // alert('A name was submitted: ' + this.state.inputText);
//         event.preventDefault();
//     };
//     return (
//         <form className="form-inline">
//             <input className="task-input form-control mr-sm-2 mb-2 mb-sm-0" type="text" name="task"
//                    placeholder="New task" value={this.props.inputText} />
//             <button className="add-button btn" onClick={this.addTodo}>Add</button>
//         </form>
//     )
// }