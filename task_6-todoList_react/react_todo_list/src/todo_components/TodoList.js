import React from 'react'
import '../styles/TodoList.css';
import TodoItem from "./TodoItem"
// class TodoList extends Component {
//     constructor(props) {
//         super(props);
//
//     }
//
//     render() {
//         return (
//             <ul className="todos-list">
//
//             </ul>
//
//         )
//     }
// }
// export default TodoList;

export default function TodoList(props) {
    const todosArray = props.todosArray;
    const onDeleteeTodo =(id)=>{
        props.removeTodo(id)
    };
    const onSwitchStatusTodo=(todo)=>{
        props.toggleStatus(todo)
    };
    const onEditTodo=(todo)=>{
        props.editTodo(todo)
    };

    const todosElemnts = todosArray.map((todo) =>
        <TodoItem
            key={todo.id}
            todo={todo}
            removeTodo={onDeleteeTodo}
            toggleStatus={onSwitchStatusTodo}
            editTodo={onEditTodo}
        />
    );

    return (
        <ul className="todos-list">
            {todosElemnts}
        </ul>
    )
}