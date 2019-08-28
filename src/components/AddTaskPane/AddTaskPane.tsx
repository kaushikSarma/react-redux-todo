import * as React from "react";
import './AddTaskPane.scss';
import Alert from '@components/Alert';

interface AddTaskProps {
    addTaskHandler(data);
}

export default class AddTaskPane extends React.Component<AddTaskProps> {
    constructor(props) {
        super(props);
        this.state = { 
            TaskTitle: '',
            TaskDescription: '',
            TaskEndDate: '',
            TaskHasDeadline: false,
            hasalert: false,
            alertheading: '',
            alertmessage: '',
            alerttype: ''
        }
    }

    handleChange = event => {
        console.log(this.state);
        const target = event.target;
        let value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        // In case of checkbox and date we should not prevent default action
        (target.type !== 'checkbox' && target.type !=='date') && event.preventDefault();
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
        if (data['TaskHasDeadline'] && Date.parse(data['TaskEndDate']) < (new Date()).getTime()) {
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
            TaskEndDate: "",
            TaskHasDeadline: false
        });
    }

    handleSubmit = event => {
        event.preventDefault();
        console.log(this.state);
        if(this.isValid(this.state)) {
            this.alert('New To-do Added', this.state['TaskTitle'] + ' added to your list!', 'success');
            this.props.addTaskHandler(this.state);
            this.resetForm();
            event.target.reset();
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
                    <input type="Text" name="TaskTitle" placeholder="Title" onChange={this.handleChange} value={this.state['TaskTitle']} required></input>
                    <textarea name="TaskDescription" placeholder="Add a description" onChange={this.handleChange} value={this.state['TaskDescription']}></textarea>
                    <input type="checkbox" name="TaskHasDeadline" onChange={this.handleChange} checked={this.state['TaskHasDeadline']}></input> Add Deadline?
                    {hasDeadline && 
                    <input type="date" name="TaskEndDate" placeholder='Deadline' onChange={this.handleChange} value={this.state['TaskEndDate']} required={hasDeadline}></input>}
                    <button type="submit">Add</button>
                </form>
            </div>
        );
    }
}