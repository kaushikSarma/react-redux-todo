import * as React from "react";
import * as ReactDOM from "react-dom";
import { createStore } from "redux";

import Header from "./components/Header";
import TaskListElement from "./components/TaskListElement";
import AddTaskPane from './components/AddTaskPane/AddTaskPane';

import TasksList from './data/TasksList';
import Task from "./data/Task";
import { Status } from "./data/Status";

import './index.scss';

const TodoReducer = (state:TasksList = new TasksList(0,
    new Task({"title": "Lift","description": "remember to pick up slippers"}),
    new Task({"title": "Complete app", "description": "Need to complete this application by Tuesday"})
), action) => {
    switch(action.type) {
        case 'ADD_TODO': 
            const newstate = new TasksList(state.getCurrentTaskID(), ...state.getTasks(), new Task({
                                    "title": action.data["TaskTitle"],
                                    "description": action.data["TaskDescription"],
                                    "enddate": action.data["TaskEndDate"]
                                })
                            );
            return newstate;
            
        case 'REMOVE_TODO':
            const updatestate = new TasksList(state.getCurrentTaskID(), ...state.getTasks().filter(state => state.getID() !== action.todoid));
            return updatestate;

        case 'TOGGLE_TODO':
            let a = state;
            a.getTasks().map(state => {
                if (state.getID() === action.todoid) {
                    state.changeStatus(state.getStatus() === Status.COMPLETE ? Status.PENDING : Status.COMPLETE);
                }
            })
            const toggledstate = new TasksList(state.getCurrentTaskID(), ...a.getTasks());
            return toggledstate;
        
        default: return state;
    }
}

const TodoStore = createStore(TodoReducer);

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    addNewTask = (data) => {
        TodoStore.dispatch({
            type: 'ADD_TODO',
            data: data
        });
    }

    removeTask = (taskid) => {
        TodoStore.dispatch({
            type: 'REMOVE_TODO',
            todoid: taskid
        })
    }

    toggleTask = (taskid) => {
        TodoStore.dispatch({
            type: 'TOGGLE_TODO',
            todoid: taskid
        })
    }

    render() {
        console.log(TodoStore.getState());
        return (
            <div id='mainPanel'>
                <AddTaskPane addTaskHandler={this.addNewTask}/>
                <div id='listPanel'>
                    <Header />
                    <TaskListElement toggleTaskHandler={this.toggleTask} removetaskHandler={this.removeTask} tasks={TodoStore.getState()}/>
                </div>
            </div>
        );
    }
};

const render = () => ReactDOM.render(<App />, document.getElementById('root'));
TodoStore.subscribe(render);
render();