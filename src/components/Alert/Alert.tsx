import * as React from 'react';
import * as ReactDOM from 'react-dom';

import './Alert.scss';

interface AlertProps {
    heading:string;
    message:string;
    type:string;
    removeNotification(classname: string);
}

export default class Alert extends React.Component<AlertProps> {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
        }
    }

    unmount = () => {
        this.props.removeNotification('alert-popup-'+this.props.type);
    }

    componentDidMount = () => {
        this.setState({
            show: true
        });
    }

    render = () => {
        let alertClass = 'alert-popup-' + this.props.type + (this.state['show'] ? ' visible' : '');
        return(
            <div className={alertClass}>
                <span className='exit-popup' onClick={this.unmount}>x</span>
                <h4>{this.props.heading}</h4>
                <p>{this.props.message}</p>
            </div>
        );
    }
}