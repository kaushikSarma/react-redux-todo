import * as React from "react";
import './AddTaskPane.scss';
import Alert from "../../components/Alert";

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
            TaskHasDeadline: false,
            hasalert: false,
            alertheading: '',
            alertmessage: '',
            alerttype: ''
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
        if (data['TaskTitle'] === '') {
            this.alert('Success', 'Title field is mandatory', 'success');
            return false;
        } 
        if (data['TaskHasDeadline'] && isNaN(Date.parse(data['TaskEndDate']))) {
            this.alert('Invalid Date', 'Please enter a valid date of format dd/mm/yyyy', 'failure');
            return false;
        }
        if (data['TaskHasDeadline'] && data['TaskEndDate'].getTime() < (new Date()).getTime()) {
            this.alert('Invalid Date', 'Oops! Looks like you set your deadline in the past!', 'failure');
            return false;
        } 
        return true;
    };

    alert = (heading: string, msg: string, type: string) => {
        this.setState({
            hasalert: true,
            alertheading: heading,
            alertmessage: msg,
            alerttype: type
        });
    }

    resetForm = () => {
        this.setState({ 
            TaskTitle: "",
            TaskDescription: "",
            TaskEndDate: null,
            TaskHasDeadline: false
        });
    }

    handleSubmit = event => {
        event.preventDefault();
        console.log(this.state);
        if(this.isValid(this.state)) {
            this.props.addTaskHandler(this.state);
            // this.resetForm();
            // event.target.reset();
            alert('Todo Added!')
        }
    }

    removeNotification = (classname:string) => {
        this.setState({
            hasalert: false,
            alertheading: '',
            alertmessage: '',
            alerttype: ''
        })
    }

    render() {
        const hasDeadline = this.state['TaskHasDeadline'];
        var curr = new Date();
        curr.setDate(curr.getDate() + 3);
        var date = curr.toISOString().substr(0,10);
        return (
            <div className="sidebar">
                {this.state['hasalert'] && <Alert removeNotification={this.removeNotification} heading={this.state['alertheading']} message={this.state['alertmessage']} type={this.state['alerttype']}/>}

                <form onSubmit={this.handleSubmit}>
                    <input type="Text" name="TaskTitle" placeholder="Title" onChange={this.handleChange} required></input>
                    <textarea name="TaskDescription" placeholder="Add a description" onChange={this.handleChange}></textarea>
                    <input type="checkbox" name="TaskHasDeadline" onChange={this.handleChange} checked={this.state['TaskHasDeadline']}></input> Add Deadline?
                    {hasDeadline && <input type="date" name="TaskEndDate" placeholder='Deadline' onChange={this.handleChange} min='$todaymin' required={hasDeadline}></input>}
                    <button type="submit">Add</button>
                </form>
            </div>
        );
    }
}