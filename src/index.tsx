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

class AppState {
    todos: TasksList;
    visibilityFilter: string;

    constructor(taskdata: TasksList = new TasksList(), visibilityFilter = 'ALL') {
        this.todos = taskdata;
        this.visibilityFilter = visibilityFilter;
    }
}

const TodoReducer = (state:AppState = new AppState(new TasksList(0,
        new Task({"title": "Lift","description": "remember to pick up slippers"}),
        new Task({"title": "Complete app", "description": "Need to complete this application by Tuesday"}),
        new Task({"title": "Add Deadline", "description": "Test conditional display of end date", "enddate": new Date()})
    )), action) => {
    switch(action.type) {
        case 'ADD_TODO': {
            const newstate = new AppState(new TasksList(state.todos.getCurrentTaskID(), ...state.todos.getTasks(), new Task({
                                    "title": action.data["TaskTitle"],
                                    "description": action.data["TaskDescription"],
                                    "enddate": action.data["TaskEndDate"]
                                })
                            ), state.visibilityFilter);
            return newstate;
        }    
        case 'REMOVE_TODO': {
            const newstate = new AppState(new TasksList(state.todos.getCurrentTaskID(), ...state.todos.getTasks().filter(state => state.getID() !== action.todoid)), state.visibilityFilter);
            return newstate;
        }
        case 'TOGGLE_TODO': {
            let newstate = state;
            newstate.todos.getTasks().map(state => {
                if (state.getID() === action.todoid) {
                    state.changeStatus(state.getStatus() === Status.COMPLETE ? Status.PENDING : Status.COMPLETE);
                }
            })
            const toggledstate = new AppState(new TasksList(state.todos.getCurrentTaskID(), ...newstate.todos.getTasks()), state.visibilityFilter);
            return toggledstate;
        }
        case 'CHANGE_VISIBLE': {
            let newstate = new AppState(state.todos, action.visibility);
            return newstate;
        }
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

    removeTask = (taskid: number) => {
        TodoStore.dispatch({
            type: 'REMOVE_TODO',
            todoid: taskid
        })
    }

    toggleTask = (taskid: number) => {
        TodoStore.dispatch({
            type: 'TOGGLE_TODO',
            todoid: taskid
        })
    }

    changeVisibility = (value: string) => {
        TodoStore.dispatch({
            type: 'CHANGE_VISIBLE',
            visibility: value
        })
    }

    render() {
        console.log(TodoStore.getState());
        return (
            <div id='mainPanel'>
                <AddTaskPane addTaskHandler={this.addNewTask}/>
                <div id='listPanel'>
                    <Header changeVisibility={this.changeVisibility}/>
                    <TaskListElement toggleTaskHandler={this.toggleTask} removetaskHandler={this.removeTask} visibilty={TodoStore.getState().visibilityFilter} tasks={TodoStore.getState().todos}/>
                </div>
            </div>
        );
    }
};

const render = () => ReactDOM.render(<App />, document.getElementById('root'));
TodoStore.subscribe(render);
render();