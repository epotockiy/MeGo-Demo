import React, {Component} from 'react';
import '../styles/NewTodoInput.css';
import TodoModel from "./TodoModel";

class NewTodoInput extends Component {
    constructor(props) {
        super(props);
        this.state = {inputText: ''};
        this.newTodo = new TodoModel();
        this.handleChange = this.handleChange.bind(this);
        this.addTodo = this.addTodo.bind(this);
        //console.log(this.state.inputText==='');
    }

    handleChange(event) {
        this.setState({inputText: event.target.value});

    }

    addTodo(event) {
        if (this.validateTextInput(this.state.inputText)) {
            // console.log(this.state.inputText);
            this.newTodo.text = this.state.inputText;
            this.setState({inputText: ''});
            this.newTodo.id = this.getNewId();
            this.props.onAddNewTodo(this.newTodo);
            this.newTodo=new TodoModel();
            event.preventDefault();
        }
    }

    componentDidMount() {
        this.modal = document.getElementsByClassName('modal')[0];

    }

    validateTextInput(inputText) {

        if (inputText === '') {

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
                       placeholder="New task" value={this.state.inputText} onChange={this.handleChange}/>
                <button className="add-button btn "  disabled={ this.state.inputText===''}  onClick={this.addTodo}>Add</button>

            </form>
        )
    }
}

export default NewTodoInput;
