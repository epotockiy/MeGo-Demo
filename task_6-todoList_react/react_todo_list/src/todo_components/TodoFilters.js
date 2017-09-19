import React, {Component} from 'react'
import '../styles/TodoFilters.css';
class TodoFilters extends Component {
    constructor(props) {
        super(props);

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