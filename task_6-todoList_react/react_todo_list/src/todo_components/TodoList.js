import React from 'react'
import '../styles/TodoList.css';
import TodoItem from "./TodoItem"

export default function TodoList(props) {
    const todosArray = props.todosArray;


    const onDeleteTodo = (id) => {
        props.removeTodo(id)
    };
    const onSwitchStatusTodo = (todo) => {
        props.toggleStatus(todo)
    };
    const onEditTodo = (todo) => {
        props.editTodo(todo)
    };
    const onShowModel = () => {
        props.showModel();
    };

    const todosElemnts = todosArray.map((todo) =>
        <TodoItem
            key={todo.id}
            todo={todo}
            removeTodo={onDeleteTodo}
            toggleStatus={onSwitchStatusTodo}
            editTodo={onEditTodo}
            showModel={onShowModel}
            modalService={props.modalService}
        />
    );

    return (
        <ul className="todos-list">
            {todosElemnts}

        </ul>
    )
}