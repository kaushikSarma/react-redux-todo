import * as React from "react";
import Task from "../../data/Task";
import { Status } from "../../data/Status";

import './TaskElement.scss';

interface TaskProp {
    taskData: Task;
    removeTaskHandler(taskid: number);
    toggleTaskHandler(taskid: number);
}

export default class TaskElement extends React.Component<TaskProp> {
    constructor(props) {
        super(props)
    }

    removeTask = () => {
        this.props.removeTaskHandler(this.props.taskData.getID());
    }

    toggleTask = () => {
        this.props.toggleTaskHandler(this.props.taskData.getID());
    }

    render() {
        return (
            <li className={this.props.taskData.getStatus() === Status.COMPLETE ? "complete" : "pending"}>
                <h4>{this.props.taskData.getID()}. {this.props.taskData.getTitle()}</h4>
                <p>{this.props.taskData.getDescription()}</p>
                <button onClick={this.toggleTask}>{ this.props.taskData.getStatus() === Status.COMPLETE ? "Mark as Pending" : "Mark as Complete" }</button>
                <button onClick={this.removeTask}>remove from list</button>
            </li>
        );
    }
}