import React, {Component} from 'react';
import '../styles/App.css';
import NewTodoInput from "./NewTodoInput";
import TodoFilters from "./TodoFilters";
import TodoList from "./TodoList";

import LocalStorageService from "./LocalStorageService"
class App extends Component {


    constructor(props) {
        super(props);
        this.localStorageService = new LocalStorageService();
        this.state = {
            todosArray: []
        };

        this.getTodos = this.getTodos.bind(this);
        this.addNewTodo = this.addNewTodo.bind(this);
        this.deleteTodo = this.deleteTodo.bind(this);
        this.editTodoText = this.editTodoText.bind(this);
        this.onSwitchStatusTodo = this.onSwitchStatusTodo.bind(this);

    }

    getTodos() {
        return this.localStorageService.getTodos();
    }

    addNewTodo(newTodo) {
        this.localStorageService.addTodo(newTodo);
        this.state.todosArray.push(newTodo);
        this.setState({todosArray: this.state.todosArray});

    }

    deleteTodo(id) {

        this.localStorageService.deleteTodo(id);

    }

    onSwitchStatusTodo(todo) {

        this.localStorageService.editStatusOfTodo(todo.id, todo.checked);

    }

    componentDidMount() {

        this.localStorageService.isLocalStorageAvailable();
        this.setState({todosArray: this.localStorageService.getTodos()})
    }

    editTodoText(todo) {
        this.localStorageService.editTextTodo(todo.text, todo.id);
    }


    render() {
        const todos = this.state.todosArray;
        return (
            <div className="todo-plugin">
                <div className="todo-manager">
                    <NewTodoInput onAddNewTodo={this.addNewTodo}/>
                    <TodoFilters/>
                </div>
                <TodoList
                    todosArray={todos}
                    toggleStatus={this.onSwitchStatusTodo}
                    removeTodo={this.deleteTodo}
                    editTodo={this.editTodoText}

                />

            </div>
        );
    }
}

export default App;
