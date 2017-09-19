import React, {Component} from 'react'
import '../styles/TodoFilters.css';
class TodoFilters extends Component {
    constructor(props) {
        super(props);
        this.showTodosList = this.showTodosList.bind(this);
        this.applyCompletedTaskFilter = this.applyCompletedTaskFilter.bind(this);
        this.applyUncompletedTaskFilter = this.applyUncompletedTaskFilter.bind(this);
        this.allTaskButton = null;
        this.completedTaskButton = null;
        this.unCompletedTaskButton = null;
        this.allTodosHtmlElement = null;
    }

    applyUncompletedTaskFilter(e) {
        this.switchActiveFilterClass(this.unCompletedTaskButton, [this.completedTaskButton, this.allTaskButton]);
        this.removeEditModeClass(this.allTodosHtmlElement.childNodes);
        this.hideCompletedTodos();
    }

    applyCompletedTaskFilter() {
        this.switchActiveFilterClass(this.completedTaskButton, [this.unCompletedTaskButton, this.allTaskButton]);
        this.allTodosHtmlElement.classList.remove('uncompleted-tasks');
        this.allTodosHtmlElement.classList.add('completed-tasks');
    };

    hideCompletedTodos() {
        this.allTodosHtmlElement.classList.remove('completed-tasks');
        this.allTodosHtmlElement.classList.add('uncompleted-tasks');

    };

    switchActiveFilterClass(activeElement, notActiveElements) {
        activeElement.classList.add('active-filter');
        notActiveElements.forEach(function (element) {
            element.classList.remove('active-filter');
        });
    }

    removeEditModeClass(allTodosChildNodes) {
        for (let i = 0; i < allTodosChildNodes.length; i++) {
            if (allTodosChildNodes[i].className === 'edit-mode') {
                allTodosChildNodes[i].classList.remove('edit-mode');
            }
        }
    }

    showTodosList() {
        this.switchActiveFilterClass(this.allTaskButton, [this.unCompletedTaskButton, this.completedTaskButton]);
        this.allTodosHtmlElement.classList.remove('uncompleted-tasks');
        this.allTodosHtmlElement.classList.remove('completed-tasks');
        this.removeEditModeClass(this.allTodosHtmlElement.childNodes);

    };

    componentDidMount() {

        this.completedTaskButton = document.getElementsByClassName('completed-tasks-btn')[0];
        this.unCompletedTaskButton = document.getElementsByClassName('uncompleted-tasks-btn')[0];
        this.allTaskButton = document.getElementsByClassName('all-tasks-btn')[0];
        this.allTodosHtmlElement = document.getElementsByClassName('todos-list')[0];
        console.log(this.allTodosHtmlElement);
    }

    render() {
        return (
            <div className="todoFilters">
                <button className="all-tasks-btn btn  active-filter" type="button" onClick={this.showTodosList}>All
                </button>
                <button className="completed-tasks-btn btn" type="button" onClick={this.applyCompletedTaskFilter}>
                    Completed Tasks
                </button>
                <button className="uncompleted-tasks-btn btn " type="button" onClick={this.applyUncompletedTaskFilter}>
                    Uncompleted Tasks
                </button>
            </div>
        )
    }
}
export default TodoFilters;