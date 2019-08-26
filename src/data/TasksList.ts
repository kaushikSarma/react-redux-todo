import Task from "./Task";
import { Status } from "./Status";

export default class TasksList {
    private tasks: Task[];
    private currentTaskID: number = 0;

    constructor(currentTaskID: number = 0, ...tasks: Task[]) {
        this.tasks = tasks;
        this.currentTaskID = currentTaskID;
        this.tasks.map(task => {
            if (task.getID() < 0) {
                task.setID(this.currentTaskID + 1);
                this.currentTaskID = task.getID();
            } else {
                this.currentTaskID = task.getID() > this.currentTaskID ? task.getID() : this.currentTaskID;
            }
        });
    }

    getTasks = () => this.tasks;

    addTask = (task: Task) => {
        const lastID = this.currentTaskID + 1;
        const lastIndex = this.tasks.length;
        this.tasks[lastIndex].setID(lastID);
        this.currentTaskID = lastID;
        this.tasks.push(task);
    }

    deleteTask = (taskID: number) => {
        this.tasks = this.tasks.filter(task => task.getID() !== taskID);
    }

    changeStatus = (taskID: number, tostatus: Status) => {
        this.tasks.forEach(task => {
            task.getID() === taskID && task.changeStatus(tostatus);
        });
    }

    getCurrentTaskID = () => this.currentTaskID;
}
