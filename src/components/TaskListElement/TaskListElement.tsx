import * as React from "react";
import TaskElement from "../TaskElement";
import Task from 'data/Task';
import './TaskListElement.scss';
import TasksList from "../../data/TasksList";
import { Status } from "../../data/Status";

interface TaskListProp {
    removeTaskHandler(taskid:number);
    toggleTaskHandler(taskid:number);
    visibilty: string;
    tasks: TasksList;
}
export default class TaskListElement extends React.Component<TaskListProp> {
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
            <ul> {
                this.props['tasks'].getTasks().filter(data => {
                    if (
                        this.props.visibilty === 'ALL' 
                        || (this.props.visibilty === 'PENDING' && data.getStatus() === Status.PENDING)
                        || (this.props.visibilty === 'COMPLETE' && data.getStatus() === Status.COMPLETE)
                    )  
                    return true;
                    else return false;
                }).map((data, index) => <TaskElement key={index} taskData={data} toggleTaskHandler={this.toggleTask} removeTaskHandler={this.removeTask}/>)
            }
            </ul>
        )
    }
}