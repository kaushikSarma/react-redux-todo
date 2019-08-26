import * as React from "react";
import './AddTaskPane.scss';

interface AddTaskProps {
    addTaskHandler(data);
}
export default class AddTaskPane extends React.Component<AddTaskProps> {
    constructor(props) {
        super(props);
        this.state = { 
            TaskTitle: "",
            TaskDescription: "",
            TaskEndDate: null,
            TaskHasDeadline: false
        }
    }

    handleChange = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked 
                    : (target.type === 'date' ? target.valueAsDate : target.value);
        const name = target.name;
        // In case of checkbox we should not prevent default action
        target.type !== 'checkbox' && event.preventDefault();
        this.setState({
            [name]: value
        });
    }
    
    isValid(data) {
        if (data['TaskTitle'] === '') return false;
        if (data['TaskHasDeadline'] && isNaN(Date.parse(data['TaskEndDate']))) return false;
        if (data['TaskHasDeadline'] && data['TaskEndDate'].getTime() < (new Date()).getTime()) return false;
        return true;
    };

    handleSubmit = event => {
        event.preventDefault();
        this.props.addTaskHandler(this.state);
    }

    render() {
        const hasDeadline = this.state['TaskHasDeadline'];
        var curr = new Date();
        curr.setDate(curr.getDate() + 3);
        var date = curr.toISOString().substr(0,10);
        return (
            <div className="sidebar">
                <form onSubmit={this.handleSubmit}>
                    <input type="Text" name="TaskTitle" placeholder="Title" onChange={this.handleChange} required></input>
                    <textarea name="TaskDescription" placeholder="Add a description" onChange={this.handleChange}></textarea>
                    <input type="checkbox" name="TaskHasDeadline" onChange={this.handleChange}></input> Add Deadline?
                    {hasDeadline && <input type="date" name="TaskEndDate" defaultValue={date} onChange={this.handleChange} min='$todaymin' required={hasDeadline}></input>}
                    <button type="submit">Add</button>
                </form>
            </div>
        );
    }
}