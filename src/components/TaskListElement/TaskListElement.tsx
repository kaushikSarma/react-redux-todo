import * as React from "react";
import TaskElement from "../TaskElement";
import './TaskListElement.scss';

export default class TaskListElement extends React.Component {
    constructor(props) {
        super(props);
    }

    removeTask = (taskid) => {
        this.props['removetaskHandler'](taskid);
    }

    toggleTask = (taskid) => {
        this.props['toggleTaskHandler'](taskid);
    }

    render(){
        return (
            <ul> {this.props['tasks'].tasks.map((data, index) => <TaskElement key={index} taskData={data} toggleTaskHandler={this.toggleTask} removeTaskHandler={this.removeTask} />)} </ul>
        )
    }
}